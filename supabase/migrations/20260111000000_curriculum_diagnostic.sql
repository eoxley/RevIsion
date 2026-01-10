-- Curriculum Diagnostic Phase
-- Adds mandatory diagnostic before revision can begin
-- No session may enter knowledge_ingestion until curriculum_position_confirmed = true

-- ═══════════════════════════════════════════════════════════════════════════════
-- ADD CURRICULUM DIAGNOSTIC COLUMNS
-- ═══════════════════════════════════════════════════════════════════════════════

-- Add curriculum position confirmation flag (CRITICAL GATE)
ALTER TABLE public.revision_session_state
ADD COLUMN IF NOT EXISTS curriculum_position_confirmed boolean DEFAULT false NOT NULL;

-- Add diagnostic question counter
ALTER TABLE public.revision_session_state
ADD COLUMN IF NOT EXISTS diagnostic_questions_asked integer DEFAULT 0 NOT NULL;

-- ═══════════════════════════════════════════════════════════════════════════════
-- UPDATE PHASE CONSTRAINT TO INCLUDE curriculum_diagnostic
-- ═══════════════════════════════════════════════════════════════════════════════

-- Drop old constraint
ALTER TABLE public.revision_session_state
DROP CONSTRAINT IF EXISTS revision_session_state_phase_check;

-- Add new constraint with curriculum_diagnostic phase
ALTER TABLE public.revision_session_state
ADD CONSTRAINT revision_session_state_phase_check CHECK (phase IN (
  'greeting',
  'topic_selection',
  'curriculum_diagnostic',  -- NEW: Must complete before knowledge_ingestion
  'knowledge_ingestion',
  'active_revision',
  'recall_check',
  'misconception_repair',
  'panic_recovery',
  'session_close'
));

-- ═══════════════════════════════════════════════════════════════════════════════
-- UPDATE ACTION CONSTRAINT TO INCLUDE DIAGNOSTIC_QUESTION
-- ═══════════════════════════════════════════════════════════════════════════════

-- Drop old constraint
ALTER TABLE public.revision_session_state
DROP CONSTRAINT IF EXISTS revision_session_state_last_action_check;

-- Add new constraint with DIAGNOSTIC_QUESTION action
ALTER TABLE public.revision_session_state
ADD CONSTRAINT revision_session_state_last_action_check CHECK (last_action IN (
  'DIAGNOSTIC_QUESTION',  -- NEW: Ask diagnostic question
  'RETRY_WITH_HINT',
  'REPHRASE_SIMPLER',
  'EXTEND_DIFFICULTY',
  'CONFIRM_MASTERY',
  'ADVANCE_TOPIC',
  'RECOVER_CONFIDENCE',
  'INITIAL_QUESTION',
  'AWAIT_RESPONSE',
  NULL
));

-- ═══════════════════════════════════════════════════════════════════════════════
-- INDEX FOR DIAGNOSTIC STATE QUERIES
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_revision_session_state_diagnostic
ON public.revision_session_state(student_id, curriculum_position_confirmed)
WHERE curriculum_position_confirmed = false;

-- ═══════════════════════════════════════════════════════════════════════════════
-- COMMENT
-- ═══════════════════════════════════════════════════════════════════════════════

COMMENT ON COLUMN public.revision_session_state.curriculum_position_confirmed IS
  'CRITICAL GATE: Must be true before knowledge_ingestion phase. Set after diagnostic completes.';

COMMENT ON COLUMN public.revision_session_state.diagnostic_questions_asked IS
  'Counter for diagnostic questions asked. Diagnostic complete when >= 3.';
