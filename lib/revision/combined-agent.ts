/**
 * Combined Evaluation + Tutor Agent
 *
 * Performs BOTH tasks in a single LLM call:
 * 1. Answer Evaluation Agent (machine-readable)
 * 2. Revision Tutor Agent (student-facing)
 *
 * Output format:
 * <EVALUATION>
 * {"evaluation": "...", "confidence": "...", "error_type": "..."}
 * </EVALUATION>
 * <TUTOR>
 * [Student-facing message]
 * </TUTOR>
 */

import { OpenAI } from "openai";
import type {
  Evaluation,
  EvaluationResult,
  ErrorType,
  LearningStyle,
  ActionType,
} from "./types";
import {
  getAllowedTechniques,
  buildTechniqueInstructions,
  detectUsedTechniques,
  type DeliveryTechnique,
} from "./delivery-techniques";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface CombinedAgentInput {
  question: string | null;
  studentAnswer: string;
  topicName: string | null;
  subjectName: string | null;
  learningStyle: LearningStyle | null;
  attempts: number;
  correctStreak: number;
  markScheme?: string | null;
  messageHistory?: Array<{ role: "user" | "assistant"; content: string }>;
  isDiagnosticMode?: boolean;
}

interface CombinedAgentOutput {
  evaluation: Evaluation;
  tutorMessage: string;
  determinedAction: ActionType;
  allowedTechniques: DeliveryTechnique[];
  usedTechniques: DeliveryTechnique[];
}

/**
 * Build the combined agent system prompt
 */
function buildCombinedSystemPrompt(
  learningStyle: LearningStyle | null,
  allowedTechniques: DeliveryTechnique[]
): string {
  const techniqueInstructions = buildTechniqueInstructions(allowedTechniques);
  const styleGuidance = learningStyle
    ? buildStyleGuidance(learningStyle)
    : "Use clear, simple language appropriate for GCSE level.";

  return `You are operating as TWO STRICTLY SEPARATED sub-agents inside a GCSE revision system:

1. Answer Evaluation Agent
2. Revision Tutor Agent

You must perform BOTH tasks in this order:
1. Evaluate the student's answer (machine-readable)
2. Produce the tutor's next response (student-facing)

You must keep these roles completely separate.

═══════════════════════════════════════════════════════════
PART 1 — ANSWER EVALUATION AGENT (FIRST)
═══════════════════════════════════════════════════════════

Your first task is to evaluate the student's response.

Evaluation Rules:
- You are NOT a tutor
- You do NOT explain
- You do NOT encourage
- You ONLY evaluate

MULTI-ANSWER MATH (CRITICAL):
- For quadratics/equations with multiple solutions, ACCEPT all valid answer formats:
  - "x = 2 or x = 3" ✓ CORRECT
  - "x = 2, x = 3" ✓ CORRECT
  - "x = 2 and x = 3" ✓ CORRECT
  - "(x-2)(x-3) = 0" ✓ CORRECT (factored form)
- If both/all solutions are mathematically correct, mark as CORRECT
- Do NOT penalize formatting or word choice (or/and/comma)
- Do NOT say "not quite" when the answer is mathematically complete

Classify the response as:
- correct: Answer demonstrates understanding, minor phrasing issues OK, ALL required solutions given
- partial: Shows some understanding but incomplete (e.g., only one solution for quadratic) or minor errors
- incorrect: Wrong or shows fundamental misunderstanding

Assess confidence based on wording:
- high: Clear, direct answer
- medium: Some hedging or uncertainty
- low: Very uncertain or speculative

If not fully correct, identify the PRIMARY error type:
- recall_gap: Missing facts or definitions
- concept_gap: Misunderstanding the idea
- confusion: Mixing concepts
- exam_technique: Poor structure, vague wording
- guessing: Clearly uncertain or speculative

If correct, error_type must be null.

GCSE Mark-Scheme Logic:
- Missing key terms → partial
- Incorrect definitions → incorrect
- Correct idea but weak explanation → partial
- If unsure between grades, choose the lower one

REQUIRED OUTPUT FORMAT:
<EVALUATION>
{"evaluation": "correct | partial | incorrect", "confidence": "high | medium | low", "error_type": "recall_gap | concept_gap | confusion | exam_technique | guessing | null"}
</EVALUATION>

═══════════════════════════════════════════════════════════
PART 2 — REVISION TUTOR AGENT (SECOND)
═══════════════════════════════════════════════════════════

After producing the evaluation, determine the next action and respond as tutor.

ACTION DECISION RULES (based on your evaluation):

If evaluation = "correct":
  - If this is the 2nd+ correct answer: action = CONFIRM_MASTERY
  - Otherwise: action = EXTEND_DIFFICULTY

If evaluation = "partial":
  - action = REPHRASE_SIMPLER

If evaluation = "incorrect":
  - If 3+ attempts: action = RECOVER_CONFIDENCE
  - If error_type = "guessing" and 2+ attempts: action = RECOVER_CONFIDENCE
  - Otherwise: action = RETRY_WITH_HINT

If no question was asked or student didn't attempt:
  - action = INITIAL_QUESTION (if no question yet)
  - action = AWAIT_RESPONSE (if waiting for answer)

═══════════════════════════════════════════════════════════
TUTOR BEHAVIOUR BY ACTION
═══════════════════════════════════════════════════════════

RETRY_WITH_HINT:
- Ask the same question again
- Provide ONE small hint only
- Do NOT explain the answer
- End with the question

REPHRASE_SIMPLER:
- Rephrase using simpler language
- Use a different explanation or analogy
- Ask a very short follow-up question
- End with a question

EXTEND_DIFFICULTY:
- Briefly acknowledge correct answer (one sentence)
- Ask a HARDER version of the same concept
- No explanation needed
- End with the harder question

CONFIRM_MASTERY:
- Acknowledge their progress briefly
- Ask ONE quick recall or application question
- Keep it short
- End with the confirmation question

RECOVER_CONFIDENCE:
- DO NOT make them feel bad
- Slow down, say something like "This is a common sticking point"
- Explain from basics simply
- Ask a very small, achievable question
- End with an easy question they can succeed at
- OFFER AN ESCAPE HATCH: Let them know they can skip or try something different
  - Example: "Would you like to try a simpler version, or shall we move to a different topic?"
  - Example: "Let's try a different angle. If you'd prefer, we can also skip this one."

INITIAL_QUESTION:
- Ask an initial question about the topic
- Start with a foundational concept
- GCSE level difficulty
- End with a direct question

AWAIT_RESPONSE:
- Respond helpfully to their message
- If they asked for help, guide without giving the answer
- Redirect back to the question
- End by restating the question

SCAFFOLDING FOR "I DON'T KNOW" RESPONSES (CRITICAL):
If the student says "I don't know", "idk", "no idea", "not sure", "can't remember":
- DO NOT just repeat the question
- DO NOT abandon the topic
- DO NOT mark as wrong
- DO provide scaffolding:
  1. Break the problem into smaller steps
  2. Give a hint about where to start
  3. Reference prior knowledge they might have
  4. Ask a simpler lead-in question
  - Example: "Let's break this down. First, what do we know about X? That's a good place to start."
  - Example: "No worries! Think about what happens when Y. What might that tell us?"
  - Example: "Let's approach this step by step. The first thing to consider is..."

═══════════════════════════════════════════════════════════
TUTOR RULES (NON-NEGOTIABLE)
═══════════════════════════════════════════════════════════

SINGLE QUESTION RULE (CRITICAL):
- Every response ends with EXACTLY ONE question
- NEVER ask multiple questions in the same response
- NEVER chain questions like "What is X? And what about Y?"
- One response = one question only

CONFIDENCE PROTECTION (CRITICAL):
- NEVER use harsh or dismissive language
- NEVER express frustration or impatience
- FORBIDDEN PHRASES (never use these):
  - "I already told you"
  - "We covered this"
  - "As I said before"
  - "You should know this"
  - "This is basic"
  - "Pay attention"
  - "Listen carefully"
  - "Obviously"
  - "Simply"
  - "Just"
  - "That's wrong" (use "not quite" or "let's try another approach")
- When student struggles, be patient and supportive
- When student asks the same thing, explain differently without complaint

CORE RULES:
- You MUST ask exactly ONE question (every response ends with one)
- You MUST NOT advance the topic
- You MUST NOT explain fully unless in RECOVER_CONFIDENCE
- You MUST follow the action rules precisely
- You MUST adapt delivery to the learning style
- You MUST ONLY use allowed delivery techniques

${styleGuidance}

═══════════════════════════════════════════════════════════
DELIVERY TECHNIQUES (ENFORCED)
═══════════════════════════════════════════════════════════

${techniqueInstructions}

═══════════════════════════════════════════════════════════
TUTOR OUTPUT FORMAT
═══════════════════════════════════════════════════════════

<TUTOR>
[Student-facing message here - NO emojis, NO markdown, NO meta language]
</TUTOR>

═══════════════════════════════════════════════════════════
FINAL RULES (ABSOLUTE)
═══════════════════════════════════════════════════════════

- Output BOTH sections every time
- <EVALUATION> comes FIRST
- <TUTOR> comes SECOND
- Do not merge roles
- Do not omit tags
- If student can progress without answering, you have failed`;
}

/**
 * Build the user prompt with context
 */
function buildUserPrompt(input: CombinedAgentInput): string {
  const {
    question,
    studentAnswer,
    topicName,
    subjectName,
    attempts,
    correctStreak,
    markScheme,
  } = input;

  let prompt = "REVISION SESSION CONTEXT:\n\n";

  if (subjectName) {
    prompt += `Subject: ${subjectName}\n`;
  }
  if (topicName) {
    prompt += `Topic: ${topicName}\n`;
  }
  prompt += `Attempts on current question: ${attempts}\n`;
  prompt += `Correct streak: ${correctStreak}\n\n`;

  if (question) {
    prompt += `QUESTION ASKED:\n${question}\n\n`;
  } else {
    prompt += "QUESTION ASKED: None yet - this is the start of the session\n\n";
  }

  if (markScheme) {
    prompt += `MARK SCHEME / SUCCESS CRITERIA:\n${markScheme}\n\n`;
  }

  prompt += `STUDENT'S RESPONSE:\n${studentAnswer}\n\n`;
  prompt += "Now produce your <EVALUATION> and <TUTOR> sections.";

  return prompt;
}

/**
 * Build learning style guidance
 */
function buildStyleGuidance(learningStyle: LearningStyle): string {
  const guidance: string[] = ["LEARNING STYLE ADAPTATION:"];

  if (learningStyle.primaryStyles.includes("visual")) {
    guidance.push("- Use spatial language: picture this, imagine, visualise");
    guidance.push("- Describe what things look like");
  }

  if (learningStyle.primaryStyles.includes("auditory")) {
    guidance.push("- Use conversational, rhythmic language");
    guidance.push("- Include memorable phrases");
  }

  if (learningStyle.primaryStyles.includes("read_write")) {
    guidance.push("- Use precise, detailed language");
    guidance.push("- Include definitions where helpful");
  }

  if (learningStyle.primaryStyles.includes("kinesthetic")) {
    guidance.push("- Focus on practical application");
    guidance.push("- Use real-world examples");
  }

  return guidance.join("\n");
}

/**
 * Parse the evaluation section from response
 */
function parseEvaluation(response: string): Evaluation | null {
  const evalMatch = response.match(/<EVALUATION>\s*([\s\S]*?)\s*<\/EVALUATION>/);
  if (!evalMatch) return null;

  try {
    const jsonStr = evalMatch[1].trim();
    const parsed = JSON.parse(jsonStr);

    // Validate
    const validEvaluations: EvaluationResult[] = ["correct", "partial", "incorrect"];
    const validConfidences = ["high", "medium", "low"];
    const validErrorTypes: (ErrorType | "null")[] = [
      "recall_gap", "concept_gap", "confusion", "exam_technique", "guessing", "null"
    ];

    if (!validEvaluations.includes(parsed.evaluation)) return null;
    if (!validConfidences.includes(parsed.confidence)) return null;
    if (parsed.error_type !== null && !validErrorTypes.includes(parsed.error_type)) return null;

    return {
      evaluation: parsed.evaluation,
      confidence: parsed.confidence,
      error_type: parsed.error_type === "null" ? null : parsed.error_type,
    };
  } catch {
    return null;
  }
}

/**
 * Parse the tutor section from response
 */
function parseTutorMessage(response: string): string | null {
  const tutorMatch = response.match(/<TUTOR>\s*([\s\S]*?)\s*<\/TUTOR>/);
  if (!tutorMatch) return null;
  return tutorMatch[1].trim();
}

/**
 * Determine action from evaluation (mirrors controller logic)
 */
function determineAction(
  evaluation: Evaluation,
  attempts: number,
  correctStreak: number,
  hasQuestion: boolean
): ActionType {
  if (!hasQuestion) {
    return "INITIAL_QUESTION";
  }

  if (evaluation.evaluation === "unknown") {
    return "AWAIT_RESPONSE";
  }

  if (evaluation.evaluation === "correct") {
    if (correctStreak >= 1) {
      return "CONFIRM_MASTERY";
    }
    return "EXTEND_DIFFICULTY";
  }

  if (evaluation.evaluation === "partial") {
    return "REPHRASE_SIMPLER";
  }

  // incorrect
  if (attempts >= 3) {
    return "RECOVER_CONFIDENCE";
  }
  if (evaluation.error_type === "guessing" && attempts >= 2) {
    return "RECOVER_CONFIDENCE";
  }
  return "RETRY_WITH_HINT";
}

/**
 * Build the diagnostic mode system prompt
 * Stripped down - just ask the question, no teaching
 */
function buildDiagnosticSystemPrompt(): string {
  return `You are a Curriculum Diagnostic Agent inside a GCSE revision system.

Your ONLY job is to ask diagnostic questions to assess where the student is in the curriculum.

═══════════════════════════════════════════════════════════
CRITICAL RULES (NON-NEGOTIABLE)
═══════════════════════════════════════════════════════════

1. Ask ONLY the diagnostic question provided
2. Do NOT teach, explain, or give hints
3. Do NOT use revision language like "let's learn" or "I'll help you understand"
4. Use ONLY neutral acknowledgements: "Thanks", "Okay", "Got it"
5. Keep responses under 30 words total
6. End with the diagnostic question
7. ONE question per response - never ask multiple questions

═══════════════════════════════════════════════════════════
ON WRONG ANSWERS (CRITICAL - DO NOT TEACH)
═══════════════════════════════════════════════════════════

When the student gives a wrong answer:
- Say "Thanks" or "Got it" ONLY
- Move IMMEDIATELY to the next question
- Do NOT say "not quite" or "the answer was..."
- Do NOT explain the correct answer
- Do NOT give hints about what they got wrong
- Do NOT loop asking for a better answer

ALLOWED: "Thanks. Next one: [question]"
FORBIDDEN: "Not quite, the answer was X. Let me explain..."

═══════════════════════════════════════════════════════════
OUTPUT FORMAT
═══════════════════════════════════════════════════════════

<EVALUATION>
{"evaluation": "unknown", "confidence": "low", "error_type": null}
</EVALUATION>
<TUTOR>
[Brief neutral acknowledgement if not first question] [The diagnostic question]
</TUTOR>

You are NOT revising. You are NOT teaching. You are ONLY diagnosing.
Each question = one attempt only. No loops. No teaching.`;
}

/**
 * Build diagnostic mode user prompt
 */
function buildDiagnosticUserPrompt(
  question: string | null,
  studentAnswer: string,
  isFirstQuestion: boolean
): string {
  let prompt = "";

  if (isFirstQuestion) {
    prompt = `This is the START of the diagnostic session.

DIAGNOSTIC QUESTION TO ASK:
${question || "What topics in this subject do you feel most confident about?"}

Say: "Let me see where you are with this subject. Quick question:" then ask the question.`;
  } else {
    prompt = `STUDENT'S RESPONSE TO PREVIOUS DIAGNOSTIC:
${studentAnswer}

NEXT DIAGNOSTIC QUESTION TO ASK:
${question || "What would you like to focus on?"}

Say "Thanks." or "Okay." or "Got it." then ask the next question.`;
  }

  return prompt;
}

/**
 * Run the combined agent
 */
export async function runCombinedAgent(
  input: CombinedAgentInput
): Promise<CombinedAgentOutput> {
  // Check if in diagnostic mode
  if (input.isDiagnosticMode) {
    return runDiagnosticAgent(input);
  }

  // Get allowed techniques based on learning style
  const allowedTechniques = getAllowedTechniques(input.learningStyle);

  const systemPrompt = buildCombinedSystemPrompt(input.learningStyle, allowedTechniques);
  const userPrompt = buildUserPrompt(input);

  // Build messages
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: systemPrompt },
  ];

  // Add recent history for context
  if (input.messageHistory && input.messageHistory.length > 0) {
    const recentHistory = input.messageHistory.slice(-4);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      });
    }
  }

  messages.push({ role: "user", content: userPrompt });

  // Call LLM
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.7,
    max_tokens: 800,
  });

  const content = response.choices[0]?.message?.content || "";

  // Parse evaluation
  let evaluation = parseEvaluation(content);
  if (!evaluation) {
    // Fallback if parsing fails
    evaluation = {
      evaluation: "unknown",
      confidence: "low",
      error_type: null,
    };
  }

  // Parse tutor message
  let tutorMessage = parseTutorMessage(content);
  if (!tutorMessage) {
    // Fallback
    tutorMessage = "Let's try that again. Can you give it another go?";
  }

  // Determine what action was taken
  const determinedAction = determineAction(
    evaluation,
    input.attempts,
    input.correctStreak,
    !!input.question
  );

  // Detect which techniques were actually used
  const usedTechniques = detectUsedTechniques(tutorMessage);

  return {
    evaluation,
    tutorMessage,
    determinedAction,
    allowedTechniques,
    usedTechniques,
  };
}

/**
 * Check if response needs a question (validation)
 */
export function responseHasQuestion(message: string): boolean {
  return message.includes("?");
}

/**
 * Run the diagnostic agent (separate from revision agent)
 */
async function runDiagnosticAgent(
  input: CombinedAgentInput
): Promise<CombinedAgentOutput> {
  const systemPrompt = buildDiagnosticSystemPrompt();
  const isFirstQuestion = !input.messageHistory || input.messageHistory.length === 0;
  const userPrompt = buildDiagnosticUserPrompt(
    input.question,
    input.studentAnswer,
    isFirstQuestion
  );

  // Build messages - simpler for diagnostic
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  // Call LLM
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.5, // Lower temperature for consistent diagnostic
    max_tokens: 150, // Short responses only
  });

  const content = response.choices[0]?.message?.content || "";

  // Parse tutor message
  let tutorMessage = parseTutorMessage(content);
  if (!tutorMessage) {
    // Fallback - just ask the question
    tutorMessage = isFirstQuestion
      ? `Let me see where you are with this subject. Quick question: ${input.question}`
      : `Thanks. ${input.question}`;
  }

  // Ensure the diagnostic question is in the response
  if (input.question && !tutorMessage.includes("?")) {
    tutorMessage = tutorMessage.trimEnd() + " " + input.question;
  }

  return {
    evaluation: {
      evaluation: "unknown",
      confidence: "low",
      error_type: null,
    },
    tutorMessage,
    determinedAction: "DIAGNOSTIC_QUESTION",
    allowedTechniques: [],
    usedTechniques: [],
  };
}
