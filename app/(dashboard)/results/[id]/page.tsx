import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStyleLabel } from "@/lib/scoring";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResultsPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get result
  const { data: result, error } = await supabase
    .from("results")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !result) {
    notFound();
  }

  // Get study tips for primary styles
  const { data: tips } = await supabase
    .from("study_tips")
    .select("*")
    .in("learning_style", result.primary_styles)
    .order("priority");

  const styleData = [
    {
      name: "Visual",
      percentage: result.visual_percentage,
      score: result.visual_score,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Auditory",
      percentage: result.auditory_percentage,
      score: result.auditory_score,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Read/Write",
      percentage: result.read_write_percentage,
      score: result.read_write_score,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      name: "Kinesthetic",
      percentage: result.kinesthetic_percentage,
      score: result.kinesthetic_score,
      color: "bg-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const sortedStyles = [...styleData].sort(
    (a, b) => b.percentage - a.percentage
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Here's how you learn best</h1>
        <p className="text-slate-600 mt-2">
          Quiz completed{" "}
          {new Date(result.calculated_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Primary Style Banner */}
      <Card className="bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-white border-0">
        <CardContent className="py-8 text-center">
          <p className="text-turquoise-100 text-sm uppercase tracking-wide mb-2">
            You're a{result.is_multimodal ? " multi-style" : "n"}{!result.is_multimodal && ` ${result.primary_styles[0]?.replace("_", "/")} `}learner
          </p>
          <h2 className="text-4xl font-bold">
            {result.primary_styles.map(getStyleLabel).join(" + ")}
          </h2>
          {result.is_multimodal && (
            <p className="text-turquoise-100 mt-2">
              You learn best when you mix up your revision techniques
            </p>
          )}
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedStyles.map((style) => (
              <div key={style.name}>
                <div className="flex justify-between mb-1">
                  <span className={`font-medium ${style.textColor}`}>
                    {style.name}
                  </span>
                  <span className="text-slate-600">{style.percentage}%</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${style.color} transition-all duration-500`}
                    style={{ width: `${style.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Style Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {sortedStyles.map((style, index) => (
          <Card
            key={style.name}
            className={index === 0 ? "ring-2 ring-blue-500" : ""}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className={style.textColor}>{style.name}</CardTitle>
                <span
                  className={`text-2xl font-bold ${style.textColor}`}
                >
                  {style.percentage}%
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                {style.name === "Visual" &&
                  "You learn best through seeing and visualizing. Charts, diagrams, maps, and color-coding help you understand and remember information."}
                {style.name === "Auditory" &&
                  "You learn best through listening and speaking. Lectures, discussions, podcasts, and verbal explanations resonate with you."}
                {style.name === "Read/Write" &&
                  "You learn best through reading and writing. Taking notes, reading textbooks, and writing summaries help you process information."}
                {style.name === "Kinesthetic" &&
                  "You learn best through doing and experiencing. Hands-on practice, experiments, and physical activities enhance your learning."}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Study Tips */}
      {tips && tips.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Personalized Study Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.slice(0, 6).map((tip) => (
                <div
                  key={tip.id}
                  className="p-4 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">
                      {tip.learning_style === "visual" && "👁️"}
                      {tip.learning_style === "auditory" && "👂"}
                      {tip.learning_style === "read_write" && "📖"}
                      {tip.learning_style === "kinesthetic" && "🤲"}
                    </span>
                    <div>
                      <h4 className="font-medium text-slate-900">
                        {tip.tip_title}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        {tip.tip_description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Link href="/dashboard">
          <Button variant="outline">Start revising</Button>
        </Link>
        <Link href="/assessment">
          <Button className="bg-turquoise-500 hover:bg-turquoise-600">Retake the quiz</Button>
        </Link>
      </div>
    </div>
  );
}
