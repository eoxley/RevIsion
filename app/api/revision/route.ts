/**
 * Unified Revision API (Combined Agent)
 *
 * Uses a single LLM call for both evaluation and tutoring.
 *
 * Flow:
 * 1. Load session state
 * 2. Call combined agent (evaluates + tutors in one call)
 * 3. Update state based on evaluation
 * 4. Stream tutor response
 * 5. Persist everything
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  runCombinedAgent,
  initializeSession,
  updateStateFromEvaluation,
  updateStateWithAction,
  getPhaseForAction,
  type RevisionSessionState,
  type LearningStyle,
  type ActionType,
} from "@/lib/revision";

interface RequestBody {
  message: string;
  session_id: string;
  topic_id?: string;
  topic_name?: string;
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
    });

    // ═══════════════════════════════════════════════════════════
    // UPDATE STATE BASED ON EVALUATION
    // ═══════════════════════════════════════════════════════════

    let updatedState = { ...sessionState };

    // Update state from evaluation (if it's a real evaluation)
    if (result.evaluation.evaluation !== "unknown") {
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

    // Extract question from tutor response
    const extractedQuestion = extractQuestionFromMessage(result.tutorMessage);
    if (extractedQuestion) {
      updatedState.current_question = extractedQuestion;
    }

    // Persist updated state
    await saveSessionState(supabase, updatedState);

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
    }

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
