import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Sessions API
 *
 * POST /api/sessions - Create a new learning session
 * GET /api/sessions - Get the current active session or recent sessions
 *
 * Schema Mapping:
 * - learning_sessions table
 * - Linked to auth.users via student_id
 */

// Create a new session
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { session_type = "freeform", primary_subject_id, subject_code } = body;

    // If subject_code is provided, look up the subject ID
    let resolvedSubjectId = primary_subject_id;
    if (subject_code && !primary_subject_id) {
      const { data: subject } = await supabase
        .from("subjects")
        .select("id")
        .eq("code", subject_code.toUpperCase())
        .single();

      if (subject) {
        resolvedSubjectId = subject.id;
      }
    }

    // Create new session
    const { data: session, error } = await supabase
      .from("learning_sessions")
      .insert({
        student_id: user.id,
        session_type,
        primary_subject_id: resolvedSubjectId,
        agent_phase: "greeting",
        completion_status: "in_progress",
      })
      .select()
      .single();

    if (error) {
      console.error("Session creation error:", error);
      return NextResponse.json(
        { error: "Failed to create session" },
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

// Get active or recent sessions
export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the most recent active session, or the last 5 sessions
    const { data: sessions, error } = await supabase
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
      .eq("student_id", user.id)
      .order("started_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Sessions fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch sessions" },
        { status: 500 }
      );
    }

    // Find active session (in_progress)
    const activeSession = sessions?.find(
      (s) => s.completion_status === "in_progress"
    );

    return NextResponse.json({
      activeSession: activeSession || null,
      recentSessions: sessions || [],
    });
  } catch (error) {
    console.error("Sessions API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
