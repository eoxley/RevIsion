import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Subject Progress API
 *
 * GET /api/subjects/[code]/progress - Get progress for a specific subject
 * POST /api/subjects/[code]/progress - Update progress after a session
 */

interface RouteParams {
  params: Promise<{ code: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { code } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get subject progress from student_subjects
    const { data: subjectProgress, error: subjectError } = await supabase
      .from("student_subjects")
      .select(`
        *,
        subjects (
          id,
          code,
          display_name,
          category
        )
      `)
      .eq("student_id", user.id)
      .eq("subjects.code", code)
      .single();

    if (subjectError && subjectError.code !== "PGRST116") {
      console.error("Error fetching subject progress:", subjectError);
    }

    // Get topic-level progress
    const { data: topicProgress } = await supabase
      .from("topic_progress")
      .select("*")
      .eq("student_id", user.id)
      .eq("subject_code", code)
      .order("updated_at", { ascending: false });

    // Get revision plan
    const { data: revisionPlan } = await supabase
      .from("revision_plans")
      .select("*")
      .eq("student_id", user.id)
      .eq("subject_code", code)
      .single();

    // Get session continuity (where they left off)
    const { data: continuity } = await supabase
      .from("session_continuity")
      .select("*")
      .eq("student_id", user.id)
      .eq("subject_code", code)
      .single();

    return NextResponse.json({
      subject: subjectProgress,
      topics: topicProgress || [],
      revisionPlan,
      continuity,
    });
  } catch (error) {
    console.error("Subject progress GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { code } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      currentTopic,
      currentTopicName,
      understandingState,
      confidenceScore,
      sessionSummary,
      nextFocus,
    } = body;

    // Update topic progress
    if (currentTopic) {
      const { error: topicError } = await supabase
        .from("topic_progress")
        .upsert({
          student_id: user.id,
          subject_code: code,
          topic_code: currentTopic,
          topic_name: currentTopicName || currentTopic,
          understanding_state: understandingState || "partial",
          confidence_score: confidenceScore || 50,
          times_practiced: 1, // Will be incremented by trigger
          last_practiced_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "student_id,subject_code,topic_code",
        });

      if (topicError) {
        console.error("Error updating topic progress:", topicError);
      }
    }

    // Update session continuity
    const { error: continuityError } = await supabase
      .from("session_continuity")
      .upsert({
        student_id: user.id,
        subject_code: code,
        last_topic: currentTopic,
        last_topic_name: currentTopicName,
        context_summary: sessionSummary,
        resume_prompt: nextFocus
          ? `Let's continue with ${nextFocus}`
          : `Let's pick up where we left off with ${currentTopicName || currentTopic}`,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "student_id,subject_code",
      });

    if (continuityError) {
      console.error("Error updating continuity:", continuityError);
    }

    // Update student_subjects with latest info
    const { data: subject } = await supabase
      .from("subjects")
      .select("id")
      .eq("code", code)
      .single();

    if (subject) {
      await supabase
        .from("student_subjects")
        .update({
          current_topic: currentTopic,
          current_topic_name: currentTopicName,
          last_studied_at: new Date().toISOString(),
          last_session_at: new Date().toISOString(),
        })
        .eq("student_id", user.id)
        .eq("subject_id", subject.id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subject progress POST error:", error);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    );
  }
}
