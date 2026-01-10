-- Revision Session State Table
-- Tracks the state of active revision sessions for the RSC (Revision Session Controller)

-- ═══════════════════════════════════════════════════════════════════════════════
-- REVISION SESSION STATE
-- ═══════════════════════════════════════════════════════════════════════════════

create table if not exists public.revision_session_state (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references public.learning_sessions on delete cascade not null,
  student_id uuid references auth.users on delete cascade not null,

  -- Current topic
  topic_id uuid,
  topic_name text,

  -- Progress tracking
  attempts integer default 0 not null,
  correct_streak integer default 0 not null,
  last_evaluation text check (last_evaluation in ('correct', 'partial', 'incorrect', 'unknown', null)),

  -- Controller state
  last_action text check (last_action in (
    'RETRY_WITH_HINT', 'REPHRASE_SIMPLER', 'EXTEND_DIFFICULTY',
    'CONFIRM_MASTERY', 'ADVANCE_TOPIC', 'RECOVER_CONFIDENCE',
    'INITIAL_QUESTION', 'AWAIT_RESPONSE', null
  )),
  phase text default 'greeting' not null check (phase in (
    'greeting', 'topic_selection', 'knowledge_ingestion', 'active_revision',
    'recall_check', 'misconception_repair', 'panic_recovery', 'session_close'
  )),

  -- Current question tracking (for evaluation)
  current_question text,
  expected_answer_hint text,

  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- One state per session
  unique (session_id)
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- EVALUATION LOG
-- ═══════════════════════════════════════════════════════════════════════════════
-- Tracks evaluations for analytics and debugging

create table if not exists public.evaluation_log (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references public.learning_sessions on delete cascade not null,
  message_id uuid references public.session_messages on delete cascade,

  -- Evaluation result
  evaluation text not null check (evaluation in ('correct', 'partial', 'incorrect', 'unknown')),
  confidence text not null check (confidence in ('high', 'medium', 'low')),
  error_type text check (error_type in (
    'concept_gap', 'calculation_error', 'terminology_confusion',
    'incomplete_answer', 'off_topic', 'none'
  )),

  -- Context
  topic_id uuid,
  topic_name text,
  question_asked text,
  student_answer text,

  -- Action taken
  action_taken text,

  -- Timestamp
  evaluated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- TOPIC MASTERY STATE
-- ═══════════════════════════════════════════════════════════════════════════════
-- Persistent topic-level progress (survives session boundaries)

create table if not exists public.topic_mastery (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references auth.users on delete cascade not null,
  subject_id uuid references public.subjects on delete cascade not null,

  -- Topic identification
  topic_id text not null,  -- Curriculum topic code
  topic_name text not null,

  -- Mastery state
  understanding_state text default 'not_started' not null check (understanding_state in (
    'not_started', 'building', 'strengthening', 'secure'
  )),

  -- Statistics
  total_attempts integer default 0 not null,
  total_correct integer default 0 not null,
  consecutive_correct integer default 0 not null,

  -- Timing
  first_attempt_at timestamp with time zone,
  last_attempt_at timestamp with time zone,
  last_correct_at timestamp with time zone,
  mastery_achieved_at timestamp with time zone,

  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- One mastery record per student per topic
  unique (student_id, subject_id, topic_id)
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════════════════════════

create index if not exists idx_revision_session_state_session on public.revision_session_state(session_id);
create index if not exists idx_revision_session_state_student on public.revision_session_state(student_id);
create index if not exists idx_evaluation_log_session on public.evaluation_log(session_id);
create index if not exists idx_topic_mastery_student on public.topic_mastery(student_id);
create index if not exists idx_topic_mastery_subject on public.topic_mastery(subject_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════════════════════

alter table public.revision_session_state enable row level security;
alter table public.evaluation_log enable row level security;
alter table public.topic_mastery enable row level security;

-- Revision Session State: Users can only access their own
create policy "Users can view own session state" on public.revision_session_state
  for select using (auth.uid() = student_id);

create policy "Users can insert own session state" on public.revision_session_state
  for insert with check (auth.uid() = student_id);

create policy "Users can update own session state" on public.revision_session_state
  for update using (auth.uid() = student_id);

-- Evaluation Log: Users can only access their own
create policy "Users can view own evaluations" on public.evaluation_log
  for select using (
    auth.uid() = (select student_id from public.learning_sessions where id = session_id)
  );

create policy "Users can insert own evaluations" on public.evaluation_log
  for insert with check (
    auth.uid() = (select student_id from public.learning_sessions where id = session_id)
  );

-- Topic Mastery: Users can only access their own
create policy "Users can view own topic mastery" on public.topic_mastery
  for select using (auth.uid() = student_id);

create policy "Users can insert own topic mastery" on public.topic_mastery
  for insert with check (auth.uid() = student_id);

create policy "Users can update own topic mastery" on public.topic_mastery
  for update using (auth.uid() = student_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════════════════

-- Auto-update timestamp trigger
create or replace function public.update_revision_state_timestamp()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger update_revision_session_state_timestamp
  before update on public.revision_session_state
  for each row execute procedure public.update_revision_state_timestamp();

create trigger update_topic_mastery_timestamp
  before update on public.topic_mastery
  for each row execute procedure public.update_revision_state_timestamp();
