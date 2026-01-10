import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Subject Progress Aggregation API
 *
 * GET /api/progress/subjects
 *
 * Aggregates revision_progress by subject_id for the current user.
 * Returns calculated progress metrics (not persisted).
 */

interface AggregatedProgress {
  subject_id: string;
  secure_count: number;
  strengthening_count: number;
  building_count: number;
  total_topics: number;
  progress_percentage: number;
  understanding_level: "not_started" | "building" | "strengthening" | "secure";
  last_interaction_at: string | null;
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

    // Fetch all revision_progress for this student
    const { data: progressRows, error } = await supabase
      .from("revision_progress")
      .select("subject_id, topic_id, understanding_state, last_interaction_at")
      .eq("student_id", user.id);

    if (error) {
      console.error("Error fetching revision_progress:", error);
      return NextResponse.json(
        { error: "Failed to fetch progress" },
        { status: 500 }
      );
    }

    // Aggregate by subject_id
    const aggregated = aggregateProgressBySubject(progressRows || []);

    return NextResponse.json({ progress: aggregated });
  } catch (error) {
    console.error("Progress aggregation error:", error);
    return NextResponse.json(
      { error: "Failed to aggregate progress" },
      { status: 500 }
    );
  }
}

/**
 * Aggregates revision_progress rows by subject_id
 *
 * Calculates:
 * - % secure topics (progress_percentage)
 * - count of each understanding state
 * - overall understanding_level (based on majority state)
 * - last_interaction_at (most recent across all topics)
 */
function aggregateProgressBySubject(
  rows: Array<{
    subject_id: string | null;
    topic_id: string | null;
    understanding_state: string;
    last_interaction_at: string | null;
  }>
): AggregatedProgress[] {
  // Group by subject_id
  const bySubject = new Map<
    string,
    {
      topics: Set<string>;
      secure: number;
      strengthening: number;
      building: number;
      lastInteraction: string | null;
    }
  >();

  for (const row of rows) {
    if (!row.subject_id) continue;

    if (!bySubject.has(row.subject_id)) {
      bySubject.set(row.subject_id, {
        topics: new Set(),
        secure: 0,
        strengthening: 0,
        building: 0,
        lastInteraction: null,
      });
    }

    const agg = bySubject.get(row.subject_id)!;

    // Count unique topics (dedupe by topic_id)
    const topicKey = row.topic_id || "unknown";
    if (!agg.topics.has(topicKey)) {
      agg.topics.add(topicKey);

      // Count by understanding state
      switch (row.understanding_state) {
        case "secure":
          agg.secure++;
          break;
        case "strengthening":
          agg.strengthening++;
          break;
        case "building":
        default:
          agg.building++;
          break;
      }
    }

    // Track most recent interaction
    if (row.last_interaction_at) {
      if (
        !agg.lastInteraction ||
        new Date(row.last_interaction_at) > new Date(agg.lastInteraction)
      ) {
        agg.lastInteraction = row.last_interaction_at;
      }
    }
  }

  // Convert to output format
  const result: AggregatedProgress[] = [];

  for (const [subjectId, agg] of Array.from(bySubject.entries())) {
    const total = agg.topics.size;
    const securePercent = total > 0 ? Math.round((agg.secure / total) * 100) : 0;

    // Determine overall understanding level
    let level: AggregatedProgress["understanding_level"] = "not_started";
    if (total > 0) {
      if (agg.secure > agg.strengthening && agg.secure > agg.building) {
        level = "secure";
      } else if (agg.strengthening >= agg.building) {
        level = "strengthening";
      } else {
        level = "building";
      }
    }

    result.push({
      subject_id: subjectId,
      secure_count: agg.secure,
      strengthening_count: agg.strengthening,
      building_count: agg.building,
      total_topics: total,
      progress_percentage: securePercent,
      understanding_level: level,
      last_interaction_at: agg.lastInteraction,
    });
  }

  return result;
}
