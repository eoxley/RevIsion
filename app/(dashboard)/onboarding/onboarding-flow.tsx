"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubjectSelection } from "@/components/onboarding/subject-selection";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OnboardingFlowProps {
  firstName: string;
  hasSubjects: boolean;
  hasLearningStyle: boolean;
  currentSubjects: string[];
  hasChildName?: boolean;
  editMode?: string;
}

export function OnboardingFlow({
  firstName,
  hasSubjects,
  hasLearningStyle,
  currentSubjects,
  hasChildName = false,
  editMode,
}: OnboardingFlowProps) {
  const router = useRouter();

  // Determine initial step based on what's already completed or edit mode
  const getInitialStep = () => {
    // If editing subjects, go straight to subjects step
    if (editMode === "subjects") return "subjects";
    if (!hasChildName && !firstName) return "child-details";
    if (!hasSubjects) return "subjects";
    return "learning-style";
  };

  const [step, setStep] = useState<"child-details" | "subjects" | "learning-style">(
    getInitialStep()
  );
  const isEditMode = !!editMode;
  const [isLoading, setIsLoading] = useState(false);
  const [childFirstName, setChildFirstName] = useState(firstName || "");
  const [childLastName, setChildLastName] = useState("");

  const handleChildDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!childFirstName.trim()) return;

    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from("profiles")
          .update({
            first_name: childFirstName.trim(),
            last_name: childLastName.trim() || null,
          })
          .eq("id", user.id);
      }

      setStep("subjects");
    } catch (error) {
      console.error("Failed to save child details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubjectsComplete = async (subjects: string[]) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjects }),
      });

      if (response.ok) {
        // If editing, go back to dashboard; otherwise continue to learning style
        if (isEditMode) {
          router.push("/dashboard");
        } else {
          setStep("learning-style");
        }
      }
    } catch (error) {
      console.error("Failed to save subjects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine completed steps for progress indicator
  const isChildDetailsComplete = hasChildName || childFirstName.trim() !== "" || step !== "child-details";
  const isSubjectsComplete = hasSubjects || step === "learning-style";

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-revision-green-50 text-revision-green-700 rounded-full text-sm font-medium mb-6">
          <span>Setting up your child&apos;s revision</span>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          {step === "child-details"
            ? "Let's get started"
            : step === "subjects"
            ? `Great! Now let's pick ${childFirstName || "their"} subjects`
            : "One more thing..."}
        </h1>
        <p className="text-neutral-500">
          {step === "child-details"
            ? "Tell us about your child"
            : step === "subjects"
            ? "This takes about 2 minutes"
            : "Quick quiz to discover how they learn best"}
        </p>
      </div>

      {/* Progress indicator - 3 steps */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {/* Step 1: Child details */}
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "child-details"
                ? "bg-revision-green-500 text-white"
                : isChildDetailsComplete
                ? "bg-revision-green-100 text-revision-green-700"
                : "bg-neutral-200 text-neutral-500"
            }`}
          >
            {isChildDetailsComplete && step !== "child-details" ? "✓" : "1"}
          </div>
          <span className="text-sm text-neutral-600 hidden sm:inline">Child</span>
        </div>

        <div className="w-8 sm:w-12 h-0.5 bg-neutral-200" />

        {/* Step 2: Subjects */}
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "subjects"
                ? "bg-revision-green-500 text-white"
                : isSubjectsComplete
                ? "bg-revision-green-100 text-revision-green-700"
                : "bg-neutral-200 text-neutral-500"
            }`}
          >
            {isSubjectsComplete ? "✓" : "2"}
          </div>
          <span className="text-sm text-neutral-600 hidden sm:inline">Subjects</span>
        </div>

        <div className="w-8 sm:w-12 h-0.5 bg-neutral-200" />

        {/* Step 3: Learning style */}
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "learning-style"
                ? "bg-revision-green-500 text-white"
                : hasLearningStyle
                ? "bg-revision-green-100 text-revision-green-700"
                : "bg-neutral-200 text-neutral-500"
            }`}
          >
            {hasLearningStyle ? "✓" : "3"}
          </div>
          <span className="text-sm text-neutral-600 hidden sm:inline">Learning style</span>
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
        {/* Step 1: Child details */}
        {step === "child-details" && (
          <form onSubmit={handleChildDetailsSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-revision-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-revision-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                Who will be using myrevisionary?
              </h2>
              <p className="text-neutral-500 text-sm">
                Enter your child&apos;s name so we can personalise their experience
              </p>
            </div>

            <div className="max-w-sm mx-auto space-y-4">
              <Input
                id="childFirstName"
                label="Child's first name"
                placeholder="e.g. Alex"
                value={childFirstName}
                onChange={(e) => setChildFirstName(e.target.value)}
                required
              />
              <Input
                id="childLastName"
                label="Child's last name (optional)"
                placeholder="e.g. Smith"
                value={childLastName}
                onChange={(e) => setChildLastName(e.target.value)}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading || !childFirstName.trim()}
              >
                {isLoading ? "Saving..." : "Continue"}
              </Button>
            </div>
          </form>
        )}

        {/* Step 2: Subjects */}
        {step === "subjects" && (
          <SubjectSelection
            onComplete={handleSubjectsComplete}
            initialSubjects={currentSubjects}
            isLoading={isLoading}
            childName={childFirstName}
          />
        )}

        {/* Step 3: Learning style */}
        {step === "learning-style" && (
          <div className="text-center">
            <div className="w-20 h-20 bg-revision-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-revision-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
              Let&apos;s discover how {childFirstName || "they"} learn{childFirstName ? "s" : ""} best
            </h2>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
              Everyone&apos;s brain works differently. This quick quiz helps us give {childFirstName || "your child"} revision tips that actually work for them.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center px-6 py-3 bg-revision-green-500 text-white rounded-lg font-medium hover:bg-revision-green-600 transition"
              >
                Take the quiz (2 mins)
              </Link>
              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center justify-center px-6 py-3 text-neutral-600 hover:text-neutral-900 transition"
              >
                Skip for now
              </button>
            </div>
            <p className="text-xs text-neutral-400 mt-6">
              Tip: Have {childFirstName || "your child"} answer the questions themselves for the most accurate results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
