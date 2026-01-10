-- RevIsion Chat Persistence Schema
-- This migration adds tables for persistent chat sessions and messages

-- ═══════════════════════════════════════════════════════════════════════════════
-- SUBJECTS (Reference Data)
-- ═══════════════════════════════════════════════════════════════════════════════

create table public.subjects (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,                      -- e.g., "MATHS", "ENG_LIT"
  name text not null,                             -- e.g., "Mathematics"
  display_name text not null,                     -- e.g., "Maths"
  category text not null check (category in ('core', 'science', 'humanities', 'languages', 'arts', 'other')),
  is_compulsory boolean default false not null,
  typical_paper_count integer default 2 not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Seed common GCSE subjects
insert into public.subjects (code, name, display_name, category, is_compulsory, typical_paper_count) values
  ('MATHS', 'Mathematics', 'Maths', 'core', true, 3),
  ('ENG_LANG', 'English Language', 'English Language', 'core', true, 2),
  ('ENG_LIT', 'English Literature', 'English Literature', 'core', true, 2),
  ('BIOLOGY', 'Biology', 'Biology', 'science', false, 2),
  ('CHEMISTRY', 'Chemistry', 'Chemistry', 'science', false, 2),
  ('PHYSICS', 'Physics', 'Physics', 'science', false, 2),
  ('COMBINED_SCI', 'Combined Science', 'Combined Science', 'science', true, 6),
  ('HISTORY', 'History', 'History', 'humanities', false, 2),
  ('GEOGRAPHY', 'Geography', 'Geography', 'humanities', false, 3),
  ('FRENCH', 'French', 'French', 'languages', false, 4),
  ('SPANISH', 'Spanish', 'Spanish', 'languages', false, 4),
  ('GERMAN', 'German', 'German', 'languages', false, 4),
  ('ART', 'Art and Design', 'Art', 'arts', false, 2),
  ('MUSIC', 'Music', 'Music', 'arts', false, 2),
  ('RE', 'Religious Studies', 'RE', 'humanities', false, 2),
  ('CS', 'Computer Science', 'Computer Science', 'other', false, 2),
  ('PE', 'Physical Education', 'PE', 'other', false, 2),
  ('BUSINESS', 'Business Studies', 'Business', 'other', false, 2);

-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDENT SUBJECTS (Which subjects each student is taking)
-- ═══════════════════════════════════════════════════════════════════════════════

create table public.student_subjects (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references auth.users on delete cascade not null,
  subject_id uuid references public.subjects on delete cascade not null,
  exam_board text check (exam_board in ('AQA', 'Edexcel', 'OCR', 'WJEC', 'Eduqas', 'CCEA', null)),
  target_grade integer check (target_grade between 1 and 9 or target_grade is null),
  priority_level text default 'medium' check (priority_level in ('critical', 'high', 'medium', 'low', 'maintenance')),
  enrolled_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_studied_at timestamp with time zone,
  unique (student_id, subject_id)
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- LEARNING SESSIONS (Chat session tracking)
-- ═══════════════════════════════════════════════════════════════════════════════

create table public.learning_sessions (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references auth.users on delete cascade not null,

  -- Timing
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone,
  duration_minutes integer,

  -- Context
  session_type text default 'freeform' check (session_type in ('onboarding', 'diagnostic', 'learning', 'revision', 'practice', 'review', 'freeform')),
  primary_subject_id uuid references public.subjects,

  -- Agent state
  agent_phase text default 'greeting' check (agent_phase in (
    'greeting', 'onboarding', 'diagnostic', 'plan_creation', 'session_preview',
    'knowledge_ingestion', 'active_revision', 'practice', 'recall_check',
    'misconception_repair', 'session_close', 'panic_recovery'
  )),

  -- Completion
  completion_status text default 'in_progress' check (completion_status in ('completed', 'partial', 'abandoned', 'in_progress')),

  -- Summary (generated at session end)
  session_summary jsonb,

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- SESSION MESSAGES (Individual chat messages - persisted conversation)
-- ═══════════════════════════════════════════════════════════════════════════════

create table public.session_messages (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references public.learning_sessions on delete cascade not null,

  -- Ordering
  sequence_number integer not null,

  -- Message content
  role text not null check (role in ('user', 'assistant')),
  content text not null,

  -- Context (optional)
  topic_context text,          -- What topic was being discussed
  interaction_type text check (interaction_type in (
    'greeting', 'question', 'explanation', 'recall_prompt',
    'assessment', 'feedback', 'encouragement', 'clarification',
    'summary', 'transition', null
  )),

  -- Metadata
  response_time_ms integer,    -- How long the user took to respond

  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════════════════════════

create index idx_subjects_code on public.subjects(code);
create index idx_subjects_category on public.subjects(category);
create index idx_student_subjects_student_id on public.student_subjects(student_id);
create index idx_student_subjects_subject_id on public.student_subjects(subject_id);
create index idx_learning_sessions_student_id on public.learning_sessions(student_id);
create index idx_learning_sessions_started_at on public.learning_sessions(started_at desc);
create index idx_session_messages_session_id on public.session_messages(session_id);
create index idx_session_messages_sequence on public.session_messages(session_id, sequence_number);

-- ═══════════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════════════════════

alter table public.subjects enable row level security;
alter table public.student_subjects enable row level security;
alter table public.learning_sessions enable row level security;
alter table public.session_messages enable row level security;

-- Subjects: Everyone can read
create policy "Subjects are viewable by everyone" on public.subjects
  for select using (true);

-- Student Subjects: Users can only access their own
create policy "Users can view own subjects" on public.student_subjects
  for select using (auth.uid() = student_id);

create policy "Users can insert own subjects" on public.student_subjects
  for insert with check (auth.uid() = student_id);

create policy "Users can update own subjects" on public.student_subjects
  for update using (auth.uid() = student_id);

create policy "Users can delete own subjects" on public.student_subjects
  for delete using (auth.uid() = student_id);

-- Learning Sessions: Users can only access their own
create policy "Users can view own sessions" on public.learning_sessions
  for select using (auth.uid() = student_id);

create policy "Users can insert own sessions" on public.learning_sessions
  for insert with check (auth.uid() = student_id);

create policy "Users can update own sessions" on public.learning_sessions
  for update using (auth.uid() = student_id);

-- Session Messages: Users can only access messages from their own sessions
create policy "Users can view own messages" on public.session_messages
  for select using (
    auth.uid() = (select student_id from public.learning_sessions where id = session_id)
  );

create policy "Users can insert messages to own sessions" on public.session_messages
  for insert with check (
    auth.uid() = (select student_id from public.learning_sessions where id = session_id)
  );

-- ═══════════════════════════════════════════════════════════════════════════════
-- FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════════════════

-- Function to update session timestamp
create or replace function public.update_session_timestamp()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-update session timestamp
create trigger update_learning_session_timestamp
  before update on public.learning_sessions
  for each row execute procedure public.update_session_timestamp();

-- Function to get next message sequence number
create or replace function public.get_next_message_sequence(p_session_id uuid)
returns integer as $$
declare
  next_seq integer;
begin
  select coalesce(max(sequence_number), 0) + 1 into next_seq
  from public.session_messages
  where session_id = p_session_id;
  return next_seq;
end;
$$ language plpgsql;
