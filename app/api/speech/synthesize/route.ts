import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Text-to-Speech API Route
 *
 * POST /api/speech/synthesize
 * Converts text to audio using Google Cloud Text-to-Speech API
 *
 * Request: { text: string, voice?: string, speakingRate?: number }
 * Response: Audio file (MP3)
 *
 * Used by: Chat interface audio playback button
 * Benefits: Auditory learners can listen to responses
 *
 * Voice Options (British English for GCSE students):
 * - en-GB-Neural2-A (Female, warm)
 * - en-GB-Neural2-B (Male, calm)
 * - en-GB-Neural2-C (Female, clear)
 * - en-GB-Neural2-D (Male, friendly)
 */

// Voice configurations optimized for educational content
const VOICE_PRESETS = {
  default: {
    languageCode: "en-GB",
    name: "en-GB-Neural2-C", // Clear female voice
    ssmlGender: "FEMALE",
  },
  calm: {
    languageCode: "en-GB",
    name: "en-GB-Neural2-B", // Calm male voice
    ssmlGender: "MALE",
  },
  friendly: {
    languageCode: "en-GB",
    name: "en-GB-Neural2-D", // Friendly male voice
    ssmlGender: "MALE",
  },
  warm: {
    languageCode: "en-GB",
    name: "en-GB-Neural2-A", // Warm female voice
    ssmlGender: "FEMALE",
  },
};

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
    const { text, voice = "default", speakingRate = 0.95 } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "No text provided" },
        { status: 400 }
      );
    }

    // Limit text length to prevent abuse (roughly 5 minutes of speech)
    const maxLength = 5000;
    const truncatedText = text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;

    const apiKey = process.env.GOOGLE_TEXT_TO_SPEECH_API_KEY;

    if (!apiKey) {
      console.error("GOOGLE_TEXT_TO_SPEECH_API_KEY not configured");
      return NextResponse.json(
        { error: "Speech service not configured" },
        { status: 500 }
      );
    }

    // Get voice configuration
    const voiceConfig = VOICE_PRESETS[voice as keyof typeof VOICE_PRESETS]
      || VOICE_PRESETS.default;

    // Prepare text with SSML for better pronunciation
    // Add pauses after sentences and emphasis on key terms
    const ssmlText = prepareSSML(truncatedText);

    // Call Google Cloud Text-to-Speech API
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            ssml: ssmlText,
          },
          voice: voiceConfig,
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: speakingRate, // Slightly slower for comprehension
            pitch: 0, // Natural pitch
            volumeGainDb: 0,
            effectsProfileId: ["small-bluetooth-speaker-class-device"], // Optimized for typical devices
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google TTS API error:", errorData);
      return NextResponse.json(
        { error: "Speech synthesis failed" },
        { status: 500 }
      );
    }

    const data = await response.json();

    if (!data.audioContent) {
      return NextResponse.json(
        { error: "No audio generated" },
        { status: 500 }
      );
    }

    // Return base64 audio content
    return NextResponse.json({
      audioContent: data.audioContent,
      contentType: "audio/mp3",
    });
  } catch (error) {
    console.error("Speech synthesis error:", error);
    return NextResponse.json(
      { error: "Failed to synthesize speech" },
      { status: 500 }
    );
  }
}

/**
 * Prepare text as SSML for better speech output
 * - Adds appropriate pauses
 * - Handles common abbreviations
 * - Improves pronunciation of educational terms
 */
function prepareSSML(text: string): string {
  let ssml = text
    // Replace common educational abbreviations
    .replace(/\bGCSE\b/g, '<say-as interpret-as="characters">GCSE</say-as>')
    .replace(/\bAQA\b/g, '<say-as interpret-as="characters">AQA</say-as>')
    .replace(/\bOCR\b/g, '<say-as interpret-as="characters">OCR</say-as>')
    .replace(/\bWJEC\b/g, '<say-as interpret-as="characters">WJEC</say-as>')
    // Add pauses after sentences
    .replace(/\. /g, '. <break time="300ms"/>')
    .replace(/\? /g, '? <break time="400ms"/>')
    .replace(/! /g, '! <break time="300ms"/>')
    // Add pauses for lists
    .replace(/\n- /g, '<break time="200ms"/> ')
    .replace(/\n\d+\. /g, '<break time="200ms"/> ')
    // Handle bullet points
    .replace(/• /g, '<break time="150ms"/> ')
    // Slow down for emphasis markers
    .replace(/\*\*(.*?)\*\*/g, '<emphasis level="moderate">$1</emphasis>')
    // Handle colons (often precede important info)
    .replace(/: /g, ': <break time="200ms"/>');

  // Wrap in SSML speak tags
  return `<speak>${ssml}</speak>`;
}

/**
 * GET endpoint to check available voices
 */
export async function GET() {
  return NextResponse.json({
    voices: Object.keys(VOICE_PRESETS),
    default: "default",
    description: "Available voice presets for text-to-speech",
  });
}
