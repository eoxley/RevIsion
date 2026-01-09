-- RevIsion Database Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  student_id text,
  institution text,
  grade_level text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Questions table
create table public.questions (
  id uuid default uuid_generate_v4() primary key,
  question_number integer not null unique,
  question_text text not null,
  scenario text,
  category text not null check (category in ('learning_preferences', 'study_habits', 'communication', 'problem_solving')),
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Question options table
create table public.question_options (
  id uuid default uuid_generate_v4() primary key,
  question_id uuid references public.questions on delete cascade not null,
  option_label text not null check (option_label in ('A', 'B', 'C', 'D')),
  option_text text not null,
  learning_style text not null check (learning_style in ('visual', 'auditory', 'read_write', 'kinesthetic')),
  weight integer default 1 not null check (weight between 1 and 3),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Assessments table
create table public.assessments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  is_completed boolean default false not null,
  total_questions integer not null
);

-- Assessment responses table
create table public.assessment_responses (
  id uuid default uuid_generate_v4() primary key,
  assessment_id uuid references public.assessments on delete cascade not null,
  question_id uuid references public.questions not null,
  selected_options text[] not null,
  answered_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Results table
create table public.results (
  id uuid default uuid_generate_v4() primary key,
  assessment_id uuid references public.assessments on delete cascade not null unique,
  user_id uuid references auth.users on delete cascade not null,
  visual_score integer not null,
  auditory_score integer not null,
  read_write_score integer not null,
  kinesthetic_score integer not null,
  visual_percentage integer not null,
  auditory_percentage integer not null,
  read_write_percentage integer not null,
  kinesthetic_percentage integer not null,
  primary_styles text[] not null,
  is_multimodal boolean default false not null,
  calculated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Study tips table
create table public.study_tips (
  id uuid default uuid_generate_v4() primary key,
  learning_style text not null check (learning_style in ('visual', 'auditory', 'read_write', 'kinesthetic')),
  category text not null,
  tip_title text not null,
  tip_description text not null,
  priority integer default 1 not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.assessments enable row level security;
alter table public.assessment_responses enable row level security;
alter table public.results enable row level security;
alter table public.study_tips enable row level security;

-- RLS Policies

-- Profiles: Users can only see and update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Questions: Everyone can read questions
create policy "Questions are viewable by everyone" on public.questions
  for select using (true);

-- Question Options: Everyone can read options
create policy "Question options are viewable by everyone" on public.question_options
  for select using (true);

-- Assessments: Users can only access their own assessments
create policy "Users can view own assessments" on public.assessments
  for select using (auth.uid() = user_id);

create policy "Users can insert own assessments" on public.assessments
  for insert with check (auth.uid() = user_id);

create policy "Users can update own assessments" on public.assessments
  for update using (auth.uid() = user_id);

-- Assessment Responses: Users can only access their own responses
create policy "Users can view own responses" on public.assessment_responses
  for select using (
    auth.uid() = (select user_id from public.assessments where id = assessment_id)
  );

create policy "Users can insert own responses" on public.assessment_responses
  for insert with check (
    auth.uid() = (select user_id from public.assessments where id = assessment_id)
  );

-- Results: Users can only view their own results
create policy "Users can view own results" on public.results
  for select using (auth.uid() = user_id);

create policy "Users can insert own results" on public.results
  for insert with check (auth.uid() = user_id);

-- Study Tips: Everyone can read
create policy "Study tips are viewable by everyone" on public.study_tips
  for select using (true);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Indexes for better query performance
create index idx_assessments_user_id on public.assessments(user_id);
create index idx_assessments_is_completed on public.assessments(is_completed);
create index idx_results_user_id on public.results(user_id);
create index idx_assessment_responses_assessment_id on public.assessment_responses(assessment_id);
create index idx_question_options_question_id on public.question_options(question_id);
