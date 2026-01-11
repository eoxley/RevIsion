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
  incrementDiagnosticCount,
  confirmCurriculumPosition,
  requiresDiagnostic,
  isDiagnosticComplete,
  transitionToCompletionReview,
  transitionToSessionClose,
} from "./state";

export {
  getDiagnosticQuestions,
  getNextDiagnosticQuestion,
  hasDiagnosticQuestions,
} from "./diagnostic-questions";

export {
  determineNextAction,
  getPhaseForAction,
  isActionAllowedInPhase,
  shouldAdvanceTopic,
  shouldTriggerCompletion,
} from "./decision-engine";

export {
  buildLLMInstructions,
  buildConstrainedSystemPrompt,
} from "./instruction-builder";

export {
  runCombinedAgent,
  responseHasQuestion,
} from "./combined-agent";

export {
  runCompletionAgent,
  generateMockQuestions,
  isCompletionRequest,
} from "./completion-agent";

export {
  getAllowedTechniques,
  buildTechniqueInstructions,
  detectUsedTechniques,
  parseFlashcards,
  deliveryTechniques,
  techniqueBehavior,
} from "./delivery-techniques";

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
  RevisionProgress,
  UnderstandingState,
  CompletionInput,
  CompletionOutput,
  MockQuestion,
  EvaluationSummary,
  ReadinessSignal,
} from "./types";

export type {
  DeliveryTechnique,
  Flashcard,
} from "./delivery-techniques";
