"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Subject Selection Component
 *
 * Allows parents to select their child's GCSE subjects during onboarding.
 * Updates the student_subjects table in Supabase.
 */

// GCSE subjects grouped by category
const SUBJECT_CATEGORIES = {
  "Core Subjects": [
    { code: "maths", name: "Maths", emoji: "📐" },
    { code: "english_lang", name: "English Language", emoji: "📝" },
    { code: "english_lit", name: "English Literature", emoji: "📚" },
  ],
  "Sciences": [
    { code: "biology", name: "Biology", emoji: "🧬" },
    { code: "chemistry", name: "Chemistry", emoji: "⚗️" },
    { code: "physics", name: "Physics", emoji: "⚡" },
    { code: "combined_science", name: "Combined Science", emoji: "🔬" },
  ],
  "Humanities": [
    { code: "history", name: "History", emoji: "🏛️" },
    { code: "geography", name: "Geography", emoji: "🌍" },
    { code: "religious_studies", name: "Religious Studies", emoji: "🕊️" },
  ],
  "Languages": [
    { code: "french", name: "French", emoji: "🇫🇷" },
    { code: "spanish", name: "Spanish", emoji: "🇪🇸" },
    { code: "german", name: "German", emoji: "🇩🇪" },
  ],
  "Creative & Technical": [
    { code: "art", name: "Art & Design", emoji: "🎨" },
    { code: "music", name: "Music", emoji: "🎵" },
    { code: "drama", name: "Drama", emoji: "🎭" },
    { code: "dt", name: "Design & Technology", emoji: "🔧" },
    { code: "computer_science", name: "Computer Science", emoji: "💻" },
    { code: "pe", name: "PE", emoji: "⚽" },
    { code: "food_tech", name: "Food Technology", emoji: "🍳" },
    { code: "business", name: "Business Studies", emoji: "📊" },
  ],
};

interface SubjectSelectionProps {
  onComplete: (subjects: string[]) => void;
  initialSubjects?: string[];
  isLoading?: boolean;
  childName?: string;
}

export function SubjectSelection({
  onComplete,
  initialSubjects = [],
  isLoading = false,
  childName,
}: SubjectSelectionProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(initialSubjects);

  const toggleSubject = (code: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(code)
        ? prev.filter((s) => s !== code)
        : [...prev, code]
    );
  };

  const handleSubmit = () => {
    if (selectedSubjects.length > 0) {
      onComplete(selectedSubjects);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
          What subjects is {childName || "your child"} taking?
        </h2>
        <p className="text-neutral-500">
          Select all their GCSE subjects so we can provide the right revision support
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {Object.entries(SUBJECT_CATEGORIES).map(([category, subjects]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-neutral-500 mb-3">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject.code}
                  onClick={() => toggleSubject(subject.code)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    "flex items-center gap-2",
                    selectedSubjects.includes(subject.code)
                      ? "bg-turquoise-500 text-white shadow-md"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  )}
                >
                  <span>{subject.emoji}</span>
                  <span>{subject.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected count and submit */}
      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
        <p className="text-sm text-neutral-600">
          {selectedSubjects.length === 0 ? (
            "Select at least one subject"
          ) : (
            <>
              <span className="font-medium text-turquoise-600">
                {selectedSubjects.length}
              </span>{" "}
              {selectedSubjects.length === 1 ? "subject" : "subjects"} selected
            </>
          )}
        </p>
        <Button
          onClick={handleSubmit}
          disabled={selectedSubjects.length === 0 || isLoading}
          className="bg-turquoise-500 hover:bg-turquoise-600 text-white"
        >
          {isLoading ? "Saving..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}

/**
 * Compact subject chips for display (not selection)
 */
export function SubjectChips({ subjects }: { subjects: string[] }) {
  const allSubjects = Object.values(SUBJECT_CATEGORIES).flat();

  return (
    <div className="flex flex-wrap gap-1.5">
      {subjects.map((code) => {
        const subject = allSubjects.find((s) => s.code === code);
        if (!subject) return null;
        return (
          <span
            key={code}
            className="inline-flex items-center gap-1 px-2 py-1 bg-turquoise-50 text-turquoise-700 rounded-full text-xs"
          >
            <span>{subject.emoji}</span>
            <span>{subject.name}</span>
          </span>
        );
      })}
    </div>
  );
}

/**
 * Get subject display info
 */
export function getSubjectInfo(code: string) {
  const allSubjects = Object.values(SUBJECT_CATEGORIES).flat();
  return allSubjects.find((s) => s.code === code);
}

export { SUBJECT_CATEGORIES };
