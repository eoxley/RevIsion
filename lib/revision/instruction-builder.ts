/**
 * LLM Instruction Builder
 *
 * Generates tight, scoped instructions for the LLM.
 * The controller sends explicit instructions, not vague goals.
 *
 * This is where system prompt discipline pays off.
 */

import type {
  ActionType,
  LearningStyle,
  RevisionSessionState,
  Evaluation,
} from "./types";

interface InstructionParams {
  action: ActionType;
  state: RevisionSessionState;
  learningStyle: LearningStyle | null;
  evaluation: Evaluation | null;
  subjectName: string | null;
}

/**
 * Build LLM instructions based on action
 *
 * These are CONSTRAINTS, not suggestions.
 */
export function buildLLMInstructions(params: InstructionParams): string {
  const { action, state, learningStyle, evaluation, subjectName } = params;

  const baseContext = buildBaseContext(state, learningStyle, subjectName);
  const actionInstructions = getActionInstructions(action, state, evaluation);
  const constraints = buildConstraints(action);
  const styleAdaptations = buildStyleAdaptations(learningStyle);

  return `${baseContext}

═══════════════════════════════════════════════════════════
YOUR INSTRUCTIONS (MANDATORY)
═══════════════════════════════════════════════════════════
${actionInstructions}

═══════════════════════════════════════════════════════════
CONSTRAINTS (DO NOT VIOLATE)
═══════════════════════════════════════════════════════════
${constraints}

${styleAdaptations ? `═══════════════════════════════════════════════════════════
STYLE ADAPTATION
═══════════════════════════════════════════════════════════
${styleAdaptations}` : ""}`;
}

/**
 * Build base context
 */
function buildBaseContext(
  state: RevisionSessionState,
  learningStyle: LearningStyle | null,
  subjectName: string | null
): string {
  const topicInfo = state.topic_name ? `Topic: ${state.topic_name}` : "Topic: To be selected";
  const subjectInfo = subjectName ? `Subject: ${subjectName}` : "";
  const attemptInfo = state.attempts > 0 ? `Attempts on current question: ${state.attempts}` : "";
  const streakInfo = state.correct_streak > 0 ? `Correct streak: ${state.correct_streak}` : "";

  return `You are a GCSE revision tutor. Be encouraging but focused.

${subjectInfo}
${topicInfo}
${attemptInfo}
${streakInfo}

Current phase: ${state.phase}`.trim();
}

/**
 * Get action-specific instructions
 */
function getActionInstructions(
  action: ActionType,
  state: RevisionSessionState,
  evaluation: Evaluation | null
): string {
  switch (action) {
    case "INITIAL_QUESTION":
      return `Ask an initial question about ${state.topic_name || "the topic"}.
Start with a foundational concept to assess understanding.
Make the question clear and specific.
GCSE level difficulty.
MUST end with a direct question.`;

    case "RETRY_WITH_HINT":
      return `The student's answer was incorrect.
Ask the SAME question again.
Provide ONE hint only - do not give away the answer.
The hint should guide thinking, not provide the solution.
Be encouraging - mistakes are normal.
MUST end with the question again.`;

    case "REPHRASE_SIMPLER":
      return `The student's answer was partially correct or showed confusion.
${evaluation?.error_type === "confusion" ? "They seem to be mixing up concepts." : ""}
${evaluation?.error_type === "concept_gap" ? "There may be a gap in understanding." : ""}
${evaluation?.error_type === "recall_gap" ? "They may be missing some key facts." : ""}
Rephrase the concept more simply.
Use an analogy or everyday example.
Then ask a simpler version of the question.
MUST end with a question.`;

    case "EXTEND_DIFFICULTY":
      return `The student answered correctly - well done!
Briefly acknowledge their correct answer (1 sentence).
Now ask a HARDER version of the same concept.
Use exam-style phrasing if appropriate.
Increase complexity slightly.
MUST end with the new question.`;

    case "CONFIRM_MASTERY":
      return `The student has shown consistent understanding (${state.correct_streak} correct in a row).
Acknowledge their excellent progress.
Ask ONE final recall question to confirm mastery.
This should test if they can apply the concept, not just recall it.
MUST end with the confirmation question.`;

    case "ADVANCE_TOPIC":
      return `The student has demonstrated mastery of this topic.
Congratulate them genuinely (1-2 sentences).
Introduce the next topic briefly.
Ask an initial question on the new topic.
MUST end with a question about the new topic.`;

    case "RECOVER_CONFIDENCE":
      return `The student is struggling (${state.attempts} attempts without success).
DO NOT make them feel bad - this is completely normal.
Step back and explain the concept from basics.
Use the simplest possible language.
Use a concrete example or analogy.
Then ask a very simple question to rebuild confidence.
MUST end with an easy question they can succeed at.`;

    case "AWAIT_RESPONSE":
      return `The student sent a message that wasn't an answer attempt.
Respond helpfully to their request.
If they asked for help, provide guidance without giving the answer.
If they're confused, clarify the question.
Then redirect them back to answering.
MUST end by restating the question or asking if they want to try.`;

    default:
      return `Continue the revision session appropriately.
MUST end with a question.`;
  }
}

/**
 * Build constraint list for the LLM
 */
function buildConstraints(action: ActionType): string {
  const baseConstraints = [
    "You MUST end your response with a question for the student to answer",
    "You may NOT introduce a new topic unless instructed",
    "You may NOT give full worked solutions unless in RECOVER_CONFIDENCE mode",
    "You may NOT skip ahead in the curriculum",
    "Keep responses focused and concise (under 200 words)",
  ];

  const actionConstraints: Record<ActionType, string[]> = {
    INITIAL_QUESTION: [
      "Ask only ONE question",
      "Do not provide the answer",
    ],
    RETRY_WITH_HINT: [
      "Give only ONE hint",
      "Do NOT reveal the answer",
      "The hint must make them think, not tell them",
    ],
    REPHRASE_SIMPLER: [
      "Use simpler language than before",
      "Include an analogy or example",
      "The new question must be easier",
    ],
    EXTEND_DIFFICULTY: [
      "Do NOT repeat the same question",
      "The new question must be harder",
      "Keep to the same concept/topic",
    ],
    CONFIRM_MASTERY: [
      "This is an application question, not recall",
      "One question only",
    ],
    ADVANCE_TOPIC: [
      "Brief congratulations only",
      "Focus on the new topic",
    ],
    RECOVER_CONFIDENCE: [
      "No judgement or pressure",
      "Explain basics clearly",
      "The question must be easy enough to succeed",
    ],
    AWAIT_RESPONSE: [
      "Address their specific request",
      "Redirect to the revision task",
    ],
  };

  const specific = actionConstraints[action] || [];

  return [...baseConstraints, ...specific].map((c) => `- ${c}`).join("\n");
}

/**
 * Build learning style adaptations
 */
function buildStyleAdaptations(learningStyle: LearningStyle | null): string {
  if (!learningStyle) return "";

  const adaptations: string[] = [];

  if (learningStyle.primaryStyles.includes("visual")) {
    adaptations.push("Use spatial language: 'picture this', 'imagine', 'visualise'");
    adaptations.push("Describe diagrams or suggest drawing");
  }

  if (learningStyle.primaryStyles.includes("auditory")) {
    adaptations.push("Use conversational, rhythmic language");
    adaptations.push("Include memorable phrases or patterns");
  }

  if (learningStyle.primaryStyles.includes("read_write")) {
    adaptations.push("Use precise, detailed language");
    adaptations.push("Include definitions where helpful");
  }

  if (learningStyle.primaryStyles.includes("kinesthetic")) {
    adaptations.push("Focus on practical application");
    adaptations.push("Use real-world examples");
  }

  return adaptations.map((a) => `- ${a}`).join("\n");
}

/**
 * Build the full system prompt for constrained generation
 */
export function buildConstrainedSystemPrompt(instructions: string): string {
  return `You are revIsion, a GCSE revision tutor.

Your responses are CONTROLLED by a revision session controller.
You must follow the instructions below EXACTLY.

${instructions}

RESPONSE VALIDATION:
Before sending your response, verify:
1. Does it end with a question? (REQUIRED)
2. Does it follow the action instructions? (REQUIRED)
3. Does it violate any constraints? (MUST NOT)

If any validation fails, revise your response.`;
}
