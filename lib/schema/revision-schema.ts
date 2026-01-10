/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * revIsion Platform Schema v1.0
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * AUTHORITATIVE DATA AND LOGIC SCHEMA
 * For: UK GCSE Learning Platform
 *
 * This schema defines:
 * - Persistent storage structures
 * - Agent state models
 * - Learning logic entities
 * - Personalisation data
 * - Progress tracking
 * - Content delivery (audio, flashcards, printables)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1: STUDENT PROFILE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Core student identity and profile
 * PERSISTENT: Yes
 * STORAGE: Primary database
 */
export interface Student {
  // === Identity ===
  id: string;                          // UUID, primary key
  created_at: Date;                    // Account creation timestamp
  updated_at: Date;                    // Last profile update

  // === Personal Information ===
  first_name: string;                  // Used for personalisation (audio scripts, greetings)
  last_name: string | null;            // Optional
  date_of_birth: Date | null;          // For age calculation
  gcse_year: GCSEYear;                 // Year 10 or Year 11
  school_name: string | null;          // Optional, for context

  // === Authentication (Supabase) ===
  auth_user_id: string;                // FK to Supabase auth.users
  email: string;                       // From auth

  // === Account Status ===
  status: StudentStatus;
  onboarding_completed: boolean;
  vark_assessment_completed: boolean;
  initial_diagnostic_completed: boolean;
}

export type GCSEYear = 'year_10' | 'year_11';

export type StudentStatus =
  | 'active'
  | 'inactive'
  | 'suspended';

/**
 * Subjects the student is taking
 * PERSISTENT: Yes
 * RELATIONSHIP: Many-to-many (Student ↔ Subject)
 */
export interface StudentSubject {
  id: string;
  student_id: string;                  // FK to Student
  subject_id: string;                  // FK to Subject
  exam_board_id: string | null;        // FK to ExamBoard (if known)

  // === Subject-level preferences ===
  target_grade: number | null;         // 1-9 scale
  current_estimated_grade: number | null;  // Derived from progress
  priority_level: SubjectPriority;     // How much focus needed

  // === Timestamps ===
  enrolled_at: Date;
  last_studied_at: Date | null;
}

export type SubjectPriority =
  | 'critical'      // Needs most attention
  | 'high'
  | 'medium'
  | 'low'
  | 'maintenance';  // Already strong

/**
 * VARK Learning Style Profile
 * PERSISTENT: Yes
 * DERIVED FROM: VARK Assessment responses
 */
export interface StudentVARKProfile {
  id: string;
  student_id: string;                  // FK to Student, unique

  // === Raw Scores (from assessment) ===
  visual_score: number;                // 0-100
  auditory_score: number;              // 0-100
  read_write_score: number;            // 0-100
  kinesthetic_score: number;           // 0-100

  // === Derived Classifications ===
  primary_styles: LearningStyle[];     // 1-4 styles that are dominant
  is_multimodal: boolean;              // True if 2+ styles are strong
  dominant_style: LearningStyle | null; // Single strongest, if clear

  // === Style Strengths (derived) ===
  visual_strength: StyleStrength;
  auditory_strength: StyleStrength;
  read_write_strength: StyleStrength;
  kinesthetic_strength: StyleStrength;

  // === Timestamps ===
  assessed_at: Date;
  last_recalculated_at: Date;
}

export type LearningStyle =
  | 'visual'
  | 'auditory'
  | 'read_write'
  | 'kinesthetic';

export type StyleStrength =
  | 'very_strong'   // >= 35%
  | 'strong'        // >= 25%
  | 'moderate'      // >= 15%
  | 'mild';         // < 15%

/**
 * Behavioural Tendencies
 * PERSISTENT: Yes
 * DERIVED FROM: Interaction patterns over time
 * UPDATED: After each session
 */
export interface StudentBehaviourProfile {
  id: string;
  student_id: string;                  // FK to Student, unique

  // === Session Patterns ===
  preferred_session_length_minutes: number;  // Derived average
  session_length_tolerance: SessionLengthTolerance;
  optimal_sessions_per_week: number;   // Derived from engagement

  // === Engagement Patterns ===
  peak_engagement_times: TimeOfDay[];  // When they engage best
  typical_session_frequency: SessionFrequency;
  consistency_score: number;           // 0-100, how regular they are

  // === Avoidance Signals ===
  avoided_subjects: string[];          // Subject IDs they skip
  avoided_topics: string[];            // Topic IDs they skip
  avoidance_detected: boolean;         // Current flag

  // === Fatigue Indicators ===
  average_focus_duration_minutes: number;
  fatigue_threshold_minutes: number;   // When performance drops

  // === Timestamps ===
  last_calculated_at: Date;
  data_points_count: number;           // Sessions used for calculation
}

export type SessionLengthTolerance =
  | 'short_only'    // < 20 mins
  | 'short_medium'  // 15-30 mins
  | 'medium'        // 25-45 mins
  | 'medium_long'   // 30-60 mins
  | 'long';         // 45+ mins

export type TimeOfDay =
  | 'early_morning'   // 6-9am
  | 'morning'         // 9-12pm
  | 'afternoon'       // 12-5pm
  | 'evening'         // 5-8pm
  | 'night';          // 8pm+

export type SessionFrequency =
  | 'daily'
  | 'most_days'       // 4-6 per week
  | 'several_weekly'  // 2-3 per week
  | 'weekly'
  | 'sporadic';

/**
 * Emotional Baselines
 * PERSISTENT: Yes
 * DERIVED FROM: Interaction patterns and explicit signals
 * SENSITIVE: Handle with care
 */
export interface StudentEmotionalProfile {
  id: string;
  student_id: string;                  // FK to Student, unique

  // === Confidence Indicators ===
  baseline_confidence: ConfidenceLevel;
  confidence_sensitivity: ConfidenceSensitivity;
  confidence_trend: Trend;             // Recent direction

  // === Anxiety Indicators ===
  exam_anxiety_level: AnxietyLevel;
  time_pressure_sensitivity: PressureSensitivity;
  panic_threshold: PanicThreshold;

  // === Response Patterns ===
  frustration_tolerance: FrustrationTolerance;
  response_to_difficulty: DifficultyResponse;
  response_to_mistakes: MistakeResponse;

  // === Current State (ephemeral, updated each session) ===
  current_emotional_state: EmotionalState;
  last_state_update: Date;

  // === Timestamps ===
  profile_created_at: Date;
  last_calculated_at: Date;
}

export type ConfidenceLevel =
  | 'very_low'
  | 'low'
  | 'moderate'
  | 'high'
  | 'very_high';

export type ConfidenceSensitivity =
  | 'fragile'       // Easily shaken
  | 'sensitive'
  | 'stable'
  | 'resilient';

export type Trend =
  | 'declining'
  | 'stable'
  | 'improving';

export type AnxietyLevel =
  | 'none_detected'
  | 'mild'
  | 'moderate'
  | 'high'
  | 'severe';

export type PressureSensitivity =
  | 'high'          // Avoid mentioning time
  | 'moderate'
  | 'low';          // Can handle time references

export type PanicThreshold =
  | 'low'           // Panics easily
  | 'moderate'
  | 'high';         // Rarely panics

export type FrustrationTolerance =
  | 'low'
  | 'moderate'
  | 'high';

export type DifficultyResponse =
  | 'avoidance'     // Skips hard topics
  | 'disengagement' // Loses focus
  | 'persistence'   // Keeps trying
  | 'seeks_help';   // Asks for support

export type MistakeResponse =
  | 'discouragement'
  | 'neutral'
  | 'growth_oriented';

export type EmotionalState =
  | 'calm'
  | 'focused'
  | 'engaged'
  | 'struggling'
  | 'frustrated'
  | 'anxious'
  | 'overwhelmed'
  | 'disengaged';


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2: CURRICULUM & KNOWLEDGE MODEL
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * GCSE Subject
 * PERSISTENT: Yes (Reference data)
 * STORAGE: Seeded, rarely changes
 */
export interface Subject {
  id: string;
  code: string;                        // e.g., "MATHS", "ENG_LIT"
  name: string;                        // e.g., "Mathematics"
  display_name: string;                // e.g., "Maths"

  // === Classification ===
  category: SubjectCategory;
  is_compulsory: boolean;              // English, Maths, Science
  typical_paper_count: number;         // Number of exam papers

  // === Metadata ===
  icon: string | null;                 // For UI
  colour: string | null;               // For UI theming

  // === Status ===
  is_active: boolean;
}

export type SubjectCategory =
  | 'core'          // English, Maths, Science
  | 'ebacc'         // Languages, History, Geography
  | 'humanities'
  | 'arts'
  | 'technology'
  | 'vocational';

/**
 * Exam Board
 * PERSISTENT: Yes (Reference data)
 */
export interface ExamBoard {
  id: string;
  code: string;                        // e.g., "AQA", "EDEXCEL"
  name: string;                        // e.g., "AQA"
  full_name: string;                   // e.g., "Assessment and Qualifications Alliance"

  // === Key Dates (updated annually) ===
  exam_year: number;                   // e.g., 2026
  exam_start_date: Date;
  exam_end_date: Date;
  results_day: Date;

  // === Resources ===
  past_papers_url: string | null;
  specification_url: string | null;
}

/**
 * Subject-ExamBoard Specification
 * PERSISTENT: Yes (Reference data)
 * RELATIONSHIP: Links Subject to ExamBoard with spec details
 */
export interface SubjectSpecification {
  id: string;
  subject_id: string;                  // FK to Subject
  exam_board_id: string;               // FK to ExamBoard

  // === Specification Details ===
  spec_code: string;                   // e.g., "8300" for AQA Maths
  spec_name: string;                   // e.g., "GCSE Mathematics"
  spec_version: string;                // e.g., "2024"

  // === Structure ===
  paper_count: number;
  total_marks: number;
  exam_duration_minutes: number;

  // === Tier Information ===
  is_tiered: boolean;
  tiers: ExamTier[] | null;

  // === Status ===
  is_current: boolean;
}

export type ExamTier = 'foundation' | 'higher';

/**
 * Topic (Main curriculum unit)
 * PERSISTENT: Yes (Reference data)
 * NOTE: Topic is exam-board agnostic - represents the concept
 */
export interface Topic {
  id: string;
  subject_id: string;                  // FK to Subject

  // === Identification ===
  code: string;                        // e.g., "ALG_01"
  name: string;                        // e.g., "Solving Linear Equations"
  display_name: string;                // Student-facing name

  // === Hierarchy ===
  parent_topic_id: string | null;      // For sub-topics (self-referential FK)
  depth_level: number;                 // 0 = top-level, 1 = sub-topic, etc.
  sort_order: number;                  // Display ordering

  // === Classification ===
  tier_requirement: TierRequirement;
  difficulty_level: DifficultyLevel;
  typical_teaching_hours: number;      // Curriculum guidance

  // === Exam Relevance ===
  exam_weight: ExamWeight;             // How often/heavily examined
  typical_mark_allocation: number;     // Approx marks available

  // === Learning Metadata ===
  estimated_revision_minutes: number;  // For planning
  prerequisite_topic_ids: string[];    // Topics that should be understood first

  // === Status ===
  is_active: boolean;
}

export type TierRequirement =
  | 'foundation_only'
  | 'higher_only'
  | 'both';

export type DifficultyLevel =
  | 'foundational'  // Basic concepts
  | 'standard'
  | 'challenging'
  | 'advanced';     // Higher tier stretch

export type ExamWeight =
  | 'always_examined'   // Almost guaranteed
  | 'frequently'
  | 'sometimes'
  | 'rarely';

/**
 * Concept (Atomic knowledge unit within a topic)
 * PERSISTENT: Yes (Reference data)
 * NOTE: The smallest unit of knowledge that can be assessed
 */
export interface Concept {
  id: string;
  topic_id: string;                    // FK to Topic

  // === Identification ===
  code: string;                        // e.g., "ALG_01_C01"
  name: string;                        // e.g., "Collecting like terms"

  // === Content ===
  definition: string;                  // Concise explanation
  key_points: string[];                // Bullet points

  // === Dependencies ===
  prerequisite_concept_ids: string[];  // Concepts needed first
  related_concept_ids: string[];       // Connected concepts

  // === Assessment Shapes ===
  typical_assessment_types: AssessmentType[];

  // === Status ===
  sort_order: number;
  is_active: boolean;
}

export type AssessmentType =
  | 'recall'            // State, name, list
  | 'explanation'       // Explain, describe
  | 'application'       // Calculate, solve
  | 'analysis'          // Compare, contrast
  | 'evaluation'        // Evaluate, assess
  | 'synthesis';        // Design, create

/**
 * Common Misconception
 * PERSISTENT: Yes (Reference data)
 * NOTE: Known errors students make
 */
export interface Misconception {
  id: string;
  concept_id: string;                  // FK to Concept

  // === Description ===
  misconception_text: string;          // What students incorrectly believe
  correct_understanding: string;       // What they should understand
  why_it_happens: string;              // Common cause

  // === Detection ===
  detection_keywords: string[];        // Phrases that suggest this misconception
  typical_student_response: string;    // Example wrong answer pattern

  // === Remediation ===
  remediation_approach: string;        // How to fix it
  helpful_analogy: string | null;      // If applicable

  // === Prevalence ===
  prevalence: MisconceptionPrevalence;

  // === Status ===
  is_active: boolean;
}

export type MisconceptionPrevalence =
  | 'very_common'   // Most students
  | 'common'
  | 'occasional'
  | 'rare';

/**
 * Command Word (Exam terminology)
 * PERSISTENT: Yes (Reference data)
 */
export interface CommandWord {
  id: string;
  word: string;                        // e.g., "Explain"

  // === Definition ===
  meaning: string;                     // What examiners want
  action_checklist: string[];          // Steps to answer

  // === Usage ===
  typical_subjects: string[];          // Subject codes where used
  typical_mark_range: string;          // e.g., "2-4 marks"

  // === Examples ===
  example_question: string;
  example_answer_structure: string;

  // === Common Mistakes ===
  common_mistakes: string[];
}


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3: MENTAL MODEL & UNDERSTANDING STATE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Student Topic Understanding
 * PERSISTENT: Yes
 * MUTABLE: Updated after every interaction
 * KEY ENTITY: Core of the learning logic
 */
export interface StudentTopicUnderstanding {
  id: string;
  student_id: string;                  // FK to Student
  topic_id: string;                    // FK to Topic

  // === UNIQUE CONSTRAINT: (student_id, topic_id) ===

  // === Understanding State (THE CORE CLASSIFICATION) ===
  understanding_state: UnderstandingState;
  previous_state: UnderstandingState | null;
  state_changed_at: Date | null;

  // === Confidence ===
  self_reported_confidence: ConfidenceLabel | null;
  assessed_confidence: ConfidenceLabel | null;
  confidence_trend: Trend;

  // === Misconceptions ===
  identified_misconception_ids: string[];  // FKs to Misconception
  resolved_misconception_ids: string[];    // Previously had, now fixed

  // === Error Patterns ===
  error_pattern_ids: string[];         // FKs to ErrorPattern (student-specific)
  recurring_errors: boolean;

  // === Interaction History ===
  first_interaction_at: Date;
  last_interaction_at: Date;
  total_interaction_count: number;
  successful_recall_count: number;
  failed_recall_count: number;

  // === Revision Band (derived) ===
  current_revision_band: RevisionBand;

  // === Timestamps ===
  created_at: Date;
  updated_at: Date;
}

/**
 * THE PRIMARY UNDERSTANDING CLASSIFICATION
 * This is the core mental model state
 */
export type UnderstandingState =
  | 'not_understood'       // No grasp of the concept
  | 'partially_understood' // Some understanding, gaps remain
  | 'understood_fragile'   // Understands but not secure
  | 'secure';              // Solid understanding

export type ConfidenceLabel =
  | 'confident'
  | 'unsure'
  | 'dont_remember';

export type RevisionBand =
  | 'build'        // Needs to be learned/rebuilt
  | 'strengthen'   // Needs practice and reinforcement
  | 'maintain';    // Needs occasional recall

/**
 * Student Concept Understanding
 * PERSISTENT: Yes
 * NOTE: More granular than topic-level
 */
export interface StudentConceptUnderstanding {
  id: string;
  student_id: string;                  // FK to Student
  concept_id: string;                  // FK to Concept

  // === UNIQUE CONSTRAINT: (student_id, concept_id) ===

  // === Understanding State ===
  understanding_state: UnderstandingState;

  // === Assessment Results ===
  last_assessment_result: AssessmentResult | null;
  assessment_history: AssessmentResult[];  // JSONB, last 10

  // === Timestamps ===
  first_seen_at: Date;
  last_assessed_at: Date | null;
  updated_at: Date;
}

export interface AssessmentResult {
  timestamp: Date;
  assessment_type: AssessmentType;
  success: boolean;
  partial_credit: boolean;
  notes: string | null;
}

/**
 * Error Pattern (Student-specific recurring errors)
 * PERSISTENT: Yes
 * DERIVED FROM: Interaction analysis
 */
export interface StudentErrorPattern {
  id: string;
  student_id: string;                  // FK to Student
  topic_id: string;                    // FK to Topic
  concept_id: string | null;           // FK to Concept (if specific)

  // === Pattern Description ===
  pattern_type: ErrorPatternType;
  description: string;                 // What the error is
  example_instances: string[];         // Examples of the error

  // === Frequency ===
  occurrence_count: number;
  first_observed_at: Date;
  last_observed_at: Date;

  // === Resolution ===
  is_resolved: boolean;
  resolved_at: Date | null;
  resolution_method: string | null;
}

export type ErrorPatternType =
  | 'calculation_error'
  | 'conceptual_error'
  | 'procedural_error'
  | 'terminology_confusion'
  | 'application_error'
  | 'interpretation_error';


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4: REVISION PLAN MODEL
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Revision Plan (Living document)
 * PERSISTENT: Yes
 * MUTABLE: Continuously updated
 * NOTE: NOT version-locked - always represents current state
 */
export interface RevisionPlan {
  id: string;
  student_id: string;                  // FK to Student, UNIQUE

  // === Plan Status ===
  status: PlanStatus;
  created_at: Date;
  last_updated_at: Date;
  last_adaptation_at: Date;            // Last time plan was auto-adjusted

  // === Subjects Included ===
  subject_ids: string[];               // FKs to Subject

  // === Rhythm Settings ===
  rhythm: RevisionRhythm;

  // === Current Phase ===
  current_phase: RevisionPhase;
  days_until_exams: number;            // Calculated, updated daily

  // === Adaptation History ===
  adaptation_count: number;
  last_adaptation_reason: AdaptationReason | null;
}

export type PlanStatus =
  | 'draft'         // Not yet finalised
  | 'active'
  | 'paused'
  | 'completed';

export interface RevisionRhythm {
  typical_session_length_minutes: number;
  target_sessions_per_week: number;
  flexibility_level: FlexibilityLevel;
  preferred_days: DayOfWeek[] | null;  // null = any day
  avoid_days: DayOfWeek[] | null;
}

export type FlexibilityLevel =
  | 'rigid'         // Student wants structure
  | 'flexible'      // Some flexibility
  | 'very_flexible'; // Go with the flow

export type DayOfWeek =
  | 'monday' | 'tuesday' | 'wednesday' | 'thursday'
  | 'friday' | 'saturday' | 'sunday';

export type RevisionPhase =
  | 'early_preparation'   // 3+ months out
  | 'strategic'           // 2-3 months
  | 'structured'          // 1-2 months
  | 'intensive'           // 2-4 weeks
  | 'final_push'          // 1-2 weeks
  | 'exam_period';        // During exams

export type AdaptationReason =
  | 'understanding_improved'
  | 'understanding_declined'
  | 'engagement_dropped'
  | 'engagement_increased'
  | 'time_pressure_increased'
  | 'student_requested'
  | 'topic_completed'
  | 'misconception_detected'
  | 'panic_detected';

/**
 * Plan Topic Assignment
 * PERSISTENT: Yes
 * NOTE: Assigns topics to revision bands within the plan
 */
export interface PlanTopicAssignment {
  id: string;
  plan_id: string;                     // FK to RevisionPlan
  topic_id: string;                    // FK to Topic

  // === Band Assignment ===
  revision_band: RevisionBand;
  priority_within_band: number;        // 1 = highest priority

  // === Technique Assignment ===
  assigned_technique_ids: string[];    // FKs to LearningTechnique

  // === Progress ===
  sessions_allocated: number;
  sessions_completed: number;
  estimated_completion_date: Date | null;

  // === Movement History ===
  previous_band: RevisionBand | null;
  band_changed_at: Date | null;
  band_change_reason: string | null;

  // === Timestamps ===
  assigned_at: Date;
  last_updated_at: Date;
}

/**
 * Plan Adaptation Log
 * PERSISTENT: Yes
 * NOTE: Audit trail of plan changes
 */
export interface PlanAdaptationLog {
  id: string;
  plan_id: string;                     // FK to RevisionPlan

  // === Change Details ===
  adapted_at: Date;
  reason: AdaptationReason;
  description: string;                 // Human-readable description

  // === What Changed ===
  changes: PlanChange[];               // JSONB array

  // === Trigger ===
  triggered_by: AdaptationTrigger;
  session_id: string | null;           // FK to Session, if triggered by session
}

export interface PlanChange {
  change_type: 'band_move' | 'priority_change' | 'technique_change' | 'rhythm_change';
  topic_id: string | null;
  from_value: string;
  to_value: string;
}

export type AdaptationTrigger =
  | 'automatic'     // System detected need
  | 'session_end'   // After session analysis
  | 'student_request'
  | 'scheduled';    // Regular re-evaluation


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5: LEARNING TECHNIQUES & DELIVERY MODES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Learning Technique (Reference data)
 * PERSISTENT: Yes
 * STORAGE: Seeded
 */
export interface LearningTechnique {
  id: string;
  code: string;                        // e.g., "AUDIO_EXPLAIN"
  name: string;                        // e.g., "Audio Explanation"
  description: string;

  // === Classification ===
  technique_type: TechniqueType;
  delivery_mode: DeliveryMode;

  // === Suitability Rules ===
  suitable_learning_styles: LearningStyle[];
  suitable_understanding_states: UnderstandingState[];
  suitable_revision_bands: RevisionBand[];

  // === Engagement Characteristics ===
  typical_duration_minutes: DurationRange;
  engagement_level: EngagementLevel;
  cognitive_load: CognitiveLoad;

  // === Output Capabilities ===
  can_generate_artefact: boolean;
  artefact_types: ArtefactType[];

  // === Status ===
  is_active: boolean;
}

export type TechniqueType =
  | 'ingestion'         // Taking in new information
  | 'explanation'       // Explaining back
  | 'active_recall'     // Retrieving from memory
  | 'spaced_repetition' // Revisiting over time
  | 'practice'          // Working through problems
  | 'self_testing';     // Quizzing self

export type DeliveryMode =
  | 'audio'
  | 'flashcard'
  | 'guided_recall'
  | 'worked_example'
  | 'interactive_quiz'
  | 'reading'
  | 'printable'
  | 'conversation';

export interface DurationRange {
  min_minutes: number;
  max_minutes: number;
  typical_minutes: number;
}

export type EngagementLevel =
  | 'passive'       // Listening, reading
  | 'semi_active'   // Following along
  | 'active';       // Doing, producing

export type CognitiveLoad =
  | 'low'
  | 'medium'
  | 'high';

export type ArtefactType =
  | 'audio_script'
  | 'audio_file'
  | 'flashcard_set'
  | 'printable_pdf'
  | 'quiz'
  | 'worksheet'
  | 'mind_map_instructions';

/**
 * Technique Effectiveness (Per student)
 * PERSISTENT: Yes
 * DERIVED FROM: Session outcomes
 */
export interface StudentTechniqueEffectiveness {
  id: string;
  student_id: string;                  // FK to Student
  technique_id: string;                // FK to LearningTechnique

  // === UNIQUE CONSTRAINT: (student_id, technique_id) ===

  // === Usage Stats ===
  times_used: number;
  total_duration_minutes: number;

  // === Effectiveness Metrics ===
  completion_rate: number;             // 0-100
  engagement_score: number;            // 0-100, derived
  understanding_improvement_rate: number;  // 0-100

  // === Derived Classification ===
  effectiveness_rating: EffectivenessRating;

  // === Timestamps ===
  first_used_at: Date;
  last_used_at: Date;
  last_calculated_at: Date;
}

export type EffectivenessRating =
  | 'highly_effective'
  | 'effective'
  | 'neutral'
  | 'less_effective'
  | 'ineffective';


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6: AUDIO LEARNING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Audio Revision Script
 * PERSISTENT: Yes
 * NOTE: The text content for audio generation
 */
export interface AudioRevisionScript {
  id: string;

  // === Context ===
  student_id: string;                  // FK to Student
  topic_id: string;                    // FK to Topic

  // === Script Metadata ===
  purpose: AudioPurpose;
  revision_phase: RevisionBand;        // ingest / strengthen / maintain

  // === Personalisation ===
  student_name_used: string;           // First name for script
  name_usage_count: number;            // How many times name appears

  // === Script Content ===
  script_sections: AudioScriptSection[];  // JSONB
  full_script_text: string;            // Complete script

  // === Duration ===
  target_duration_minutes: number;
  estimated_duration_minutes: number;
  word_count: number;

  // === Generation Metadata ===
  generated_at: Date;
  generation_model: string;            // e.g., "gpt-4o-mini"
  generation_prompt_version: string;

  // === Status ===
  status: ScriptStatus;
  reviewed_at: Date | null;
}

export type AudioPurpose =
  | 'topic_introduction'
  | 'concept_explanation'
  | 'misconception_repair'
  | 'recall_reinforcement'
  | 'exam_technique';

export interface AudioScriptSection {
  section_type: AudioSectionType;
  content: string;
  duration_estimate_seconds: number;
  includes_pause: boolean;
  pause_duration_seconds: number | null;
}

export type AudioSectionType =
  | 'warm_opening'
  | 'big_picture'
  | 'core_explanation'
  | 'memory_anchor'
  | 'recall_prompt'
  | 'exam_connection'
  | 'calm_closing';

export type ScriptStatus =
  | 'draft'
  | 'ready'
  | 'generating_audio'
  | 'complete'
  | 'archived';

/**
 * Audio File
 * PERSISTENT: Yes
 * STORAGE: File reference (actual file in object storage)
 */
export interface AudioFile {
  id: string;
  script_id: string;                   // FK to AudioRevisionScript

  // === File Details ===
  file_path: string;                   // Object storage path
  file_size_bytes: number;
  format: AudioFormat;
  duration_seconds: number;

  // === Voice Metadata ===
  voice_provider: VoiceProvider;
  voice_id: string;                    // Provider-specific voice ID
  voice_name: string;                  // Human-readable name

  // === Generation ===
  generated_at: Date;
  generation_cost: number | null;      // If tracked

  // === Usage ===
  play_count: number;
  last_played_at: Date | null;

  // === Status ===
  status: AudioFileStatus;
}

export type AudioFormat = 'mp3' | 'wav' | 'ogg';

export type VoiceProvider =
  | 'elevenlabs'
  | 'openai'
  | 'google'
  | 'azure'
  | 'other';

export type AudioFileStatus =
  | 'generating'
  | 'ready'
  | 'failed'
  | 'archived';


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7: FLASHCARD SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Flashcard Set
 * PERSISTENT: Yes
 */
export interface FlashcardSet {
  id: string;

  // === Context ===
  student_id: string;                  // FK to Student
  topic_id: string;                    // FK to Topic

  // === Set Metadata ===
  title: string;
  description: string | null;
  purpose: FlashcardPurpose;

  // === Cards ===
  card_count: number;

  // === Personalisation ===
  is_personalised: boolean;            // Tailored to student's gaps
  targets_misconceptions: boolean;

  // === Generation ===
  generated_at: Date;
  generation_source: 'system' | 'ai_generated' | 'student_created';

  // === Status ===
  status: 'draft' | 'active' | 'archived';
}

export type FlashcardPurpose =
  | 'key_facts'
  | 'definitions'
  | 'command_words'
  | 'misconception_repair'
  | 'exam_prep';

/**
 * Flashcard
 * PERSISTENT: Yes
 */
export interface Flashcard {
  id: string;
  set_id: string;                      // FK to FlashcardSet

  // === Content ===
  front_content: string;               // Question/prompt
  back_content: string;                // Answer/explanation

  // === Metadata ===
  concept_id: string | null;           // FK to Concept
  difficulty: CardDifficulty;

  // === Ordering ===
  sort_order: number;

  // === Spaced Repetition Data ===
  ease_factor: number;                 // SM-2 algorithm
  interval_days: number;
  next_review_date: Date | null;

  // === Performance ===
  times_seen: number;
  times_correct: number;
  times_incorrect: number;
  last_seen_at: Date | null;

  // === Status ===
  status: 'active' | 'suspended' | 'mastered';
}

export type CardDifficulty =
  | 'easy'
  | 'medium'
  | 'hard';


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8: SESSION & INTERACTION TRACKING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Learning Session
 * PERSISTENT: Yes
 * NOTE: A discrete learning interaction period
 */
export interface LearningSession {
  id: string;
  student_id: string;                  // FK to Student

  // === Timing ===
  started_at: Date;
  ended_at: Date | null;
  duration_minutes: number | null;     // Calculated on end

  // === Context ===
  session_type: SessionType;
  primary_subject_id: string | null;   // FK to Subject
  primary_topic_ids: string[];         // FKs to Topic

  // === Techniques Used ===
  technique_ids: string[];             // FKs to LearningTechnique

  // === Outcomes ===
  completion_status: SessionCompletionStatus;

  // === Signals (Observed) ===
  signals: SessionSignals;             // JSONB

  // === Agent State ===
  agent_phase_start: AgentPhase;
  agent_phase_end: AgentPhase | null;

  // === Summary (Generated at end) ===
  session_summary: SessionSummary | null;  // JSONB
}

export type SessionType =
  | 'onboarding'
  | 'diagnostic'
  | 'learning'
  | 'revision'
  | 'practice'
  | 'review'
  | 'freeform';

export type SessionCompletionStatus =
  | 'completed'
  | 'partial'           // Left early but did something
  | 'abandoned'         // Left immediately
  | 'in_progress';

export interface SessionSignals {
  hesitation_detected: boolean;
  hesitation_count: number;
  fatigue_detected: boolean;
  fatigue_onset_minutes: number | null;
  confidence_signals: ConfidenceSignal[];
  frustration_detected: boolean;
  engagement_level: EngagementLevel;
  response_times_ms: number[];         // For analysis
}

export interface ConfidenceSignal {
  timestamp: Date;
  signal_type: 'positive' | 'negative';
  context: string;
}

export interface SessionSummary {
  topics_covered: string[];
  concepts_introduced: string[];
  concepts_reinforced: string[];
  misconceptions_addressed: string[];
  understanding_changes: UnderstandingChange[];
  one_clear_win: string;
  next_step: string;
}

export interface UnderstandingChange {
  topic_id: string;
  from_state: UnderstandingState;
  to_state: UnderstandingState;
}

/**
 * Session Interaction
 * PERSISTENT: Yes
 * NOTE: Individual exchanges within a session
 */
export interface SessionInteraction {
  id: string;
  session_id: string;                  // FK to LearningSession

  // === Ordering ===
  sequence_number: number;

  // === Content ===
  interaction_type: InteractionType;
  student_input: string | null;        // What student said/did
  agent_response: string | null;       // What agent said/did

  // === Context ===
  topic_id: string | null;             // FK to Topic
  concept_id: string | null;           // FK to Concept
  technique_id: string | null;         // FK to LearningTechnique

  // === Assessment ===
  was_assessment: boolean;
  assessment_result: 'correct' | 'partial' | 'incorrect' | null;

  // === Signals ===
  response_time_ms: number | null;
  hesitation_detected: boolean;
  confidence_indicator: 'high' | 'medium' | 'low' | null;

  // === Timestamps ===
  started_at: Date;
  completed_at: Date;
}

export type InteractionType =
  | 'greeting'
  | 'question'
  | 'explanation'
  | 'recall_prompt'
  | 'assessment'
  | 'feedback'
  | 'encouragement'
  | 'clarification'
  | 'summary'
  | 'transition';


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9: PROGRESS & GROWTH TRACKING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Understanding State History
 * PERSISTENT: Yes
 * NOTE: Longitudinal record of understanding changes
 */
export interface UnderstandingStateHistory {
  id: string;
  student_id: string;                  // FK to Student
  topic_id: string;                    // FK to Topic

  // === State Change ===
  from_state: UnderstandingState | null;  // null if first record
  to_state: UnderstandingState;

  // === Context ===
  session_id: string | null;           // FK to LearningSession
  trigger: StateChangeTrigger;

  // === Timestamp ===
  changed_at: Date;
}

export type StateChangeTrigger =
  | 'initial_assessment'
  | 'session_outcome'
  | 'spaced_review'
  | 'misconception_resolved'
  | 'decay_detected'         // Understanding faded
  | 'manual_adjustment';

/**
 * Misconception Resolution Log
 * PERSISTENT: Yes
 */
export interface MisconceptionResolutionLog {
  id: string;
  student_id: string;                  // FK to Student
  misconception_id: string;            // FK to Misconception

  // === Detection ===
  detected_at: Date;
  detected_in_session_id: string;      // FK to LearningSession

  // === Resolution ===
  resolution_status: ResolutionStatus;
  resolved_at: Date | null;
  resolved_in_session_id: string | null;
  resolution_technique_id: string | null;  // FK to LearningTechnique

  // === Attempts ===
  remediation_attempt_count: number;
}

export type ResolutionStatus =
  | 'active'        // Currently a problem
  | 'resolving'     // Being worked on
  | 'resolved'      // Fixed
  | 'recurring';    // Came back

/**
 * Engagement Consistency Record
 * PERSISTENT: Yes
 * NOTE: Weekly aggregation of engagement
 */
export interface EngagementWeeklyRecord {
  id: string;
  student_id: string;                  // FK to Student

  // === Time Period ===
  week_start_date: Date;
  week_end_date: Date;

  // === Engagement Metrics ===
  sessions_count: number;
  total_duration_minutes: number;
  topics_touched_count: number;

  // === Quality Metrics ===
  average_session_length_minutes: number;
  completion_rate: number;             // 0-100

  // === Momentum ===
  momentum_score: number;              // 0-100
  momentum_trend: Trend;

  // === Comparison ===
  vs_previous_week: 'improved' | 'stable' | 'declined' | null;
}

/**
 * Growth Milestone
 * PERSISTENT: Yes
 * NOTE: Significant achievements to celebrate
 */
export interface GrowthMilestone {
  id: string;
  student_id: string;                  // FK to Student

  // === Milestone ===
  milestone_type: MilestoneType;
  description: string;                 // Human-readable

  // === Context ===
  topic_id: string | null;             // FK to Topic, if topic-specific
  subject_id: string | null;           // FK to Subject, if subject-specific

  // === Timing ===
  achieved_at: Date;
  session_id: string | null;           // FK to LearningSession

  // === Surfacing ===
  surfaced_to_student: boolean;
  surfaced_at: Date | null;
}

export type MilestoneType =
  | 'first_topic_secure'
  | 'subject_milestone'          // e.g., 50% of topics secure
  | 'misconception_cleared'
  | 'consistency_streak'         // e.g., 7 days in a row
  | 'understanding_upgrade'      // Moved to higher state
  | 'technique_mastery'
  | 'confidence_growth';


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 10: AGENT STATE & DECISION LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Agent Session State
 * PERSISTENT: Per-session (cleared on session end)
 * NOTE: The AI agent's current working state
 */
export interface AgentSessionState {
  id: string;
  session_id: string;                  // FK to LearningSession
  student_id: string;                  // FK to Student

  // === Current Phase ===
  current_phase: AgentPhase;
  phase_entered_at: Date;

  // === Working Memory ===
  current_topic_id: string | null;
  current_concept_id: string | null;
  current_technique_id: string | null;

  // === Context Stack ===
  conversation_context: ConversationContext;  // JSONB

  // === Decisions Made ===
  decisions: AgentDecision[];          // JSONB array

  // === Guardrails ===
  guardrails_active: Guardrail[];

  // === Student State (Session-specific) ===
  detected_emotional_state: EmotionalState;
  confidence_level_observed: ConfidenceLevel;
  fatigue_level: 'none' | 'mild' | 'moderate' | 'high';

  // === Time Awareness ===
  time_pressure_mode: boolean;
  panic_detected: boolean;

  // === Timestamps ===
  created_at: Date;
  last_updated_at: Date;
}

export type AgentPhase =
  | 'greeting'
  | 'onboarding'
  | 'diagnostic'
  | 'plan_creation'
  | 'session_preview'
  | 'knowledge_ingestion'
  | 'active_revision'
  | 'practice'
  | 'recall_check'
  | 'misconception_repair'
  | 'session_close'
  | 'panic_recovery';

export interface ConversationContext {
  recent_topics: string[];             // Last 5 topic IDs
  recent_exchanges: ConversationExchange[];  // Last 10
  established_facts: string[];         // Things we know about student
  pending_questions: string[];         // Things to follow up on
  session_goals: string[];             // What we're trying to achieve
}

export interface ConversationExchange {
  role: 'student' | 'agent';
  content_summary: string;             // Brief summary, not full text
  timestamp: Date;
}

export interface AgentDecision {
  decision_type: DecisionType;
  decision: string;
  reasoning: string;
  made_at: Date;
  inputs_considered: string[];
}

export type DecisionType =
  | 'phase_transition'
  | 'topic_selection'
  | 'technique_selection'
  | 'difficulty_adjustment'
  | 'pace_adjustment'
  | 'encouragement_needed'
  | 'clarification_needed'
  | 'misconception_detected'
  | 'session_end';

export type Guardrail =
  | 'no_full_answers'           // Never write submission-ready content
  | 'school_safe'               // Appropriate content only
  | 'no_pressure'               // Don't create anxiety
  | 'no_judgment'               // Never shame the student
  | 'gcse_appropriate'          // Keep to curriculum level
  | 'growth_focused';           // Focus on improvement, not grades


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 11: TIME AWARENESS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Exam Schedule
 * PERSISTENT: Yes (Reference data, updated annually)
 */
export interface ExamSchedule {
  id: string;
  exam_year: number;                   // e.g., 2026

  // === Key Dates ===
  exam_period_start: Date;
  exam_period_end: Date;
  results_day: Date;

  // === Phase Boundaries ===
  early_prep_starts: Date;             // When "early preparation" phase begins
  strategic_starts: Date;              // When "strategic" phase begins
  structured_starts: Date;             // When "structured" phase begins
  intensive_starts: Date;              // When "intensive" phase begins
  final_push_starts: Date;             // When "final push" phase begins
}

/**
 * Student Time Context
 * EPHEMERAL: Calculated on demand
 * NOTE: Not stored, computed when needed
 */
export interface StudentTimeContext {
  student_id: string;

  // === Calculated Values ===
  days_until_exams: number;
  weeks_until_exams: number;
  current_revision_phase: RevisionPhase;

  // === Urgency Assessment ===
  time_pressure_level: TimePressureLevel;
  should_surface_time: boolean;

  // === Phase Progress ===
  phase_days_remaining: number;
  phase_percentage_complete: number;
}

export type TimePressureLevel =
  | 'none'          // Plenty of time
  | 'low'           // Comfortable
  | 'moderate'      // Should be steady
  | 'high'          // Need to focus
  | 'critical';     // Very limited time

/**
 * Panic Detection State
 * EPHEMERAL: Session-scoped
 */
export interface PanicDetectionState {
  student_id: string;
  session_id: string;

  // === Indicators ===
  panic_indicators: PanicIndicator[];
  panic_score: number;                 // 0-100
  panic_detected: boolean;             // True if score > threshold

  // === Response ===
  recovery_mode_active: boolean;
  recovery_started_at: Date | null;
}

export interface PanicIndicator {
  indicator_type: PanicIndicatorType;
  detected_at: Date;
  severity: 'mild' | 'moderate' | 'severe';
  context: string;
}

export type PanicIndicatorType =
  | 'time_anxiety_expressed'
  | 'overwhelm_language'
  | 'avoidance_spike'
  | 'rapid_topic_switching'
  | 'disengagement'
  | 'explicit_panic_statement';


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 12: PRINTABLE ARTEFACTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Printable Resource
 * PERSISTENT: Yes
 */
export interface PrintableResource {
  id: string;
  student_id: string;                  // FK to Student

  // === Content Context ===
  resource_type: PrintableType;
  topic_id: string | null;             // FK to Topic
  subject_id: string | null;           // FK to Subject

  // === Content ===
  title: string;
  description: string | null;
  content_data: object;                // JSONB, structure varies by type

  // === File ===
  pdf_path: string | null;             // Object storage path
  pdf_generated_at: Date | null;

  // === Personalisation ===
  is_personalised: boolean;
  includes_student_name: boolean;

  // === Usage ===
  download_count: number;
  last_downloaded_at: Date | null;

  // === Status ===
  status: 'generating' | 'ready' | 'failed';
  created_at: Date;
}

export type PrintableType =
  | 'flashcard_sheet'
  | 'revision_checklist'
  | 'topic_summary'
  | 'formula_sheet'
  | 'timeline'
  | 'mind_map_template'
  | 'practice_questions';


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 13: INDEXES AND RELATIONSHIPS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * DATABASE INDEXES (for query performance)
 *
 * PRIMARY KEYS:
 * - All entities have `id` as UUID primary key
 *
 * UNIQUE CONSTRAINTS:
 * - Student.auth_user_id
 * - Student.email
 * - StudentVARKProfile: (student_id) - one per student
 * - StudentBehaviourProfile: (student_id) - one per student
 * - StudentEmotionalProfile: (student_id) - one per student
 * - RevisionPlan: (student_id) - one active plan per student
 * - StudentTopicUnderstanding: (student_id, topic_id)
 * - StudentConceptUnderstanding: (student_id, concept_id)
 * - StudentTechniqueEffectiveness: (student_id, technique_id)
 *
 * FOREIGN KEY INDEXES:
 * - All foreign keys should be indexed
 *
 * QUERY-OPTIMISED INDEXES:
 * - StudentTopicUnderstanding: (student_id, understanding_state)
 * - StudentTopicUnderstanding: (student_id, current_revision_band)
 * - PlanTopicAssignment: (plan_id, revision_band, priority_within_band)
 * - LearningSession: (student_id, started_at DESC)
 * - SessionInteraction: (session_id, sequence_number)
 * - UnderstandingStateHistory: (student_id, topic_id, changed_at DESC)
 * - EngagementWeeklyRecord: (student_id, week_start_date DESC)
 * - Flashcard: (set_id, next_review_date)
 */

/**
 * ENTITY RELATIONSHIPS (ERD Summary)
 *
 * Student (1) ──── (1) StudentVARKProfile
 * Student (1) ──── (1) StudentBehaviourProfile
 * Student (1) ──── (1) StudentEmotionalProfile
 * Student (1) ──── (1) RevisionPlan
 * Student (1) ──── (N) StudentSubject
 * Student (1) ──── (N) StudentTopicUnderstanding
 * Student (1) ──── (N) StudentConceptUnderstanding
 * Student (1) ──── (N) StudentErrorPattern
 * Student (1) ──── (N) StudentTechniqueEffectiveness
 * Student (1) ──── (N) LearningSession
 * Student (1) ──── (N) AudioRevisionScript
 * Student (1) ──── (N) FlashcardSet
 * Student (1) ──── (N) PrintableResource
 * Student (1) ──── (N) UnderstandingStateHistory
 * Student (1) ──── (N) MisconceptionResolutionLog
 * Student (1) ──── (N) EngagementWeeklyRecord
 * Student (1) ──── (N) GrowthMilestone
 *
 * Subject (1) ──── (N) Topic
 * Subject (1) ──── (N) SubjectSpecification
 * Subject (1) ──── (N) StudentSubject
 *
 * Topic (1) ──── (N) Concept
 * Topic (1) ──── (N) Topic (self-referential: parent_topic_id)
 * Topic (1) ──── (N) StudentTopicUnderstanding
 * Topic (1) ──── (N) PlanTopicAssignment
 *
 * Concept (1) ──── (N) Misconception
 * Concept (1) ──── (N) StudentConceptUnderstanding
 *
 * ExamBoard (1) ──── (N) SubjectSpecification
 * ExamBoard (1) ──── (N) StudentSubject
 *
 * RevisionPlan (1) ──── (N) PlanTopicAssignment
 * RevisionPlan (1) ──── (N) PlanAdaptationLog
 *
 * LearningTechnique (1) ──── (N) StudentTechniqueEffectiveness
 * LearningTechnique (1) ──── (N) PlanTopicAssignment (via assigned_technique_ids)
 *
 * LearningSession (1) ──── (N) SessionInteraction
 * LearningSession (1) ──── (1) AgentSessionState
 *
 * AudioRevisionScript (1) ──── (1) AudioFile
 * FlashcardSet (1) ──── (N) Flashcard
 */


// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 14: SANITY CHECKLIST
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * SCHEMA SANITY CHECKLIST
 * Confirming all required concepts are represented
 *
 * ✅ 1. STUDENT PROFILE
 *    ✅ Identity (name, age, GCSE year) → Student
 *    ✅ Subjects taken → StudentSubject
 *    ✅ Exam boards → StudentSubject.exam_board_id
 *    ✅ Learning preferences → StudentVARKProfile
 *    ✅ Behavioural tendencies → StudentBehaviourProfile
 *    ✅ Emotional baselines → StudentEmotionalProfile
 *
 * ✅ 2. CURRICULUM & KNOWLEDGE MODEL
 *    ✅ GCSE subject → Subject
 *    ✅ Topic → Topic
 *    ✅ Sub-topic → Topic (self-referential via parent_topic_id)
 *    ✅ Concept dependencies → Concept.prerequisite_concept_ids
 *    ✅ Common misconceptions → Misconception
 *    ✅ Exam relevance → Topic.exam_weight, Topic.typical_mark_allocation
 *    ✅ Command words → CommandWord
 *    ✅ Assessment shapes → Concept.typical_assessment_types
 *
 * ✅ 3. MENTAL MODEL & UNDERSTANDING STATE
 *    ✅ Per student × topic understanding → StudentTopicUnderstanding
 *    ✅ Understanding classification (4 states) → UnderstandingState
 *    ✅ Identified misconceptions → StudentTopicUnderstanding.identified_misconception_ids
 *    ✅ Error patterns → StudentErrorPattern
 *    ✅ Last interaction timestamp → StudentTopicUnderstanding.last_interaction_at
 *    ✅ Confidence trend → StudentTopicUnderstanding.confidence_trend
 *    ✅ Dynamic and mutable → All fields are updateable
 *
 * ✅ 4. REVISION PLAN MODEL
 *    ✅ Plan owner → RevisionPlan.student_id
 *    ✅ Subjects included → RevisionPlan.subject_ids
 *    ✅ Topic prioritisation bands → PlanTopicAssignment.revision_band
 *    ✅ Revision rhythm → RevisionPlan.rhythm
 *    ✅ Technique assignments → PlanTopicAssignment.assigned_technique_ids
 *    ✅ Adaptation history → PlanAdaptationLog
 *    ✅ Continuously updated → PlanStatus, last_adaptation_at
 *
 * ✅ 5. LEARNING TECHNIQUES & DELIVERY MODES
 *    ✅ Technique type → LearningTechnique.technique_type
 *    ✅ Suitability rules → LearningTechnique.suitable_* fields
 *    ✅ Output artefacts → LearningTechnique.artefact_types
 *    ✅ Audio scripts → AudioRevisionScript
 *    ✅ Audio files → AudioFile
 *    ✅ Flashcard sets → FlashcardSet, Flashcard
 *    ✅ Printable PDFs → PrintableResource
 *    ✅ Generation metadata → All artefact entities have timestamps and source
 *
 * ✅ 6. AUDIO LEARNING SYSTEM
 *    ✅ Audio revision script → AudioRevisionScript
 *    ✅ Script personalisation → AudioRevisionScript.student_name_used
 *    ✅ Duration targets → AudioRevisionScript.target_duration_minutes
 *    ✅ Topic focus → AudioRevisionScript.topic_id
 *    ✅ Revision phase → AudioRevisionScript.revision_phase
 *    ✅ Voice metadata → AudioFile.voice_provider, voice_id, voice_name
 *
 * ✅ 7. SESSION & INTERACTION TRACKING
 *    ✅ Session start/end → LearningSession.started_at, ended_at
 *    ✅ Topics touched → LearningSession.primary_topic_ids
 *    ✅ Techniques used → LearningSession.technique_ids
 *    ✅ Student responses → SessionInteraction.student_input
 *    ✅ Completion status → LearningSession.completion_status
 *    ✅ Signals (hesitation, confidence, fatigue) → SessionSignals
 *
 * ✅ 8. PROGRESS & GROWTH TRACKING
 *    ✅ Knowledge movement → UnderstandingStateHistory
 *    ✅ Misconception resolution → MisconceptionResolutionLog
 *    ✅ Engagement consistency → EngagementWeeklyRecord
 *    ✅ Momentum vs avoidance → EngagementWeeklyRecord.momentum_score
 *    ✅ Technique effectiveness → StudentTechniqueEffectiveness
 *    ✅ No grades/scores → All metrics are growth-oriented
 *
 * ✅ 9. AGENT STATE & DECISION LOGIC
 *    ✅ Current phase → AgentSessionState.current_phase
 *    ✅ Decision inputs → AgentDecision.inputs_considered
 *    ✅ Decision outputs → AgentDecision.decision
 *    ✅ Guardrails → AgentSessionState.guardrails_active
 *    ✅ Stateful system → AgentSessionState persists within session
 *
 * ✅ 10. TIME AWARENESS
 *    ✅ Exam dates stored → ExamSchedule
 *    ✅ Revision phase inferred → StudentTimeContext.current_revision_phase
 *    ✅ Time pressure surfacing rules → StudentTimeContext.should_surface_time
 *    ✅ Panic detection → PanicDetectionState
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * SCHEMA COMPLETE
 * ═══════════════════════════════════════════════════════════════════════════════
 */
