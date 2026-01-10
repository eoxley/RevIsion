"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubjectSelection } from "@/components/onboarding/subject-selection";
import Link from "next/link";

interface OnboardingFlowProps {
  firstName: string;
  hasSubjects: boolean;
  hasLearningStyle: boolean;
  currentSubjects: string[];
}

export function OnboardingFlow({
  firstName,
  hasSubjects,
  hasLearningStyle,
  currentSubjects,
}: OnboardingFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<"subjects" | "learning-style">(
    hasSubjects ? "learning-style" : "subjects"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubjectsComplete = async (subjects: string[]) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjects }),
      });

      if (response.ok) {
        // Move to learning style step
        setStep("learning-style");
      }
    } catch (error) {
      console.error("Failed to save subjects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-revision-green-50 text-revision-green-700 rounded-full text-sm font-medium mb-6">
          <span>Setting up your revision coach</span>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          {step === "subjects"
            ? `Hey${firstName ? ` ${firstName}` : ""}! Let's get you set up`
            : "One more thing..."}
        </h1>
        <p className="text-neutral-500">
          {step === "subjects"
            ? "This takes about 2 minutes"
            : "Quick quiz to discover how you learn best"}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "subjects"
                ? "bg-revision-green-500 text-white"
                : "bg-revision-green-100 text-revision-green-700"
            }`}
          >
            {hasSubjects ? "✓" : "1"}
          </div>
          <span className="text-sm text-neutral-600">Subjects</span>
        </div>
        <div className="w-12 h-0.5 bg-neutral-200" />
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "learning-style"
                ? "bg-revision-green-500 text-white"
                : "bg-neutral-200 text-neutral-500"
            }`}
          >
            {hasLearningStyle ? "✓" : "2"}
          </div>
          <span className="text-sm text-neutral-600">Learning style</span>
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
        {step === "subjects" && (
          <SubjectSelection
            onComplete={handleSubjectsComplete}
            initialSubjects={currentSubjects}
            isLoading={isLoading}
          />
        )}

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
              Let's find out how you learn
            </h2>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
              Everyone's brain works differently. This quick quiz helps me give you
              revision tips that actually work for you.
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
          </div>
        )}
      </div>
    </div>
  );
}
