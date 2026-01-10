-- Revision Progress Tracking
-- Tracks learning evidence per student × topic × session

CREATE TABLE IF NOT EXISTS public.revision_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id uuid NOT NULL,
  subject_id uuid,
  topic_id uuid,

  -- Progress metrics
  attempts integer NOT NULL DEFAULT 0,
  correct_count integer NOT NULL DEFAULT 0,
  incorrect_count integer NOT NULL DEFAULT 0,
  partial_count integer NOT NULL DEFAULT 0,
  last_evaluation text CHECK (last_evaluation IN ('correct', 'partial', 'incorrect')),
  understanding_state text NOT NULL DEFAULT 'building' CHECK (understanding_state IN ('building', 'strengthening', 'secure')),

  -- Delivery tracking
  delivery_modes_used text[] DEFAULT '{}',

  -- Timestamps
  created_at timestamp with time zone DEFAULT now(),
  last_interaction_at timestamp with time zone DEFAULT now(),

  -- Unique constraint per student + session + topic
  UNIQUE(student_id, session_id, topic_id)
);

-- Index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_revision_progress_student ON public.revision_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_revision_progress_session ON public.revision_progress(session_id);
CREATE INDEX IF NOT EXISTS idx_revision_progress_topic ON public.revision_progress(topic_id);

-- RLS policies
ALTER TABLE public.revision_progress ENABLE ROW LEVEL SECURITY;

-- Students can view their own progress
CREATE POLICY "Users can view own progress"
  ON public.revision_progress FOR SELECT
  USING (auth.uid() = student_id);

-- Students can insert their own progress
CREATE POLICY "Users can insert own progress"
  ON public.revision_progress FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Students can update their own progress
CREATE POLICY "Users can update own progress"
  ON public.revision_progress FOR UPDATE
  USING (auth.uid() = student_id);

-- Add comment
COMMENT ON TABLE public.revision_progress IS 'Tracks revision evidence per student per topic per session - not analytics, learning truth';
