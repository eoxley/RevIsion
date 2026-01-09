"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LearningProfile } from "@/lib/learning-profile";

interface FullLearningProfileProps {
  profile: LearningProfile;
}

export function FullLearningProfile({ profile }: FullLearningProfileProps) {
  return (
    <div className="space-y-6">
      {/* Profile Type Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="py-8">
          <h2 className="text-3xl font-bold mb-2">{profile.profileType}</h2>
          <p className="text-blue-100 text-lg">{profile.profileDescription}</p>
          <p className="mt-4 text-yellow-200 font-medium">{profile.strengthStatement}</p>
        </CardContent>
      </Card>

      {/* Study Environment & Timing */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>🕐</span> Best Time to Study
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">{profile.bestTimeToStudy}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>⏱️</span> Session Length
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">{profile.idealSessionLength}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>☕</span> Break Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">{profile.breakStrategy}</p>
          </CardContent>
        </Card>
      </div>

      {/* Environment Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏠</span> Your Ideal Study Environment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-2">
            {profile.environmentTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-green-500 mt-0.5">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Revision Approach */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🎯</span> Your Revision Approach
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700">{profile.revisionApproach}</p>
        </CardContent>
      </Card>

      {/* Daily Routine */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📅</span> Your Daily Routine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {profile.dailyRoutine.map((item, i) => (
              <p key={i} className={`text-sm ${i === 0 ? "font-semibold text-slate-900" : "text-slate-600 pl-2"}`}>
                {item}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📊</span> Weekly Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {profile.weeklyGoals.map((goal, i) => (
              <p key={i} className={`text-sm ${i === 0 ? "font-semibold text-slate-900" : "text-slate-600"}`}>
                {goal}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📚</span> Subject-Specific Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {profile.subjectStrategies.map((subject, i) => (
              <div key={i} className="space-y-3">
                <h4 className="font-semibold text-slate-900">{subject.subject}</h4>
                <div>
                  <p className="text-xs text-slate-500 uppercase mb-1">Techniques</p>
                  <ul className="space-y-1">
                    {subject.techniques.map((t, j) => (
                      <li key={j} className="text-sm text-slate-600 flex items-start gap-1">
                        <span className="text-blue-500">•</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase mb-1">Resources</p>
                  <ul className="space-y-1">
                    {subject.resources.map((r, j) => (
                      <li key={j} className="text-sm text-blue-600">{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tools & Resources */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🛠️</span> Your Primary Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {profile.primaryTools.map((tool, i) => (
                <li key={i} className="text-sm text-slate-600">{tool}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📱</span> Recommended Apps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {profile.recommendedApps.map((app, i) => (
                <li key={i} className="text-sm text-slate-600">{app}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* YouTube & Websites */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📺</span> YouTube Channels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {profile.youtubeChannels.map((channel, i) => (
                <li key={i} className="text-sm text-red-600">{channel}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🌐</span> Useful Websites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {profile.websites.map((site, i) => (
                <li key={i} className="text-sm text-blue-600">{site}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Exam Preparation */}
      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <span>📝</span> Exam Preparation Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {profile.examPrep.map((item, i) => (
              <p key={i} className={`text-sm ${i === 0 ? "font-semibold text-amber-900" : "text-amber-800"}`}>
                {item}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exam Day Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🎓</span> Exam Day Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {profile.examDayTips.map((tip, i) => (
              <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="text-green-500">✓</span> {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Motivation & Rewards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>💪</span> Your Motivation Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">{profile.motivationStyle}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🎁</span> Reward Ideas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {profile.rewardSuggestions.map((reward, i) => (
                <li key={i} className="text-sm text-slate-600">• {reward}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Warnings */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <span>⚠️</span> Common Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <ul className="space-y-2">
                {profile.commonMistakes.slice(1).map((mistake, i) => (
                  <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                    <span className="text-red-500">✗</span> {mistake}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-red-600 uppercase mb-2 font-medium">Also Avoid</p>
              <ul className="space-y-2">
                {profile.avoidThese.map((item, i) => (
                  <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                    <span className="text-red-500">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
