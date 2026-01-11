/**
 * Completion & Exam Readiness Agent
 *
 * This agent runs ONLY when a learner has completed a revision module.
 *
 * It does NOT teach.
 * It does NOT revise.
 * It does NOT introduce new content.
 * It does NOT give hints.
 *
 * Its purpose is to:
 * - Summarise what the learner now demonstrably knows
 * - Relate that knowledge to GCSE exam expectations
 * - Generate realistic mock exam questions based on past paper styles
 * - Signal readiness honestly and conservatively
 *
 * This agent is READ-ONLY. It never modifies state or progress.
 */

import { OpenAI } from "openai";
import type {
  CompletionInput,
  CompletionOutput,
  MockQuestion,
  ReadinessSignal,
  RevisionProgress,
  EvaluationSummary,
} from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const COMPLETION_AGENT_PROMPT = `You are a Completion & Exam Readiness Agent inside an AI-powered GCSE revision system.

You run ONLY when a learner has completed a revision module for a subject.

You do NOT teach.
You do NOT revise.
You do NOT introduce new content.
You do NOT give hints.

Your purpose is to:
- Summarise what the learner now demonstrably knows
- Relate that knowledge to GCSE exam expectations
- Generate realistic mock exam questions based on past paper styles
- Signal readiness honestly and conservatively

## Output Format (JSON)

Return ONLY valid JSON matching this schema exactly:

{
  "knowledge_summary": ["bullet point 1", "bullet point 2", ...],
  "exam_mapping": "Text explaining how topics appear in GCSE exams",
  "mock_questions": [
    {
      "question": "Question text [X marks]",
      "marks": X,
      "command_word": "Calculate|Explain|Describe|etc",
      "topic": "Topic name"
    }
  ],
  "readiness_signal": "Ready to progress" | "One more practice round recommended" | "Specific topic review recommended"
}

## Phase 1 - Knowledge Summary Rules

- Only include topics with understanding_state = "secure"
- Use bullet points (as array items)
- Mention topics that required the most attempts
- No encouragement or praise
- No teaching language
- Tone: "You now consistently demonstrate understanding of..."

## Phase 2 - Exam Mapping Rules

- Explain typical question formats for these topics
- Include common mark ranges (e.g., "typically 2-4 marks")
- Note if questions appear as:
  - Short answer questions
  - Multi-step problems
  - Application/analysis questions
- Be factual
- No advice
- No revision tips
- No scare language

## Phase 3 - Mock Questions Rules

- Generate 5-10 GCSE-style exam questions
- Use correct command words: "Calculate", "Explain", "Describe", "Compare", "Evaluate", "State", "Define", "Outline"
- Include mark values in brackets: [3 marks]
- Match real past paper formats
- Reflect realistic difficulty for GCSE
- Draw ONLY from the completed topics provided
- Do NOT include answers
- Do NOT include worked solutions
- Do NOT introduce new topics
- Do NOT invent novel question formats

## Phase 4 - Readiness Signal Rules

- Return EXACTLY one of these three values:
  - "Ready to progress" - if all topics secure with minimal errors
  - "One more practice round recommended" - if topics secure but error trends suggest gaps
  - "Specific topic review recommended" - if any topic had excessive attempts or persistent error patterns
- Be conservative - if evidence is insufficient, recommend more practice
- This signal is consumed by the system controller

## Absolute Output Rules

- No markdown formatting
- No emojis
- No motivational language
- No teaching
- No answers or worked solutions
- Clear, factual language only
- Return ONLY the JSON object, nothing else`;

/**
 * Run the Completion Agent
 *
 * This function is READ-ONLY. It reads progress data and generates output.
 * It NEVER modifies state, progress, or any database records.
 */
export async function runCompletionAgent(
  input: CompletionInput
): Promise<CompletionOutput> {
  const userPrompt = buildCompletionPrompt(input);

  // Try with retry
  let output = await attemptCompletionGeneration(userPrompt);

  if (!output) {
    // Retry once
    output = await attemptCompletionGeneration(userPrompt);
  }

  // Fail safe with conservative output
  if (!output) {
    console.warn("Completion agent failed after retry, using fallback");
    return buildFallbackOutput(input);
  }

  return output;
}

/**
 * Attempt a single completion generation
 */
async function attemptCompletionGeneration(
  userPrompt: string
): Promise<CompletionOutput | null> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: COMPLETION_AGENT_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3, // Consistent but varied questions
      max_tokens: 2000,
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
    if (!isValidCompletionOutput(parsed)) {
      console.warn("Invalid completion output structure:", parsed);
      return null;
    }

    return parsed as CompletionOutput;
  } catch (error) {
    console.error("Completion generation attempt failed:", error);
    return null;
  }
}

/**
 * Build the user prompt for completion generation
 */
function buildCompletionPrompt(input: CompletionInput): string {
  const {
    subject_name,
    exam_board,
    completed_topics,
    revision_progress,
    evaluation_summary,
  } = input;

  let prompt = `## Completion Review Request\n\n`;

  prompt += `**Subject:** ${subject_name}\n`;
  if (exam_board) {
    prompt += `**Exam Board:** ${exam_board}\n`;
  }

  prompt += `\n**Completed Topics:**\n`;
  completed_topics.forEach((topic) => {
    prompt += `- ${topic}\n`;
  });

  prompt += `\n**Revision Progress Data:**\n`;
  revision_progress.forEach((progress) => {
    const topicName = completed_topics.find(
      (_, i) => evaluation_summary[i]?.topic_id === progress.topic_id
    ) || progress.topic_id || "Unknown Topic";

    prompt += `\nTopic: ${topicName}\n`;
    prompt += `- Understanding State: ${progress.understanding_state}\n`;
    prompt += `- Total Attempts: ${progress.attempts}\n`;
    prompt += `- Correct: ${progress.correct_count}\n`;
    prompt += `- Incorrect: ${progress.incorrect_count}\n`;
    prompt += `- Partial: ${progress.partial_count}\n`;
  });

  prompt += `\n**Evaluation Summary (Error Trends):**\n`;
  evaluation_summary.forEach((summary) => {
    prompt += `\nTopic: ${summary.topic_name}\n`;
    prompt += `- Total Attempts: ${summary.total_attempts}\n`;
    prompt += `- Correct Count: ${summary.correct_count}\n`;
    if (summary.error_types.length > 0) {
      const errorCounts: Record<string, number> = {};
      summary.error_types.forEach((err) => {
        if (err) {
          errorCounts[err] = (errorCounts[err] || 0) + 1;
        }
      });
      prompt += `- Error Types: ${JSON.stringify(errorCounts)}\n`;
    }
  });

  prompt += `\n---\n`;
  prompt += `Generate the completion review. Return ONLY the JSON object.\n`;
  prompt += `Remember: ONLY generate questions from the completed topics listed above.`;

  return prompt;
}

/**
 * Validate completion output structure
 */
function isValidCompletionOutput(obj: unknown): boolean {
  if (typeof obj !== "object" || obj === null) return false;

  const o = obj as Record<string, unknown>;

  // Check knowledge_summary is array of strings
  if (!Array.isArray(o.knowledge_summary)) return false;
  if (!o.knowledge_summary.every((item) => typeof item === "string")) return false;

  // Check exam_mapping is string
  if (typeof o.exam_mapping !== "string") return false;

  // Check mock_questions is array
  if (!Array.isArray(o.mock_questions)) return false;
  if (!o.mock_questions.every(isValidMockQuestion)) return false;

  // Check readiness_signal is valid
  const validSignals: ReadinessSignal[] = [
    "Ready to progress",
    "One more practice round recommended",
    "Specific topic review recommended",
  ];
  if (!validSignals.includes(o.readiness_signal as ReadinessSignal)) return false;

  return true;
}

/**
 * Validate mock question structure
 */
function isValidMockQuestion(obj: unknown): boolean {
  if (typeof obj !== "object" || obj === null) return false;

  const q = obj as Record<string, unknown>;

  if (typeof q.question !== "string") return false;
  if (typeof q.marks !== "number") return false;
  if (typeof q.command_word !== "string") return false;
  if (typeof q.topic !== "string") return false;

  return true;
}

/**
 * Build fallback output when generation fails
 * Conservative - always recommends more practice
 */
function buildFallbackOutput(input: CompletionInput): CompletionOutput {
  const secureTopics = input.revision_progress
    .filter((p) => p.understanding_state === "secure")
    .map((p) => {
      const summary = input.evaluation_summary.find(
        (s) => s.topic_id === p.topic_id
      );
      return summary?.topic_name || "Completed topic";
    });

  return {
    knowledge_summary:
      secureTopics.length > 0
        ? secureTopics.map((topic) => `Understanding demonstrated in: ${topic}`)
        : ["Revision session completed"],
    exam_mapping:
      "These topics typically appear as short answer and extended response questions in GCSE examinations. Question formats vary by exam board.",
    mock_questions: generateFallbackQuestions(input),
    readiness_signal: "One more practice round recommended",
  };
}

/**
 * Generate fallback mock questions when LLM fails
 */
function generateFallbackQuestions(input: CompletionInput): MockQuestion[] {
  const questions: MockQuestion[] = [];

  input.completed_topics.slice(0, 5).forEach((topic) => {
    questions.push({
      question: `Define the key terms related to ${topic}. [2 marks]`,
      marks: 2,
      command_word: "Define",
      topic: topic,
    });

    questions.push({
      question: `Explain one application of ${topic} in a real-world context. [4 marks]`,
      marks: 4,
      command_word: "Explain",
      topic: topic,
    });
  });

  return questions.slice(0, 10);
}

/**
 * Helper to generate mock questions separately (for testing)
 */
export function generateMockQuestions(
  topics: string[],
  subjectName: string
): MockQuestion[] {
  // This is a simplified version for fallback/testing
  // The main agent generates better questions via LLM
  const commandWords = ["Calculate", "Explain", "Describe", "Compare", "State", "Define"];
  const questions: MockQuestion[] = [];

  topics.forEach((topic) => {
    const command = commandWords[Math.floor(Math.random() * commandWords.length)];
    const marks = Math.floor(Math.random() * 4) + 2; // 2-5 marks

    questions.push({
      question: `${command} the key aspects of ${topic} in ${subjectName}. [${marks} marks]`,
      marks,
      command_word: command,
      topic,
    });
  });

  return questions.slice(0, 10);
}

/**
 * Detect if user is requesting completion review
 */
export function isCompletionRequest(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim();

  const completionPatterns = [
    /finish\s*(and\s*)?(test|check|exam)\s*me/,
    /test\s*me\s*(now|please)?/,
    /ready\s*(for|to)\s*(test|exam)/,
    /check\s*my\s*(progress|knowledge|understanding)/,
    /am\s*i\s*ready/,
    /i('m| am)\s*(done|finished|ready)/,
    /give\s*me\s*(a\s*)?(test|exam|questions)/,
    /mock\s*(exam|test|questions)/,
  ];

  return completionPatterns.some((pattern) => pattern.test(lowerMessage));
}
