import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Subjects API Route
 *
 * POST /api/subjects - Save student's subject selections
 * GET /api/subjects - Get student's current subjects
 */

// Map UI subject codes to database codes (UPPERCASE in DB)
const SUBJECT_CODE_MAP: Record<string, string> = {
  maths: "MATHS",
  english_lang: "ENG_LANG",
  english_lit: "ENG_LIT",
  biology: "BIOLOGY",
  chemistry: "CHEMISTRY",
  physics: "PHYSICS",
  combined_science: "COMBINED_SCI",
  history: "HISTORY",
  geography: "GEOGRAPHY",
  religious_studies: "RE",
  french: "FRENCH",
  spanish: "SPANISH",
  german: "GERMAN",
  art: "ART",
  music: "MUSIC",
  drama: "DRAMA",
  dt: "DT",
  computer_science: "CS",
  pe: "PE",
  food_tech: "FOOD_TECH",
  business: "BUSINESS",
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

    // Map UI codes to database codes
    const dbCodes = subjects.map(s => SUBJECT_CODE_MAP[s] || s);
    console.log("Subject codes received:", subjects);
    console.log("Mapped to DB codes:", dbCodes);

    // First, get subject IDs from the subjects table
    const { data: subjectRows, error: fetchError } = await supabase
      .from("subjects")
      .select("id, code")
      .in("code", dbCodes);

    console.log("Subjects found in DB:", subjectRows);

    if (fetchError) {
      console.error("Error fetching subjects:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch subjects" },
        { status: 500 }
      );
    }

    if (!subjectRows || subjectRows.length === 0) {
      console.error("No matching subjects found for codes:", dbCodes);
      return NextResponse.json(
        { error: "No matching subjects found", codes: dbCodes },
        { status: 400 }
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
