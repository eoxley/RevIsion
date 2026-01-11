/**
 * Revision Session Controller (RSC) Type Definitions
 *
 * The controller decides WHAT happens next.
 * The LLM decides HOW it is said.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// ACTION TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type ActionType =
  | "DIAGNOSTIC_QUESTION"
  | "RETRY_WITH_HINT"
  | "REPHRASE_SIMPLER"
  | "EXTEND_DIFFICULTY"
  | "CONFIRM_MASTERY"
  | "ADVANCE_TOPIC"
  | "RECOVER_CONFIDENCE"
  | "INITIAL_QUESTION"
  | "AWAIT_RESPONSE"
  | "RUN_COMPLETION_REVIEW";

// ═══════════════════════════════════════════════════════════════════════════════
// AGENT PHASES
// ═══════════════════════════════════════════════════════════════════════════════

export type AgentPhase =
  | "greeting"
  | "topic_selection"
  | "curriculum_diagnostic"
  | "knowledge_ingestion"
  | "active_revision"
  | "recall_check"
  | "misconception_repair"
  | "panic_recovery"
  | "completion_review"
  | "session_close";

// ═══════════════════════════════════════════════════════════════════════════════
// EVALUATION TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type EvaluationResult = "correct" | "partial" | "incorrect" | "unknown";
export type EvaluationConfidence = "high" | "medium" | "low";
export type ErrorType =
  | "recall_gap"      // Missing facts or definitions
  | "concept_gap"     // Misunderstanding the idea
  | "confusion"       // Mixing concepts
  | "exam_technique"  // Poor structure, vague wording
  | "guessing"        // Clearly uncertain or speculative
  | null;             // No error (correct answers)

export interface Evaluation {
  evaluation: EvaluationResult;
  confidence: EvaluationConfidence;
  error_type: ErrorType;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SESSION STATE
// ═══════════════════════════════════════════════════════════════════════════════

export interface RevisionSessionState {
  session_id: string;
  student_id: string;
  topic_id: string | null;
  topic_name: string | null;

  attempts: number;
  correct_streak: number;
  last_evaluation: EvaluationResult | null;

  last_action: ActionType | null;
  phase: AgentPhase;

  current_question: string | null;
  expected_answer_hint: string | null;

  // Curriculum diagnostic state
  curriculum_position_confirmed: boolean;
  diagnostic_questions_asked: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTROLLER INPUT/OUTPUT
// ═══════════════════════════════════════════════════════════════════════════════

export interface ControllerInput {
  student_message: string;
  session_id: string;
  current_topic_id: string | null;
  current_topic_name: string | null;
  agent_phase: AgentPhase;
  session_state: RevisionSessionState;
  message_history: Array<{ role: "user" | "assistant"; content: string }>;
  learning_style: LearningStyle | null;
  subject_code: string | null;
  subject_name: string | null;
}

export interface ControllerOutput {
  next_action: ActionType;
  llm_instructions: string;
  updated_state: RevisionSessionState;
  updated_phase: AgentPhase;
  evaluation: Evaluation | null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEARNING STYLE (from existing system)
// ═══════════════════════════════════════════════════════════════════════════════

export interface LearningStyle {
  visual: number;
  auditory: number;
  readWrite: number;
  kinesthetic: number;
  primaryStyles: string[];
  isMultimodal: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TOPIC CONTEXT
// ═══════════════════════════════════════════════════════════════════════════════

export interface TopicContext {
  topic_id: string;
  topic_name: string;
  subject_code: string;
  difficulty_level: number;
  prerequisites: string[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// REVISION PROGRESS
// ═══════════════════════════════════════════════════════════════════════════════

export type UnderstandingState = "building" | "strengthening" | "secure";

export interface RevisionProgress {
  id?: string;
  student_id: string;
  session_id: string;
  subject_id: string | null;
  topic_id: string | null;

  attempts: number;
  correct_count: number;
  incorrect_count: number;
  partial_count: number;
  last_evaluation: EvaluationResult | null;
  understanding_state: UnderstandingState;

  delivery_modes_used: string[];

  created_at?: string;
  last_interaction_at?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPLETION AGENT TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface EvaluationSummary {
  topic_id: string;
  topic_name: string;
  total_attempts: number;
  correct_count: number;
  error_types: ErrorType[];
}

export interface CompletionInput {
  student_id: string;
  session_id: string;
  subject_id: string;
  subject_name: string;
  exam_board?: string;
  completed_topics: string[];
  revision_progress: RevisionProgress[];
  evaluation_summary: EvaluationSummary[];
}

export interface MockQuestion {
  question: string;
  marks: number;
  command_word: string;
  topic: string;
}

export type ReadinessSignal =
  | "Ready to progress"
  | "One more practice round recommended"
  | "Specific topic review recommended";

export interface CompletionOutput {
  knowledge_summary: string[];
  exam_mapping: string;
  mock_questions: MockQuestion[];
  readiness_signal: ReadinessSignal;
}
