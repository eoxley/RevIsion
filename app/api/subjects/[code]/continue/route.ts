import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Continue Subject Session API
 *
 * GET /api/subjects/[code]/continue - Get resume context for a subject
 * Used when clicking on a subject card to continue revision
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

    // Get subject info
    const { data: subject } = await supabase
      .from("subjects")
      .select("*")
      .eq("code", code)
      .single();

    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    // Get session continuity
    const { data: continuity } = await supabase
      .from("session_continuity")
      .select("*")
      .eq("student_id", user.id)
      .eq("subject_code", code)
      .single();

    // Get recent topic progress
    const { data: recentTopics } = await supabase
      .from("topic_progress")
      .select("*")
      .eq("student_id", user.id)
      .eq("subject_code", code)
      .order("last_practiced_at", { ascending: false })
      .limit(5);

    // Get revision plan (one plan per student)
    const { data: revisionPlan } = await supabase
      .from("revision_plans")
      .select("*")
      .eq("student_id", user.id)
      .single();

    // Build resume message
    let resumeMessage = "";
    let nextTopic = null;

    if (continuity?.last_topic_name) {
      resumeMessage = `Let's pick up ${subject.display_name} where we left off - we were working on **${continuity.last_topic_name}**. ${continuity.context_summary || ""}`;
      nextTopic = continuity.last_topic;
    } else if (revisionPlan?.current_focus) {
      const focus = revisionPlan.current_focus;
      resumeMessage = `Ready to continue ${subject.display_name}? Your plan says we should focus on **${focus.topic_name || focus.topic}** today.`;
      nextTopic = focus.topic;
    } else if (recentTopics && recentTopics.length > 0) {
      const lastTopic = recentTopics[0];
      if (lastTopic.understanding_state === "fragile" || lastTopic.understanding_state === "partial") {
        resumeMessage = `Let's strengthen your understanding of **${lastTopic.topic_name}** in ${subject.display_name} - you were getting there last time!`;
      } else {
        resumeMessage = `Great to see you back for ${subject.display_name}! What would you like to work on today?`;
      }
      nextTopic = lastTopic.topic_code;
    } else {
      resumeMessage = `Let's get started with ${subject.display_name}! I'll help you figure out where to begin based on what you already know.`;
    }

    // Get weak topics that need attention
    const weakTopics = recentTopics?.filter(
      (t) => t.understanding_state === "fragile" || t.understanding_state === "partial"
    ) || [];

    return NextResponse.json({
      subject,
      continuity,
      resumeMessage,
      nextTopic,
      recentTopics: recentTopics || [],
      weakTopics,
      revisionPlan,
      hasHistory: !!(continuity || (recentTopics && recentTopics.length > 0)),
    });
  } catch (error) {
    console.error("Continue session GET error:", error);
    return NextResponse.json(
      { error: "Failed to get resume context" },
      { status: 500 }
    );
  }
}
