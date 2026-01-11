-- Add completion_review phase to revision_session_state
-- This phase is triggered when:
-- 1. All topics in module have understanding_state = 'secure' (automatic)
-- 2. User explicitly requests completion ("FINISH_AND_TEST_ME")

-- Update the phase check constraint to include completion_review
ALTER TABLE public.revision_session_state
DROP CONSTRAINT IF EXISTS revision_session_state_phase_check;

ALTER TABLE public.revision_session_state
ADD CONSTRAINT revision_session_state_phase_check
CHECK (phase IN (
  'greeting',
  'topic_selection',
  'curriculum_diagnostic',
  'knowledge_ingestion',
  'active_revision',
  'recall_check',
  'misconception_repair',
  'panic_recovery',
  'completion_review',
  'session_close'
));

-- Update the last_action check constraint to include RUN_COMPLETION_REVIEW
ALTER TABLE public.revision_session_state
DROP CONSTRAINT IF EXISTS revision_session_state_last_action_check;

ALTER TABLE public.revision_session_state
ADD CONSTRAINT revision_session_state_last_action_check
CHECK (last_action IS NULL OR last_action IN (
  'DIAGNOSTIC_QUESTION',
  'RETRY_WITH_HINT',
  'REPHRASE_SIMPLER',
  'EXTEND_DIFFICULTY',
  'CONFIRM_MASTERY',
  'ADVANCE_TOPIC',
  'RECOVER_CONFIDENCE',
  'INITIAL_QUESTION',
  'AWAIT_RESPONSE',
  'RUN_COMPLETION_REVIEW'
));

-- Add comment documenting the completion_review phase
COMMENT ON COLUMN public.revision_session_state.phase IS
'Current agent phase. completion_review is a read-only phase that generates exam readiness output.';
