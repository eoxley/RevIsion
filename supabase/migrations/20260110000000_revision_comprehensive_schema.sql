-- ═══════════════════════════════════════════════════════════════════════════════
-- revIsion Platform Comprehensive Schema Migration
-- ═══════════════════════════════════════════════════════════════════════════════
-- This migration adds the full learning platform schema while maintaining
-- backward compatibility with existing VARK assessment tables.
-- ═══════════════════════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════════════════════
-- CUSTOM ENUM TYPES (with IF NOT EXISTS wrapper)
-- ═══════════════════════════════════════════════════════════════════════════════

DO $$ BEGIN
  CREATE TYPE public.student_status AS ENUM ('active', 'inactive', 'suspended');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.gcse_year AS ENUM ('year_10', 'year_11');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.subject_priority AS ENUM ('critical', 'high', 'medium', 'low', 'maintenance');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.learning_style AS ENUM ('visual', 'auditory', 'read_write', 'kinesthetic');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.style_strength AS ENUM ('very_strong', 'strong', 'moderate', 'mild');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.session_length_tolerance AS ENUM ('short_only', 'short_medium', 'medium', 'medium_long', 'long');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.time_of_day AS ENUM ('early_morning', 'morning', 'afternoon', 'evening', 'night');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.session_frequency AS ENUM ('daily', 'most_days', 'several_weekly', 'weekly', 'sporadic');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.confidence_level AS ENUM ('very_low', 'low', 'moderate', 'high', 'very_high');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.confidence_sensitivity AS ENUM ('fragile', 'sensitive', 'stable', 'resilient');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.trend AS ENUM ('declining', 'stable', 'improving');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.anxiety_level AS ENUM ('none_detected', 'mild', 'moderate', 'high', 'severe');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.pressure_sensitivity AS ENUM ('high', 'moderate', 'low');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.panic_threshold AS ENUM ('low', 'moderate', 'high');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.frustration_tolerance AS ENUM ('low', 'moderate', 'high');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.difficulty_response AS ENUM ('avoidance', 'disengagement', 'persistence', 'seeks_help');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.mistake_response AS ENUM ('discouragement', 'neutral', 'growth_oriented');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.emotional_state AS ENUM ('calm', 'focused', 'engaged', 'struggling', 'frustrated', 'anxious', 'overwhelmed', 'disengaged');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.subject_category AS ENUM ('core', 'ebacc', 'humanities', 'arts', 'technology', 'vocational');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.exam_tier AS ENUM ('foundation', 'higher');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.tier_requirement AS ENUM ('foundation_only', 'higher_only', 'both');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.difficulty_level AS ENUM ('foundational', 'standard', 'challenging', 'advanced');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.exam_weight AS ENUM ('always_examined', 'frequently', 'sometimes', 'rarely');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.assessment_type AS ENUM ('recall', 'explanation', 'application', 'analysis', 'evaluation', 'synthesis');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.misconception_prevalence AS ENUM ('very_common', 'common', 'occasional', 'rare');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.understanding_state AS ENUM ('not_understood', 'partially_understood', 'understood_fragile', 'secure');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.confidence_label AS ENUM ('confident', 'unsure', 'dont_remember');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.revision_band AS ENUM ('build', 'strengthen', 'maintain');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.error_pattern_type AS ENUM ('calculation_error', 'conceptual_error', 'procedural_error', 'terminology_confusion', 'application_error', 'interpretation_error');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.plan_status AS ENUM ('draft', 'active', 'paused', 'completed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.flexibility_level AS ENUM ('rigid', 'flexible', 'very_flexible');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.revision_phase AS ENUM ('early_preparation', 'strategic', 'structured', 'intensive', 'final_push', 'exam_period');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.adaptation_reason AS ENUM ('understanding_improved', 'understanding_declined', 'engagement_dropped', 'engagement_increased', 'time_pressure_increased', 'student_requested', 'topic_completed', 'misconception_detected', 'panic_detected');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.adaptation_trigger AS ENUM ('automatic', 'session_end', 'student_request', 'scheduled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.technique_type AS ENUM ('ingestion', 'explanation', 'active_recall', 'spaced_repetition', 'practice', 'self_testing');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.delivery_mode AS ENUM ('audio', 'flashcard', 'guided_recall', 'worked_example', 'interactive_quiz', 'reading', 'printable', 'conversation');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.engagement_level AS ENUM ('passive', 'semi_active', 'active');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.cognitive_load AS ENUM ('low', 'medium', 'high');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.artefact_type AS ENUM ('audio_script', 'audio_file', 'flashcard_set', 'printable_pdf', 'quiz', 'worksheet', 'mind_map_instructions');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.effectiveness_rating AS ENUM ('highly_effective', 'effective', 'neutral', 'less_effective', 'ineffective');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.audio_purpose AS ENUM ('topic_introduction', 'concept_explanation', 'misconception_repair', 'recall_reinforcement', 'exam_technique');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.audio_section_type AS ENUM ('warm_opening', 'big_picture', 'core_explanation', 'memory_anchor', 'recall_prompt', 'exam_connection', 'calm_closing');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.script_status AS ENUM ('draft', 'ready', 'generating_audio', 'complete', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.audio_format AS ENUM ('mp3', 'wav', 'ogg');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.voice_provider AS ENUM ('elevenlabs', 'openai', 'google', 'azure', 'other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.audio_file_status AS ENUM ('generating', 'ready', 'failed', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.flashcard_purpose AS ENUM ('key_facts', 'definitions', 'command_words', 'misconception_repair', 'exam_prep');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.card_difficulty AS ENUM ('easy', 'medium', 'hard');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.session_type AS ENUM ('onboarding', 'diagnostic', 'learning', 'revision', 'practice', 'review', 'freeform');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.session_completion_status AS ENUM ('completed', 'partial', 'abandoned', 'in_progress');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.interaction_type AS ENUM ('greeting', 'question', 'explanation', 'recall_prompt', 'assessment', 'feedback', 'encouragement', 'clarification', 'summary', 'transition');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.state_change_trigger AS ENUM ('initial_assessment', 'session_outcome', 'spaced_review', 'misconception_resolved', 'decay_detected', 'manual_adjustment');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.resolution_status AS ENUM ('active', 'resolving', 'resolved', 'recurring');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.milestone_type AS ENUM ('first_topic_secure', 'subject_milestone', 'misconception_cleared', 'consistency_streak', 'understanding_upgrade', 'technique_mastery', 'confidence_growth');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.agent_phase AS ENUM ('greeting', 'onboarding', 'diagnostic', 'plan_creation', 'session_preview', 'knowledge_ingestion', 'active_revision', 'practice', 'recall_check', 'misconception_repair', 'session_close', 'panic_recovery');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.decision_type AS ENUM ('phase_transition', 'topic_selection', 'technique_selection', 'difficulty_adjustment', 'pace_adjustment', 'encouragement_needed', 'clarification_needed', 'misconception_detected', 'session_end');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.guardrail AS ENUM ('no_full_answers', 'school_safe', 'no_pressure', 'no_judgment', 'gcse_appropriate', 'growth_focused');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.time_pressure_level AS ENUM ('none', 'low', 'moderate', 'high', 'critical');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.panic_indicator_type AS ENUM ('time_anxiety_expressed', 'overwhelm_language', 'avoidance_spike', 'rapid_topic_switching', 'disengagement', 'explicit_panic_statement');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.printable_type AS ENUM ('flashcard_sheet', 'revision_checklist', 'topic_summary', 'formula_sheet', 'timeline', 'mind_map_template', 'practice_questions');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 1: EXTENDED STUDENT PROFILE
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS date_of_birth date;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gcse_year public.gcse_year DEFAULT 'year_11';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS school_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status public.student_status DEFAULT 'active';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS vark_assessment_completed boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS initial_diagnostic_completed boolean DEFAULT false;


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 2: CURRICULUM & KNOWLEDGE MODEL - REFERENCE TABLES
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.subjects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  display_name text NOT NULL,
  category public.subject_category NOT NULL,
  is_compulsory boolean DEFAULT false,
  typical_paper_count integer DEFAULT 2,
  icon text,
  colour text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Add missing columns to existing subjects table if they don't exist
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS icon text;
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS colour text;
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS category public.subject_category;
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS is_compulsory boolean DEFAULT false;
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS typical_paper_count integer DEFAULT 2;

CREATE TABLE IF NOT EXISTS public.exam_boards (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  full_name text NOT NULL,
  exam_year integer NOT NULL,
  exam_start_date date,
  exam_end_date date,
  results_day date,
  past_papers_url text,
  specification_url text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.subject_specifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id uuid REFERENCES public.subjects ON DELETE CASCADE NOT NULL,
  exam_board_id uuid REFERENCES public.exam_boards ON DELETE CASCADE NOT NULL,
  spec_code text NOT NULL,
  spec_name text NOT NULL,
  spec_version text,
  paper_count integer DEFAULT 2,
  total_marks integer,
  exam_duration_minutes integer,
  is_tiered boolean DEFAULT false,
  tiers public.exam_tier[],
  is_current boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(subject_id, exam_board_id)
);

CREATE TABLE IF NOT EXISTS public.topics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id uuid REFERENCES public.subjects ON DELETE CASCADE NOT NULL,
  code text NOT NULL,
  name text NOT NULL,
  display_name text NOT NULL,
  parent_topic_id uuid REFERENCES public.topics ON DELETE SET NULL,
  depth_level integer DEFAULT 0,
  sort_order integer DEFAULT 0,
  tier_requirement public.tier_requirement DEFAULT 'both',
  difficulty_level public.difficulty_level DEFAULT 'standard',
  typical_teaching_hours numeric(4,1),
  exam_weight public.exam_weight DEFAULT 'frequently',
  typical_mark_allocation integer,
  estimated_revision_minutes integer DEFAULT 30,
  prerequisite_topic_ids uuid[],
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(subject_id, code)
);

CREATE TABLE IF NOT EXISTS public.concepts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id uuid REFERENCES public.topics ON DELETE CASCADE NOT NULL,
  code text NOT NULL,
  name text NOT NULL,
  definition text,
  key_points text[],
  prerequisite_concept_ids uuid[],
  related_concept_ids uuid[],
  typical_assessment_types public.assessment_type[],
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(topic_id, code)
);

CREATE TABLE IF NOT EXISTS public.misconceptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  concept_id uuid REFERENCES public.concepts ON DELETE CASCADE NOT NULL,
  misconception_text text NOT NULL,
  correct_understanding text NOT NULL,
  why_it_happens text,
  detection_keywords text[],
  typical_student_response text,
  remediation_approach text,
  helpful_analogy text,
  prevalence public.misconception_prevalence DEFAULT 'common',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.command_words (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  word text NOT NULL UNIQUE,
  meaning text NOT NULL,
  action_checklist text[],
  typical_subjects text[],
  typical_mark_range text,
  example_question text,
  example_answer_structure text,
  common_mistakes text[],
  created_at timestamp with time zone DEFAULT now()
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 3: STUDENT-SUBJECT RELATIONSHIPS
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.student_subjects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  subject_id uuid REFERENCES public.subjects ON DELETE CASCADE NOT NULL,
  exam_board_id uuid REFERENCES public.exam_boards ON DELETE SET NULL,
  target_grade integer CHECK (target_grade BETWEEN 1 AND 9),
  current_estimated_grade integer CHECK (current_estimated_grade BETWEEN 1 AND 9),
  priority_level public.subject_priority DEFAULT 'medium',
  enrolled_at timestamp with time zone DEFAULT now(),
  last_studied_at timestamp with time zone,
  UNIQUE(student_id, subject_id)
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 4: STUDENT PROFILES (VARK, BEHAVIOUR, EMOTIONAL)
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.student_vark_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL UNIQUE,
  visual_score integer NOT NULL CHECK (visual_score BETWEEN 0 AND 100),
  auditory_score integer NOT NULL CHECK (auditory_score BETWEEN 0 AND 100),
  read_write_score integer NOT NULL CHECK (read_write_score BETWEEN 0 AND 100),
  kinesthetic_score integer NOT NULL CHECK (kinesthetic_score BETWEEN 0 AND 100),
  primary_styles public.learning_style[] NOT NULL,
  is_multimodal boolean DEFAULT false,
  dominant_style public.learning_style,
  visual_strength public.style_strength,
  auditory_strength public.style_strength,
  read_write_strength public.style_strength,
  kinesthetic_strength public.style_strength,
  assessed_at timestamp with time zone DEFAULT now(),
  last_recalculated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.student_behaviour_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL UNIQUE,
  preferred_session_length_minutes integer DEFAULT 25,
  session_length_tolerance public.session_length_tolerance DEFAULT 'medium',
  optimal_sessions_per_week integer DEFAULT 5,
  peak_engagement_times public.time_of_day[],
  typical_session_frequency public.session_frequency DEFAULT 'several_weekly',
  consistency_score integer DEFAULT 50 CHECK (consistency_score BETWEEN 0 AND 100),
  avoided_subjects uuid[],
  avoided_topics uuid[],
  avoidance_detected boolean DEFAULT false,
  average_focus_duration_minutes integer DEFAULT 25,
  fatigue_threshold_minutes integer DEFAULT 45,
  last_calculated_at timestamp with time zone DEFAULT now(),
  data_points_count integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.student_emotional_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL UNIQUE,
  baseline_confidence public.confidence_level DEFAULT 'moderate',
  confidence_sensitivity public.confidence_sensitivity DEFAULT 'stable',
  confidence_trend public.trend DEFAULT 'stable',
  exam_anxiety_level public.anxiety_level DEFAULT 'mild',
  time_pressure_sensitivity public.pressure_sensitivity DEFAULT 'moderate',
  panic_threshold public.panic_threshold DEFAULT 'moderate',
  frustration_tolerance public.frustration_tolerance DEFAULT 'moderate',
  response_to_difficulty public.difficulty_response DEFAULT 'persistence',
  response_to_mistakes public.mistake_response DEFAULT 'neutral',
  current_emotional_state public.emotional_state DEFAULT 'calm',
  last_state_update timestamp with time zone DEFAULT now(),
  profile_created_at timestamp with time zone DEFAULT now(),
  last_calculated_at timestamp with time zone DEFAULT now()
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 5: UNDERSTANDING STATE & MENTAL MODEL
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.student_topic_understanding (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  topic_id uuid REFERENCES public.topics ON DELETE CASCADE NOT NULL,
  understanding_state public.understanding_state DEFAULT 'not_understood',
  previous_state public.understanding_state,
  state_changed_at timestamp with time zone,
  self_reported_confidence public.confidence_label,
  assessed_confidence public.confidence_label,
  confidence_trend public.trend DEFAULT 'stable',
  identified_misconception_ids uuid[],
  resolved_misconception_ids uuid[],
  error_pattern_ids uuid[],
  recurring_errors boolean DEFAULT false,
  first_interaction_at timestamp with time zone DEFAULT now(),
  last_interaction_at timestamp with time zone,
  total_interaction_count integer DEFAULT 0,
  successful_recall_count integer DEFAULT 0,
  failed_recall_count integer DEFAULT 0,
  current_revision_band public.revision_band DEFAULT 'build',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(student_id, topic_id)
);

CREATE TABLE IF NOT EXISTS public.student_concept_understanding (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  concept_id uuid REFERENCES public.concepts ON DELETE CASCADE NOT NULL,
  understanding_state public.understanding_state DEFAULT 'not_understood',
  last_assessment_result jsonb,
  assessment_history jsonb DEFAULT '[]'::jsonb,
  first_seen_at timestamp with time zone DEFAULT now(),
  last_assessed_at timestamp with time zone,
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(student_id, concept_id)
);

CREATE TABLE IF NOT EXISTS public.student_error_patterns (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  topic_id uuid REFERENCES public.topics ON DELETE CASCADE NOT NULL,
  concept_id uuid REFERENCES public.concepts ON DELETE SET NULL,
  pattern_type public.error_pattern_type NOT NULL,
  description text NOT NULL,
  example_instances text[],
  occurrence_count integer DEFAULT 1,
  first_observed_at timestamp with time zone DEFAULT now(),
  last_observed_at timestamp with time zone DEFAULT now(),
  is_resolved boolean DEFAULT false,
  resolved_at timestamp with time zone,
  resolution_method text
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 6: REVISION PLAN MODEL
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.revision_plans (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL UNIQUE,
  status public.plan_status DEFAULT 'draft',
  created_at timestamp with time zone DEFAULT now(),
  last_updated_at timestamp with time zone DEFAULT now(),
  last_adaptation_at timestamp with time zone,
  subject_ids uuid[],
  rhythm jsonb DEFAULT '{"typical_session_length_minutes": 25, "target_sessions_per_week": 5, "flexibility_level": "flexible", "preferred_days": null, "avoid_days": null}'::jsonb,
  current_phase public.revision_phase DEFAULT 'early_preparation',
  days_until_exams integer,
  adaptation_count integer DEFAULT 0,
  last_adaptation_reason public.adaptation_reason
);

CREATE TABLE IF NOT EXISTS public.plan_topic_assignments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id uuid REFERENCES public.revision_plans ON DELETE CASCADE NOT NULL,
  topic_id uuid REFERENCES public.topics ON DELETE CASCADE NOT NULL,
  revision_band public.revision_band DEFAULT 'build',
  priority_within_band integer DEFAULT 1,
  assigned_technique_ids uuid[],
  sessions_allocated integer DEFAULT 0,
  sessions_completed integer DEFAULT 0,
  estimated_completion_date date,
  previous_band public.revision_band,
  band_changed_at timestamp with time zone,
  band_change_reason text,
  assigned_at timestamp with time zone DEFAULT now(),
  last_updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(plan_id, topic_id)
);

CREATE TABLE IF NOT EXISTS public.plan_adaptation_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id uuid REFERENCES public.revision_plans ON DELETE CASCADE NOT NULL,
  adapted_at timestamp with time zone DEFAULT now(),
  reason public.adaptation_reason NOT NULL,
  description text,
  changes jsonb DEFAULT '[]'::jsonb,
  triggered_by public.adaptation_trigger DEFAULT 'automatic',
  session_id uuid
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 7: LEARNING TECHNIQUES
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.learning_techniques (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  technique_type public.technique_type NOT NULL,
  delivery_mode public.delivery_mode NOT NULL,
  suitable_learning_styles public.learning_style[],
  suitable_understanding_states public.understanding_state[],
  suitable_revision_bands public.revision_band[],
  typical_duration jsonb DEFAULT '{"min_minutes": 10, "max_minutes": 30, "typical_minutes": 20}'::jsonb,
  engagement_level public.engagement_level DEFAULT 'active',
  cognitive_load public.cognitive_load DEFAULT 'medium',
  can_generate_artefact boolean DEFAULT false,
  artefact_types public.artefact_type[],
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.student_technique_effectiveness (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  technique_id uuid REFERENCES public.learning_techniques ON DELETE CASCADE NOT NULL,
  times_used integer DEFAULT 0,
  total_duration_minutes integer DEFAULT 0,
  completion_rate integer DEFAULT 0 CHECK (completion_rate BETWEEN 0 AND 100),
  engagement_score integer DEFAULT 50 CHECK (engagement_score BETWEEN 0 AND 100),
  understanding_improvement_rate integer DEFAULT 0 CHECK (understanding_improvement_rate BETWEEN 0 AND 100),
  effectiveness_rating public.effectiveness_rating DEFAULT 'neutral',
  first_used_at timestamp with time zone DEFAULT now(),
  last_used_at timestamp with time zone,
  last_calculated_at timestamp with time zone DEFAULT now(),
  UNIQUE(student_id, technique_id)
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 8: AUDIO LEARNING SYSTEM
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.audio_revision_scripts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  topic_id uuid REFERENCES public.topics ON DELETE CASCADE NOT NULL,
  purpose public.audio_purpose NOT NULL,
  revision_phase public.revision_band DEFAULT 'build',
  student_name_used text,
  name_usage_count integer DEFAULT 0,
  script_sections jsonb DEFAULT '[]'::jsonb,
  full_script_text text,
  target_duration_minutes integer DEFAULT 5,
  estimated_duration_minutes integer,
  word_count integer,
  generated_at timestamp with time zone DEFAULT now(),
  generation_model text,
  generation_prompt_version text,
  status public.script_status DEFAULT 'draft',
  reviewed_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.audio_files (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  script_id uuid REFERENCES public.audio_revision_scripts ON DELETE CASCADE NOT NULL,
  file_path text NOT NULL,
  file_size_bytes bigint,
  format public.audio_format DEFAULT 'mp3',
  duration_seconds integer,
  voice_provider public.voice_provider DEFAULT 'elevenlabs',
  voice_id text,
  voice_name text,
  generated_at timestamp with time zone DEFAULT now(),
  generation_cost numeric(10, 4),
  play_count integer DEFAULT 0,
  last_played_at timestamp with time zone,
  status public.audio_file_status DEFAULT 'generating'
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 9: FLASHCARD SYSTEM
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.flashcard_sets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  topic_id uuid REFERENCES public.topics ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  purpose public.flashcard_purpose DEFAULT 'key_facts',
  card_count integer DEFAULT 0,
  is_personalised boolean DEFAULT true,
  targets_misconceptions boolean DEFAULT false,
  generated_at timestamp with time zone DEFAULT now(),
  generation_source text DEFAULT 'ai_generated',
  status text DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived'))
);

CREATE TABLE IF NOT EXISTS public.flashcards (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  set_id uuid REFERENCES public.flashcard_sets ON DELETE CASCADE NOT NULL,
  front_content text NOT NULL,
  back_content text NOT NULL,
  concept_id uuid REFERENCES public.concepts ON DELETE SET NULL,
  difficulty public.card_difficulty DEFAULT 'medium',
  sort_order integer DEFAULT 0,
  ease_factor numeric(4, 2) DEFAULT 2.5,
  interval_days integer DEFAULT 1,
  next_review_date date,
  times_seen integer DEFAULT 0,
  times_correct integer DEFAULT 0,
  times_incorrect integer DEFAULT 0,
  last_seen_at timestamp with time zone,
  status text DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'mastered'))
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 10: SESSION & INTERACTION TRACKING
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.learning_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  started_at timestamp with time zone DEFAULT now(),
  ended_at timestamp with time zone,
  duration_minutes integer,
  session_type public.session_type DEFAULT 'learning',
  primary_subject_id uuid REFERENCES public.subjects ON DELETE SET NULL,
  primary_topic_ids uuid[],
  technique_ids uuid[],
  completion_status public.session_completion_status DEFAULT 'in_progress',
  signals jsonb DEFAULT '{"hesitation_detected": false, "hesitation_count": 0, "fatigue_detected": false, "fatigue_onset_minutes": null, "confidence_signals": [], "frustration_detected": false, "engagement_level": "active", "response_times_ms": []}'::jsonb,
  agent_phase_start public.agent_phase DEFAULT 'greeting',
  agent_phase_end public.agent_phase,
  session_summary jsonb
);

CREATE TABLE IF NOT EXISTS public.session_interactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid REFERENCES public.learning_sessions ON DELETE CASCADE NOT NULL,
  sequence_number integer NOT NULL,
  interaction_type public.interaction_type NOT NULL,
  student_input text,
  agent_response text,
  topic_id uuid REFERENCES public.topics ON DELETE SET NULL,
  concept_id uuid REFERENCES public.concepts ON DELETE SET NULL,
  technique_id uuid REFERENCES public.learning_techniques ON DELETE SET NULL,
  was_assessment boolean DEFAULT false,
  assessment_result text CHECK (assessment_result IN ('correct', 'partial', 'incorrect')),
  response_time_ms integer,
  hesitation_detected boolean DEFAULT false,
  confidence_indicator text CHECK (confidence_indicator IN ('high', 'medium', 'low')),
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone DEFAULT now()
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 11: PROGRESS & GROWTH TRACKING
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.understanding_state_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  topic_id uuid REFERENCES public.topics ON DELETE CASCADE NOT NULL,
  from_state public.understanding_state,
  to_state public.understanding_state NOT NULL,
  session_id uuid REFERENCES public.learning_sessions ON DELETE SET NULL,
  trigger public.state_change_trigger NOT NULL,
  changed_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.misconception_resolution_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  misconception_id uuid REFERENCES public.misconceptions ON DELETE CASCADE NOT NULL,
  detected_at timestamp with time zone DEFAULT now(),
  detected_in_session_id uuid REFERENCES public.learning_sessions ON DELETE SET NULL,
  resolution_status public.resolution_status DEFAULT 'active',
  resolved_at timestamp with time zone,
  resolved_in_session_id uuid REFERENCES public.learning_sessions ON DELETE SET NULL,
  resolution_technique_id uuid REFERENCES public.learning_techniques ON DELETE SET NULL,
  remediation_attempt_count integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.engagement_weekly_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  week_start_date date NOT NULL,
  week_end_date date NOT NULL,
  sessions_count integer DEFAULT 0,
  total_duration_minutes integer DEFAULT 0,
  topics_touched_count integer DEFAULT 0,
  average_session_length_minutes integer DEFAULT 0,
  completion_rate integer DEFAULT 0 CHECK (completion_rate BETWEEN 0 AND 100),
  momentum_score integer DEFAULT 50 CHECK (momentum_score BETWEEN 0 AND 100),
  momentum_trend public.trend DEFAULT 'stable',
  vs_previous_week text CHECK (vs_previous_week IN ('improved', 'stable', 'declined')),
  UNIQUE(student_id, week_start_date)
);

CREATE TABLE IF NOT EXISTS public.growth_milestones (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  milestone_type public.milestone_type NOT NULL,
  description text NOT NULL,
  topic_id uuid REFERENCES public.topics ON DELETE SET NULL,
  subject_id uuid REFERENCES public.subjects ON DELETE SET NULL,
  achieved_at timestamp with time zone DEFAULT now(),
  session_id uuid REFERENCES public.learning_sessions ON DELETE SET NULL,
  surfaced_to_student boolean DEFAULT false,
  surfaced_at timestamp with time zone
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 12: AGENT STATE
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.agent_session_state (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid REFERENCES public.learning_sessions ON DELETE CASCADE NOT NULL UNIQUE,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  current_phase public.agent_phase DEFAULT 'greeting',
  phase_entered_at timestamp with time zone DEFAULT now(),
  current_topic_id uuid REFERENCES public.topics ON DELETE SET NULL,
  current_concept_id uuid REFERENCES public.concepts ON DELETE SET NULL,
  current_technique_id uuid REFERENCES public.learning_techniques ON DELETE SET NULL,
  conversation_context jsonb DEFAULT '{"recent_topics": [], "recent_exchanges": [], "established_facts": [], "pending_questions": [], "session_goals": []}'::jsonb,
  decisions jsonb DEFAULT '[]'::jsonb,
  guardrails_active public.guardrail[] DEFAULT ARRAY['no_full_answers', 'school_safe', 'no_pressure', 'no_judgment', 'gcse_appropriate', 'growth_focused']::public.guardrail[],
  detected_emotional_state public.emotional_state DEFAULT 'calm',
  confidence_level_observed public.confidence_level DEFAULT 'moderate',
  fatigue_level text DEFAULT 'none' CHECK (fatigue_level IN ('none', 'mild', 'moderate', 'high')),
  time_pressure_mode boolean DEFAULT false,
  panic_detected boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  last_updated_at timestamp with time zone DEFAULT now()
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 13: TIME AWARENESS
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.exam_schedules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_year integer NOT NULL UNIQUE,
  exam_period_start date NOT NULL,
  exam_period_end date NOT NULL,
  results_day date NOT NULL,
  early_prep_starts date,
  strategic_starts date,
  structured_starts date,
  intensive_starts date,
  final_push_starts date,
  created_at timestamp with time zone DEFAULT now()
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 14: PRINTABLE RESOURCES
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.printable_resources (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  resource_type public.printable_type NOT NULL,
  topic_id uuid REFERENCES public.topics ON DELETE SET NULL,
  subject_id uuid REFERENCES public.subjects ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  content_data jsonb,
  pdf_path text,
  pdf_generated_at timestamp with time zone,
  is_personalised boolean DEFAULT true,
  includes_student_name boolean DEFAULT true,
  download_count integer DEFAULT 0,
  last_downloaded_at timestamp with time zone,
  status text DEFAULT 'ready' CHECK (status IN ('generating', 'ready', 'failed')),
  created_at timestamp with time zone DEFAULT now()
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY POLICIES
-- ═══════════════════════════════════════════════════════════════════════════════

-- Enable RLS on all new tables
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subject_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.misconceptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.command_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_vark_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_behaviour_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_emotional_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_topic_understanding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_concept_understanding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_error_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revision_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_topic_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_adaptation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_technique_effectiveness ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_revision_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.understanding_state_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.misconception_resolution_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_weekly_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_session_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.printable_resources ENABLE ROW LEVEL SECURITY;

-- Reference data: Everyone can read (DROP IF EXISTS and recreate)
DROP POLICY IF EXISTS "Subjects are viewable by everyone" ON public.subjects;
CREATE POLICY "Subjects are viewable by everyone" ON public.subjects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Exam boards are viewable by everyone" ON public.exam_boards;
CREATE POLICY "Exam boards are viewable by everyone" ON public.exam_boards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Subject specifications are viewable by everyone" ON public.subject_specifications;
CREATE POLICY "Subject specifications are viewable by everyone" ON public.subject_specifications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Topics are viewable by everyone" ON public.topics;
CREATE POLICY "Topics are viewable by everyone" ON public.topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Concepts are viewable by everyone" ON public.concepts;
CREATE POLICY "Concepts are viewable by everyone" ON public.concepts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Misconceptions are viewable by everyone" ON public.misconceptions;
CREATE POLICY "Misconceptions are viewable by everyone" ON public.misconceptions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Command words are viewable by everyone" ON public.command_words;
CREATE POLICY "Command words are viewable by everyone" ON public.command_words FOR SELECT USING (true);

DROP POLICY IF EXISTS "Learning techniques are viewable by everyone" ON public.learning_techniques;
CREATE POLICY "Learning techniques are viewable by everyone" ON public.learning_techniques FOR SELECT USING (true);

DROP POLICY IF EXISTS "Exam schedules are viewable by everyone" ON public.exam_schedules;
CREATE POLICY "Exam schedules are viewable by everyone" ON public.exam_schedules FOR SELECT USING (true);

-- Student-owned data policies
DROP POLICY IF EXISTS "Users can view own student_subjects" ON public.student_subjects;
CREATE POLICY "Users can view own student_subjects" ON public.student_subjects FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own student_subjects" ON public.student_subjects;
CREATE POLICY "Users can insert own student_subjects" ON public.student_subjects FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own student_subjects" ON public.student_subjects;
CREATE POLICY "Users can update own student_subjects" ON public.student_subjects FOR UPDATE USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can delete own student_subjects" ON public.student_subjects;
CREATE POLICY "Users can delete own student_subjects" ON public.student_subjects FOR DELETE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own vark_profile" ON public.student_vark_profiles;
CREATE POLICY "Users can view own vark_profile" ON public.student_vark_profiles FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own vark_profile" ON public.student_vark_profiles;
CREATE POLICY "Users can insert own vark_profile" ON public.student_vark_profiles FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own vark_profile" ON public.student_vark_profiles;
CREATE POLICY "Users can update own vark_profile" ON public.student_vark_profiles FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own behaviour_profile" ON public.student_behaviour_profiles;
CREATE POLICY "Users can view own behaviour_profile" ON public.student_behaviour_profiles FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own behaviour_profile" ON public.student_behaviour_profiles;
CREATE POLICY "Users can insert own behaviour_profile" ON public.student_behaviour_profiles FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own behaviour_profile" ON public.student_behaviour_profiles;
CREATE POLICY "Users can update own behaviour_profile" ON public.student_behaviour_profiles FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own emotional_profile" ON public.student_emotional_profiles;
CREATE POLICY "Users can view own emotional_profile" ON public.student_emotional_profiles FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own emotional_profile" ON public.student_emotional_profiles;
CREATE POLICY "Users can insert own emotional_profile" ON public.student_emotional_profiles FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own emotional_profile" ON public.student_emotional_profiles;
CREATE POLICY "Users can update own emotional_profile" ON public.student_emotional_profiles FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own topic_understanding" ON public.student_topic_understanding;
CREATE POLICY "Users can view own topic_understanding" ON public.student_topic_understanding FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own topic_understanding" ON public.student_topic_understanding;
CREATE POLICY "Users can insert own topic_understanding" ON public.student_topic_understanding FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own topic_understanding" ON public.student_topic_understanding;
CREATE POLICY "Users can update own topic_understanding" ON public.student_topic_understanding FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own concept_understanding" ON public.student_concept_understanding;
CREATE POLICY "Users can view own concept_understanding" ON public.student_concept_understanding FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own concept_understanding" ON public.student_concept_understanding;
CREATE POLICY "Users can insert own concept_understanding" ON public.student_concept_understanding FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own concept_understanding" ON public.student_concept_understanding;
CREATE POLICY "Users can update own concept_understanding" ON public.student_concept_understanding FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own error_patterns" ON public.student_error_patterns;
CREATE POLICY "Users can view own error_patterns" ON public.student_error_patterns FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own error_patterns" ON public.student_error_patterns;
CREATE POLICY "Users can insert own error_patterns" ON public.student_error_patterns FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own error_patterns" ON public.student_error_patterns;
CREATE POLICY "Users can update own error_patterns" ON public.student_error_patterns FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own revision_plan" ON public.revision_plans;
CREATE POLICY "Users can view own revision_plan" ON public.revision_plans FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own revision_plan" ON public.revision_plans;
CREATE POLICY "Users can insert own revision_plan" ON public.revision_plans FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own revision_plan" ON public.revision_plans;
CREATE POLICY "Users can update own revision_plan" ON public.revision_plans FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own plan_topic_assignments" ON public.plan_topic_assignments;
CREATE POLICY "Users can view own plan_topic_assignments" ON public.plan_topic_assignments FOR SELECT USING (
  auth.uid() = (SELECT student_id FROM public.revision_plans WHERE id = plan_id)
);
DROP POLICY IF EXISTS "Users can insert own plan_topic_assignments" ON public.plan_topic_assignments;
CREATE POLICY "Users can insert own plan_topic_assignments" ON public.plan_topic_assignments FOR INSERT WITH CHECK (
  auth.uid() = (SELECT student_id FROM public.revision_plans WHERE id = plan_id)
);
DROP POLICY IF EXISTS "Users can update own plan_topic_assignments" ON public.plan_topic_assignments;
CREATE POLICY "Users can update own plan_topic_assignments" ON public.plan_topic_assignments FOR UPDATE USING (
  auth.uid() = (SELECT student_id FROM public.revision_plans WHERE id = plan_id)
);

DROP POLICY IF EXISTS "Users can view own plan_adaptation_logs" ON public.plan_adaptation_logs;
CREATE POLICY "Users can view own plan_adaptation_logs" ON public.plan_adaptation_logs FOR SELECT USING (
  auth.uid() = (SELECT student_id FROM public.revision_plans WHERE id = plan_id)
);
DROP POLICY IF EXISTS "Users can insert own plan_adaptation_logs" ON public.plan_adaptation_logs;
CREATE POLICY "Users can insert own plan_adaptation_logs" ON public.plan_adaptation_logs FOR INSERT WITH CHECK (
  auth.uid() = (SELECT student_id FROM public.revision_plans WHERE id = plan_id)
);

DROP POLICY IF EXISTS "Users can view own technique_effectiveness" ON public.student_technique_effectiveness;
CREATE POLICY "Users can view own technique_effectiveness" ON public.student_technique_effectiveness FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own technique_effectiveness" ON public.student_technique_effectiveness;
CREATE POLICY "Users can insert own technique_effectiveness" ON public.student_technique_effectiveness FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own technique_effectiveness" ON public.student_technique_effectiveness;
CREATE POLICY "Users can update own technique_effectiveness" ON public.student_technique_effectiveness FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own audio_scripts" ON public.audio_revision_scripts;
CREATE POLICY "Users can view own audio_scripts" ON public.audio_revision_scripts FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own audio_scripts" ON public.audio_revision_scripts;
CREATE POLICY "Users can insert own audio_scripts" ON public.audio_revision_scripts FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own audio_scripts" ON public.audio_revision_scripts;
CREATE POLICY "Users can update own audio_scripts" ON public.audio_revision_scripts FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own audio_files" ON public.audio_files;
CREATE POLICY "Users can view own audio_files" ON public.audio_files FOR SELECT USING (
  auth.uid() = (SELECT student_id FROM public.audio_revision_scripts WHERE id = script_id)
);
DROP POLICY IF EXISTS "Users can insert own audio_files" ON public.audio_files;
CREATE POLICY "Users can insert own audio_files" ON public.audio_files FOR INSERT WITH CHECK (
  auth.uid() = (SELECT student_id FROM public.audio_revision_scripts WHERE id = script_id)
);

DROP POLICY IF EXISTS "Users can view own flashcard_sets" ON public.flashcard_sets;
CREATE POLICY "Users can view own flashcard_sets" ON public.flashcard_sets FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own flashcard_sets" ON public.flashcard_sets;
CREATE POLICY "Users can insert own flashcard_sets" ON public.flashcard_sets FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own flashcard_sets" ON public.flashcard_sets;
CREATE POLICY "Users can update own flashcard_sets" ON public.flashcard_sets FOR UPDATE USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can delete own flashcard_sets" ON public.flashcard_sets;
CREATE POLICY "Users can delete own flashcard_sets" ON public.flashcard_sets FOR DELETE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own flashcards" ON public.flashcards;
CREATE POLICY "Users can view own flashcards" ON public.flashcards FOR SELECT USING (
  auth.uid() = (SELECT student_id FROM public.flashcard_sets WHERE id = set_id)
);
DROP POLICY IF EXISTS "Users can insert own flashcards" ON public.flashcards;
CREATE POLICY "Users can insert own flashcards" ON public.flashcards FOR INSERT WITH CHECK (
  auth.uid() = (SELECT student_id FROM public.flashcard_sets WHERE id = set_id)
);
DROP POLICY IF EXISTS "Users can update own flashcards" ON public.flashcards;
CREATE POLICY "Users can update own flashcards" ON public.flashcards FOR UPDATE USING (
  auth.uid() = (SELECT student_id FROM public.flashcard_sets WHERE id = set_id)
);
DROP POLICY IF EXISTS "Users can delete own flashcards" ON public.flashcards;
CREATE POLICY "Users can delete own flashcards" ON public.flashcards FOR DELETE USING (
  auth.uid() = (SELECT student_id FROM public.flashcard_sets WHERE id = set_id)
);

DROP POLICY IF EXISTS "Users can view own learning_sessions" ON public.learning_sessions;
CREATE POLICY "Users can view own learning_sessions" ON public.learning_sessions FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own learning_sessions" ON public.learning_sessions;
CREATE POLICY "Users can insert own learning_sessions" ON public.learning_sessions FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own learning_sessions" ON public.learning_sessions;
CREATE POLICY "Users can update own learning_sessions" ON public.learning_sessions FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own session_interactions" ON public.session_interactions;
CREATE POLICY "Users can view own session_interactions" ON public.session_interactions FOR SELECT USING (
  auth.uid() = (SELECT student_id FROM public.learning_sessions WHERE id = session_id)
);
DROP POLICY IF EXISTS "Users can insert own session_interactions" ON public.session_interactions;
CREATE POLICY "Users can insert own session_interactions" ON public.session_interactions FOR INSERT WITH CHECK (
  auth.uid() = (SELECT student_id FROM public.learning_sessions WHERE id = session_id)
);

DROP POLICY IF EXISTS "Users can view own understanding_history" ON public.understanding_state_history;
CREATE POLICY "Users can view own understanding_history" ON public.understanding_state_history FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own understanding_history" ON public.understanding_state_history;
CREATE POLICY "Users can insert own understanding_history" ON public.understanding_state_history FOR INSERT WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own misconception_logs" ON public.misconception_resolution_logs;
CREATE POLICY "Users can view own misconception_logs" ON public.misconception_resolution_logs FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own misconception_logs" ON public.misconception_resolution_logs;
CREATE POLICY "Users can insert own misconception_logs" ON public.misconception_resolution_logs FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own misconception_logs" ON public.misconception_resolution_logs;
CREATE POLICY "Users can update own misconception_logs" ON public.misconception_resolution_logs FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own engagement_records" ON public.engagement_weekly_records;
CREATE POLICY "Users can view own engagement_records" ON public.engagement_weekly_records FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own engagement_records" ON public.engagement_weekly_records;
CREATE POLICY "Users can insert own engagement_records" ON public.engagement_weekly_records FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own engagement_records" ON public.engagement_weekly_records;
CREATE POLICY "Users can update own engagement_records" ON public.engagement_weekly_records FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own milestones" ON public.growth_milestones;
CREATE POLICY "Users can view own milestones" ON public.growth_milestones FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own milestones" ON public.growth_milestones;
CREATE POLICY "Users can insert own milestones" ON public.growth_milestones FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own milestones" ON public.growth_milestones;
CREATE POLICY "Users can update own milestones" ON public.growth_milestones FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own agent_state" ON public.agent_session_state;
CREATE POLICY "Users can view own agent_state" ON public.agent_session_state FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own agent_state" ON public.agent_session_state;
CREATE POLICY "Users can insert own agent_state" ON public.agent_session_state FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own agent_state" ON public.agent_session_state;
CREATE POLICY "Users can update own agent_state" ON public.agent_session_state FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can view own printable_resources" ON public.printable_resources;
CREATE POLICY "Users can view own printable_resources" ON public.printable_resources FOR SELECT USING (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can insert own printable_resources" ON public.printable_resources;
CREATE POLICY "Users can insert own printable_resources" ON public.printable_resources FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "Users can update own printable_resources" ON public.printable_resources;
CREATE POLICY "Users can update own printable_resources" ON public.printable_resources FOR UPDATE USING (auth.uid() = student_id);


-- ═══════════════════════════════════════════════════════════════════════════════
-- INDEXES FOR QUERY PERFORMANCE
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_student_subjects_student_id ON public.student_subjects(student_id);
CREATE INDEX IF NOT EXISTS idx_student_vark_profiles_student_id ON public.student_vark_profiles(student_id);
CREATE INDEX IF NOT EXISTS idx_student_behaviour_profiles_student_id ON public.student_behaviour_profiles(student_id);
CREATE INDEX IF NOT EXISTS idx_student_emotional_profiles_student_id ON public.student_emotional_profiles(student_id);
CREATE INDEX IF NOT EXISTS idx_student_topic_understanding_student_id ON public.student_topic_understanding(student_id);
CREATE INDEX IF NOT EXISTS idx_student_topic_understanding_state ON public.student_topic_understanding(student_id, understanding_state);
CREATE INDEX IF NOT EXISTS idx_student_topic_understanding_band ON public.student_topic_understanding(student_id, current_revision_band);
CREATE INDEX IF NOT EXISTS idx_student_concept_understanding_student_id ON public.student_concept_understanding(student_id);
CREATE INDEX IF NOT EXISTS idx_revision_plans_student_id ON public.revision_plans(student_id);
CREATE INDEX IF NOT EXISTS idx_plan_topic_assignments_plan_id ON public.plan_topic_assignments(plan_id);
CREATE INDEX IF NOT EXISTS idx_plan_topic_assignments_band ON public.plan_topic_assignments(plan_id, revision_band, priority_within_band);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_student_id ON public.learning_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_started_at ON public.learning_sessions(student_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_session_interactions_session_id ON public.session_interactions(session_id, sequence_number);
CREATE INDEX IF NOT EXISTS idx_understanding_state_history_student_topic ON public.understanding_state_history(student_id, topic_id, changed_at DESC);
CREATE INDEX IF NOT EXISTS idx_engagement_weekly_records_student ON public.engagement_weekly_records(student_id, week_start_date DESC);
CREATE INDEX IF NOT EXISTS idx_flashcard_sets_student_id ON public.flashcard_sets(student_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_set_id ON public.flashcards(set_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_next_review ON public.flashcards(set_id, next_review_date);
CREATE INDEX IF NOT EXISTS idx_audio_scripts_student_id ON public.audio_revision_scripts(student_id);
CREATE INDEX IF NOT EXISTS idx_audio_files_script_id ON public.audio_files(script_id);
CREATE INDEX IF NOT EXISTS idx_topics_subject_id ON public.topics(subject_id);
CREATE INDEX IF NOT EXISTS idx_topics_parent_id ON public.topics(parent_topic_id);
CREATE INDEX IF NOT EXISTS idx_concepts_topic_id ON public.concepts(topic_id);
CREATE INDEX IF NOT EXISTS idx_misconceptions_concept_id ON public.misconceptions(concept_id);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SEED DATA
-- ═══════════════════════════════════════════════════════════════════════════════

-- Exam Schedule 2026
INSERT INTO public.exam_schedules (exam_year, exam_period_start, exam_period_end, results_day, early_prep_starts, strategic_starts, structured_starts, intensive_starts, final_push_starts)
VALUES (2026, '2026-05-11', '2026-06-26', '2026-08-20', '2026-01-06', '2026-03-01', '2026-04-01', '2026-04-20', '2026-05-04')
ON CONFLICT (exam_year) DO NOTHING;

-- Update existing subjects with colours (if table already exists)
UPDATE public.subjects SET colour = '#3B82F6' WHERE code = 'MATHS' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#EF4444' WHERE code = 'ENG_LANG' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#DC2626' WHERE code = 'ENG_LIT' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#22C55E' WHERE code = 'BIOLOGY' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#A855F7' WHERE code = 'CHEMISTRY' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#F97316' WHERE code = 'PHYSICS' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#14B8A6' WHERE code = 'COMBINED_SCI' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#8B5CF6' WHERE code = 'HISTORY' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#06B6D4' WHERE code = 'GEOGRAPHY' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#0EA5E9' WHERE code = 'FRENCH' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#F59E0B' WHERE code = 'SPANISH' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#6366F1' WHERE code = 'GERMAN' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#EC4899' WHERE code = 'RE' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#10B981' WHERE code = 'COMPUTER_SCI' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#F43F5E' WHERE code = 'ART' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#8B5CF6' WHERE code = 'MUSIC' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#22C55E' WHERE code = 'PE' AND (colour IS NULL OR colour = '');
UPDATE public.subjects SET colour = '#F97316' WHERE code = 'DT' AND (colour IS NULL OR colour = '');

-- Exam Boards
INSERT INTO public.exam_boards (code, name, full_name, exam_year, exam_start_date, exam_end_date, results_day) VALUES
  ('AQA', 'AQA', 'Assessment and Qualifications Alliance', 2026, '2026-05-11', '2026-06-26', '2026-08-20'),
  ('EDEXCEL', 'Edexcel', 'Pearson Edexcel', 2026, '2026-05-11', '2026-06-26', '2026-08-20'),
  ('OCR', 'OCR', 'Oxford Cambridge and RSA', 2026, '2026-05-11', '2026-06-26', '2026-08-20'),
  ('WJEC', 'WJEC', 'Welsh Joint Education Committee', 2026, '2026-05-11', '2026-06-26', '2026-08-20'),
  ('EDUQAS', 'Eduqas', 'WJEC Eduqas', 2026, '2026-05-11', '2026-06-26', '2026-08-20')
ON CONFLICT (code) DO NOTHING;

-- Command Words
INSERT INTO public.command_words (word, meaning, action_checklist, typical_subjects, typical_mark_range, example_question, example_answer_structure, common_mistakes) VALUES
  ('Analyse', 'Break down information to identify patterns, relationships, or components',
   ARRAY['Identify the key components', 'Explain how they relate to each other', 'Consider cause and effect', 'Draw conclusions'],
   ARRAY['MATHS', 'ENG_LIT', 'HISTORY', 'GEOGRAPHY', 'BIOLOGY'], '4-6 marks',
   'Analyse the impact of industrialisation on urban growth in the 19th century.',
   'Component 1: [Identify aspect] → Component 2: [Explain relationship] → Conclusion: [Overall impact]',
   ARRAY['Just describing without showing relationships', 'Missing conclusions', 'Not using evidence']),
  ('Compare', 'Identify similarities and differences between two or more things',
   ARRAY['List features of first item', 'List features of second item', 'Identify similarities', 'Identify differences', 'Make direct comparisons'],
   ARRAY['ENG_LIT', 'HISTORY', 'GEOGRAPHY', 'BIOLOGY', 'CHEMISTRY'], '4-8 marks',
   'Compare the themes of power in Macbeth and Ozymandias.',
   'Similarity: Both texts show... However, [Text A] differs from [Text B] because...',
   ARRAY['Only describing one item', 'Not using comparative language', 'No direct links between items']),
  ('Describe', 'Give an account of the main features or events',
   ARRAY['State what you observe', 'Include relevant details', 'Be specific and accurate', 'Use appropriate terminology'],
   ARRAY['GEOGRAPHY', 'BIOLOGY', 'CHEMISTRY', 'PHYSICS', 'HISTORY'], '2-4 marks',
   'Describe the structure of a plant cell.',
   'The [feature] is... It has... This shows...',
   ARRAY['Including explanations when not asked', 'Being too vague', 'Missing key features']),
  ('Evaluate', 'Make a judgement based on evidence, considering different perspectives',
   ARRAY['Consider the positives', 'Consider the negatives', 'Weigh up the evidence', 'Reach a supported conclusion'],
   ARRAY['ENG_LIT', 'HISTORY', 'GEOGRAPHY', 'RE', 'COMPUTER_SCI'], '6-12 marks',
   'Evaluate the effectiveness of renewable energy sources in combating climate change.',
   'On one hand... However... Overall, I believe... because...',
   ARRAY['Being one-sided', 'Not reaching a conclusion', 'Not using evidence to support points']),
  ('Explain', 'Give reasons for something, showing understanding of cause and effect',
   ARRAY['State what happens', 'Give reason why', 'Develop with because/therefore', 'Link back to the question'],
   ARRAY['MATHS', 'BIOLOGY', 'CHEMISTRY', 'PHYSICS', 'GEOGRAPHY', 'HISTORY'], '3-6 marks',
   'Explain why the heart has four chambers.',
   'This happens because... This means that... Therefore...',
   ARRAY['Just describing', 'Missing the because/therefore link', 'Not developing points fully']),
  ('Calculate', 'Work out a numerical answer, showing your working',
   ARRAY['Identify the values needed', 'Select the correct formula', 'Substitute values', 'Calculate the answer', 'Include units'],
   ARRAY['MATHS', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'GEOGRAPHY'], '2-5 marks',
   'Calculate the mean of these values: 12, 15, 18, 21.',
   'Formula: [state] → Values: [substitute] → Calculation: [show working] → Answer: [with units]',
   ARRAY['Not showing working', 'Forgetting units', 'Calculation errors', 'Using wrong formula']),
  ('State', 'Give a brief, factual answer',
   ARRAY['Be direct and concise', 'Use correct terminology', 'Answer specifically what is asked'],
   ARRAY['BIOLOGY', 'CHEMISTRY', 'PHYSICS', 'GEOGRAPHY'], '1-2 marks',
   'State the function of the mitochondria.',
   'The [term] is/does [direct answer].',
   ARRAY['Over-explaining', 'Being vague', 'Not using scientific terms']),
  ('Justify', 'Give reasons to support a conclusion or decision',
   ARRAY['State your position', 'Give evidence to support it', 'Explain why this evidence matters', 'Anticipate counter-arguments'],
   ARRAY['ENG_LIT', 'HISTORY', 'GEOGRAPHY', 'RE'], '4-8 marks',
   'Justify why Character X can be seen as a tragic hero.',
   'I believe [position] because... This is supported by [evidence]... This shows...',
   ARRAY['Not giving enough evidence', 'Weak reasoning', 'Not addressing counter-points'])
ON CONFLICT (word) DO NOTHING;

-- Learning Techniques
INSERT INTO public.learning_techniques (code, name, description, technique_type, delivery_mode, suitable_learning_styles, suitable_understanding_states, suitable_revision_bands, engagement_level, cognitive_load, can_generate_artefact, artefact_types) VALUES
  ('AUDIO_EXPLAIN', 'Audio Explanation', 'Listen to a personalised audio explanation of a topic',
   'ingestion', 'audio', ARRAY['auditory']::public.learning_style[],
   ARRAY['not_understood', 'partially_understood']::public.understanding_state[],
   ARRAY['build', 'strengthen']::public.revision_band[],
   'passive', 'low', true, ARRAY['audio_script', 'audio_file']::public.artefact_type[]),
  ('FLASHCARD_REVIEW', 'Flashcard Review', 'Practice active recall with flashcards',
   'active_recall', 'flashcard', ARRAY['visual', 'read_write']::public.learning_style[],
   ARRAY['partially_understood', 'understood_fragile', 'secure']::public.understanding_state[],
   ARRAY['strengthen', 'maintain']::public.revision_band[],
   'active', 'medium', true, ARRAY['flashcard_set']::public.artefact_type[]),
  ('GUIDED_RECALL', 'Guided Recall', 'Structured prompts to retrieve information from memory',
   'active_recall', 'guided_recall', ARRAY['visual', 'auditory', 'read_write', 'kinesthetic']::public.learning_style[],
   ARRAY['partially_understood', 'understood_fragile']::public.understanding_state[],
   ARRAY['strengthen']::public.revision_band[],
   'active', 'high', false, NULL),
  ('WORKED_EXAMPLE', 'Worked Example', 'Step-by-step walkthrough of solving a problem',
   'ingestion', 'worked_example', ARRAY['visual', 'read_write', 'kinesthetic']::public.learning_style[],
   ARRAY['not_understood', 'partially_understood']::public.understanding_state[],
   ARRAY['build', 'strengthen']::public.revision_band[],
   'semi_active', 'medium', true, ARRAY['printable_pdf']::public.artefact_type[]),
  ('PRACTICE_QUESTIONS', 'Practice Questions', 'Answer exam-style questions with feedback',
   'practice', 'interactive_quiz', ARRAY['read_write', 'kinesthetic']::public.learning_style[],
   ARRAY['partially_understood', 'understood_fragile', 'secure']::public.understanding_state[],
   ARRAY['strengthen', 'maintain']::public.revision_band[],
   'active', 'high', true, ARRAY['quiz', 'worksheet']::public.artefact_type[]),
  ('TEACH_BACK', 'Teach Back', 'Explain a concept in your own words',
   'explanation', 'conversation', ARRAY['auditory', 'kinesthetic']::public.learning_style[],
   ARRAY['partially_understood', 'understood_fragile']::public.understanding_state[],
   ARRAY['strengthen']::public.revision_band[],
   'active', 'high', false, NULL),
  ('MIND_MAP', 'Mind Mapping', 'Create visual connections between ideas',
   'ingestion', 'printable', ARRAY['visual', 'kinesthetic']::public.learning_style[],
   ARRAY['partially_understood', 'understood_fragile']::public.understanding_state[],
   ARRAY['build', 'strengthen']::public.revision_band[],
   'active', 'medium', true, ARRAY['mind_map_instructions', 'printable_pdf']::public.artefact_type[]),
  ('SPACED_REVIEW', 'Spaced Review', 'Revisit material at optimal intervals',
   'spaced_repetition', 'flashcard', ARRAY['visual', 'auditory', 'read_write', 'kinesthetic']::public.learning_style[],
   ARRAY['understood_fragile', 'secure']::public.understanding_state[],
   ARRAY['maintain']::public.revision_band[],
   'active', 'low', true, ARRAY['flashcard_set']::public.artefact_type[]),
  ('SELF_QUIZ', 'Self Quiz', 'Test yourself on key facts and concepts',
   'self_testing', 'interactive_quiz', ARRAY['read_write', 'kinesthetic']::public.learning_style[],
   ARRAY['partially_understood', 'understood_fragile', 'secure']::public.understanding_state[],
   ARRAY['strengthen', 'maintain']::public.revision_band[],
   'active', 'medium', true, ARRAY['quiz']::public.artefact_type[]),
  ('READING_SUMMARY', 'Reading Summary', 'Read and summarise key information',
   'ingestion', 'reading', ARRAY['read_write']::public.learning_style[],
   ARRAY['not_understood', 'partially_understood']::public.understanding_state[],
   ARRAY['build']::public.revision_band[],
   'semi_active', 'medium', true, ARRAY['printable_pdf']::public.artefact_type[])
ON CONFLICT (code) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════════════
-- MIGRATION COMPLETE
-- ═══════════════════════════════════════════════════════════════════════════════
