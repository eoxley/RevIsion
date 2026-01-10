/**
 * Answer Evaluation Agent
 *
 * Sole responsibility: Evaluate student responses and return structured JSON.
 *
 * NOT a tutor. NOT an encourager. NOT a teacher.
 * ONLY an evaluator.
 *
 * Rule: No evaluation = no response generation.
 */

import { OpenAI } from "openai";
import type { Evaluation, EvaluationResult, ErrorType } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const EVALUATION_PROMPT = `You are an Answer Evaluation Agent inside an AI-powered GCSE revision system.

Your sole responsibility is to evaluate a student's response to a revision question and return a strictly structured JSON assessment.

You are NOT a tutor.
You do NOT explain concepts.
You do NOT encourage or motivate.
You do NOT teach.

You ONLY evaluate.

## Your Task

1. Determine whether the student's answer is:
   - correct
   - partial
   - incorrect

2. Assess the student's confidence level based on wording:
   - high
   - medium
   - low

3. If the answer is not fully correct, identify the primary error type:
   - recall_gap (missing facts or definitions)
   - concept_gap (misunderstanding the idea)
   - confusion (mixing concepts)
   - exam_technique (poor structure, vague wording)
   - guessing (clearly uncertain or speculative)

If the answer is fully correct, set error_type to null.

## Output Rules (ABSOLUTE)

You must return ONLY valid JSON.
No prose.
No markdown.
No commentary.
No emojis.

The response MUST match this schema exactly:

{
  "evaluation": "correct | partial | incorrect",
  "confidence": "high | medium | low",
  "error_type": "recall_gap | concept_gap | confusion | exam_technique | guessing | null"
}

## Evaluation Guidelines

- Be strict but fair
- GCSE mark-scheme logic applies:
  - Missing key terms → partial
  - Incorrect definitions → incorrect
  - Correct idea but weak explanation → partial
- Do NOT reward confidence if the answer is wrong
- Do NOT penalise spelling unless meaning is unclear
- If unsure between two grades, choose the lower one

## Failure Handling

If the student response is empty, "I don't know", or a non-attempt, return:
{
  "evaluation": "incorrect",
  "confidence": "low",
  "error_type": "recall_gap"
}

## Final Rule

If you cannot confidently evaluate the answer, still return the closest valid classification.
You may NEVER refuse.
You may NEVER return free text.

Your output feeds a control system.
Precision matters more than kindness.`;

interface EvaluateParams {
  studentAnswer: string;
  currentQuestion: string | null;
  expectedAnswerHint: string | null;
  topicName: string | null;
  markScheme?: string | null;
  difficultyLevel?: string | null;
}

/**
 * Evaluate a student's answer
 * Returns structured evaluation or fails safely
 */
export async function evaluateAnswer(params: EvaluateParams): Promise<Evaluation> {
  const {
    studentAnswer,
    currentQuestion,
    expectedAnswerHint,
    topicName,
    markScheme,
    difficultyLevel,
  } = params;

  // If no question was asked, we can't evaluate
  if (!currentQuestion) {
    return {
      evaluation: "unknown",
      confidence: "low",
      error_type: null,
    };
  }

  // Check for non-answer responses (greetings, meta-questions, etc.)
  if (isMetaResponse(studentAnswer)) {
    return {
      evaluation: "unknown",
      confidence: "high",
      error_type: null,
    };
  }

  // Check for explicit non-attempts
  if (isNonAttempt(studentAnswer)) {
    return {
      evaluation: "incorrect",
      confidence: "low",
      error_type: "recall_gap",
    };
  }

  const userPrompt = buildEvaluationPrompt(
    studentAnswer,
    currentQuestion,
    expectedAnswerHint,
    topicName,
    markScheme || null,
    difficultyLevel || null
  );

  // Try evaluation with retry
  let evaluation = await attemptEvaluation(userPrompt);

  if (!evaluation) {
    // Retry once
    evaluation = await attemptEvaluation(userPrompt);
  }

  // Fail safe if still no valid evaluation
  if (!evaluation) {
    console.warn("Evaluation failed after retry, using unknown");
    return {
      evaluation: "unknown",
      confidence: "low",
      error_type: null,
    };
  }

  return evaluation;
}

/**
 * Attempt a single evaluation call
 */
async function attemptEvaluation(userPrompt: string): Promise<Evaluation | null> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: EVALUATION_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.1, // Low temperature for consistent evaluation
      max_tokens: 100,
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (!content) return null;

    // Clean potential markdown formatting
    const cleanContent = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    // Parse JSON
    const parsed = JSON.parse(cleanContent);

    // Validate structure
    if (!isValidEvaluation(parsed)) {
      console.warn("Invalid evaluation structure:", parsed);
      return null;
    }

    return parsed as Evaluation;
  } catch (error) {
    console.error("Evaluation attempt failed:", error);
    return null;
  }
}

/**
 * Build the evaluation prompt
 */
function buildEvaluationPrompt(
  studentAnswer: string,
  currentQuestion: string,
  expectedAnswerHint: string | null,
  topicName: string | null,
  markScheme: string | null,
  difficultyLevel: string | null
): string {
  let prompt = `## Evaluation Request\n\n`;

  prompt += `**Topic:** ${topicName || "General GCSE"}\n`;

  if (difficultyLevel) {
    prompt += `**Difficulty:** ${difficultyLevel}\n`;
  }

  prompt += `\n**Question asked:**\n${currentQuestion}\n`;

  if (markScheme) {
    prompt += `\n**Mark scheme / Success criteria:**\n${markScheme}\n`;
  } else if (expectedAnswerHint) {
    prompt += `\n**Expected answer should include:**\n${expectedAnswerHint}\n`;
  }

  prompt += `\n**Student's response:**\n${studentAnswer}\n`;
  prompt += `\n---\nEvaluate this response. Return ONLY the JSON object.`;

  return prompt;
}

/**
 * Validate evaluation object structure
 */
function isValidEvaluation(obj: unknown): boolean {
  if (typeof obj !== "object" || obj === null) return false;

  const e = obj as Record<string, unknown>;

  const validEvaluations: EvaluationResult[] = ["correct", "partial", "incorrect"];
  const validConfidences = ["high", "medium", "low"];
  const validErrorTypes: (ErrorType | "null")[] = [
    "recall_gap",
    "concept_gap",
    "confusion",
    "exam_technique",
    "guessing",
    "null",
  ];

  // Check evaluation
  if (!validEvaluations.includes(e.evaluation as EvaluationResult)) {
    return false;
  }

  // Check confidence
  if (!validConfidences.includes(e.confidence as string)) {
    return false;
  }

  // Check error_type (can be null or a valid string)
  if (e.error_type !== null && !validErrorTypes.includes(e.error_type as ErrorType | "null")) {
    return false;
  }

  return true;
}

/**
 * Check if the response is a meta-response (not an answer attempt)
 */
function isMetaResponse(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim();

  const metaPatterns = [
    /^(hi|hello|hey|hiya)\b/,
    /^(thanks|thank you|cheers)\b/,
    /^(ok|okay|sure|yes|no|yep|nope)$/,
    /^(what|how|why|can you|could you|please)\s+(do|explain|help|tell)/,
    /^(help|hint|clue)\b/,
    /^(skip|next|move on)\b/,
    /\?$/, // Ends with question mark (asking, not answering)
  ];

  return metaPatterns.some((pattern) => pattern.test(lowerMessage));
}

/**
 * Check for explicit non-attempts
 */
function isNonAttempt(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim();

  const nonAttemptPatterns = [
    /^i\s*(don'?t|do not)\s*know/,
    /^idk$/,
    /^no\s*idea/,
    /^not\s*sure/,
    /^i\s*(have\s*)?no\s*(idea|clue)/,
    /^(i\s*)?(can'?t|cannot)\s*(remember|recall)/,
    /^i\s*(forgot|forget)/,
    /^pass$/,
    /^\.{2,}$/, // Just dots
    /^\?+$/, // Just question marks
  ];

  // Empty or very short
  if (lowerMessage.length < 2) return true;

  return nonAttemptPatterns.some((pattern) => pattern.test(lowerMessage));
}

/**
 * Check if message is a request for help/hint
 */
export function isHelpRequest(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim();

  const helpPatterns = [
    /^(help|hint|clue)\b/,
    /can (you|i) (get|have) (a )?hint/,
    /give me a hint/,
    /i('m| am) (stuck|confused)/,
    /i don'?t (understand|get it)/,
    /what (do you mean|does that mean)/,
    /can you explain/,
    /explain (it|this|that)/,
  ];

  return helpPatterns.some((pattern) => pattern.test(lowerMessage));
}

/**
 * Check if message is requesting to skip/move on
 */
export function isSkipRequest(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim();

  const skipPatterns = [
    /^(skip|next|move on)\b/,
    /can we (skip|move on)/,
    /let'?s (skip|move on)/,
    /i want to (skip|move on)/,
    /different (question|topic)/,
  ];

  return skipPatterns.some((pattern) => pattern.test(lowerMessage));
}
