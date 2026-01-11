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

import { evaluateAnswer } from "./evaluator";
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
import {
  classifyIntent,
  getIntentGuidance,
  shouldRecordResult,
  type StudentIntent,
} from "./intent-classifier";

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
  // STEP 0: CLASSIFY INTENT (BEFORE VALIDATION)
  // ═══════════════════════════════════════════════════════════
  // This prevents explanations from being marked as wrong answers.
  // Intent classification happens FIRST.

  const intent: StudentIntent = classifyIntent(student_message);
  const intentGuidance = getIntentGuidance(intent);

  // ═══════════════════════════════════════════════════════════
  // STEP 1: EVALUATE THE ANSWER (only for solution intent)
  // ═══════════════════════════════════════════════════════════
  // Only validate if intent is 'solution' AND there's a question.
  // Other intents skip validation entirely.

  if (intentGuidance.shouldValidate && currentState.current_question) {
    // Intent is 'solution' - validate the answer
    evaluation = await evaluateAnswer({
      studentAnswer: student_message,
      currentQuestion: currentState.current_question,
      expectedAnswerHint: currentState.expected_answer_hint,
      topicName: currentState.topic_name,
    });
  } else {
    // Non-solution intent - set appropriate evaluation
    switch (intent) {
      case 'uncertainty':
        evaluation = {
          evaluation: "unknown",
          confidence: "low",
          error_type: "recall_gap",
        };
        break;
      case 'explanation':
        // CRITICAL: Do NOT mark explanations as wrong
        evaluation = {
          evaluation: "unknown",
          confidence: "medium",
          error_type: null,
        };
        break;
      case 'skip':
      case 'question':
      case 'meta':
      default:
        evaluation = {
          evaluation: "unknown",
          confidence: "high",
          error_type: null,
        };
        break;
    }
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

  let decision = determineNextAction(currentState, evaluation);

  // Override action based on classified intent
  switch (intent) {
    case 'skip':
      // Student requested to skip - move to a new question
      decision = {
        action: "INITIAL_QUESTION",
        phase: "knowledge_ingestion",
      };
      // Reset question state for clean slate
      currentState = resetQuestionState(currentState);
      break;

    case 'uncertainty':
      // Student said "I don't know" - provide scaffolding
      decision = {
        action: "REPHRASE_SIMPLER",
        phase: "active_revision",
      };
      break;

    case 'explanation':
      // Student showed working - acknowledge and request final answer
      decision = {
        action: "AWAIT_RESPONSE",
        phase: currentState.phase,
      };
      break;

    case 'question':
      // Student asked a clarifying question - answer and redirect
      decision = {
        action: "AWAIT_RESPONSE",
        phase: currentState.phase,
      };
      break;

    case 'meta':
      // Off-topic - brief acknowledge and redirect
      decision = {
        action: "AWAIT_RESPONSE",
        phase: currentState.phase,
      };
      break;

    case 'solution':
      // Normal flow - use decision from determineNextAction
      break;
  }

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
    studentIntent: intent,
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
 * Reset question-specific state when advancing to a new question
 * This prevents state leakage between questions (CRITICAL)
 */
function resetQuestionState(state: RevisionSessionState): RevisionSessionState {
  return {
    ...state,
    // Clear question-specific state
    current_question: null,
    expected_answer_hint: null,
    attempts: 0,
    // Preserve session-level state
    // diagnostic_questions_asked, correct_streak, etc. are NOT reset
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
