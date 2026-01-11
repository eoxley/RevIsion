"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorPattern {
  error_type: string;
  count: number;
  percentage: number;
}

interface InsightsData {
  total_evaluations: number;
  correct_count: number;
  partial_count: number;
  incorrect_count: number;
  accuracy_percentage: number;
  error_patterns: ErrorPattern[];
  recent_topics: string[];
}

const ERROR_TYPE_LABELS: Record<string, string> = {
  recall_gap: "Memory recall",
  concept_gap: "Concept understanding",
  confusion: "Mixed concepts",
  exam_technique: "Exam technique",
  guessing: "Guessing",
};

export function LearningInsights() {
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      try {
        const response = await fetch("/api/progress/insights");
        if (response.ok) {
          const data = await response.json();
          setInsights(data);
        }
      } catch (error) {
        console.error("Failed to fetch insights:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-8 bg-slate-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!insights || insights.total_evaluations === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Learning Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500 text-sm">
            Start revising to see your learning patterns here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Learning Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Accuracy Overview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Overall Accuracy</span>
            <span className="text-2xl font-bold text-azure-500">
              {insights.accuracy_percentage}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-turquoise-500 h-2 rounded-full transition-all"
              style={{ width: `${insights.accuracy_percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{insights.correct_count} correct</span>
            <span>{insights.partial_count} partial</span>
            <span>{insights.incorrect_count} incorrect</span>
          </div>
        </div>

        {/* Error Patterns */}
        {insights.error_patterns.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-3">
              Areas to Focus On
            </h4>
            <div className="space-y-2">
              {insights.error_patterns.slice(0, 3).map((pattern) => (
                <div
                  key={pattern.error_type}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-600">
                    {ERROR_TYPE_LABELS[pattern.error_type] || pattern.error_type}
                  </span>
                  <span className="text-slate-500">{pattern.count} times</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Topics */}
        {insights.recent_topics.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">
              Recent Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {insights.recent_topics.slice(0, 5).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-slate-400">
          Based on {insights.total_evaluations} evaluations
        </p>
      </CardContent>
    </Card>
  );
}
