"use client";

import { useState } from "react";
import { PersistentChat } from "@/components/chat/persistent-chat";
import {
  ProgressSidebar,
  ProgressSidebarCompact,
} from "@/components/dashboard/progress-sidebar";
import { SubjectCards } from "@/components/dashboard/subject-cards";
import Link from "next/link";

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
          <div className="mb-4 p-4 bg-revision-green-50 border border-revision-green-100 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-revision-green-800">
                  Let's find out how you learn best
                </p>
                <p className="text-xs text-revision-green-600 mt-0.5">
                  Quick quiz to unlock personalised revision tips
                </p>
              </div>
              <Link
                href="/assessment"
                className="px-4 py-2 bg-revision-green-600 text-white text-sm font-medium rounded-lg hover:bg-revision-green-700 transition"
              >
                Take the quiz
              </Link>
            </div>
          </div>
        )}

        {/* Subject Cards - Show when not in subject context */}
        {!subjectContext && studentSubjects.length > 0 && (
          <SubjectCards
            studentSubjects={studentSubjects}
            onSubjectClick={handleSubjectClick}
          />
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
          studentSubjects={studentSubjects}
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
