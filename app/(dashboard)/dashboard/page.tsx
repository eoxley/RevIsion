import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PersistentChat } from "@/components/chat/persistent-chat";
import {
  ProgressSidebar,
  ProgressSidebarCompact,
} from "@/components/dashboard/progress-sidebar";
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
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Main Content - Chat Interface (Primary) */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-neutral-900">
            {studentName ? `Hey ${studentName}` : "Hey there"}
          </h1>
          <p className="text-neutral-500 mt-1">
            {learningProfile
              ? `Your ${learningProfile.primaryStyles[0]?.replace("_", "/")} learning style coach is here to help`
              : "Ready to smash your revision?"}
          </p>
        </div>

        {/* Learning style prompt if not completed */}
        {!learningProfile && (
          <div className="mb-4 p-4 bg-revision-blue-50 border border-revision-blue-100 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-revision-blue-800">
                  Let's find out how you learn best
                </p>
                <p className="text-xs text-revision-blue-600 mt-0.5">
                  Quick quiz to unlock personalised revision tips
                </p>
              </div>
              <Link
                href="/assessment"
                className="px-4 py-2 bg-revision-blue-600 text-white text-sm font-medium rounded-lg hover:bg-revision-blue-700 transition"
              >
                Take the quiz
              </Link>
            </div>
          </div>
        )}

        {/* Chat Interface - Primary Surface */}
        <div className="flex-1">
          <PersistentChat
            learningProfile={learningProfile}
            studentName={studentName}
            subjects={subjectNames}
          />
        </div>
      </main>

      {/* Progress Sidebar - Desktop only */}
      <div className="hidden lg:block">
        <ProgressSidebar
          studentSubjects={studentSubjects || []}
          learningProfile={learningProfile}
          sessionCount={sessionCount || 0}
          studentName={studentName}
        />
      </div>

      {/* Compact Progress - Mobile only */}
      <div className="lg:hidden">
        <ProgressSidebarCompact
          learningProfile={learningProfile}
          sessionCount={sessionCount || 0}
        />
      </div>
    </div>
  );
}
