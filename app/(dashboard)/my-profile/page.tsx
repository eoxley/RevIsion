import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LearningTools } from "@/components/profile/learning-tools";
import { FullLearningProfile } from "@/components/profile/full-learning-profile";
import { generateLearningProfile } from "@/lib/learning-profile";

export default async function MyProfilePage() {
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

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!latestResult) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-2xl font-bold mb-2">Discover Your Learning Profile</h2>
            <p className="text-slate-600 mb-6">
              Take the VARK assessment to unlock personalised learning tools and techniques
            </p>
            <Link href="/assessment">
              <Button size="lg">Take Assessment</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const varkProfile = {
    visual: latestResult.visual_percentage,
    auditory: latestResult.auditory_percentage,
    readWrite: latestResult.read_write_percentage,
    kinesthetic: latestResult.kinesthetic_percentage,
    primaryStyles: latestResult.primary_styles,
    isMultimodal: latestResult.is_multimodal,
  };

  // Determine dominant style
  const dominantStyle = varkProfile.primaryStyles[0];

  const styleInfo: Record<string, { icon: string; color: string; bgColor: string; name: string; description: string }> = {
    visual: {
      icon: "👁️",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      name: "Visual Learner",
      description: "You learn best by seeing. Diagrams, charts, videos, and colour-coding help you understand and remember.",
    },
    auditory: {
      icon: "👂",
      color: "text-green-600",
      bgColor: "bg-green-50",
      name: "Auditory Learner",
      description: "You learn best by hearing. Discussions, lectures, podcasts, and explaining things aloud work well for you.",
    },
    read_write: {
      icon: "📖",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      name: "Read/Write Learner",
      description: "You learn best through text. Reading, note-taking, lists, and written explanations suit your style.",
    },
    kinesthetic: {
      icon: "🤲",
      color: "text-red-600",
      bgColor: "bg-red-50",
      name: "Kinesthetic Learner",
      description: "You learn best by doing. Hands-on practice, experiments, and physical activities help you learn.",
    },
  };

  const dominant = styleInfo[dominantStyle] || styleInfo.visual;

  // Generate the full learning profile
  const fullProfile = generateLearningProfile(varkProfile);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Learning Profile</h1>
        <p className="text-slate-600 mt-1">
          Personalised tools and techniques matched to how you learn best
        </p>
      </div>

      {/* Profile Overview */}
      <Card className={`${dominant.bgColor} border-0`}>
        <CardContent className="py-8">
          <div className="flex items-center gap-6">
            <div className="text-6xl">{dominant.icon}</div>
            <div className="flex-1">
              <h2 className={`text-2xl font-bold ${dominant.color}`}>
                {varkProfile.isMultimodal ? "Multimodal Learner" : dominant.name}
              </h2>
              <p className="text-slate-700 mt-1">
                {varkProfile.isMultimodal
                  ? `You combine ${varkProfile.primaryStyles.map((s: string) => s.replace("_", "/")).join(" and ")} learning styles for maximum effectiveness.`
                  : dominant.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-slate-900">
                {varkProfile[dominantStyle.replace("_", "") as keyof typeof varkProfile] || varkProfile.visual}%
              </div>
              <p className="text-sm text-slate-600">Primary strength</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* VARK Breakdown */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { key: "visual", label: "Visual", value: varkProfile.visual, color: "bg-blue-500" },
          { key: "auditory", label: "Auditory", value: varkProfile.auditory, color: "bg-green-500" },
          { key: "read_write", label: "Read/Write", value: varkProfile.readWrite, color: "bg-yellow-500" },
          { key: "kinesthetic", label: "Kinesthetic", value: varkProfile.kinesthetic, color: "bg-red-500" },
        ].map((style) => (
          <Card key={style.key} className={varkProfile.primaryStyles.includes(style.key) ? "ring-2 ring-blue-500" : ""}>
            <CardContent className="py-4 text-center">
              <div className="text-2xl font-bold">{style.value}%</div>
              <p className="text-sm text-slate-600">{style.label}</p>
              <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${style.color}`} style={{ width: `${style.value}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Tools Component */}
      <LearningTools varkProfile={varkProfile} />

      {/* Full Personalized Learning Profile */}
      <FullLearningProfile profile={fullProfile} />

      {/* Recommended Techniques */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recommended GCSE Revision Techniques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {varkProfile.primaryStyles.includes("visual") && (
              <div className="space-y-3">
                <h3 className="font-semibold text-blue-600 flex items-center gap-2">
                  <span>👁️</span> Visual Techniques
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>✓ Create colourful mind maps for each topic</li>
                  <li>✓ Watch YouTube: Cognito, FreeScienceLessons</li>
                  <li>✓ Use highlighters with a colour system</li>
                  <li>✓ Draw diagrams and flowcharts</li>
                  <li>✓ Stick visual summaries on your wall</li>
                </ul>
              </div>
            )}
            {varkProfile.primaryStyles.includes("auditory") && (
              <div className="space-y-3">
                <h3 className="font-semibold text-green-600 flex items-center gap-2">
                  <span>👂</span> Auditory Techniques
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>✓ Use the Listen feature on this page</li>
                  <li>✓ Record yourself and listen back</li>
                  <li>✓ Explain topics to friends/family</li>
                  <li>✓ Use GCSE Pod for audio lessons</li>
                  <li>✓ Create mnemonics and rhymes</li>
                </ul>
              </div>
            )}
            {varkProfile.primaryStyles.includes("read_write") && (
              <div className="space-y-3">
                <h3 className="font-semibold text-yellow-600 flex items-center gap-2">
                  <span>📖</span> Read/Write Techniques
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>✓ Rewrite notes in your own words</li>
                  <li>✓ Use CGP revision guides</li>
                  <li>✓ Read mark schemes thoroughly</li>
                  <li>✓ Keep a detailed revision journal</li>
                  <li>✓ Write out practice answers in full</li>
                </ul>
              </div>
            )}
            {varkProfile.primaryStyles.includes("kinesthetic") && (
              <div className="space-y-3">
                <h3 className="font-semibold text-red-600 flex items-center gap-2">
                  <span>🤲</span> Kinesthetic Techniques
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>✓ Use the Flashcard tool on this page</li>
                  <li>✓ Do past papers under timed conditions</li>
                  <li>✓ Take movement breaks every 25 mins</li>
                  <li>✓ Walk while reviewing notes</li>
                  <li>✓ Sort flashcards into piles physically</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Link href="/revision-ai">
          <Button size="lg">Chat with RevisionAI</Button>
        </Link>
        <Link href="/assessment">
          <Button variant="outline" size="lg">Retake Assessment</Button>
        </Link>
      </div>
    </div>
  );
}
