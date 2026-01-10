import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * ElevenLabs Text-to-Speech API Route
 *
 * POST /api/speech/elevenlabs
 * Converts text to natural-sounding audio using ElevenLabs
 *
 * Request: { text: string, voice?: string }
 * Response: Audio file (MP3)
 *
 * Voice options suited for UK GCSE students:
 * - lily: Young British female, warm and encouraging
 * - george: Young British male, friendly and clear
 * - aria: Young female, conversational
 * - charlie: Young male, approachable
 */

// Voice configurations - UK young voices for GCSE students
const VOICE_PRESETS = {
  // Female voices
  lily: {
    id: "pFZP5JQG7iQjIQuC4Bku", // Lily - British female
    name: "Lily",
    description: "Warm British female voice",
  },
  aria: {
    id: "9BWtsMINqrJLrRacOk9x", // Aria - young female
    name: "Aria",
    description: "Young, conversational female",
  },
  jessica: {
    id: "cgSgspJ2msm6clMCkdW9", // Jessica - young American but clear
    name: "Jessica",
    description: "Clear, friendly female voice",
  },
  // Male voices
  george: {
    id: "JBFqnCBsd6RMkjVDRZzb", // George - British male
    name: "George",
    description: "Warm British male voice",
  },
  charlie: {
    id: "IKne3meq5aSn9XLyUdCD", // Charlie - young male
    name: "Charlie",
    description: "Young, approachable male",
  },
  daniel: {
    id: "onwK4e9ZLuTAKqWW03F9", // Daniel - British deep
    name: "Daniel",
    description: "Clear British male voice",
  },
  // Default for revision coach
  coach_female: {
    id: "pFZP5JQG7iQjIQuC4Bku", // Lily
    name: "Coach (Female)",
    description: "Default female revision coach",
  },
  coach_male: {
    id: "JBFqnCBsd6RMkjVDRZzb", // George
    name: "Coach (Male)",
    description: "Default male revision coach",
  },
};

// Default voice
const DEFAULT_VOICE = "lily";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { text, voice = DEFAULT_VOICE } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "No text provided" },
        { status: 400 }
      );
    }

    // Limit text length (ElevenLabs has character limits)
    const maxLength = 5000;
    const truncatedText = text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;

    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      console.error("ELEVENLABS_API_KEY not configured");
      return NextResponse.json(
        { error: "Speech service not configured" },
        { status: 500 }
      );
    }

    // Get voice configuration
    const voiceConfig = VOICE_PRESETS[voice as keyof typeof VOICE_PRESETS]
      || VOICE_PRESETS[DEFAULT_VOICE];

    // Call ElevenLabs API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceConfig.id}`,
      {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: truncatedText,
          model_id: "eleven_multilingual_v2", // Best quality model
          voice_settings: {
            stability: 0.5, // Balance between stability and expressiveness
            similarity_boost: 0.75, // How closely to match the original voice
            style: 0.5, // Speaking style intensity
            use_speaker_boost: true, // Enhance speaker clarity
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", response.status, errorText);

      // Fallback to Google TTS if ElevenLabs fails
      return NextResponse.json(
        { error: "Speech synthesis failed", fallback: true },
        { status: 500 }
      );
    }

    // Get audio as ArrayBuffer and convert to base64
    const audioBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString("base64");

    return NextResponse.json({
      audioContent: base64Audio,
      contentType: "audio/mpeg",
      voice: voiceConfig.name,
    });
  } catch (error) {
    console.error("ElevenLabs synthesis error:", error);
    return NextResponse.json(
      { error: "Failed to synthesize speech" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to list available voices
 */
export async function GET() {
  return NextResponse.json({
    voices: Object.entries(VOICE_PRESETS).map(([key, config]) => ({
      id: key,
      name: config.name,
      description: config.description,
    })),
    default: DEFAULT_VOICE,
    description: "Available ElevenLabs voices for text-to-speech",
  });
}
