"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { calculateVARKScores } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Question {
  id: string;
  question_number: number;
  question_text: string;
  scenario: string | null;
  category: string;
}

interface QuestionOption {
  id: string;
  question_id: string;
  option_label: string;
  option_text: string;
  learning_style: string;
  weight: number;
}

export default function AssessmentPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [options, setOptions] = useState<QuestionOption[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    const supabase = createClient();

    const { data: questionsData, error: qError } = await supabase
      .from("questions")
      .select("*")
      .eq("is_active", true)
      .order("question_number");

    const { data: optionsData, error: oError } = await supabase
      .from("question_options")
      .select("*");

    if (qError || oError) {
      console.error("Error loading questions:", qError || oError);
      return;
    }

    setQuestions(questionsData || []);
    setOptions(optionsData || []);
    setLoading(false);
  }

  const currentQuestion = questions[currentIndex];
  const currentOptions = options.filter(
    (o) => o.question_id === currentQuestion?.id
  );
  const selectedOptions = answers.get(currentQuestion?.id) || [];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function toggleOption(optionId: string) {
    const questionId = currentQuestion.id;
    const current = answers.get(questionId) || [];

    let updated: string[];
    if (current.includes(optionId)) {
      updated = current.filter((id) => id !== optionId);
    } else {
      updated = [...current, optionId];
    }

    setAnswers(new Map(answers.set(questionId, updated)));
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    // Create assessment
    const { data: assessment, error: aError } = await supabase
      .from("assessments")
      .insert({
        user_id: user.id,
        total_questions: questions.length,
        is_completed: true,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (aError || !assessment) {
      console.error("Error creating assessment:", aError);
      setSubmitting(false);
      return;
    }

    // Save responses
    const responses = Array.from(answers.entries()).map(
      ([questionId, selectedOpts]) => ({
        assessment_id: assessment.id,
        question_id: questionId,
        selected_options: selectedOpts,
      })
    );

    const { error: rError } = await supabase
      .from("assessment_responses")
      .insert(responses);

    if (rError) {
      console.error("Error saving responses:", rError);
      setSubmitting(false);
      return;
    }

    // Calculate scores
    const optionsMap = new Map(options.map((o) => [o.id, o]));
    const formattedResponses = responses.map((r) => ({
      selected_options: r.selected_options,
      question_id: r.question_id,
    }));

    const result = calculateVARKScores(formattedResponses, optionsMap);

    // Save results
    const { data: savedResult, error: resError } = await supabase
      .from("results")
      .insert({
        assessment_id: assessment.id,
        user_id: user.id,
        visual_score: result.rawScores.visual,
        auditory_score: result.rawScores.auditory,
        read_write_score: result.rawScores.readWrite,
        kinesthetic_score: result.rawScores.kinesthetic,
        visual_percentage: result.percentages.visual,
        auditory_percentage: result.percentages.auditory,
        read_write_percentage: result.percentages.readWrite,
        kinesthetic_percentage: result.percentages.kinesthetic,
        primary_styles: result.primaryStyles,
        is_multimodal: result.isMultimodal,
      })
      .select()
      .single();

    if (resError || !savedResult) {
      console.error("Error saving results:", resError);
      setSubmitting(false);
      return;
    }

    // PHASE 3: Sync to student_vark_profiles for email compatibility
    const dominantStyle = result.primaryStyles[0] || "visual";
    const getStrength = (score: number): string => {
      if (score >= 35) return "very_strong";
      if (score >= 25) return "strong";
      if (score >= 15) return "moderate";
      return "mild";
    };

    await supabase.from("student_vark_profiles").upsert({
      student_id: user.id,
      visual_score: result.percentages.visual,
      auditory_score: result.percentages.auditory,
      read_write_score: result.percentages.readWrite,
      kinesthetic_score: result.percentages.kinesthetic,
      primary_styles: result.primaryStyles,
      is_multimodal: result.isMultimodal,
      dominant_style: dominantStyle,
      visual_strength: getStrength(result.percentages.visual),
      auditory_strength: getStrength(result.percentages.auditory),
      read_write_strength: getStrength(result.percentages.readWrite),
      kinesthetic_strength: getStrength(result.percentages.kinesthetic),
      assessed_at: new Date().toISOString(),
      last_recalculated_at: new Date().toISOString(),
    }, { onConflict: "student_id" });

    // Send welcome email to parent (non-blocking)
    fetch("/api/email/welcome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: user.id }),
    }).catch((err) => {
      console.error("Failed to send welcome email:", err);
    });

    router.push(`/results/${savedResult.id}`);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-slate-900">
          No questions available
        </h2>
        <p className="text-slate-600 mt-2">
          Please contact support if this issue persists.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardContent className="p-8">
          {currentQuestion.scenario && (
            <p className="text-sm text-slate-500 mb-4 italic">
              {currentQuestion.scenario}
            </p>
          )}
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            {currentQuestion.question_text}
          </h2>

          <p className="text-sm text-slate-500 mb-4">
            Select all options that apply to you:
          </p>

          <div className="space-y-3">
            {currentOptions
              .sort((a, b) => a.option_label.localeCompare(b.option_label))
              .map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedOptions.includes(option.id)
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        selectedOptions.includes(option.id)
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {option.option_label}
                    </span>
                    <span className="text-slate-700">{option.option_text}</span>
                  </div>
                </button>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={submitting || answers.size < questions.length}
          >
            {submitting ? "Calculating results..." : "Submit Assessment"}
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={selectedOptions.length === 0}>
            Next
          </Button>
        )}
      </div>

      {/* Question navigation dots */}
      <div className="flex justify-center gap-1 mt-8 flex-wrap">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex
                ? "bg-blue-600"
                : answers.has(q.id)
                ? "bg-blue-300"
                : "bg-slate-200"
            }`}
            title={`Question ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
