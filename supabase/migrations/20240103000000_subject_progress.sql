-- Subject Progress Tracking
-- Tracks student progress within each subject's curriculum

-- Add progress fields to student_subjects
ALTER TABLE student_subjects
ADD COLUMN IF NOT EXISTS topics_covered INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS topics_total INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS current_topic TEXT,
ADD COLUMN IF NOT EXISTS current_topic_name TEXT,
ADD COLUMN IF NOT EXISTS last_topic_name TEXT,
ADD COLUMN IF NOT EXISTS progress_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS understanding_level TEXT DEFAULT 'not_started' CHECK (understanding_level IN ('not_started', 'building', 'strengthening', 'secure')),
ADD COLUMN IF NOT EXISTS revision_plan JSONB,
ADD COLUMN IF NOT EXISTS next_session_focus TEXT,
ADD COLUMN IF NOT EXISTS streak_days INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_session_at TIMESTAMPTZ;

-- Create topic progress table for granular tracking
CREATE TABLE IF NOT EXISTS topic_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_code TEXT NOT NULL,
  topic_code TEXT NOT NULL,
  topic_name TEXT NOT NULL,
  parent_topic TEXT,
  understanding_state TEXT DEFAULT 'not_started' CHECK (understanding_state IN ('not_started', 'forgotten', 'partial', 'fragile', 'secure')),
  confidence_score INTEGER DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  times_practiced INTEGER DEFAULT 0,
  last_practiced_at TIMESTAMPTZ,
  misconceptions JSONB DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, subject_code, topic_code)
);

-- Create revision plans table
CREATE TABLE IF NOT EXISTS revision_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_code TEXT NOT NULL,
  plan_type TEXT DEFAULT 'ai_generated' CHECK (plan_type IN ('ai_generated', 'custom', 'exam_focused')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  build_topics JSONB DEFAULT '[]',
  strengthen_topics JSONB DEFAULT '[]',
  maintain_topics JSONB DEFAULT '[]',
  current_focus JSONB,
  next_session JSONB,
  total_sessions_planned INTEGER DEFAULT 0,
  sessions_completed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, subject_code)
);

-- Create session continuity table to track where students left off
CREATE TABLE IF NOT EXISTS session_continuity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_code TEXT NOT NULL,
  last_topic TEXT,
  last_topic_name TEXT,
  last_activity TEXT,
  context_summary TEXT,
  resume_prompt TEXT,
  session_id UUID REFERENCES learning_sessions(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, subject_code)
);

-- Enable RLS
ALTER TABLE topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE revision_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_continuity ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own topic progress"
  ON topic_progress FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Users can insert own topic progress"
  ON topic_progress FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Users can update own topic progress"
  ON topic_progress FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Users can view own revision plans"
  ON revision_plans FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Users can insert own revision plans"
  ON revision_plans FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Users can update own revision plans"
  ON revision_plans FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Users can view own session continuity"
  ON session_continuity FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Users can insert own session continuity"
  ON session_continuity FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Users can update own session continuity"
  ON session_continuity FOR UPDATE
  USING (auth.uid() = student_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_topic_progress_student ON topic_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_topic_progress_subject ON topic_progress(subject_code);
CREATE INDEX IF NOT EXISTS idx_revision_plans_student ON revision_plans(student_id);
CREATE INDEX IF NOT EXISTS idx_session_continuity_student ON session_continuity(student_id);

-- Function to update subject progress percentage
CREATE OR REPLACE FUNCTION update_subject_progress()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE student_subjects ss
  SET
    progress_percentage = (
      SELECT COALESCE(
        ROUND(
          (COUNT(*) FILTER (WHERE understanding_state = 'secure')::NUMERIC /
           NULLIF(COUNT(*)::NUMERIC, 0)) * 100
        ),
        0
      )
      FROM topic_progress tp
      WHERE tp.student_id = NEW.student_id
        AND tp.subject_code = NEW.subject_code
    ),
    topics_covered = (
      SELECT COUNT(*) FILTER (WHERE understanding_state IN ('fragile', 'secure'))
      FROM topic_progress tp
      WHERE tp.student_id = NEW.student_id
        AND tp.subject_code = NEW.subject_code
    ),
    updated_at = NOW()
  FROM subjects s
  WHERE ss.student_id = NEW.student_id
    AND s.id = ss.subject_id
    AND s.code = NEW.subject_code;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-update progress
DROP TRIGGER IF EXISTS trigger_update_subject_progress ON topic_progress;
CREATE TRIGGER trigger_update_subject_progress
  AFTER INSERT OR UPDATE ON topic_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_subject_progress();
