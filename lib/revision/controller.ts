/**
 * Revision Session Controller (RSC)
 *
 * The controller decides WHAT happens next.
 * The LLM decides HOW it is said.
 *
 * If the LLM is allowed to decide both, revision collapses.
 *
 * Core Responsibilities (exactly four):
 * 1. Evaluate the student's answer (structured)
 * 2. Update session state
 * 3. Decide the next action
 * 4. Constrain the LLM response
 */

import type {
  ControllerInput,
  ControllerOutput,
  RevisionSessionState,
  Evaluation,
} from "./types";

import { evaluateAnswer, isHelpRequest, isSkipRequest } from "./evaluator";
import {
  updateStateFromEvaluation,
  updateStateWithAction,
  createInitialState,
} from "./state";
import { determineNextAction } from "./decision-engine";
import {
  buildLLMInstructions,
  buildConstrainedSystemPrompt,
} from "./instruction-builder";

/**
 * Main controller function
 *
 * Full flow:
 * Student message
 *    ↓
 * Evaluate answer (JSON)
 *    ↓
 * Update session state
 *    ↓
 * Determine next action
 *    ↓
 * Update agent_phase
 *    ↓
 * Generate constrained LLM instructions
 *    ↓
 * Return output (caller persists)
 */
export async function processRevisionTurn(
  input: ControllerInput
): Promise<ControllerOutput> {
  const {
    student_message,
    session_state,
    learning_style,
    subject_name,
  } = input;

  let currentState = { ...session_state };
  let evaluation: Evaluation | null = null;

  // ═══════════════════════════════════════════════════════════
  // STEP 1: EVALUATE THE ANSWER
  // ═══════════════════════════════════════════════════════════
  // This happens BEFORE response generation.
  // No evaluation = no meaningful response.

  // Check for meta-requests first
  if (isHelpRequest(student_message)) {
    evaluation = {
      evaluation: "unknown",
      confidence: "high",
      error_type: null,
    };
  } else if (isSkipRequest(student_message)) {
    evaluation = {
      evaluation: "unknown",
      confidence: "high",
      error_type: null,
    };
  } else if (currentState.current_question) {
    // Only evaluate if there's a question to evaluate against
    evaluation = await evaluateAnswer({
      studentAnswer: student_message,
      currentQuestion: currentState.current_question,
      expectedAnswerHint: currentState.expected_answer_hint,
      topicName: currentState.topic_name,
    });
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 2: UPDATE SESSION STATE
  // ═══════════════════════════════════════════════════════════
  // Simple. Deterministic. Testable.

  if (evaluation && evaluation.evaluation !== "unknown") {
    currentState = updateStateFromEvaluation(currentState, evaluation.evaluation);
  }

  // ═══════════════════════════════════════════════════════════
  // STEP 3: DETERMINE NEXT ACTION
  // ═══════════════════════════════════════════════════════════
  // This is the heart of the controller.

  const decision = determineNextAction(currentState, evaluation);

  // ═══════════════════════════════════════════════════════════
  // STEP 4: UPDATE AGENT PHASE
  // ═══════════════════════════════════════════════════════════
  // The LLM cannot override phase.

  currentState = updateStateWithAction(
    currentState,
    decision.action,
    decision.phase
  );

  // ═══════════════════════════════════════════════════════════
  // STEP 5: BUILD LLM INSTRUCTIONS
  // ═══════════════════════════════════════════════════════════
  // Tight leash. Explicit instructions, not vague goals.

  const instructions = buildLLMInstructions({
    action: decision.action,
    state: currentState,
    learningStyle: learning_style,
    evaluation,
    subjectName: subject_name,
  });

  // ═══════════════════════════════════════════════════════════
  // RETURN OUTPUT
  // ═══════════════════════════════════════════════════════════
  // Caller is responsible for:
  // - Generating LLM response with these instructions
  // - Persisting state to database
  // - Extracting question from response for next turn

  return {
    next_action: decision.action,
    llm_instructions: instructions,
    updated_state: currentState,
    updated_phase: decision.phase,
    evaluation,
  };
}

/**
 * Initialize a new revision session
 */
export function initializeSession(
  sessionId: string,
  studentId: string,
  topicId: string | null,
  topicName: string | null
): RevisionSessionState {
  const state = createInitialState(sessionId, studentId);

  if (topicId && topicName) {
    return {
      ...state,
      topic_id: topicId,
      topic_name: topicName,
    };
  }

  return state;
}

/**
 * Get constrained system prompt for LLM
 */
export function getConstrainedSystemPrompt(instructions: string): string {
  return buildConstrainedSystemPrompt(instructions);
}

/**
 * Extract the question from an LLM response
 * This is needed to track what question was asked for evaluation
 */
export function extractQuestionFromResponse(response: string): {
  question: string | null;
  answerHint: string | null;
} {
  // Look for question marks to find questions
  const sentences = response.split(/(?<=[.!?])\s+/);
  const questions = sentences.filter((s) => s.trim().endsWith("?"));

  if (questions.length === 0) {
    return { question: null, answerHint: null };
  }

  // Use the last question (usually the one they should answer)
  const question = questions[questions.length - 1].trim();

  return {
    question,
    answerHint: null, // Could be enhanced to extract expected answer patterns
  };
}

// Re-export types for convenience
export type {
  ControllerInput,
  ControllerOutput,
  RevisionSessionState,
  ActionType,
  AgentPhase,
  Evaluation,
  LearningStyle,
} from "./types";
