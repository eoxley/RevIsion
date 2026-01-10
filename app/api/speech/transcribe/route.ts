import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Speech-to-Text API Route
 *
 * POST /api/speech/transcribe
 * Converts audio to text using Google Cloud Speech-to-Text API
 *
 * Request: FormData with audio file (webm/wav)
 * Response: { transcript: string, confidence: number }
 *
 * Used by: Chat interface voice input button
 * Benefits: Auditory learners can speak instead of type
 */

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Convert File to base64
    const arrayBuffer = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString("base64");

    // Determine audio encoding from file type
    const mimeType = audioFile.type;
    let encoding = "WEBM_OPUS";
    let sampleRateHertz = 48000;

    if (mimeType.includes("wav")) {
      encoding = "LINEAR16";
      sampleRateHertz = 16000;
    } else if (mimeType.includes("mp3")) {
      encoding = "MP3";
      sampleRateHertz = 16000;
    } else if (mimeType.includes("ogg")) {
      encoding = "OGG_OPUS";
      sampleRateHertz = 48000;
    }

    // Call Google Cloud Speech-to-Text API
    const apiKey = process.env.GOOGLE_SPEECH_TO_TEXT_API_KEY;

    if (!apiKey) {
      console.error("GOOGLE_SPEECH_TO_TEXT_API_KEY not configured");
      return NextResponse.json(
        { error: "Speech service not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          config: {
            encoding,
            sampleRateHertz,
            languageCode: "en-GB", // UK English for GCSE students
            model: "default",
            enableAutomaticPunctuation: true,
            // Boost recognition for educational terms
            speechContexts: [
              {
                phrases: [
                  "GCSE",
                  "revision",
                  "exam",
                  "AQA",
                  "Edexcel",
                  "OCR",
                  "maths",
                  "biology",
                  "chemistry",
                  "physics",
                  "English",
                  "history",
                  "geography",
                ],
                boost: 10,
              },
            ],
          },
          audio: {
            content: base64Audio,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Speech API error:", errorData);
      return NextResponse.json(
        { error: "Speech recognition failed" },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Extract transcript from response
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const alternative = result.alternatives?.[0];

      return NextResponse.json({
        transcript: alternative?.transcript || "",
        confidence: alternative?.confidence || 0,
      });
    }

    // No speech detected
    return NextResponse.json({
      transcript: "",
      confidence: 0,
      message: "No speech detected",
    });
  } catch (error) {
    console.error("Speech transcription error:", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
