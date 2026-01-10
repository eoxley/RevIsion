import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Session API - Individual Session Operations
 *
 * GET /api/sessions/[sessionId] - Get session with messages
 * PATCH /api/sessions/[sessionId] - Update session (agent_phase, completion_status)
 *
 * Schema Mapping:
 * - learning_sessions table
 * - session_messages table (for messages)
 */

interface RouteParams {
  params: Promise<{ sessionId: string }>;
}

// Get session with messages
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { sessionId } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get session
    const { data: session, error: sessionError } = await supabase
      .from("learning_sessions")
      .select(
        `
        *,
        subjects (
          id,
          code,
          display_name
        )
      `
      )
      .eq("id", sessionId)
      .eq("student_id", user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Get messages for this session
    const { data: messages, error: messagesError } = await supabase
      .from("session_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("sequence_number", { ascending: true });

    if (messagesError) {
      console.error("Messages fetch error:", messagesError);
      return NextResponse.json(
        { error: "Failed to fetch messages" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      session,
      messages: messages || [],
    });
  } catch (error) {
    console.error("Session API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update session
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { sessionId } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { agent_phase, completion_status, session_summary, ended_at } = body;

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {};
    if (agent_phase) updateData.agent_phase = agent_phase;
    if (completion_status) updateData.completion_status = completion_status;
    if (session_summary) updateData.session_summary = session_summary;
    if (ended_at) updateData.ended_at = ended_at;

    // Calculate duration if ending
    if (completion_status === "completed" || completion_status === "partial") {
      updateData.ended_at = new Date().toISOString();
    }

    const { data: session, error } = await supabase
      .from("learning_sessions")
      .update(updateData)
      .eq("id", sessionId)
      .eq("student_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Session update error:", error);
      return NextResponse.json(
        { error: "Failed to update session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
