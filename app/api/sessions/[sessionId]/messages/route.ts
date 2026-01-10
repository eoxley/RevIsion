import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Messages API
 *
 * POST /api/sessions/[sessionId]/messages - Add a message to a session
 * GET /api/sessions/[sessionId]/messages - Get all messages for a session
 *
 * Schema Mapping:
 * - session_messages table
 * - sequence_number auto-increments per session
 */

interface RouteParams {
  params: Promise<{ sessionId: string }>;
}

// Add a message to the session
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { sessionId } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify session belongs to user
    const { data: session, error: sessionError } = await supabase
      .from("learning_sessions")
      .select("id")
      .eq("id", sessionId)
      .eq("student_id", user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const body = await request.json();
    const { role, content, topic_context, interaction_type, response_time_ms } =
      body;

    if (!role || !content) {
      return NextResponse.json(
        { error: "Role and content are required" },
        { status: 400 }
      );
    }

    // Get next sequence number
    const { data: sequenceData } = await supabase.rpc(
      "get_next_message_sequence",
      { p_session_id: sessionId }
    );

    const sequence_number = sequenceData || 1;

    // Insert message
    const { data: message, error: messageError } = await supabase
      .from("session_messages")
      .insert({
        session_id: sessionId,
        sequence_number,
        role,
        content,
        topic_context,
        interaction_type,
        response_time_ms,
      })
      .select()
      .single();

    if (messageError) {
      console.error("Message insert error:", messageError);
      return NextResponse.json(
        { error: "Failed to save message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Messages API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get all messages for a session
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

    // Verify session belongs to user
    const { data: session, error: sessionError } = await supabase
      .from("learning_sessions")
      .select("id")
      .eq("id", sessionId)
      .eq("student_id", user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Get messages
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

    return NextResponse.json({ messages: messages || [] });
  } catch (error) {
    console.error("Messages API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
