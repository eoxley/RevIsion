/**
 * Decision Engine
 *
 * The heart of the Revision Session Controller.
 * Determines the next action based on state.
 *
 * This gives you real adaptive revision.
 */

import type {
  RevisionSessionState,
  ActionType,
  AgentPhase,
  Evaluation,
} from "./types";

interface DecisionResult {
  action: ActionType;
  phase: AgentPhase;
}

interface CompletionTrigger {
  allTopicsSecure: boolean;
  userRequestedCompletion: boolean;
}

/**
 * Determine the next action based on current state and evaluation
 *
 * This is pure logic - no side effects, fully testable.
 *
 * CRITICAL INVARIANT:
 * No session may enter knowledge_ingestion, active_revision, recall_check,
 * or misconception_repair until curriculum_position_confirmed === true.
 *
 * COMPLETION TRIGGER:
 * If all topics are secure OR user explicitly requests completion,
 * transition to completion_review phase.
 */
export function determineNextAction(
  state: RevisionSessionState,
  evaluation: Evaluation | null,
  completionTrigger?: CompletionTrigger
): DecisionResult {
  // ═══════════════════════════════════════════════════════════════════════════
  // COMPLETION REVIEW GATE
  // If all topics secure OR user requested completion, run completion agent
  // ═══════════════════════════════════════════════════════════════════════════

  if (
    state.phase !== "completion_review" &&
    state.phase !== "session_close" &&
    completionTrigger &&
    shouldTriggerCompletion(completionTrigger.allTopicsSecure, completionTrigger.userRequestedCompletion)
  ) {
    return {
      action: "RUN_COMPLETION_REVIEW",
      phase: "completion_review",
    };
  }
  // ═══════════════════════════════════════════════════════════════════════════
  // CURRICULUM DIAGNOSTIC GATE (MANDATORY)
  // Subject selection ≠ ready to revise
  // ═══════════════════════════════════════════════════════════════════════════

  // If curriculum position is NOT confirmed, we MUST run diagnostic first
  if (!state.curriculum_position_confirmed) {
    // Check if diagnostic is complete (3+ questions asked)
    if (state.diagnostic_questions_asked >= 3) {
      // Diagnostic complete - allow progression to teaching
      // The caller will set curriculum_position_confirmed = true
      return {
        action: "INITIAL_QUESTION",
        phase: "knowledge_ingestion",
      };
    }

    // Diagnostic NOT complete - ask another diagnostic question
    // This blocks ALL teaching phases
    return {
      action: "DIAGNOSTIC_QUESTION",
      phase: "curriculum_diagnostic",
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // NORMAL REVISION FLOW (only after diagnostic confirmed)
  // ═══════════════════════════════════════════════════════════════════════════

  // Handle greeting/topic_selection for confirmed sessions (resume scenario)
  if (state.phase === "greeting" || state.phase === "topic_selection") {
    return {
      action: "INITIAL_QUESTION",
      phase: "knowledge_ingestion",
    };
  }

  // No evaluation means we're waiting for a response or handling meta-request
  if (!evaluation || evaluation.evaluation === "unknown") {
    return handleUnknownEvaluation(state);
  }

  // Main decision logic based on evaluation result
  switch (evaluation.evaluation) {
    case "correct":
      return handleCorrectAnswer(state);

    case "partial":
      return handlePartialAnswer(state, evaluation);

    case "incorrect":
      return handleIncorrectAnswer(state, evaluation);

    default:
      return {
        action: "AWAIT_RESPONSE",
        phase: state.phase,
      };
  }
}

/**
 * Handle correct answers
 */
function handleCorrectAnswer(state: RevisionSessionState): DecisionResult {
  // Check for mastery (2+ correct in a row)
  if (state.correct_streak >= 2) {
    return {
      action: "CONFIRM_MASTERY",
      phase: "recall_check",
    };
  }

  // Not yet mastery - extend difficulty
  return {
    action: "EXTEND_DIFFICULTY",
    phase: "active_revision",
  };
}

/**
 * Handle partial answers
 * Uses error_type for smarter decisions
 */
function handlePartialAnswer(
  state: RevisionSessionState,
  evaluation: Evaluation
): DecisionResult {
  // Use error type to decide approach
  switch (evaluation.error_type) {
    case "exam_technique":
      // Structure issue - retry with same content, focus on technique
      return {
        action: "RETRY_WITH_HINT",
        phase: "active_revision",
      };

    case "recall_gap":
      // Missing facts - rephrase simpler to fill gap
      return {
        action: "REPHRASE_SIMPLER",
        phase: "active_revision",
      };

    case "confusion":
      // Mixing concepts - needs clearer explanation
      return {
        action: "REPHRASE_SIMPLER",
        phase: "misconception_repair",
      };

    default:
      // Default: rephrase simpler
      return {
        action: "REPHRASE_SIMPLER",
        phase: "active_revision",
      };
  }
}

/**
 * Handle incorrect answers
 * Uses error_type for targeted intervention
 */
function handleIncorrectAnswer(
  state: RevisionSessionState,
  evaluation: Evaluation
): DecisionResult {
  // Multiple failures - student needs confidence recovery
  if (state.attempts >= 3) {
    return {
      action: "RECOVER_CONFIDENCE",
      phase: "panic_recovery",
    };
  }

  // Use error type for targeted help
  switch (evaluation.error_type) {
    case "guessing":
      // Student is lost - need to build from basics
      if (state.attempts >= 2) {
        return {
          action: "RECOVER_CONFIDENCE",
          phase: "panic_recovery",
        };
      }
      return {
        action: "REPHRASE_SIMPLER",
        phase: "active_revision",
      };

    case "concept_gap":
      // Fundamental misunderstanding - needs repair
      return {
        action: "REPHRASE_SIMPLER",
        phase: "misconception_repair",
      };

    case "confusion":
      // Mixing things up - clarify distinction
      return {
        action: "REPHRASE_SIMPLER",
        phase: "misconception_repair",
      };

    case "recall_gap":
    case "exam_technique":
    default:
      // Can likely get it with a hint
      return {
        action: "RETRY_WITH_HINT",
        phase: "active_revision",
      };
  }
}

/**
 * Handle unknown evaluation (meta-requests, non-answers)
 */
function handleUnknownEvaluation(state: RevisionSessionState): DecisionResult {
  // If no current question, we need to ask one
  if (!state.current_question) {
    return {
      action: "INITIAL_QUESTION",
      phase: "knowledge_ingestion",
    };
  }

  // Otherwise, wait for a real answer
  return {
    action: "AWAIT_RESPONSE",
    phase: state.phase,
  };
}

/**
 * Determine phase transition based on action
 *
 * The LLM cannot override phase - this is enforced.
 */
export function getPhaseForAction(
  action: ActionType,
  currentPhase: AgentPhase
): AgentPhase {
  switch (action) {
    case "DIAGNOSTIC_QUESTION":
      return "curriculum_diagnostic";

    case "INITIAL_QUESTION":
      return "knowledge_ingestion";

    case "EXTEND_DIFFICULTY":
    case "RETRY_WITH_HINT":
    case "REPHRASE_SIMPLER":
      return "active_revision";

    case "CONFIRM_MASTERY":
      return "recall_check";

    case "ADVANCE_TOPIC":
      return "knowledge_ingestion";

    case "RECOVER_CONFIDENCE":
      return "panic_recovery";

    case "RUN_COMPLETION_REVIEW":
      return "completion_review";

    case "AWAIT_RESPONSE":
      return currentPhase;

    default:
      return currentPhase;
  }
}

/**
 * Check if action is allowed in current phase
 *
 * Enforcement: prevents invalid state transitions
 */
export function isActionAllowedInPhase(
  action: ActionType,
  phase: AgentPhase
): boolean {
  const allowedActions: Record<AgentPhase, ActionType[]> = {
    greeting: ["DIAGNOSTIC_QUESTION", "INITIAL_QUESTION", "RUN_COMPLETION_REVIEW"],
    topic_selection: ["DIAGNOSTIC_QUESTION", "INITIAL_QUESTION", "RUN_COMPLETION_REVIEW"],
    curriculum_diagnostic: ["DIAGNOSTIC_QUESTION", "INITIAL_QUESTION", "AWAIT_RESPONSE", "RUN_COMPLETION_REVIEW"],
    knowledge_ingestion: ["INITIAL_QUESTION", "AWAIT_RESPONSE", "RUN_COMPLETION_REVIEW"],
    active_revision: [
      "EXTEND_DIFFICULTY",
      "RETRY_WITH_HINT",
      "REPHRASE_SIMPLER",
      "CONFIRM_MASTERY",
      "RECOVER_CONFIDENCE",
      "AWAIT_RESPONSE",
      "RUN_COMPLETION_REVIEW",
    ],
    recall_check: ["CONFIRM_MASTERY", "ADVANCE_TOPIC", "AWAIT_RESPONSE", "RUN_COMPLETION_REVIEW"],
    misconception_repair: ["REPHRASE_SIMPLER", "RETRY_WITH_HINT", "AWAIT_RESPONSE", "RUN_COMPLETION_REVIEW"],
    panic_recovery: ["RECOVER_CONFIDENCE", "REPHRASE_SIMPLER", "AWAIT_RESPONSE", "RUN_COMPLETION_REVIEW"],
    completion_review: ["RUN_COMPLETION_REVIEW"],
    session_close: [],
  };

  return allowedActions[phase]?.includes(action) ?? false;
}

/**
 * Determine if topic should advance
 */
export function shouldAdvanceTopic(state: RevisionSessionState): boolean {
  // Need confirmed mastery (2+ correct streak in recall_check phase)
  return (
    state.phase === "recall_check" &&
    state.correct_streak >= 2 &&
    state.last_evaluation === "correct"
  );
}

/**
 * Determine if completion review should trigger
 *
 * HARD TRIGGERS (non-negotiable):
 * 1. allTopicsSecure === true (automatic)
 * 2. userRequestedCompletion === true (explicit "FINISH_AND_TEST_ME")
 *
 * If neither condition is met, continue revision.
 */
export function shouldTriggerCompletion(
  allTopicsSecure: boolean,
  userRequestedCompletion: boolean
): boolean {
  return allTopicsSecure || userRequestedCompletion;
}
