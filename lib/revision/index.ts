/**
 * Revision Session Controller (RSC)
 *
 * Export all RSC components for external use.
 */

export {
  processRevisionTurn,
  initializeSession,
  getConstrainedSystemPrompt,
  extractQuestionFromResponse,
} from "./controller";

export {
  evaluateAnswer,
  isHelpRequest,
  isSkipRequest,
} from "./evaluator";

export {
  createInitialState,
  updateStateFromEvaluation,
  updateStateWithAction,
  updateStateWithTopic,
  updateStateWithQuestion,
  resetTopicProgress,
  hasDemonstratedMastery,
  isStruggling,
  isFirstAttempt,
} from "./state";

export {
  determineNextAction,
  getPhaseForAction,
  isActionAllowedInPhase,
  shouldAdvanceTopic,
} from "./decision-engine";

export {
  buildLLMInstructions,
  buildConstrainedSystemPrompt,
} from "./instruction-builder";

export type {
  ActionType,
  AgentPhase,
  EvaluationResult,
  EvaluationConfidence,
  ErrorType,
  Evaluation,
  RevisionSessionState,
  ControllerInput,
  ControllerOutput,
  LearningStyle,
  TopicContext,
} from "./types";
