# MyRevisionary Platform — Supabase Schema & Data-Flow Audit

**Project Path:** `/Users/ellie/RevIsion`
**Audit Date:** 2026-01-11
**Auditor:** Principal Backend Architect

---

## MASTER AUDIT TABLE

| Table / Bucket | Purpose | Written By (API / Code) | Read By (API / UI) | Correctly Wired? | Issues / Notes |
|----------------|---------|-------------------------|-------------------|------------------|----------------|
| **auth.users** | Supabase Auth identity | Supabase Auth (signup/login) | All authenticated routes via `auth.getUser()` | YES | Working correctly |
| **profiles** | Student profile (name, institution) | Trigger `on_auth_user_created`, `/api/subjects` (update `subjects_selected`) | Dashboard page, `/api/email/*` routes, onboarding | YES | Auto-created on signup |
| **subjects** | GCSE curriculum catalog (18 subjects) | Seed migration only | `/api/subjects`, `/api/sessions`, `/api/subjects/[code]/*` | YES | Read-only reference table |
| **student_subjects** | Student - Subject enrollment | `/api/subjects` POST (delete + insert) | Dashboard, `/api/subjects` GET, `/api/subjects/[code]/progress` | YES | Correctly wired |
| **learning_sessions** | Chat session container | `/api/sessions` POST | `/api/sessions` GET, `/api/sessions/[id]` GET/PATCH, Dashboard history | YES | Core table, working |
| **session_messages** | Persistent chat history | `/api/sessions/[id]/messages` POST | `/api/sessions/[id]/messages` GET, Chat UI | YES | Core table, working |
| **revision_session_state** | Controller state machine | `/api/revision` POST (upsert) | `/api/revision` POST (read before update) | YES | Per-session controller state |
| **evaluation_log** | Assessment evidence trail | `/api/revision` POST (insert) | None in UI | PARTIAL | Written but never displayed |
| **revision_progress** | Learning evidence per topic per session | `/api/revision` POST (insert/update) | `/api/progress/subjects` GET - Dashboard progress | YES | Aggregated for UI |
| **topic_progress** | Granular curriculum tracking | `/api/subjects/[code]/progress` POST (upsert) | `/api/subjects/[code]/progress` GET, `/api/subjects/[code]/continue` | YES | Triggers `update_subject_progress()` |
| **session_continuity** | Resume context per subject | `/api/subjects/[code]/progress` POST (upsert) | `/api/subjects/[code]/continue` GET | YES | Enables "continue where you left off" |
| **revision_plans** | Adaptive study plans | **NEVER WRITTEN** | `/api/subjects/[code]/progress` GET, `/api/subjects/[code]/continue` GET | NO | **READ BUT NEVER WRITTEN** — always returns empty |
| **topic_mastery** | Long-term topic mastery | **NEVER WRITTEN** | None | NO | **SCHEMA ONLY** — defined but unused |
| **questions** | VARK assessment questions | Seed migration | Assessment page (client-side read) | YES | Working |
| **question_options** | VARK answer choices | Seed migration | Assessment page (client-side read) | YES | Working |
| **assessments** | Assessment session tracking | Assessment page (client-side insert) | Results page, History page | YES | Working |
| **assessment_responses** | User answer submissions | Assessment page (client-side insert) | None directly | YES | Used for score calculation |
| **results** | VARK assessment scores | Assessment page (client-side insert) | Dashboard, My Profile, Results page, email APIs | YES | Primary learning profile source |
| **study_tips** | Personalized study advice | Seed migration | Results page | YES | Read-only reference |
| **student_vark_profiles** | Extended VARK profile | **NEVER WRITTEN** | `/api/email/welcome`, `/api/email/weekly-progress` | NO | **Email reads null data** |
| **student_behaviour_profiles** | Behaviour analytics | **NEVER WRITTEN** | None | NO | **DEAD TABLE** |
| **student_emotional_profiles** | Emotional state tracking | **NEVER WRITTEN** | None | NO | **DEAD TABLE** |
| **student_topic_understanding** | Topic understanding state | **NEVER WRITTEN** | `/api/email/weekly-progress` | NO | **Email reads null data** |
| **student_concept_understanding** | Concept understanding | **NEVER WRITTEN** | None | NO | **DEAD TABLE** |
| **student_error_patterns** | Error pattern tracking | **NEVER WRITTEN** | None | NO | **DEAD TABLE** |
| **plan_topic_assignments** | Plan - Topic mapping | **NEVER WRITTEN** | None | NO | **DEAD TABLE** |
| **plan_adaptation_logs** | Plan change audit trail | **NEVER WRITTEN** | None | NO | **DEAD TABLE** |
| **learning_techniques** | Technique catalog | **NEVER WRITTEN** | None | NO | **DEAD TABLE** |
| **student_technique_effectiveness** | Technique effectiveness | **NEVER WRITTEN** | None | NO | **DEAD TABLE** |
| **audio_revision_scripts** | TTS script storage | **NEVER WRITTEN** | None | NO | **DEAD TABLE** — audio returned as base64 |
| **audio_files** | Audio file metadata | **NEVER WRITTEN** | None | NO | **DEAD TABLE** — no storage bucket exists |
| **flashcard_sets** | Flashcard collections | **NEVER WRITTEN** | None | NO | **DEAD TABLE** |
| **flashcards** | Individual flashcards | **NEVER WRITTEN** | None | NO | **DEAD TABLE** |
| **understanding_state_history** | State change audit | **NEVER WRITTEN** | `/api/email/weekly-progress` | NO | **Email reads null data** |
| **engagement_weekly_records** | Weekly engagement stats | **NEVER WRITTEN** | `/api/email/weekly-progress` | NO | **Email reads null data** |
| **printable_resources** | PDF/printable metadata | **NEVER WRITTEN** | None | NO | **DEAD TABLE** |
| **Storage: audio** | TTS audio files | **NOT CONFIGURED** | None | NO | **Bucket does not exist** |
| **Storage: uploads** | Image uploads | **NOT CONFIGURED** | None | NO | **Bucket does not exist** — OCR images discarded |
| **Storage: documents** | Document storage | **NOT CONFIGURED** | None | NO | **Bucket does not exist** |

---

## API - DATA VERIFICATION

### APIs That Write Data Never Used

| API Route | Table Written | Issue |
|-----------|---------------|-------|
| `/api/revision` | `evaluation_log` | Written on every evaluation but **never displayed in UI** |

### APIs That Read Stale/Empty Data

| API Route | Table Read | Issue |
|-----------|-----------|-------|
| `/api/subjects/[code]/progress` | `revision_plans` | **Always returns empty** — never written |
| `/api/subjects/[code]/continue` | `revision_plans` | **Always returns empty** — never written |
| `/api/email/welcome` | `student_vark_profiles` | **Returns null** — never written (fallback to `results` table exists) |
| `/api/email/weekly-progress` | `student_vark_profiles`, `understanding_state_history`, `student_topic_understanding`, `engagement_weekly_records` | **All return null** — never written |

### Storage Buckets Never Referenced

| Bucket | Status |
|--------|--------|
| `audio` | Schema references `file_path` field but bucket never created, audio returned as base64 in memory |
| `uploads` | No bucket configured, OCR images processed in-memory and discarded |
| `documents` | No bucket configured, `pdf_path` field in schema never populated |

---

## RLS & SECURITY CHECK

| Table | RLS Enabled | Policy Pattern | Risk Assessment |
|-------|-------------|----------------|-----------------|
| `profiles` | Yes | `auth.uid() = id` | LOW |
| `student_subjects` | Yes | `auth.uid() = student_id` | LOW |
| `learning_sessions` | Yes | `auth.uid() = student_id` | LOW |
| `session_messages` | Yes | Via `learning_sessions.student_id` subquery | LOW |
| `revision_session_state` | Yes | `auth.uid() = student_id` | LOW |
| `evaluation_log` | Yes | Via `learning_sessions.student_id` subquery | LOW |
| `revision_progress` | Yes | `auth.uid() = student_id` | LOW |
| `topic_progress` | Yes | `auth.uid() = student_id` | LOW |
| `session_continuity` | Yes | `auth.uid() = student_id` | LOW |
| `revision_plans` | Yes | `auth.uid() = student_id` | LOW |
| `topic_mastery` | Yes | `auth.uid() = student_id` | LOW |
| `subjects` | Yes | Public SELECT | LOW — intentional |
| `questions` | Yes | Public SELECT | LOW — intentional |
| `question_options` | Yes | Public SELECT | LOW — intentional |
| `study_tips` | Yes | Public SELECT | LOW — intentional |
| `assessments` | Yes | `auth.uid() = user_id` | LOW |
| `results` | Yes | `auth.uid() = user_id` | LOW |

**Security Summary:** RLS is correctly applied on all user-data tables. No cross-user data access risks detected.

---

## SCHEMA HEALTH SUMMARY

### 1. Healthy Tables

Tables that are correctly written, read, and displayed:

| Table | Status |
|-------|--------|
| `auth.users` | Core auth |
| `profiles` | Auto-created, updated |
| `subjects` | Reference data |
| `student_subjects` | Full CRUD |
| `learning_sessions` | Core chat |
| `session_messages` | Core chat |
| `revision_session_state` | Controller state |
| `revision_progress` | Learning evidence |
| `topic_progress` | Topic tracking |
| `session_continuity` | Resume context |
| `questions` | VARK system |
| `question_options` | VARK system |
| `assessments` | VARK system |
| `assessment_responses` | VARK system |
| `results` | VARK system |
| `study_tips` | VARK system |

### 2. At-Risk Tables

Tables that are partially wired or misleading:

| Table | Issue | Impact |
|-------|-------|--------|
| `revision_plans` | **Read by 2 API routes but NEVER written** | Progress API returns empty `revision_plans`, UI shows no plan data |
| `evaluation_log` | Written on every evaluation but **never read/displayed** | Data accumulates with no visibility; analytics opportunity lost |
| `student_vark_profiles` | Read by email APIs but **never written** | Welcome/progress emails show null learning profile (fallback exists for welcome) |

### 3. Dead / Redundant Tables

Tables that should be removed, deprecated, or explicitly deferred:

| Table | Status | Recommendation |
|-------|--------|----------------|
| `topic_mastery` | Never written, never read | **REMOVE** or implement writes |
| `student_behaviour_profiles` | Never used | **REMOVE** |
| `student_emotional_profiles` | Never used | **REMOVE** |
| `student_topic_understanding` | Never written, email reads fail | **REMOVE** or implement writes |
| `student_concept_understanding` | Never used | **REMOVE** |
| `student_error_patterns` | Never used | **REMOVE** |
| `plan_topic_assignments` | Never used | **REMOVE** |
| `plan_adaptation_logs` | Never used | **REMOVE** |
| `learning_techniques` | Never used | **REMOVE** |
| `student_technique_effectiveness` | Never used | **REMOVE** |
| `audio_revision_scripts` | Never used | **REMOVE** |
| `audio_files` | Never used, no storage bucket | **REMOVE** |
| `flashcard_sets` | Never used | **REMOVE** |
| `flashcards` | Never used | **REMOVE** |
| `understanding_state_history` | Never written, email reads fail | **REMOVE** |
| `engagement_weekly_records` | Never written, email reads fail | **REMOVE** |
| `printable_resources` | Never used | **REMOVE** |

**Total Dead Tables: 17**

### 4. Single Source of Truth Violations

| Domain | Competing Tables | Issue |
|--------|-----------------|-------|
| **Progress/Mastery Tracking** | `topic_progress`, `revision_progress`, `topic_mastery` | THREE tables track similar progress data with different schemas and granularity. `topic_progress` uses `subject_code`, `revision_progress` uses `topic_id`, `topic_mastery` exists but is never written. |
| **Learning Profile** | `results`, `student_vark_profiles` | VARK data lives in `results` (functional) but comprehensive schema expects `student_vark_profiles` (never written). Email APIs try to read both. |
| **Understanding State** | `topic_progress.understanding_state`, `revision_progress.understanding_state`, `student_topic_understanding.understanding_state` | THREE different understanding state fields with incompatible enum values (`not_started/forgotten/partial/fragile/secure` vs `building/strengthening/secure` vs `not_understood/partially_understood/understood_fragile/secure`) |

---

## CRITICAL FINDINGS

1. **17 dead tables** exist in the schema that consume migration complexity but provide no value
2. **Weekly progress email** (`/api/email/weekly-progress`) queries 4 tables that are never written to — emails will contain null/empty data
3. **`revision_plans`** is read by progress APIs but never written — UI shows "no plan" even though the feature appears implemented
4. **`topic_mastery`** was designed for long-term mastery tracking across sessions but is completely unused
5. **Audio/file storage** is architected in schema but no Supabase storage buckets exist — audio is returned as base64 and discarded
6. **Progress tracking** has three competing tables with incompatible schemas and no clear source of truth

---

## LAUNCH READINESS ASSESSMENT

| Criterion | Status | Notes |
|-----------|--------|-------|
| Core chat functionality | READY | Sessions, messages, revision state working |
| VARK assessment | READY | Full flow functional |
| Progress tracking | PARTIAL | `revision_progress` works, but `revision_plans` empty, `topic_mastery` dead |
| Email notifications | BROKEN | Weekly progress email queries dead tables |
| Audio learning | PARTIAL | TTS works but audio not persisted |
| Flashcards | NOT IMPLEMENTED | Schema exists, no code |
| Printables/PDFs | NOT IMPLEMENTED | Schema exists, no code |

**Overall: Platform is functional for core revision chat but has significant dead schema weight and broken email features.**
