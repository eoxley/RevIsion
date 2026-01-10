import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboard-client";
import Link from "next/link";

/**
 * Main Dashboard - Phase 2
 *
 * Chat-first layout with the chat interface as the PRIMARY surface.
 * Sidebar shows only schema-backed progress indicators.
 *
 * Layout:
 * - Primary area: Chat interface (central focus)
 * - Secondary area: Progress sidebar (right side on desktop)
 *
 * Data Sources:
 * - User: auth.users via Supabase Auth
 * - Profile: profiles table
 * - Learning Style: results table (latest assessment)
 * - Subjects: student_subjects + subjects tables
 * - Sessions: learning_sessions table (count only)
 *
 * Brand:
 * - Plenty of whitespace
 * - No clutter
 * - No dashboard widgets
 * - No metrics unless schema-backed
 */

export default async function DashboardPage() {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null; // Middleware will redirect
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();

  // Fetch student's enrolled subjects
  const { data: studentSubjects } = await supabase
    .from("student_subjects")
    .select(
      `
      *,
      subjects (
        id,
        code,
        display_name,
        category
      )
    `
    )
    .eq("student_id", user.id)
    .order("priority_level", { ascending: true });

  // Redirect to onboarding if no subjects selected
  if (!studentSubjects || studentSubjects.length === 0) {
    redirect("/onboarding");
  }

  // Fetch latest learning style result
  const { data: latestResult } = await supabase
    .from("results")
    .select("*")
    .eq("user_id", user.id)
    .order("calculated_at", { ascending: false })
    .limit(1)
    .single();

  // Build learning profile if available
  const learningProfile = latestResult
    ? {
        visual: latestResult.visual_percentage,
        auditory: latestResult.auditory_percentage,
        readWrite: latestResult.read_write_percentage,
        kinesthetic: latestResult.kinesthetic_percentage,
        primaryStyles: latestResult.primary_styles,
        isMultimodal: latestResult.is_multimodal,
      }
    : null;

  // Extract subject names for chat context
  const subjectNames = studentSubjects?.map(
    (ss: { subjects: { display_name: string } }) => ss.subjects.display_name
  ) || [];

  // Count completed sessions
  const { count: sessionCount } = await supabase
    .from("learning_sessions")
    .select("*", { count: "exact", head: true })
    .eq("student_id", user.id)
    .eq("completion_status", "completed");

  const studentName = profile?.first_name || undefined;

  return (
    <DashboardClient
      studentName={studentName}
      learningProfile={learningProfile}
      studentSubjects={studentSubjects || []}
      subjectNames={subjectNames}
      sessionCount={sessionCount || 0}
    />
  );
}
