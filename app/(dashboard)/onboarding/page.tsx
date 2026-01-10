import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { OnboardingFlow } from "./onboarding-flow";

/**
 * Onboarding Page
 *
 * Three-step onboarding:
 * 1. Child details - enter child's name
 * 2. Subject selection - pick GCSE subjects
 * 3. Learning style quiz - discover how they learn best
 *
 * After completion, redirects to dashboard.
 */

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if already completed onboarding
  const { data: profile } = await supabase
    .from("profiles")
    .select("subjects_selected, first_name, last_name")
    .eq("id", user.id)
    .single();

  // Check if they have a learning style result
  const { data: result } = await supabase
    .from("results")
    .select("id")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  // Get their current subjects
  const { data: studentSubjects } = await supabase
    .from("student_subjects")
    .select("subjects(code)")
    .eq("student_id", user.id);

  const currentSubjects = studentSubjects?.map(
    (ss: { subjects: { code: string } | { code: string }[] }) => {
      const subj = ss.subjects;
      if (Array.isArray(subj)) {
        return subj[0]?.code || "";
      }
      return subj.code;
    }
  ).filter(Boolean) || [];

  // Determine which steps are complete
  const hasChildName = !!(profile?.first_name && profile.first_name.trim());
  const hasSubjects = currentSubjects.length > 0;
  const hasLearningStyle = !!result;

  // If learning style is complete, redirect to dashboard
  // (learning style is the final step, so if done, onboarding is complete)
  if (hasLearningStyle) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <OnboardingFlow
        firstName={profile?.first_name || ""}
        hasSubjects={hasSubjects}
        hasLearningStyle={hasLearningStyle}
        currentSubjects={currentSubjects}
        hasChildName={hasChildName}
      />
    </div>
  );
}
