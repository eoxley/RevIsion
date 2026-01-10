import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Subjects API Route
 *
 * POST /api/subjects - Save student's subject selections
 * GET /api/subjects - Get student's current subjects
 */

// Map subject codes to database subject IDs
const SUBJECT_CODE_MAP: Record<string, string> = {
  maths: "maths",
  english_lang: "english_language",
  english_lit: "english_literature",
  biology: "biology",
  chemistry: "chemistry",
  physics: "physics",
  combined_science: "combined_science",
  history: "history",
  geography: "geography",
  religious_studies: "religious_studies",
  french: "french",
  spanish: "spanish",
  german: "german",
  art: "art_design",
  music: "music",
  drama: "drama",
  dt: "design_technology",
  computer_science: "computer_science",
  pe: "physical_education",
  food_tech: "food_technology",
  business: "business_studies",
};

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
    const { subjects } = body;

    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return NextResponse.json(
        { error: "No subjects provided" },
        { status: 400 }
      );
    }

    // First, get subject IDs from the subjects table
    const { data: subjectRows, error: fetchError } = await supabase
      .from("subjects")
      .select("id, code")
      .in("code", subjects.map(s => SUBJECT_CODE_MAP[s] || s));

    if (fetchError) {
      console.error("Error fetching subjects:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch subjects" },
        { status: 500 }
      );
    }

    // Delete existing subject selections for this user
    const { error: deleteError } = await supabase
      .from("student_subjects")
      .delete()
      .eq("student_id", user.id);

    if (deleteError) {
      console.error("Error deleting existing subjects:", deleteError);
    }

    // Insert new subject selections
    const insertData = subjectRows?.map((subject) => ({
      student_id: user.id,
      subject_id: subject.id,
      priority_level: "medium",
    })) || [];

    if (insertData.length > 0) {
      const { error: insertError } = await supabase
        .from("student_subjects")
        .insert(insertData);

      if (insertError) {
        console.error("Error inserting subjects:", insertError);
        return NextResponse.json(
          { error: "Failed to save subjects" },
          { status: 500 }
        );
      }
    }

    // Update profile to mark onboarding step complete
    await supabase
      .from("profiles")
      .update({ subjects_selected: true })
      .eq("id", user.id);

    return NextResponse.json({
      success: true,
      subjectCount: insertData.length,
    });
  } catch (error) {
    console.error("Subjects API error:", error);
    return NextResponse.json(
      { error: "Failed to save subjects" },
      { status: 500 }
    );
  }
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

    // Get student's subjects
    const { data: studentSubjects, error } = await supabase
      .from("student_subjects")
      .select(`
        id,
        subject_id,
        exam_board,
        target_grade,
        priority_level,
        subjects (
          id,
          code,
          display_name,
          category
        )
      `)
      .eq("student_id", user.id);

    if (error) {
      console.error("Error fetching student subjects:", error);
      return NextResponse.json(
        { error: "Failed to fetch subjects" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subjects: studentSubjects || [],
    });
  } catch (error) {
    console.error("Subjects GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}
