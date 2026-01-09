import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get user's results
  const { data: results } = await supabase
    .from("results")
    .select("*, assessments(*)")
    .eq("user_id", user?.id)
    .order("calculated_at", { ascending: false });

  const latestResult = results?.[0];
  const totalAssessments = results?.length || 0;

  // Determine primary learning style from latest result
  const primaryStyle = latestResult?.primary_styles?.[0];
  const styleColors: Record<string, string> = {
    visual: "text-blue-600 bg-blue-50",
    auditory: "text-green-600 bg-green-50",
    read_write: "text-yellow-600 bg-yellow-50",
    kinesthetic: "text-red-600 bg-red-50",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Track your learning style and progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">
              Total Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalAssessments}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">
              Primary Learning Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            {primaryStyle ? (
              <span
                className={`inline-block px-3 py-1 rounded-full text-lg font-semibold capitalize ${
                  styleColors[primaryStyle] || "bg-slate-100"
                }`}
              >
                {primaryStyle.replace("_", "/")}
              </span>
            ) : (
              <p className="text-slate-400">Take an assessment to find out</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">
              Last Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            {latestResult ? (
              <p className="text-lg">
                {new Date(latestResult.calculated_at).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-slate-400">No assessments yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Latest Result Summary */}
      {latestResult && (
        <Card>
          <CardHeader>
            <CardTitle>Your Learning Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {latestResult.visual_percentage}%
                </div>
                <p className="text-sm text-slate-600">Visual</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {latestResult.auditory_percentage}%
                </div>
                <p className="text-sm text-slate-600">Auditory</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {latestResult.read_write_percentage}%
                </div>
                <p className="text-sm text-slate-600">Read/Write</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {latestResult.kinesthetic_percentage}%
                </div>
                <p className="text-sm text-slate-600">Kinesthetic</p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Link href={`/results/${latestResult.id}`}>
                <Button variant="outline">View Full Results</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* RevisionAI CTA */}
      {latestResult && (
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🤖</div>
                <div>
                  <h3 className="text-xl font-bold">RevisionAI</h3>
                  <p className="text-purple-100">
                    Get personalized study advice from your AI coach
                  </p>
                </div>
              </div>
              <Link href="/revision-ai">
                <Button className="bg-white text-purple-600 hover:bg-purple-50">
                  Chat Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
        <CardContent className="py-8 text-center">
          <h2 className="text-2xl font-bold mb-2">
            {totalAssessments === 0
              ? "Ready to discover your learning style?"
              : "Take another assessment"}
          </h2>
          <p className="text-blue-100 mb-6">
            {totalAssessments === 0
              ? "Complete our 32-question VARK assessment to understand how you learn best."
              : "Track how your learning preferences change over time."}
          </p>
          <Link href="/assessment">
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              Start Assessment
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
