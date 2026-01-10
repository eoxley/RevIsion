/**
 * Progress Sidebar
 *
 * Shows ONLY schema-backed progress indicators.
 * Brand-compliant: uses green for positive progress, neutral for inactive.
 * NO red, NO gamification.
 *
 * Currently Rendered (backed by database):
 * - Student's enrolled subjects (student_subjects + subjects tables)
 * - Learning style summary (results table)
 * - Session count (learning_sessions table)
 *
 * NOT Rendered (not yet in database):
 * - Topic-level progress (Build/Strengthen/Maintain bands)
 * - Understanding states per topic
 * - Misconception tracking
 *
 * These will be added when the schema is expanded.
 */

import { cn } from "@/lib/utils";

interface Subject {
  id: string;
  code: string;
  display_name: string;
  category: string;
}

interface StudentSubject {
  id: string;
  subject_id: string;
  exam_board?: string | null;
  target_grade?: number | null;
  priority_level?: string;
  last_studied_at?: string | null;
  subjects: Subject;
}

interface LearningProfile {
  visual: number;
  auditory: number;
  readWrite: number;
  kinesthetic: number;
  primaryStyles: string[];
  isMultimodal: boolean;
}

interface ProgressSidebarProps {
  studentSubjects: StudentSubject[];
  learningProfile: LearningProfile | null;
  sessionCount: number;
  studentName?: string;
}

export function ProgressSidebar({
  studentSubjects,
  learningProfile,
  sessionCount,
  studentName,
}: ProgressSidebarProps) {
  return (
    <aside className="w-72 bg-white border-l border-neutral-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <h2 className="font-semibold text-neutral-900">
          {studentName ? `${studentName}'s Progress` : "Your Progress"}
        </h2>
        <p className="text-xs text-neutral-500 mt-1">
          {sessionCount} revision {sessionCount === 1 ? "session" : "sessions"}{" "}
          completed
        </p>
      </div>

      {/* Learning Style Section */}
      {learningProfile && (
        <div className="p-4 border-b border-neutral-200">
          <h3 className="text-sm font-medium text-revision-green-600 mb-3">
            How you learn
          </h3>
          <div className="space-y-2">
            <LearningStyleBar
              label="Visual"
              value={learningProfile.visual}
              isPrimary={learningProfile.primaryStyles.includes("visual")}
            />
            <LearningStyleBar
              label="Auditory"
              value={learningProfile.auditory}
              isPrimary={learningProfile.primaryStyles.includes("auditory")}
            />
            <LearningStyleBar
              label="Read/Write"
              value={learningProfile.readWrite}
              isPrimary={learningProfile.primaryStyles.includes("read_write")}
            />
            <LearningStyleBar
              label="Hands-on"
              value={learningProfile.kinesthetic}
              isPrimary={learningProfile.primaryStyles.includes("kinesthetic")}
            />
          </div>
          {learningProfile.isMultimodal && (
            <p className="text-xs text-revision-green-600 mt-2">
              You learn best using multiple styles
            </p>
          )}
        </div>
      )}

      {/* Subjects Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-revision-green-600">
            Your Subjects
          </h3>
          <a
            href="/onboarding?edit=subjects"
            className="text-xs text-neutral-400 hover:text-revision-green-600"
          >
            Edit
          </a>
        </div>

        {studentSubjects.length > 0 ? (
          <div className="space-y-2">
            {studentSubjects.map((ss) => (
              <SubjectCard key={ss.id} studentSubject={ss} />
            ))}
          </div>
        ) : (
          <a
            href="/onboarding?edit=subjects"
            className="block text-center py-6 rounded-lg border-2 border-dashed border-neutral-200 hover:border-revision-green-300 transition"
          >
            <p className="text-sm text-neutral-500">No subjects added yet</p>
            <p className="text-xs text-revision-green-600 mt-1">
              Click to add subjects
            </p>
          </a>
        )}
      </div>

      {/* Footer - No learning style yet prompt */}
      {!learningProfile && (
        <div className="p-4 border-t border-neutral-200 bg-neutral-50">
          <p className="text-xs text-neutral-600 text-center">
            Take the quick quiz to discover how you learn best
          </p>
        </div>
      )}
    </aside>
  );
}

/**
 * Learning style bar with green for primary style
 */
function LearningStyleBar({
  label,
  value,
  isPrimary,
}: {
  label: string;
  value: number;
  isPrimary: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-neutral-600 w-20">{label}</span>
      <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            isPrimary ? "bg-revision-green-500" : "bg-neutral-300"
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      <span
        className={cn(
          "text-xs w-8 text-right",
          isPrimary ? "text-revision-green-600 font-medium" : "text-neutral-500"
        )}
      >
        {value}%
      </span>
    </div>
  );
}

/**
 * Subject card showing name and exam board
 */
function SubjectCard({ studentSubject }: { studentSubject: StudentSubject }) {
  const { subjects: subject, exam_board, priority_level, last_studied_at } =
    studentSubject;

  // Priority indicator - uses neutral and green only
  const priorityStyles: Record<string, string> = {
    critical: "bg-revision-green-100 text-revision-green-700",
    high: "bg-revision-green-50 text-revision-green-600",
    medium: "bg-neutral-100 text-neutral-600",
    low: "bg-neutral-50 text-neutral-500",
    maintenance: "bg-revision-green-50 text-revision-green-600",
  };

  return (
    <div className="p-3 rounded-lg border border-neutral-200 hover:border-revision-green-300 transition bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-medium text-neutral-900">
            {subject.display_name}
          </h4>
          {exam_board && (
            <p className="text-xs text-neutral-500">{exam_board}</p>
          )}
        </div>
        {priority_level && (
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              priorityStyles[priority_level] || priorityStyles.medium
            )}
          >
            {priority_level === "maintenance"
              ? "Strong"
              : priority_level === "critical"
                ? "Focus"
                : null}
          </span>
        )}
      </div>
      {last_studied_at && (
        <p className="text-xs text-neutral-400 mt-2">
          Last studied:{" "}
          {new Date(last_studied_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}
        </p>
      )}
    </div>
  );
}

/**
 * Compact version for smaller screens
 */
export function ProgressSidebarCompact({
  learningProfile,
  sessionCount,
}: {
  learningProfile: LearningProfile | null;
  sessionCount: number;
}) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-900">
            {sessionCount} sessions completed
          </p>
          {learningProfile && (
            <p className="text-xs text-revision-green-600">
              {learningProfile.isMultimodal
                ? "Multi-style learner"
                : `${learningProfile.primaryStyles[0]?.replace("_", "/")} learner`}
            </p>
          )}
        </div>
        {learningProfile && (
          <div className="flex gap-1">
            {learningProfile.primaryStyles.slice(0, 2).map((style) => (
              <span
                key={style}
                className="text-xs px-2 py-1 bg-revision-green-50 text-revision-green-700 rounded-full"
              >
                {style.charAt(0).toUpperCase()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
