import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChatInterface } from "@/components/chat/chat-interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function RevisionAIPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get the user's latest VARK result
  const { data: latestResult } = await supabase
    .from("results")
    .select("*")
    .eq("user_id", user.id)
    .order("calculated_at", { ascending: false })
    .limit(1)
    .single();

  const varkProfile = latestResult
    ? {
        visual: latestResult.visual_percentage,
        auditory: latestResult.auditory_percentage,
        readWrite: latestResult.read_write_percentage,
        kinesthetic: latestResult.kinesthetic_percentage,
        primaryStyles: latestResult.primary_styles,
        isMultimodal: latestResult.is_multimodal,
      }
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">RevisionAI</h1>
        <p className="text-slate-600 mt-1">
          Your personal AI study coach, tailored to your learning style
        </p>
      </div>

      {/* VARK Profile Summary */}
      {varkProfile ? (
        <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">
                  {varkProfile.primaryStyles[0] === "visual" && "👁️"}
                  {varkProfile.primaryStyles[0] === "auditory" && "👂"}
                  {varkProfile.primaryStyles[0] === "read_write" && "📖"}
                  {varkProfile.primaryStyles[0] === "kinesthetic" && "🤲"}
                </div>
                <div>
                  <p className="text-sm text-slate-500">Your learning style</p>
                  <p className="font-semibold text-slate-900">
                    {varkProfile.primaryStyles
                      .map((s: string) =>
                        s
                          .replace("_", "/")
                          .replace(/^\w/, (c) => c.toUpperCase())
                      )
                      .join(" + ")}
                    {varkProfile.isMultimodal && " (Multimodal)"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-blue-600">{varkProfile.visual}%</div>
                  <div className="text-slate-500">V</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">{varkProfile.auditory}%</div>
                  <div className="text-slate-500">A</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-yellow-600">{varkProfile.readWrite}%</div>
                  <div className="text-slate-500">R</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-red-600">{varkProfile.kinesthetic}%</div>
                  <div className="text-slate-500">K</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-medium text-yellow-800">
                    Take the VARK assessment first
                  </p>
                  <p className="text-sm text-yellow-700">
                    Get personalized revision advice based on your learning style
                  </p>
                </div>
              </div>
              <Link href="/assessment">
                <Button size="sm">Take Assessment</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Interface */}
      <ChatInterface varkProfile={varkProfile} />

      {/* Tips Section */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-2xl mb-2">📚</div>
          <h3 className="font-medium mb-1">Study Plans</h3>
          <p className="text-sm text-slate-600">
            Ask for a revision schedule tailored to your exams
          </p>
        </Card>
        <Card className="p-4">
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="font-medium mb-1">Subject Help</h3>
          <p className="text-sm text-slate-600">
            Get specific techniques for any subject
          </p>
        </Card>
        <Card className="p-4">
          <div className="text-2xl mb-2">💡</div>
          <h3 className="font-medium mb-1">Memory Tips</h3>
          <p className="text-sm text-slate-600">
            Learn memorization strategies for your style
          </p>
        </Card>
      </div>
    </div>
  );
}
