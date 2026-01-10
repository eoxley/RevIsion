import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * OCR API Route - Google Vision
 *
 * POST /api/vision/ocr
 * Extracts text from images using Google Cloud Vision API
 *
 * Request: FormData with image file (jpg, png, webp, pdf)
 * Response: {
 *   text: string,           // Full extracted text
 *   blocks: TextBlock[],    // Structured text blocks
 *   contentType: string,    // Detected content type
 *   confidence: number      // Overall confidence
 * }
 *
 * Use Cases:
 * - Upload textbook pages for revision content
 * - Photograph handwritten notes to digitize
 * - Scan past exam papers for practice
 * - Capture diagrams with labels
 *
 * The extracted text is returned to the chat interface
 * where it can be used for revision planning.
 */

interface TextBlock {
  text: string;
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// Content type detection based on common GCSE patterns
function detectContentType(text: string): string {
  const lowerText = text.toLowerCase();

  // Exam paper patterns
  if (
    lowerText.includes("mark scheme") ||
    lowerText.includes("total marks") ||
    lowerText.includes("answer all questions")
  ) {
    return "exam_paper";
  }

  // Textbook patterns
  if (
    lowerText.includes("chapter") ||
    lowerText.includes("learning objectives") ||
    lowerText.includes("key terms")
  ) {
    return "textbook";
  }

  // Notes patterns
  if (
    lowerText.includes("remember:") ||
    lowerText.includes("note:") ||
    /^\s*[-•]\s+/m.test(text)
  ) {
    return "notes";
  }

  // Formula/equation patterns
  if (/[=+\-*/^²³]/.test(text) && /\d/.test(text)) {
    return "formula";
  }

  // Diagram with labels
  if (text.split("\n").filter((l) => l.trim().length > 0).length > 10) {
    return "diagram_labels";
  }

  return "general";
}

// Generate a helpful prompt based on content type
function generateContextPrompt(contentType: string, text: string): string {
  switch (contentType) {
    case "exam_paper":
      return `I've uploaded an exam paper or mark scheme. Here's the text I extracted:\n\n---\n${text}\n---\n\nCan you help me understand the key topics covered and create a revision plan based on these questions?`;

    case "textbook":
      return `I've photographed a page from my textbook. Here's what it says:\n\n---\n${text}\n---\n\nCan you summarise the key points I need to remember and suggest how to revise this topic?`;

    case "notes":
      return `I've uploaded my revision notes. Here's what I wrote:\n\n---\n${text}\n---\n\nCan you help me check if I've understood this correctly and fill in any gaps?`;

    case "formula":
      return `I've captured some formulas or equations:\n\n---\n${text}\n---\n\nCan you explain what these mean and when I would use them in an exam?`;

    case "diagram_labels":
      return `I've photographed a diagram with labels:\n\n---\n${text}\n---\n\nCan you help me understand what this diagram is showing and what I need to remember about it?`;

    default:
      return `I've uploaded an image with this text:\n\n---\n${text}\n---\n\nCan you help me understand this content and create revision materials from it?`;
  }
}

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
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
    ];
    if (!validTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload an image (JPG, PNG, WebP) or PDF." },
        { status: 400 }
      );
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (imageFile.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Convert file to base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const apiKey = process.env.GOOGLE_VISION_API_KEY;

    if (!apiKey) {
      console.error("GOOGLE_VISION_API_KEY not configured");
      return NextResponse.json(
        { error: "Vision service not configured" },
        { status: 500 }
      );
    }

    // Call Google Cloud Vision API
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: "TEXT_DETECTION",
                  maxResults: 50,
                },
                {
                  type: "DOCUMENT_TEXT_DETECTION",
                  maxResults: 1,
                },
              ],
              imageContext: {
                languageHints: ["en"],
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Vision API error:", errorData);
      return NextResponse.json(
        { error: "Failed to process image" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const result = data.responses?.[0];

    if (!result) {
      return NextResponse.json(
        { error: "No response from Vision API" },
        { status: 500 }
      );
    }

    // Check for errors in the response
    if (result.error) {
      console.error("Vision API response error:", result.error);
      return NextResponse.json(
        { error: result.error.message || "Vision API error" },
        { status: 500 }
      );
    }

    // Extract full text from DOCUMENT_TEXT_DETECTION (better for documents)
    const fullTextAnnotation = result.fullTextAnnotation;
    const textAnnotations = result.textAnnotations;

    let extractedText = "";
    let blocks: TextBlock[] = [];
    let overallConfidence = 0;

    if (fullTextAnnotation) {
      // Use document text detection for better structure
      extractedText = fullTextAnnotation.text || "";

      // Extract blocks with confidence
      if (fullTextAnnotation.pages) {
        for (const page of fullTextAnnotation.pages) {
          if (page.blocks) {
            for (const block of page.blocks) {
              let blockText = "";
              let blockConfidence = 0;
              let paragraphCount = 0;

              if (block.paragraphs) {
                for (const paragraph of block.paragraphs) {
                  if (paragraph.words) {
                    const words = paragraph.words.map((word: { symbols?: { text: string }[] }) =>
                      word.symbols?.map((s: { text: string }) => s.text).join("") || ""
                    );
                    blockText += words.join(" ") + "\n";
                  }
                  if (paragraph.confidence) {
                    blockConfidence += paragraph.confidence;
                    paragraphCount++;
                  }
                }
              }

              if (blockText.trim()) {
                blocks.push({
                  text: blockText.trim(),
                  confidence:
                    paragraphCount > 0 ? blockConfidence / paragraphCount : 0,
                });
              }
            }
          }

          if (page.confidence) {
            overallConfidence = page.confidence;
          }
        }
      }
    } else if (textAnnotations && textAnnotations.length > 0) {
      // Fallback to simple text detection
      extractedText = textAnnotations[0].description || "";

      // Create single block from all text
      blocks = [
        {
          text: extractedText,
          confidence: 0.8, // Default confidence for simple detection
        },
      ];
      overallConfidence = 0.8;
    }

    // Clean up extracted text
    extractedText = extractedText
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (!extractedText) {
      return NextResponse.json({
        text: "",
        blocks: [],
        contentType: "empty",
        confidence: 0,
        message: "No text found in the image",
        suggestedPrompt: null,
      });
    }

    // Detect content type
    const contentType = detectContentType(extractedText);

    // Generate suggested prompt for chat
    const suggestedPrompt = generateContextPrompt(contentType, extractedText);

    return NextResponse.json({
      text: extractedText,
      blocks,
      contentType,
      confidence: overallConfidence,
      suggestedPrompt,
      characterCount: extractedText.length,
    });
  } catch (error) {
    console.error("OCR processing error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
