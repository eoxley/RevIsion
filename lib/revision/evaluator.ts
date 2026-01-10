/**
 * Answer Evaluator
 *
 * Evaluates student responses BEFORE response generation.
 * Returns structured JSON only.
 *
 * Rule: No evaluation = no response generation.
 */

import { OpenAI } from "openai";
import type { Evaluation, EvaluationResult } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const EVALUATION_PROMPT = `You are an answer evaluator for GCSE revision.

Your ONLY job is to evaluate whether the student's answer is correct, partial, or incorrect.

You must respond with ONLY valid JSON in this exact format:
{
  "evaluation": "correct" | "partial" | "incorrect",
  "confidence": "high" | "medium" | "low",
  "error_type": "concept_gap" | "calculation_error" | "terminology_confusion" | "incomplete_answer" | "off_topic" | "none"
}

Evaluation criteria:
- "correct": The answer demonstrates understanding of the concept. Minor phrasing issues are OK.
- "partial": The answer shows some understanding but is incomplete or has minor errors.
- "incorrect": The answer is wrong or shows fundamental misunderstanding.

Error types:
- "concept_gap": Student doesn't understand the underlying concept
- "calculation_error": Method is right but calculation is wrong
- "terminology_confusion": Wrong terms but right idea
- "incomplete_answer": Correct but missing key parts
- "off_topic": Answer doesn't address the question
- "none": No error (for correct answers)

DO NOT:
- Explain your reasoning
- Add any text outside the JSON
- Use markdown formatting

ONLY output the JSON object.`;

interface EvaluateParams {
  studentAnswer: string;
  currentQuestion: string | null;
  expectedAnswerHint: string | null;
  topicName: string | null;
}

/**
 * Evaluate a student's answer
 * Returns structured evaluation or fails safely
 */
export async function evaluateAnswer(params: EvaluateParams): Promise<Evaluation> {
  const { studentAnswer, currentQuestion, expectedAnswerHint, topicName } = params;

  // If no question was asked, we can't evaluate
  if (!currentQuestion) {
    return {
      evaluation: "unknown",
      confidence: "low",
      error_type: "none",
    };
  }

  // Check for non-answer responses (greetings, meta-questions, etc.)
  if (isMetaResponse(studentAnswer)) {
    return {
      evaluation: "unknown",
      confidence: "high",
      error_type: "off_topic",
    };
  }

  const userPrompt = buildEvaluationPrompt(
    studentAnswer,
    currentQuestion,
    expectedAnswerHint,
    topicName
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
      error_type: "none",
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

    // Parse JSON
    const parsed = JSON.parse(content);

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
  topicName: string | null
): string {
  let prompt = `Topic: ${topicName || "General"}\n\n`;
  prompt += `Question asked: ${currentQuestion}\n\n`;

  if (expectedAnswerHint) {
    prompt += `Expected answer should include: ${expectedAnswerHint}\n\n`;
  }

  prompt += `Student's answer: ${studentAnswer}\n\n`;
  prompt += `Evaluate this answer.`;

  return prompt;
}

/**
 * Validate evaluation object structure
 */
function isValidEvaluation(obj: unknown): boolean {
  if (typeof obj !== "object" || obj === null) return false;

  const e = obj as Record<string, unknown>;

  const validEvaluations: EvaluationResult[] = ["correct", "partial", "incorrect", "unknown"];
  const validConfidences = ["high", "medium", "low"];
  const validErrorTypes = [
    "concept_gap",
    "calculation_error",
    "terminology_confusion",
    "incomplete_answer",
    "off_topic",
    "none",
  ];

  return (
    validEvaluations.includes(e.evaluation as EvaluationResult) &&
    validConfidences.includes(e.confidence as string) &&
    validErrorTypes.includes(e.error_type as string)
  );
}

/**
 * Check if the response is a meta-response (not an answer attempt)
 */
function isMetaResponse(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim();

  const metaPatterns = [
    /^(hi|hello|hey|hiya)/,
    /^(thanks|thank you|cheers)/,
    /^(ok|okay|sure|yes|no|yep|nope)$/,
    /^(i don'?t know|idk|no idea|not sure)/,
    /^(what|how|why|can you|could you|please)\s+(do|explain|help|tell)/,
    /^(help|hint|clue)/,
    /^(skip|next|move on)/,
    /^(i'?m confused|i'?m stuck)/,
  ];

  return metaPatterns.some((pattern) => pattern.test(lowerMessage));
}

/**
 * Check if message is a request for help/hint
 */
export function isHelpRequest(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim();

  const helpPatterns = [
    /^(help|hint|clue)/,
    /can (you|i) (get|have) (a )?hint/,
    /give me a hint/,
    /i('m| am) (stuck|confused)/,
    /i don'?t (understand|get it)/,
    /what (do you mean|does that mean)/,
    /can you explain/,
  ];

  return helpPatterns.some((pattern) => pattern.test(lowerMessage));
}

/**
 * Check if message is requesting to skip/move on
 */
export function isSkipRequest(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim();

  const skipPatterns = [
    /^(skip|next|move on)/,
    /can we (skip|move on)/,
    /let'?s (skip|move on)/,
    /i want to (skip|move on)/,
  ];

  return skipPatterns.some((pattern) => pattern.test(lowerMessage));
}
