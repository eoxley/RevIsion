"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VARKProfile {
  visual: number;
  auditory: number;
  readWrite: number;
  kinesthetic: number;
  primaryStyles: string[];
  isMultimodal: boolean;
}

interface LearningToolsProps {
  varkProfile: VARKProfile;
}

// Sample flashcards for demo
const sampleFlashcards = [
  { front: "What is photosynthesis?", back: "The process by which plants convert light energy into chemical energy (glucose) using CO₂ and water", subject: "Biology" },
  { front: "What is the quadratic formula?", back: "x = (-b ± √(b²-4ac)) / 2a", subject: "Maths" },
  { front: "What year did WW1 start?", back: "1914", subject: "History" },
  { front: "What is a metaphor?", back: "A figure of speech that directly compares two unlike things without using 'like' or 'as'", subject: "English" },
  { front: "What is the chemical formula for water?", back: "H₂O", subject: "Chemistry" },
];

export function LearningTools({ varkProfile }: LearningToolsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    varkProfile.primaryStyles.includes("auditory") ? "listen" :
    varkProfile.primaryStyles.includes("kinesthetic") || varkProfile.primaryStyles.includes("visual") ? "flashcards" :
    "notes"
  );

  // Text-to-speech state
  const [textToSpeak, setTextToSpeak] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Flashcard state
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);

  // Notes state
  const [notes, setNotes] = useState("");

  // Text-to-speech function
  const speakText = () => {
    if (!textToSpeak.trim()) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Flashcard functions
  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % sampleFlashcards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev - 1 + sampleFlashcards.length) % sampleFlashcards.length);
  };

  const markKnown = () => {
    if (!knownCards.includes(currentCard)) {
      setKnownCards([...knownCards, currentCard]);
    }
    nextCard();
  };

  // Determine which tools to show prominently based on VARK
  const showListenFirst = varkProfile.primaryStyles.includes("auditory");
  const showFlashcardsFirst = varkProfile.primaryStyles.includes("kinesthetic") || varkProfile.primaryStyles.includes("visual");
  const showNotesFirst = varkProfile.primaryStyles.includes("read_write");

  // Sort tabs based on profile
  const tabs = [
    { id: "listen", label: "🎧 Listen", show: true, priority: showListenFirst ? 1 : 3 },
    { id: "flashcards", label: "🃏 Flashcards", show: true, priority: showFlashcardsFirst ? 1 : 2 },
    { id: "notes", label: "📝 Notes", show: true, priority: showNotesFirst ? 1 : 4 },
  ].sort((a, b) => a.priority - b.priority);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Learning Tools</span>
          <span className="text-sm font-normal text-slate-500">
            Recommended for {varkProfile.primaryStyles.map(s => s.replace("_", "/")).join(" + ")} learners
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
              {tab.priority === 1 && (
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Best for you
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Listen Tool - For Auditory Learners */}
        {activeTab === "listen" && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${showListenFirst ? "bg-green-50 border border-green-200" : "bg-slate-50"}`}>
              {showListenFirst && (
                <p className="text-green-700 text-sm mb-3 font-medium">
                  👂 As an auditory learner, listening to content helps you retain information better!
                </p>
              )}
              <p className="text-slate-600 text-sm mb-4">
                Paste your revision notes below and click &quot;Listen&quot; to hear them read aloud.
                Great for learning while walking or doing other activities.
              </p>
            </div>

            <textarea
              value={textToSpeak}
              onChange={(e) => setTextToSpeak(e.target.value)}
              placeholder="Paste your revision notes here...&#10;&#10;Example: Photosynthesis is the process by which plants convert light energy into chemical energy. The equation is: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂"
              className="w-full h-40 p-4 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-3">
              <Button onClick={speakText} className={isSpeaking ? "bg-red-600 hover:bg-red-700" : ""}>
                {isSpeaking ? "⏹️ Stop" : "🔊 Listen"}
              </Button>
              <Button variant="outline" onClick={() => setTextToSpeak("")}>
                Clear
              </Button>
            </div>

            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium mb-2">💡 Tips for auditory learning:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Listen while walking - movement + audio = better retention</li>
                <li>• Record yourself explaining topics, then listen back</li>
                <li>• Use GCSE Pod for subject-specific audio lessons</li>
                <li>• Teach concepts to family members out loud</li>
              </ul>
            </div>
          </div>
        )}

        {/* Flashcards Tool - For Visual/Kinesthetic Learners */}
        {activeTab === "flashcards" && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${showFlashcardsFirst ? "bg-blue-50 border border-blue-200" : "bg-slate-50"}`}>
              {showFlashcardsFirst && (
                <p className="text-blue-700 text-sm mb-3 font-medium">
                  {varkProfile.primaryStyles.includes("kinesthetic") ? "🤲" : "👁️"}
                  {varkProfile.primaryStyles.includes("kinesthetic")
                    ? " As a kinesthetic learner, interactive flashcards with physical sorting help you learn!"
                    : " As a visual learner, flashcards help you visualise and remember information!"}
                </p>
              )}
              <p className="text-slate-600 text-sm">
                Flip cards to test yourself. Sort into &quot;Know&quot; and &quot;Don&apos;t Know&quot; piles.
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Card {currentCard + 1} of {sampleFlashcards.length}</span>
              <span className="text-green-600">✓ {knownCards.length} cards mastered</span>
            </div>

            {/* Flashcard */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative h-64 cursor-pointer perspective-1000"
            >
              <div className={`absolute inset-0 transition-all duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}>
                {/* Front */}
                <div className={`absolute inset-0 bg-white border-2 border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center backface-hidden ${isFlipped ? "invisible" : ""}`}>
                  <span className="text-xs text-slate-400 mb-2">{sampleFlashcards[currentCard].subject}</span>
                  <p className="text-xl font-medium text-center">{sampleFlashcards[currentCard].front}</p>
                  <p className="text-sm text-slate-400 mt-4">Click to flip</p>
                </div>
                {/* Back */}
                <div className={`absolute inset-0 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 flex flex-col items-center justify-center backface-hidden rotate-y-180 ${!isFlipped ? "invisible" : ""}`}>
                  <span className="text-xs text-blue-400 mb-2">Answer</span>
                  <p className="text-lg text-center">{sampleFlashcards[currentCard].back}</p>
                  <p className="text-sm text-blue-400 mt-4">Click to flip back</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={prevCard}>← Previous</Button>
              <Button onClick={markKnown} className="bg-green-600 hover:bg-green-700">
                ✓ I Know This
              </Button>
              <Button variant="outline" onClick={nextCard}>Next →</Button>
            </div>

            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium mb-2">💡 Tips for flashcard learning:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                {varkProfile.primaryStyles.includes("kinesthetic") && (
                  <>
                    <li>• Print cards and physically sort them into piles</li>
                    <li>• Walk around while going through cards</li>
                  </>
                )}
                {varkProfile.primaryStyles.includes("visual") && (
                  <>
                    <li>• Add images or diagrams to your own cards</li>
                    <li>• Use colour-coding for different subjects</li>
                  </>
                )}
                <li>• Review &quot;Don&apos;t Know&quot; pile more frequently</li>
                <li>• Use Quizlet or Anki for more flashcards</li>
              </ul>
            </div>
          </div>
        )}

        {/* Notes Tool - For Read/Write Learners */}
        {activeTab === "notes" && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${showNotesFirst ? "bg-yellow-50 border border-yellow-200" : "bg-slate-50"}`}>
              {showNotesFirst && (
                <p className="text-yellow-700 text-sm mb-3 font-medium">
                  📖 As a read/write learner, writing notes in your own words helps you understand and remember!
                </p>
              )}
              <p className="text-slate-600 text-sm">
                Write, rewrite, and organise your notes. The act of writing itself helps you learn.
              </p>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your revision notes here...&#10;&#10;Tips:&#10;• Summarise topics in your own words&#10;• Create bullet point lists&#10;• Write out key definitions&#10;• Note down exam command words"
              className="w-full h-64 p-4 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />

            <div className="flex gap-3">
              <Button onClick={() => navigator.clipboard.writeText(notes)}>
                📋 Copy Notes
              </Button>
              <Button variant="outline" onClick={() => setNotes("")}>
                Clear
              </Button>
            </div>

            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium mb-2">💡 Tips for read/write learning:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Rewrite textbook content in your own words</li>
                <li>• Create lists and bullet points</li>
                <li>• Read mark schemes and write what examiners want</li>
                <li>• Keep a revision journal to track progress</li>
                <li>• Write out full answers to past paper questions</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
