"use client";

import { useEffect, useState } from "react";

interface SubjectReadiness {
  subject_code: string;
  subject_name: string;
  readiness_percentage: number;
  secure_count: number;
  total_topics: number;
}

interface ReadinessData {
  overall_readiness: number;
  readiness_level: "ready" | "almost_ready" | "needs_work" | "just_started";
  days_until_exams: number;
  subjects: SubjectReadiness[];
  recommendations: string[];
}

const LEVEL_CONFIG = {
  ready: {
    label: "Ready",
    color: "text-green-600",
    bgColor: "bg-green-100",
    progressColor: "bg-green-500",
  },
  almost_ready: {
    label: "Almost Ready",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    progressColor: "bg-blue-500",
  },
  needs_work: {
    label: "Building",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    progressColor: "bg-amber-500",
  },
  just_started: {
    label: "Just Started",
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    progressColor: "bg-slate-400",
  },
};

export function ReadinessIndicator() {
  const [data, setData] = useState<ReadinessData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReadiness() {
      try {
        const response = await fetch("/api/progress/readiness");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch readiness:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReadiness();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-3 bg-neutral-200 rounded w-1/3"></div>
        <div className="h-6 bg-neutral-200 rounded"></div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const config = LEVEL_CONFIG[data.readiness_level];

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-revision-green-600">
          Exam Readiness
        </h3>
        <span className="text-xs text-neutral-500">
          {data.days_until_exams} days
        </span>
      </div>

      {/* Overall readiness */}
      <div className="flex items-center gap-2">
        <div
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}
        >
          {config.label}
        </div>
        <div className="flex-1">
          <div className="w-full bg-neutral-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${config.progressColor}`}
              style={{ width: `${data.overall_readiness}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-bold text-neutral-900">{data.overall_readiness}%</span>
      </div>

      {/* Top recommendation */}
      {data.recommendations.length > 0 && (
        <p className="text-xs text-neutral-600 bg-neutral-50 p-2 rounded">
          {data.recommendations[0]}
        </p>
      )}
    </div>
  );
}
