import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Progress Insights API
 *
 * Aggregates evaluation_log data to show learning patterns.
 * Addresses: evaluation_log "written but never displayed" from Schema Audit
 */

interface ErrorTypeSummary {
  error_type: string;
  count: number;
  percentage: number;
}

interface EvaluationSummary {
  total_evaluations: number;
  correct_count: number;
  partial_count: number;
  incorrect_count: number;
  accuracy_percentage: number;
  error_patterns: ErrorTypeSummary[];
  recent_topics: string[];
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

    // Fetch evaluation log
    const { data: evalLog, error } = await supabase
      .from("evaluation_log")
      .select("*")
      .eq("student_id", user.id)
      .order("evaluated_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Error fetching evaluation log:", error);
      return NextResponse.json(
        { error: "Failed to fetch insights" },
        { status: 500 }
      );
    }

    // Calculate summary statistics
    const totalEvaluations = evalLog?.length || 0;
    const correctCount = evalLog?.filter((e) => e.evaluation === "correct").length || 0;
    const partialCount = evalLog?.filter((e) => e.evaluation === "partial").length || 0;
    const incorrectCount = evalLog?.filter((e) => e.evaluation === "incorrect").length || 0;

    // Calculate error patterns
    const errorCounts: Record<string, number> = {};
    evalLog?.forEach((e) => {
      if (e.error_type) {
        errorCounts[e.error_type] = (errorCounts[e.error_type] || 0) + 1;
      }
    });

    const errorPatterns: ErrorTypeSummary[] = Object.entries(errorCounts)
      .map(([error_type, count]) => ({
        error_type,
        count,
        percentage: totalEvaluations > 0 ? Math.round((count / totalEvaluations) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Get recent unique topics
    const topicSet = new Set<string>();
    evalLog?.forEach((e) => {
      if (e.topic_name && topicSet.size < 10) {
        topicSet.add(e.topic_name);
      }
    });
    const recentTopics = Array.from(topicSet);

    const summary: EvaluationSummary = {
      total_evaluations: totalEvaluations,
      correct_count: correctCount,
      partial_count: partialCount,
      incorrect_count: incorrectCount,
      accuracy_percentage: totalEvaluations > 0
        ? Math.round((correctCount / totalEvaluations) * 100)
        : 0,
      error_patterns: errorPatterns,
      recent_topics: recentTopics,
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error("Insights API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
