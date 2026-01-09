import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStyleLabel } from "@/lib/scoring";

export default async function HistoryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: results } = await supabase
    .from("results")
    .select("*")
    .eq("user_id", user.id)
    .order("calculated_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Assessment History
          </h1>
          <p className="text-slate-600 mt-1">
            Track how your learning style evolves over time
          </p>
        </div>
        <Link href="/assessment">
          <Button>New Assessment</Button>
        </Link>
      </div>

      {results && results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result, index) => (
            <Card key={result.id}>
              <CardContent className="py-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-slate-500">
                        {new Date(result.calculated_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      {index === 0 && (
                        <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-slate-900">
                      Primary:{" "}
                      <span className="text-blue-600">
                        {result.primary_styles.map(getStyleLabel).join(", ")}
                      </span>
                      {result.is_multimodal && (
                        <span className="text-slate-500 text-sm ml-2">
                          (Multimodal)
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">
                          {result.visual_percentage}%
                        </div>
                        <div className="text-slate-500">V</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">
                          {result.auditory_percentage}%
                        </div>
                        <div className="text-slate-500">A</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-yellow-600">
                          {result.read_write_percentage}%
                        </div>
                        <div className="text-slate-500">R</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-red-600">
                          {result.kinesthetic_percentage}%
                        </div>
                        <div className="text-slate-500">K</div>
                      </div>
                    </div>

                    <Link href={`/results/${result.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No assessments yet
            </h3>
            <p className="text-slate-600 mb-6">
              Take your first VARK assessment to discover your learning style
            </p>
            <Link href="/assessment">
              <Button>Start Assessment</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
