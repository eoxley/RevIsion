"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Subject Progress Cards
 *
 * Shows enrolled subjects with:
 * - Progress bar based on topic mastery
 * - Current topic / last studied info
 * - Click to open chat with subject context
 */

interface Subject {
  id: string;
  code: string;
  display_name: string;
  category: string;
}

interface StudentSubject {
  id: string;
  student_id: string;
  subject_id: string;
  subjects: Subject;
  progress_percentage?: number;
  current_topic_name?: string;
  last_studied_at?: string;
  understanding_level?: string;
  topics_covered?: number;
  topics_total?: number;
}

interface SubjectCardsProps {
  studentSubjects: StudentSubject[];
  onSubjectClick: (subjectCode: string, resumeContext: ResumeContext) => void;
}

interface ResumeContext {
  subject: Subject;
  resumeMessage: string;
  nextTopic: string | null;
  hasHistory: boolean;
}

// Subject emoji mapping (using UPPERCASE codes to match database)
const SUBJECT_EMOJIS: Record<string, string> = {
  MATHS: "📐",
  ENG_LANG: "📝",
  ENG_LIT: "📚",
  BIOLOGY: "🧬",
  CHEMISTRY: "⚗️",
  PHYSICS: "⚡",
  COMBINED_SCI: "🔬",
  HISTORY: "🏛️",
  GEOGRAPHY: "🌍",
  FRENCH: "🇫🇷",
  SPANISH: "🇪🇸",
  GERMAN: "🇩🇪",
  CS: "💻",
  BUSINESS: "💼",
  ECONOMICS: "📊",
  PSYCHOLOGY: "🧠",
  SOCIOLOGY: "👥",
  RE: "☮️",
  ART: "🎨",
  MUSIC: "🎵",
  DRAMA: "🎭",
  PE: "⚽",
  DT: "🔧",
  FOOD_TECH: "🍳",
};

// Understanding level colors
const UNDERSTANDING_COLORS: Record<string, { bg: string; text: string; bar: string }> = {
  not_started: { bg: "bg-neutral-100", text: "text-neutral-500", bar: "bg-neutral-300" },
  building: { bg: "bg-amber-50", text: "text-amber-600", bar: "bg-amber-400" },
  strengthening: { bg: "bg-blue-50", text: "text-blue-600", bar: "bg-blue-400" },
  secure: { bg: "bg-revision-green-50", text: "text-revision-green-600", bar: "bg-revision-green-500" },
};

export function SubjectCards({ studentSubjects, onSubjectClick }: SubjectCardsProps) {
  const [loadingSubject, setLoadingSubject] = useState<string | null>(null);

  async function handleSubjectClick(subject: StudentSubject) {
    const code = subject.subjects.code;
    setLoadingSubject(code);

    try {
      // Fetch resume context from API
      const response = await fetch(`/api/subjects/${code}/continue`);

      if (!response.ok) {
        throw new Error("Failed to get resume context");
      }

      const data = await response.json();

      onSubjectClick(code, {
        subject: data.subject,
        resumeMessage: data.resumeMessage,
        nextTopic: data.nextTopic,
        hasHistory: data.hasHistory,
      });
    } catch (error) {
      console.error("Error fetching resume context:", error);
      // Fallback - still open the subject
      onSubjectClick(code, {
        subject: subject.subjects,
        resumeMessage: `Let's work on ${subject.subjects.display_name}! What would you like to focus on?`,
        nextTopic: null,
        hasHistory: false,
      });
    } finally {
      setLoadingSubject(null);
    }
  }

  function getTimeAgo(dateString?: string): string {
    if (!dateString) return "Not started";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {studentSubjects.map((ss) => {
          const subject = ss.subjects;
          const emoji = SUBJECT_EMOJIS[subject.code] || "📖";
          const progress = ss.progress_percentage || 0;
          const understanding = ss.understanding_level || "not_started";
          const colors = UNDERSTANDING_COLORS[understanding] || UNDERSTANDING_COLORS.not_started;
          const isLoading = loadingSubject === subject.code;

          return (
            <button
              key={ss.id}
              onClick={() => handleSubjectClick(ss)}
              disabled={isLoading}
              className={cn(
                "relative p-4 rounded-xl border-2 text-left transition-all hover:shadow-md active:scale-[0.98]",
                "bg-white hover:border-revision-green-300",
                isLoading ? "opacity-70 cursor-wait" : "cursor-pointer"
              )}
            >
              {/* Loading overlay */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl">
                  <div className="w-5 h-5 border-2 border-revision-green-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Emoji */}
              <div className="text-2xl mb-2">{emoji}</div>

              {/* Subject name */}
              <h3 className="font-semibold text-neutral-900 text-sm truncate">
                {subject.display_name}
              </h3>

              {/* Current topic or last studied */}
              <p className="text-xs text-neutral-500 mt-1 truncate">
                {ss.current_topic_name || getTimeAgo(ss.last_studied_at)}
              </p>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className={cn("text-xs font-medium", colors.text)}>
                    {progress}%
                  </span>
                  {ss.topics_covered !== undefined && ss.topics_total !== undefined && ss.topics_total > 0 && (
                    <span className="text-xs text-neutral-400">
                      {ss.topics_covered}/{ss.topics_total}
                    </span>
                  )}
                </div>
                <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", colors.bar)}
                    style={{ width: `${Math.max(progress, 2)}%` }}
                  />
                </div>
              </div>

              {/* Understanding level badge */}
              {understanding !== "not_started" && (
                <div className={cn(
                  "mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                  colors.bg,
                  colors.text
                )}>
                  {understanding === "building" && "Building"}
                  {understanding === "strengthening" && "Strengthening"}
                  {understanding === "secure" && "Secure"}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
