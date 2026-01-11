"use client";

import { useState, useEffect } from "react";
import { PersistentChat } from "@/components/chat/persistent-chat";
import {
  ProgressSidebar,
  ProgressSidebarCompact,
} from "@/components/dashboard/progress-sidebar";
import { SubjectCards } from "@/components/dashboard/subject-cards";
import Link from "next/link";

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

/**
 * Dashboard Client Component
 *
 * Manages state for:
 * - Subject context (when user clicks on a subject card)
 * - Chat context passing
 */

interface LearningProfile {
  visual: number;
  auditory: number;
  readWrite: number;
  kinesthetic: number;
  primaryStyles: string[];
  isMultimodal: boolean;
}

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
  exam_board?: string | null;
  target_grade?: number | null;
  priority_level?: string;
  progress_percentage?: number;
  current_topic_name?: string;
  last_studied_at?: string;
  understanding_level?: string;
  topics_covered?: number;
  topics_total?: number;
}

interface SubjectContext {
  subjectCode: string;
  subjectName: string;
  resumeMessage: string;
  nextTopic: string | null;
  hasHistory: boolean;
}

interface ResumeContext {
  subject: Subject;
  resumeMessage: string;
  nextTopic: string | null;
  hasHistory: boolean;
}

interface DashboardClientProps {
  studentName?: string;
  learningProfile: LearningProfile | null;
  studentSubjects: StudentSubject[];
  subjectNames: string[];
  sessionCount: number;
}

export function DashboardClient({
  studentName,
  learningProfile,
  studentSubjects,
  subjectNames,
  sessionCount,
}: DashboardClientProps) {
  const [subjectContext, setSubjectContext] = useState<SubjectContext | null>(null);
  const [progressData, setProgressData] = useState<AggregatedProgress[]>([]);

  // Fetch live progress from revision_progress table
  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch("/api/progress/subjects");
        if (res.ok) {
          const data = await res.json();
          setProgressData(data.progress || []);
        }
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      }
    }
    fetchProgress();
  }, []);

  // Merge progress data with student subjects
  const subjectsWithProgress = studentSubjects.map((ss) => {
    const progress = progressData.find((p) => p.subject_id === ss.subject_id);
    if (progress) {
      return {
        ...ss,
        progress_percentage: progress.progress_percentage,
        understanding_level: progress.understanding_level,
        topics_covered: progress.secure_count + progress.strengthening_count,
        topics_total: progress.total_topics,
        last_studied_at: progress.last_interaction_at || ss.last_studied_at,
      };
    }
    return ss;
  });

  // Handle subject card click
  function handleSubjectClick(subjectCode: string, resumeContext: ResumeContext) {
    setSubjectContext({
      subjectCode,
      subjectName: resumeContext.subject.display_name,
      resumeMessage: resumeContext.resumeMessage,
      nextTopic: resumeContext.nextTopic,
      hasHistory: resumeContext.hasHistory,
    });
  }

  // Clear subject context to go back to general view
  function handleClearSubjectContext() {
    setSubjectContext(null);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-neutral-900">
            {studentName ? `Hey ${studentName}` : "Hey there"}
          </h1>
          <p className="text-neutral-500 mt-1">
            {subjectContext
              ? `Revising ${subjectContext.subjectName}`
              : learningProfile
                ? `Your ${learningProfile.primaryStyles[0]?.replace("_", "/")} learning style coach is here to help`
                : "Ready to smash your revision?"}
          </p>
        </div>

        {/* Learning style prompt if not completed */}
        {!learningProfile && !subjectContext && (
          <div className="mb-4 p-4 bg-turquoise-50 border border-turquoise-100 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-turquoise-800">
                  Let's find out how you learn best
                </p>
                <p className="text-xs text-turquoise-600 mt-0.5">
                  Quick quiz to unlock personalised revision tips
                </p>
              </div>
              <Link
                href="/assessment"
                className="px-4 py-2 bg-turquoise-600 text-white text-sm font-medium rounded-lg hover:bg-turquoise-700 transition"
              >
                Take the quiz
              </Link>
            </div>
          </div>
        )}

        {/* Subject Cards - Show when not in subject context */}
        {!subjectContext && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-neutral-600">Your Subjects</h2>
              <Link
                href="/onboarding?edit=subjects"
                className="text-xs text-turquoise-600 hover:text-turquoise-700 font-medium"
              >
                Edit subjects
              </Link>
            </div>
            {subjectsWithProgress.length > 0 ? (
              <SubjectCards
                studentSubjects={subjectsWithProgress}
                onSubjectClick={handleSubjectClick}
              />
            ) : (
              <Link
                href="/onboarding?edit=subjects"
                className="block p-6 border-2 border-dashed border-neutral-200 rounded-xl text-center hover:border-turquoise-300 transition"
              >
                <p className="text-neutral-500">No subjects selected yet</p>
                <p className="text-sm text-turquoise-600 font-medium mt-1">
                  Click to add subjects
                </p>
              </Link>
            )}
          </div>
        )}

        {/* Chat Interface */}
        <div className="flex-1">
          <PersistentChat
            key={subjectContext?.subjectCode || "general"}
            learningProfile={learningProfile}
            studentName={studentName}
            subjects={subjectNames}
            subjectContext={subjectContext}
            onClearSubjectContext={handleClearSubjectContext}
          />
        </div>
      </main>

      {/* Progress Sidebar - Desktop only */}
      <div className="hidden lg:block">
        <ProgressSidebar
          studentSubjects={subjectsWithProgress}
          learningProfile={learningProfile}
          sessionCount={sessionCount}
          studentName={studentName}
        />
      </div>

      {/* Compact Progress - Mobile only */}
      <div className="lg:hidden">
        <ProgressSidebarCompact
          learningProfile={learningProfile}
          sessionCount={sessionCount}
        />
      </div>
    </div>
  );
}
