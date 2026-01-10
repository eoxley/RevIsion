/**
 * Session State Management
 *
 * Simple. Deterministic. Testable.
 */

import type {
  RevisionSessionState,
  EvaluationResult,
  AgentPhase,
  ActionType,
} from "./types";

/**
 * Create initial session state
 */
export function createInitialState(
  sessionId: string,
  studentId: string
): RevisionSessionState {
  return {
    session_id: sessionId,
    student_id: studentId,
    topic_id: null,
    topic_name: null,

    attempts: 0,
    correct_streak: 0,
    last_evaluation: null,

    last_action: null,
    phase: "greeting",

    current_question: null,
    expected_answer_hint: null,

    // Curriculum diagnostic - MUST complete before revision
    curriculum_position_confirmed: false,
    diagnostic_questions_asked: 0,
  };
}

/**
 * Update state based on evaluation result
 *
 * This is the ONLY function that modifies state based on evaluation.
 * Simple. Deterministic. Testable.
 */
export function updateStateFromEvaluation(
  state: RevisionSessionState,
  evaluation: EvaluationResult
): RevisionSessionState {
  const newState = { ...state };

  // Always increment attempts when evaluated
  newState.attempts += 1;

  // Update streak based on evaluation
  if (evaluation === "correct") {
    newState.correct_streak += 1;
  } else {
    newState.correct_streak = 0;
  }

  // Store last evaluation
  newState.last_evaluation = evaluation;

  return newState;
}

/**
 * Update state with new action
 */
export function updateStateWithAction(
  state: RevisionSessionState,
  action: ActionType,
  phase: AgentPhase
): RevisionSessionState {
  return {
    ...state,
    last_action: action,
    phase: phase,
  };
}

/**
 * Update state with new topic
 */
export function updateStateWithTopic(
  state: RevisionSessionState,
  topicId: string,
  topicName: string
): RevisionSessionState {
  return {
    ...state,
    topic_id: topicId,
    topic_name: topicName,
    attempts: 0,
    correct_streak: 0,
    last_evaluation: null,
    current_question: null,
    expected_answer_hint: null,
  };
}

/**
 * Update state with current question
 */
export function updateStateWithQuestion(
  state: RevisionSessionState,
  question: string,
  expectedAnswerHint: string | null
): RevisionSessionState {
  return {
    ...state,
    current_question: question,
    expected_answer_hint: expectedAnswerHint,
  };
}

/**
 * Reset topic progress (for when advancing to new topic)
 */
export function resetTopicProgress(
  state: RevisionSessionState
): RevisionSessionState {
  return {
    ...state,
    attempts: 0,
    correct_streak: 0,
    last_evaluation: null,
    current_question: null,
    expected_answer_hint: null,
  };
}

/**
 * Check if student has demonstrated mastery of current topic
 */
export function hasDemonstratedMastery(state: RevisionSessionState): boolean {
  return state.correct_streak >= 2 && state.last_evaluation === "correct";
}

/**
 * Check if student is struggling (multiple incorrect attempts)
 */
export function isStruggling(state: RevisionSessionState): boolean {
  return state.attempts >= 3 && state.correct_streak === 0;
}

/**
 * Check if this is first question on topic
 */
export function isFirstAttempt(state: RevisionSessionState): boolean {
  return state.attempts === 0;
}

/**
 * Increment diagnostic question count
 */
export function incrementDiagnosticCount(
  state: RevisionSessionState
): RevisionSessionState {
  return {
    ...state,
    diagnostic_questions_asked: state.diagnostic_questions_asked + 1,
  };
}

/**
 * Mark curriculum position as confirmed (diagnostic complete)
 */
export function confirmCurriculumPosition(
  state: RevisionSessionState
): RevisionSessionState {
  return {
    ...state,
    curriculum_position_confirmed: true,
    phase: "knowledge_ingestion",
  };
}

/**
 * Check if diagnostic is required
 */
export function requiresDiagnostic(state: RevisionSessionState): boolean {
  return !state.curriculum_position_confirmed;
}

/**
 * Check if diagnostic is complete (asked enough questions)
 */
export function isDiagnosticComplete(state: RevisionSessionState): boolean {
  // Complete after 3 diagnostic questions minimum
  return state.diagnostic_questions_asked >= 3;
}
