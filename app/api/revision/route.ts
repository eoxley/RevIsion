/**
 * Controlled Revision API
 *
 * This API uses the Revision Session Controller (RSC) to enforce
 * structured revision sessions.
 *
 * The controller decides WHAT happens.
 * The LLM decides HOW it is said.
 *
 * Flow:
 * 1. Evaluate student answer
 * 2. Update session state
 * 3. Determine next action
 * 4. Generate constrained LLM response
 * 5. Persist everything
 */

import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  processRevisionTurn,
  initializeSession,
  getConstrainedSystemPrompt,
  extractQuestionFromResponse,
  type RevisionSessionState,
  type LearningStyle,
  type ControllerInput,
} from "@/lib/revision/controller";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface RequestBody {
  message: string;
  session_id: string;
  topic_id?: string;
  topic_name?: string;
  subject_code?: string;
  subject_name?: string;
  learning_style?: LearningStyle;
  message_history?: Array<{ role: "user" | "assistant"; content: string }>;
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
    } = body;

    // ═══════════════════════════════════════════════════════════
    // LOAD OR CREATE SESSION STATE
    // ═══════════════════════════════════════════════════════════

    let sessionState = await loadSessionState(supabase, session_id);

    if (!sessionState) {
      // Initialize new session state
      sessionState = initializeSession(
        session_id,
        user.id,
        topic_id || null,
        topic_name || null
      );

      // Persist initial state
      await saveSessionState(supabase, sessionState);
    }

    // ═══════════════════════════════════════════════════════════
    // PROCESS REVISION TURN (CONTROLLER)
    // ═══════════════════════════════════════════════════════════

    const controllerInput: ControllerInput = {
      student_message: message,
      session_id,
      current_topic_id: sessionState.topic_id,
      current_topic_name: sessionState.topic_name,
      agent_phase: sessionState.phase,
      session_state: sessionState,
      message_history: message_history.slice(-10), // Last 10 messages
      learning_style: learning_style || null,
      subject_code: subject_code || null,
      subject_name: subject_name || null,
    };

    const controllerOutput = await processRevisionTurn(controllerInput);

    // ═══════════════════════════════════════════════════════════
    // GENERATE CONSTRAINED LLM RESPONSE
    // ═══════════════════════════════════════════════════════════

    const systemPrompt = getConstrainedSystemPrompt(
      controllerOutput.llm_instructions
    );

    // Build messages for LLM
    const llmMessages = [
      { role: "system" as const, content: systemPrompt },
      ...message_history.slice(-6).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: message },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: llmMessages,
      stream: true,
      temperature: 0.7,
      max_tokens: 500,
    });

    // ═══════════════════════════════════════════════════════════
    // STREAM RESPONSE
    // ═══════════════════════════════════════════════════════════

    const encoder = new TextEncoder();
    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content || "";
            fullResponse += text;
            controller.enqueue(encoder.encode(text));
          }

          // After streaming complete, extract question and update state
          const { question, answerHint } =
            extractQuestionFromResponse(fullResponse);

          if (question) {
            controllerOutput.updated_state.current_question = question;
            controllerOutput.updated_state.expected_answer_hint = answerHint;
          }

          // Persist updated state
          await saveSessionState(supabase, controllerOutput.updated_state);

          // Log evaluation if present
          if (controllerOutput.evaluation) {
            await logEvaluation(supabase, {
              session_id,
              evaluation: controllerOutput.evaluation,
              topic_id: sessionState.topic_id,
              topic_name: sessionState.topic_name,
              question_asked: sessionState.current_question,
              student_answer: message,
              action_taken: controllerOutput.next_action,
            });
          }

          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Action": controllerOutput.next_action,
        "X-Phase": controllerOutput.updated_phase,
        "X-Evaluation": controllerOutput.evaluation?.evaluation || "none",
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
  action_taken: string;
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
