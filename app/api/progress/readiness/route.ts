import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Exam Readiness API
 *
 * Calculates readiness signal based on progress data.
 * Addresses: "Exam readiness signals not implemented" from Platform Audit
 */

interface SubjectReadiness {
  subject_code: string;
  subject_name: string;
  secure_count: number;
  strengthening_count: number;
  building_count: number;
  total_topics: number;
  readiness_percentage: number;
}

interface ReadinessResponse {
  overall_readiness: number;
  readiness_level: "ready" | "almost_ready" | "needs_work" | "just_started";
  days_until_exams: number;
  subjects: SubjectReadiness[];
  recommendations: string[];
}

function calculateDaysUntilExams(): number {
  const gcseStart = new Date("2026-05-11");
  const today = new Date();
  const diffTime = gcseStart.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

function getReadinessLevel(percentage: number): ReadinessResponse["readiness_level"] {
  if (percentage >= 80) return "ready";
  if (percentage >= 60) return "almost_ready";
  if (percentage >= 30) return "needs_work";
  return "just_started";
}

function generateRecommendations(
  subjectReadiness: SubjectReadiness[],
  daysUntilExams: number
): string[] {
  const recommendations: string[] = [];

  // Find weakest subject
  const weakest = subjectReadiness
    .filter((s) => s.total_topics > 0)
    .sort((a, b) => a.readiness_percentage - b.readiness_percentage)[0];

  if (weakest && weakest.readiness_percentage < 50) {
    recommendations.push(
      `Focus on ${weakest.subject_name} - it needs the most attention.`
    );
  }

  // Time-based recommendations
  if (daysUntilExams <= 14) {
    recommendations.push("Focus on past papers and exam technique.");
    recommendations.push("Prioritise your highest-mark topics.");
  } else if (daysUntilExams <= 35) {
    recommendations.push("Continue building understanding of fragile topics.");
    recommendations.push("Start incorporating past paper practice.");
  } else {
    recommendations.push("Build strong foundations across all subjects.");
    recommendations.push("Regular short sessions are better than cramming.");
  }

  // Always include wellbeing
  recommendations.push("Remember to take breaks and get enough sleep.");

  return recommendations.slice(0, 4);
}

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get enrolled subjects
    const { data: enrolledSubjects } = await supabase
      .from("student_subjects")
      .select(`
        subject_id,
        subjects (
          code,
          display_name
        )
      `)
      .eq("student_id", user.id);

    // Get revision progress
    const { data: revisionProgress } = await supabase
      .from("revision_progress")
      .select("*")
      .eq("student_id", user.id);

    // Get topic progress
    const { data: topicProgress } = await supabase
      .from("topic_progress")
      .select("*")
      .eq("student_id", user.id);

    // Calculate per-subject readiness
    const subjectReadiness: SubjectReadiness[] = (enrolledSubjects || []).map(
      (enrollment: { subject_id: string; subjects: unknown }) => {
        const subjects = enrollment.subjects as { code: string; display_name: string } | null;
        const subjectCode = subjects?.code || "";
        const subjectName = subjects?.display_name || "Unknown";

        // Combine both progress tables
        const subjectTopics = (topicProgress || []).filter(
          (tp) => tp.subject_code === subjectCode
        );
        const subjectRevision = (revisionProgress || []).filter(
          (rp) => rp.subject_id === enrollment.subject_id
        );

        const secure =
          subjectTopics.filter((t) => t.understanding_state === "secure").length +
          subjectRevision.filter((r) => r.understanding_state === "secure").length;
        const strengthening =
          subjectTopics.filter((t) => t.understanding_state === "strengthening" || t.understanding_state === "fragile").length +
          subjectRevision.filter((r) => r.understanding_state === "strengthening").length;
        const building =
          subjectTopics.filter((t) => t.understanding_state === "building" || t.understanding_state === "partial" || t.understanding_state === "not_started").length +
          subjectRevision.filter((r) => r.understanding_state === "building").length;

        const total = secure + strengthening + building;
        const readinessPercentage = total > 0
          ? Math.round((secure / total) * 100)
          : 0;

        return {
          subject_code: subjectCode,
          subject_name: subjectName,
          secure_count: secure,
          strengthening_count: strengthening,
          building_count: building,
          total_topics: total,
          readiness_percentage: readinessPercentage,
        };
      }
    );

    // Calculate overall readiness
    const totalSecure = subjectReadiness.reduce((sum, s) => sum + s.secure_count, 0);
    const totalTopics = subjectReadiness.reduce((sum, s) => sum + s.total_topics, 0);
    const overallReadiness = totalTopics > 0
      ? Math.round((totalSecure / totalTopics) * 100)
      : 0;

    const daysUntilExams = calculateDaysUntilExams();
    const readinessLevel = getReadinessLevel(overallReadiness);
    const recommendations = generateRecommendations(subjectReadiness, daysUntilExams);

    const response: ReadinessResponse = {
      overall_readiness: overallReadiness,
      readiness_level: readinessLevel,
      days_until_exams: daysUntilExams,
      subjects: subjectReadiness.filter((s) => s.total_topics > 0),
      recommendations,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Readiness API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
