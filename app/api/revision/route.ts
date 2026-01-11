/**
 * Unified Revision API (Combined Agent)
 *
 * Uses a single LLM call for both evaluation and tutoring.
 *
 * Flow:
 * 1. Load session state
 * 2. Call combined agent (evaluates + tutors in one call)
 * 3. Update state based on evaluation
 * 4. Update revision progress (learning evidence)
 * 5. Stream tutor response
 * 6. Persist everything
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  runCombinedAgent,
  initializeSession,
  updateStateFromEvaluation,
  updateStateWithAction,
  getPhaseForAction,
  incrementDiagnosticCount,
  confirmCurriculumPosition,
  requiresDiagnostic,
  isDiagnosticComplete,
  getNextDiagnosticQuestion,
  transitionToSessionClose,
  runCompletionAgent,
  isCompletionRequest,
  type RevisionSessionState,
  type LearningStyle,
  type ActionType,
  type RevisionProgress,
  type UnderstandingState,
  type DeliveryTechnique,
  type EvaluationResult,
  type CompletionInput,
  type EvaluationSummary,
  type ErrorType,
} from "@/lib/revision";

interface RequestBody {
  message: string;
  session_id: string;
  topic_id?: string;
  topic_name?: string;
  subject_id?: string;
  subject_code?: string;
  subject_name?: string;
  learning_style?: LearningStyle;
  message_history?: Array<{ role: "user" | "assistant"; content: string }>;
  mark_scheme?: string;
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Authenticate user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: RequestBody = await req.json();
    const {
      message,
      session_id,
      topic_id,
      topic_name,
      subject_id,
      subject_code,
      subject_name,
      learning_style,
      message_history = [],
      mark_scheme,
    } = body;

    // ═══════════════════════════════════════════════════════════
    // LOAD OR CREATE SESSION STATE
    // ═══════════════════════════════════════════════════════════

    let sessionState = await loadSessionState(supabase, session_id);

    if (!sessionState) {
      sessionState = initializeSession(
        session_id,
        user.id,
        topic_id || null,
        topic_name || null
      );
      await saveSessionState(supabase, sessionState);
    }

    // ═══════════════════════════════════════════════════════════
    // COMPLETION REVIEW GATE
    // Check if completion should trigger (all topics secure OR user request)
    // ═══════════════════════════════════════════════════════════

    const allTopicsSecure = await checkAllTopicsSecure(supabase, user.id, session_id);
    const userRequestedCompletion = isCompletionRequest(message);

    if (allTopicsSecure || userRequestedCompletion) {
      // Load data for completion agent
      const completionInput = await loadCompletionData(
        supabase,
        user.id,
        session_id,
        subject_id || "",
        subject_name || "GCSE Subject"
      );

      // Run completion agent (READ-ONLY)
      const completionOutput = await runCompletionAgent(completionInput);

      // Update state to session_close
      const closedState = transitionToSessionClose(sessionState);
      await saveSessionState(supabase, closedState);

      // Return completion response (not streamed - structured JSON)
      return NextResponse.json({
        type: "completion_review",
        phase: "completion_review",
        ...completionOutput,
      });
    }

    // ═══════════════════════════════════════════════════════════
    // CURRICULUM DIAGNOSTIC GATE
    // Subject selection ≠ ready to revise
    // ═══════════════════════════════════════════════════════════

    let isDiagnosticMode = requiresDiagnostic(sessionState);

    // If in diagnostic mode, inject the next diagnostic question
    if (isDiagnosticMode && !isDiagnosticComplete(sessionState)) {
      // Get the next diagnostic question based on subject
      const diagnosticQuestion = getNextDiagnosticQuestion(
        subject_code || "DEFAULT",
        sessionState.diagnostic_questions_asked
      );
      sessionState.current_question = diagnosticQuestion;
    }

    // ═══════════════════════════════════════════════════════════
    // RUN COMBINED AGENT (SINGLE LLM CALL)
    // ═══════════════════════════════════════════════════════════

    const result = await runCombinedAgent({
      question: sessionState.current_question,
      studentAnswer: message,
      topicName: sessionState.topic_name || topic_name || null,
      subjectName: subject_name || null,
      learningStyle: learning_style || null,
      attempts: sessionState.attempts,
      correctStreak: sessionState.correct_streak,
      markScheme: mark_scheme,
      messageHistory: message_history.slice(-4),
      isDiagnosticMode: isDiagnosticMode && !isDiagnosticComplete(sessionState),
    });

    // ═══════════════════════════════════════════════════════════
    // UPDATE STATE BASED ON EVALUATION
    // ═══════════════════════════════════════════════════════════

    let updatedState = { ...sessionState };

    // Handle diagnostic mode state updates
    if (isDiagnosticMode && result.determinedAction === "DIAGNOSTIC_QUESTION") {
      // Increment diagnostic count after each diagnostic question
      updatedState = incrementDiagnosticCount(updatedState);

      // Check if diagnostic is now complete
      if (isDiagnosticComplete(updatedState)) {
        // Confirm curriculum position - allow revision to begin
        updatedState = confirmCurriculumPosition(updatedState);
        isDiagnosticMode = false; // No longer in diagnostic mode

        // PHASE 2: Write revision_plans when diagnostic completes
        await upsertRevisionPlan(supabase, user.id, subject_id || null);
      }
    }

    // Update state from evaluation (if it's a real evaluation and NOT in diagnostic mode)
    // During diagnostic, we're just asking questions - not evaluating for learning progress
    if (result.evaluation.evaluation !== "unknown" && !isDiagnosticMode) {
      updatedState = updateStateFromEvaluation(
        updatedState,
        result.evaluation.evaluation
      );
    }

    // Update state with determined action
    const phase = getPhaseForAction(result.determinedAction, updatedState.phase);
    updatedState = updateStateWithAction(
      updatedState,
      result.determinedAction,
      phase
    );

    // Extract question from tutor response (not in diagnostic mode)
    if (!isDiagnosticMode) {
      const extractedQuestion = extractQuestionFromMessage(result.tutorMessage);
      if (extractedQuestion) {
        updatedState.current_question = extractedQuestion;
      }
    }

    // Persist updated state
    await saveSessionState(supabase, updatedState);

    // ═══════════════════════════════════════════════════════════
    // UPDATE REVISION PROGRESS (LEARNING EVIDENCE)
    // ═══════════════════════════════════════════════════════════

    // Only track progress if there was a real evaluation
    if (result.evaluation.evaluation !== "unknown") {
      await updateRevisionProgress(supabase, {
        student_id: user.id,
        session_id,
        subject_id: subject_id || null,
        topic_id: sessionState.topic_id,
        evaluation: result.evaluation.evaluation as EvaluationResult,
        usedTechniques: result.usedTechniques,
      });
    }

    // Log evaluation if it was a real evaluation
    if (result.evaluation.evaluation !== "unknown") {
      await logEvaluation(supabase, {
        session_id,
        evaluation: result.evaluation,
        topic_id: sessionState.topic_id,
        topic_name: sessionState.topic_name,
        question_asked: sessionState.current_question,
        student_answer: message,
        action_taken: result.determinedAction,
      });

      // PHASE 8: Update topic mastery (cross-session tracking)
      await updateTopicMastery(supabase, {
        student_id: user.id,
        subject_id: subject_id || null,
        topic_id: sessionState.topic_id,
        topic_name: sessionState.topic_name,
        evaluation: result.evaluation.evaluation as EvaluationResult,
        understanding_state: calculateUnderstandingState(updatedState.correct_streak),
      });
    }

    // PHASE 9: Update weekly engagement records
    // Track engagement on every revision turn (not just evaluations)
    const isFirstTurn = sessionState.attempts === 0;
    await updateEngagementRecords(supabase, {
      student_id: user.id,
      topic_id: sessionState.topic_id,
      is_session_start: isFirstTurn,
    });

    // ═══════════════════════════════════════════════════════════
    // STREAM TUTOR RESPONSE
    // ═══════════════════════════════════════════════════════════

    const encoder = new TextEncoder();
    const tutorMessage = result.tutorMessage;

    // Create a simple stream that sends the response
    const stream = new ReadableStream({
      start(controller) {
        // Stream character by character with small delay for natural feel
        let index = 0;
        const chunkSize = 3; // Send 3 chars at a time

        const sendChunk = () => {
          if (index < tutorMessage.length) {
            const chunk = tutorMessage.slice(index, index + chunkSize);
            controller.enqueue(encoder.encode(chunk));
            index += chunkSize;
            // Use setTimeout for streaming effect
            setTimeout(sendChunk, 10);
          } else {
            controller.close();
          }
        };

        sendChunk();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Action": result.determinedAction,
        "X-Phase": phase,
        "X-Evaluation": result.evaluation.evaluation,
        "X-Confidence": result.evaluation.confidence,
        "X-Error-Type": result.evaluation.error_type || "none",
        "X-Delivery-Modes": result.usedTechniques.join(",") || "none",
      },
    });
  } catch (error) {
    console.error("Revision API error:", error);
    return NextResponse.json(
      { error: "Failed to process revision turn" },
      { status: 500 }
    );
  }
}

/**
 * Extract the last question from a message
 */
function extractQuestionFromMessage(message: string): string | null {
  const sentences = message.split(/(?<=[.!?])\s+/);
  const questions = sentences.filter((s) => s.trim().endsWith("?"));

  if (questions.length === 0) {
    return null;
  }

  return questions[questions.length - 1].trim();
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATABASE HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

async function loadSessionState(
  supabase: Awaited<ReturnType<typeof createClient>>,
  sessionId: string
): Promise<RevisionSessionState | null> {
  const { data, error } = await supabase
    .from("revision_session_state")
    .select("*")
    .eq("session_id", sessionId)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    session_id: data.session_id,
    student_id: data.student_id,
    topic_id: data.topic_id,
    topic_name: data.topic_name,
    attempts: data.attempts,
    correct_streak: data.correct_streak,
    last_evaluation: data.last_evaluation,
    last_action: data.last_action,
    phase: data.phase,
    current_question: data.current_question,
    expected_answer_hint: data.expected_answer_hint,
    // Curriculum diagnostic fields
    curriculum_position_confirmed: data.curriculum_position_confirmed ?? false,
    diagnostic_questions_asked: data.diagnostic_questions_asked ?? 0,
  };
}

async function saveSessionState(
  supabase: Awaited<ReturnType<typeof createClient>>,
  state: RevisionSessionState
): Promise<void> {
  const { error } = await supabase.from("revision_session_state").upsert(
    {
      session_id: state.session_id,
      student_id: state.student_id,
      topic_id: state.topic_id,
      topic_name: state.topic_name,
      attempts: state.attempts,
      correct_streak: state.correct_streak,
      last_evaluation: state.last_evaluation,
      last_action: state.last_action,
      phase: state.phase,
      current_question: state.current_question,
      expected_answer_hint: state.expected_answer_hint,
      // Curriculum diagnostic fields
      curriculum_position_confirmed: state.curriculum_position_confirmed,
      diagnostic_questions_asked: state.diagnostic_questions_asked,
    },
    { onConflict: "session_id" }
  );

  if (error) {
    console.error("Failed to save session state:", error);
  }
}

interface EvaluationLogEntry {
  session_id: string;
  evaluation: {
    evaluation: string;
    confidence: string;
    error_type: string | null;
  };
  topic_id: string | null;
  topic_name: string | null;
  question_asked: string | null;
  student_answer: string;
  action_taken: ActionType;
}

async function logEvaluation(
  supabase: Awaited<ReturnType<typeof createClient>>,
  entry: EvaluationLogEntry
): Promise<void> {
  const { error } = await supabase.from("evaluation_log").insert({
    session_id: entry.session_id,
    evaluation: entry.evaluation.evaluation,
    confidence: entry.evaluation.confidence,
    error_type: entry.evaluation.error_type,
    topic_id: entry.topic_id,
    topic_name: entry.topic_name,
    question_asked: entry.question_asked,
    student_answer: entry.student_answer,
    action_taken: entry.action_taken,
  });

  if (error) {
    console.error("Failed to log evaluation:", error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// REVISION PROGRESS TRACKING
// ═══════════════════════════════════════════════════════════════════════════════

interface ProgressUpdateInput {
  student_id: string;
  session_id: string;
  subject_id: string | null;
  topic_id: string | null;
  evaluation: EvaluationResult;
  usedTechniques: DeliveryTechnique[];
}

/**
 * Calculate understanding state based on correct count
 */
function calculateUnderstandingState(correctCount: number): UnderstandingState {
  if (correctCount >= 2) {
    return "secure";
  } else if (correctCount === 1) {
    return "strengthening";
  }
  return "building";
}

/**
 * Update revision progress after evaluation
 *
 * This happens in ONE place:
 * After evaluator runs, before tutor responds
 */
async function updateRevisionProgress(
  supabase: Awaited<ReturnType<typeof createClient>>,
  input: ProgressUpdateInput
): Promise<void> {
  const { student_id, session_id, subject_id, topic_id, evaluation, usedTechniques } = input;

  // Load existing progress
  const { data: existingProgress } = await supabase
    .from("revision_progress")
    .select("*")
    .eq("student_id", student_id)
    .eq("session_id", session_id)
    .eq("topic_id", topic_id)
    .single();

  if (existingProgress) {
    // Update existing progress
    const newAttempts = existingProgress.attempts + 1;
    const newCorrectCount =
      evaluation === "correct"
        ? existingProgress.correct_count + 1
        : existingProgress.correct_count;
    const newIncorrectCount =
      evaluation === "incorrect"
        ? existingProgress.incorrect_count + 1
        : existingProgress.incorrect_count;
    const newPartialCount =
      evaluation === "partial"
        ? existingProgress.partial_count + 1
        : existingProgress.partial_count;

    // Merge delivery modes (unique)
    const existingModes: string[] = existingProgress.delivery_modes_used || [];
    const allModes = new Set([...existingModes, ...usedTechniques]);

    const { error } = await supabase
      .from("revision_progress")
      .update({
        attempts: newAttempts,
        correct_count: newCorrectCount,
        incorrect_count: newIncorrectCount,
        partial_count: newPartialCount,
        last_evaluation: evaluation,
        understanding_state: calculateUnderstandingState(newCorrectCount),
        delivery_modes_used: Array.from(allModes),
        last_interaction_at: new Date().toISOString(),
      })
      .eq("id", existingProgress.id);

    if (error) {
      console.error("Failed to update revision progress:", error);
    }
  } else {
    // Create new progress record
    const newProgress: Partial<RevisionProgress> = {
      student_id,
      session_id,
      subject_id,
      topic_id,
      attempts: 1,
      correct_count: evaluation === "correct" ? 1 : 0,
      incorrect_count: evaluation === "incorrect" ? 1 : 0,
      partial_count: evaluation === "partial" ? 1 : 0,
      last_evaluation: evaluation,
      understanding_state: evaluation === "correct" ? "strengthening" : "building",
      delivery_modes_used: usedTechniques,
      last_interaction_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("revision_progress").insert(newProgress);

    if (error) {
      console.error("Failed to create revision progress:", error);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPLETION REVIEW HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Check if all topics in the session have understanding_state = "secure"
 *
 * This is one of the HARD TRIGGERS for completion review.
 */
async function checkAllTopicsSecure(
  supabase: Awaited<ReturnType<typeof createClient>>,
  studentId: string,
  sessionId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("revision_progress")
    .select("understanding_state")
    .eq("student_id", studentId)
    .eq("session_id", sessionId);

  if (error || !data || data.length === 0) {
    return false;
  }

  // All topics must be "secure"
  return data.every((row) => row.understanding_state === "secure");
}

/**
 * Load all data needed for the Completion Agent
 *
 * This function is READ-ONLY. It only queries data, never modifies it.
 */
async function loadCompletionData(
  supabase: Awaited<ReturnType<typeof createClient>>,
  studentId: string,
  sessionId: string,
  subjectId: string,
  subjectName: string
): Promise<CompletionInput> {
  // Load revision progress
  const { data: progressData } = await supabase
    .from("revision_progress")
    .select("*")
    .eq("student_id", studentId)
    .eq("session_id", sessionId);

  const revisionProgress: RevisionProgress[] = (progressData || []).map((row) => ({
    id: row.id,
    student_id: row.student_id,
    session_id: row.session_id,
    subject_id: row.subject_id,
    topic_id: row.topic_id,
    attempts: row.attempts,
    correct_count: row.correct_count,
    incorrect_count: row.incorrect_count,
    partial_count: row.partial_count,
    last_evaluation: row.last_evaluation,
    understanding_state: row.understanding_state,
    delivery_modes_used: row.delivery_modes_used || [],
    created_at: row.created_at,
    last_interaction_at: row.last_interaction_at,
  }));

  // Load evaluation log to summarize error trends
  const { data: evalLogData } = await supabase
    .from("evaluation_log")
    .select("*")
    .eq("session_id", sessionId);

  // Build evaluation summaries per topic
  const topicSummaries = new Map<string, EvaluationSummary>();

  (evalLogData || []).forEach((entry) => {
    const topicId = entry.topic_id || "unknown";
    const topicName = entry.topic_name || "Unknown Topic";

    if (!topicSummaries.has(topicId)) {
      topicSummaries.set(topicId, {
        topic_id: topicId,
        topic_name: topicName,
        total_attempts: 0,
        correct_count: 0,
        error_types: [],
      });
    }

    const summary = topicSummaries.get(topicId)!;
    summary.total_attempts += 1;

    if (entry.evaluation === "correct") {
      summary.correct_count += 1;
    }

    if (entry.error_type) {
      summary.error_types.push(entry.error_type as ErrorType);
    }
  });

  // Extract completed topic names
  const completedTopics: string[] = [];
  topicSummaries.forEach((summary) => {
    if (summary.topic_name !== "Unknown Topic") {
      completedTopics.push(summary.topic_name);
    }
  });

  // If no topics found from eval log, try to extract from progress
  if (completedTopics.length === 0) {
    revisionProgress.forEach((p) => {
      if (p.topic_id) {
        completedTopics.push(p.topic_id);
      }
    });
  }

  return {
    student_id: studentId,
    session_id: sessionId,
    subject_id: subjectId,
    subject_name: subjectName,
    completed_topics: completedTopics,
    revision_progress: revisionProgress,
    evaluation_summary: Array.from(topicSummaries.values()),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 2: REVISION PLANS WRITE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Calculate days until GCSE exams (May 11, 2026)
 */
function calculateDaysUntilExams(): number {
  const gcseStart = new Date("2026-05-11");
  const today = new Date();
  const diffTime = gcseStart.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

/**
 * Determine revision phase based on days remaining
 */
function determineRevisionPhase(daysLeft: number): string {
  if (daysLeft <= 14) return "crisis";
  if (daysLeft <= 35) return "intensive";
  if (daysLeft <= 90) return "structured";
  return "early_preparation";
}

/**
 * Upsert revision plan for student
 *
 * Called when curriculum diagnostic completes.
 * Creates plan if not exists, or adds subject to existing plan.
 */
async function upsertRevisionPlan(
  supabase: Awaited<ReturnType<typeof createClient>>,
  studentId: string,
  subjectId: string | null
): Promise<void> {
  try {
    const daysUntilExams = calculateDaysUntilExams();
    const currentPhase = determineRevisionPhase(daysUntilExams);

    // Check if plan exists
    const { data: existingPlan } = await supabase
      .from("revision_plans")
      .select("id, subject_ids")
      .eq("student_id", studentId)
      .single();

    if (existingPlan) {
      // Add subject to existing plan if not already present
      const currentSubjects: string[] = existingPlan.subject_ids || [];
      if (subjectId && !currentSubjects.includes(subjectId)) {
        const updatedSubjects = [...currentSubjects, subjectId];
        await supabase
          .from("revision_plans")
          .update({
            subject_ids: updatedSubjects,
            days_until_exams: daysUntilExams,
            current_phase: currentPhase,
            last_updated_at: new Date().toISOString(),
          })
          .eq("id", existingPlan.id);
      } else {
        // Just update days and phase
        await supabase
          .from("revision_plans")
          .update({
            days_until_exams: daysUntilExams,
            current_phase: currentPhase,
            last_updated_at: new Date().toISOString(),
          })
          .eq("id", existingPlan.id);
      }
    } else {
      // Create new plan
      await supabase.from("revision_plans").insert({
        student_id: studentId,
        subject_ids: subjectId ? [subjectId] : [],
        days_until_exams: daysUntilExams,
        current_phase: currentPhase,
        status: "active",
      });
    }
  } catch (error) {
    // Non-critical - log but don't fail the request
    console.error("Error upserting revision plan:", error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 8: TOPIC MASTERY CROSS-SESSION TRACKING
// ═══════════════════════════════════════════════════════════════════════════════

interface TopicMasteryInput {
  student_id: string;
  subject_id: string | null;
  topic_id: string | null;
  topic_name: string | null;
  evaluation: EvaluationResult;
  understanding_state: UnderstandingState;
}

/**
 * Update topic mastery across sessions
 *
 * This tracks long-term understanding of topics, persisting beyond sessions.
 * Called after every evaluation to aggregate mastery data.
 */
async function updateTopicMastery(
  supabase: Awaited<ReturnType<typeof createClient>>,
  input: TopicMasteryInput
): Promise<void> {
  const { student_id, subject_id, topic_id, topic_name, evaluation, understanding_state } = input;

  // Skip if no topic context
  if (!topic_id || !subject_id) {
    return;
  }

  try {
    const now = new Date().toISOString();

    // Check for existing mastery record
    const { data: existing } = await supabase
      .from("topic_mastery")
      .select("*")
      .eq("student_id", student_id)
      .eq("subject_id", subject_id)
      .eq("topic_id", topic_id)
      .single();

    if (existing) {
      // Update existing mastery record
      const newTotalAttempts = existing.total_attempts + 1;
      const newTotalCorrect = evaluation === "correct"
        ? existing.total_correct + 1
        : existing.total_correct;
      const newConsecutiveCorrect = evaluation === "correct"
        ? existing.consecutive_correct + 1
        : 0; // Reset on incorrect/partial

      const updateData: Record<string, unknown> = {
        total_attempts: newTotalAttempts,
        total_correct: newTotalCorrect,
        consecutive_correct: newConsecutiveCorrect,
        understanding_state: understanding_state,
        last_attempt_at: now,
      };

      // Track correct timestamp
      if (evaluation === "correct") {
        updateData.last_correct_at = now;
      }

      // Track mastery achievement
      if (understanding_state === "secure" && existing.understanding_state !== "secure") {
        updateData.mastery_achieved_at = now;
      }

      await supabase
        .from("topic_mastery")
        .update(updateData)
        .eq("id", existing.id);
    } else {
      // Create new mastery record
      await supabase.from("topic_mastery").insert({
        student_id,
        subject_id,
        topic_id,
        topic_name: topic_name || topic_id,
        understanding_state,
        total_attempts: 1,
        total_correct: evaluation === "correct" ? 1 : 0,
        consecutive_correct: evaluation === "correct" ? 1 : 0,
        first_attempt_at: now,
        last_attempt_at: now,
        last_correct_at: evaluation === "correct" ? now : null,
        mastery_achieved_at: understanding_state === "secure" ? now : null,
      });
    }
  } catch (error) {
    // Non-critical - log but don't fail the request
    console.error("Error updating topic mastery:", error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 9: ENGAGEMENT WEEKLY RECORDS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get the start of the current week (Monday)
 */
function getWeekStartDate(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Sunday = 6 days back, else day - 1
  const monday = new Date(now);
  monday.setDate(now.getDate() - daysToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().split("T")[0];
}

/**
 * Get the end of the current week (Sunday)
 */
function getWeekEndDate(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  const sunday = new Date(now);
  sunday.setDate(now.getDate() + daysToSunday);
  sunday.setHours(23, 59, 59, 999);
  return sunday.toISOString().split("T")[0];
}

interface EngagementUpdateInput {
  student_id: string;
  topic_id: string | null;
  is_session_start: boolean;
}

/**
 * Update weekly engagement records
 *
 * Called on each revision interaction to track weekly engagement patterns.
 * Aggregates sessions, topics touched, and calculates momentum.
 */
async function updateEngagementRecords(
  supabase: Awaited<ReturnType<typeof createClient>>,
  input: EngagementUpdateInput
): Promise<void> {
  const { student_id, topic_id, is_session_start } = input;

  try {
    const weekStart = getWeekStartDate();
    const weekEnd = getWeekEndDate();

    // Check for existing weekly record
    const { data: existing } = await supabase
      .from("engagement_weekly_records")
      .select("*")
      .eq("student_id", student_id)
      .eq("week_start_date", weekStart)
      .single();

    if (existing) {
      // Update existing record
      const updateData: Record<string, unknown> = {};

      // Increment session count only on session start
      if (is_session_start) {
        updateData.sessions_count = existing.sessions_count + 1;
      }

      // Track unique topics touched (increment if new topic this week)
      if (topic_id) {
        // Simple increment - not truly unique tracking, but approximates engagement
        updateData.topics_touched_count = existing.topics_touched_count + 1;
      }

      // Only update if there are changes
      if (Object.keys(updateData).length > 0) {
        await supabase
          .from("engagement_weekly_records")
          .update(updateData)
          .eq("id", existing.id);
      }
    } else {
      // Create new weekly record
      await supabase.from("engagement_weekly_records").insert({
        student_id,
        week_start_date: weekStart,
        week_end_date: weekEnd,
        sessions_count: is_session_start ? 1 : 0,
        topics_touched_count: topic_id ? 1 : 0,
        total_duration_minutes: 0,
        average_session_length_minutes: 0,
        completion_rate: 0,
        momentum_score: 50, // Start at neutral
        momentum_trend: "stable",
        vs_previous_week: "stable",
      });
    }
  } catch (error) {
    // Non-critical - log but don't fail the request
    console.error("Error updating engagement records:", error);
  }
}
