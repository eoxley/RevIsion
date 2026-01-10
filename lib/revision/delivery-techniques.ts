/**
 * Delivery Techniques Mapping
 *
 * Maps learning styles to allowed teaching techniques.
 * This lives in code, not prompts - it's enforceable.
 *
 * The controller passes allowed_delivery_modes to the tutor.
 * The tutor may ONLY use these techniques.
 */

import type { LearningStyle } from "./types";

/**
 * Delivery technique types
 */
export type DeliveryTechnique =
  | "imagery"              // Describe visual scenarios
  | "diagram_description"  // Text-based diagram descriptions
  | "flashcard"           // Q&A flashcard format
  | "definition"          // Precise definitions
  | "exam_style"          // Mark scheme language
  | "audio_explanation"   // Spoken-style explanation
  | "spoken_prompt"       // Conversational prompts
  | "step_sequence"       // Step-by-step breakdown
  | "real_world_action";  // Practical application

/**
 * Learning style to delivery techniques mapping
 *
 * Rule: Tutor may ONLY use techniques from allowed styles
 */
export const deliveryTechniques: Record<string, DeliveryTechnique[]> = {
  visual: ["imagery", "diagram_description", "flashcard"],
  read_write: ["flashcard", "definition", "exam_style"],
  auditory: ["audio_explanation", "spoken_prompt"],
  kinesthetic: ["step_sequence", "real_world_action"],
};

/**
 * Technique behavior rules - what each technique means for the tutor
 */
export const techniqueBehavior: Record<DeliveryTechnique, {
  description: string;
  allowed: string[];
  forbidden: string[];
}> = {
  imagery: {
    description: "Describe visual scenarios and mental pictures",
    allowed: [
      "Use phrases like 'picture this', 'imagine', 'visualise'",
      "Describe what things look like spatially",
      "Create mental images with detailed descriptions",
    ],
    forbidden: [
      "Waffle verbally without visual anchors",
      "Suggest listening tasks",
    ],
  },
  diagram_description: {
    description: "Create text-based diagram descriptions",
    allowed: [
      "Describe layouts and arrangements in text",
      "Use spatial language (left, right, above, flows to)",
      "Create ASCII-style simple diagrams if helpful",
    ],
    forbidden: [
      "Assume student can see actual images",
    ],
  },
  flashcard: {
    description: "Generate Q&A flashcard format",
    allowed: [
      "Output structured front/back flashcards",
      "Keep flashcards concise and testable",
      "Focus on key facts and definitions",
    ],
    forbidden: [
      "Create long, essay-style content",
    ],
  },
  definition: {
    description: "Use precise, textbook-style definitions",
    allowed: [
      "Use bullet point definitions",
      "Include technical terms with explanations",
      "Reference mark scheme language",
    ],
    forbidden: [
      "Use vague or imprecise language",
    ],
  },
  exam_style: {
    description: "Use mark scheme language and exam technique",
    allowed: [
      "Reference how marks are awarded",
      "Use command words (describe, explain, evaluate)",
      "Structure answers like exam responses",
    ],
    forbidden: [
      "Be casual or conversational",
    ],
  },
  audio_explanation: {
    description: "Write in spoken, listenable language",
    allowed: [
      "Keep sentences short and spoken-style",
      "Avoid visual references",
      "Explicitly offer downloadable audio",
      "Use natural speech patterns",
    ],
    forbidden: [
      "Use complex nested sentences",
      "Reference diagrams or visuals",
      "Use bullet points (doesn't work in audio)",
    ],
  },
  spoken_prompt: {
    description: "Conversational, rhythmic prompts",
    allowed: [
      "Use memorable phrases and patterns",
      "Ask questions conversationally",
      "Include natural pauses (commas, short sentences)",
    ],
    forbidden: [
      "Lecture-style monologues",
    ],
  },
  step_sequence: {
    description: "Break content into numbered steps",
    allowed: [
      "Number each step clearly",
      "Focus on actions and processes",
      "Use verbs (do this, then do that)",
    ],
    forbidden: [
      "Dump information without structure",
    ],
  },
  real_world_action: {
    description: "Practical, real-world application",
    allowed: [
      "Use action metaphors",
      "Ask 'imagine doing this'",
      "Connect to tangible experiences",
    ],
    forbidden: [
      "Abstract theoretical explanations",
      "Passive descriptions",
    ],
  },
};

/**
 * Get allowed delivery techniques for a learning style
 */
export function getAllowedTechniques(
  learningStyle: LearningStyle | null
): DeliveryTechnique[] {
  if (!learningStyle) {
    // Default: allow basic techniques from all styles
    return ["definition", "flashcard", "step_sequence"];
  }

  const techniques: Set<DeliveryTechnique> = new Set();

  for (const style of learningStyle.primaryStyles) {
    const styleTechniques = deliveryTechniques[style];
    if (styleTechniques) {
      for (const technique of styleTechniques) {
        techniques.add(technique);
      }
    }
  }

  // If multimodal, they get techniques from all their styles (already handled above)
  // If no techniques found, use defaults
  if (techniques.size === 0) {
    return ["definition", "flashcard", "step_sequence"];
  }

  return Array.from(techniques);
}

/**
 * Build tutor instructions for allowed techniques
 */
export function buildTechniqueInstructions(
  allowedTechniques: DeliveryTechnique[]
): string {
  const lines: string[] = [
    "ALLOWED DELIVERY TECHNIQUES:",
    "",
  ];

  for (const technique of allowedTechniques) {
    const behavior = techniqueBehavior[technique];
    lines.push(`${technique.toUpperCase()}:`);
    lines.push(`  ${behavior.description}`);
    lines.push("  You MAY:");
    for (const allowed of behavior.allowed) {
      lines.push(`    - ${allowed}`);
    }
    lines.push("  You must NOT:");
    for (const forbidden of behavior.forbidden) {
      lines.push(`    - ${forbidden}`);
    }
    lines.push("");
  }

  lines.push("TECHNIQUE RULES:");
  lines.push("- You may ONLY use the techniques listed above");
  lines.push("- Do not use techniques not in your allowed list");
  lines.push("- Match your delivery to the student's learning style");

  return lines.join("\n");
}

/**
 * Detect which delivery techniques were used in a response
 */
export function detectUsedTechniques(
  response: string
): DeliveryTechnique[] {
  const used: Set<DeliveryTechnique> = new Set();
  const lowerResponse = response.toLowerCase();

  // Imagery detection
  if (
    lowerResponse.includes("picture") ||
    lowerResponse.includes("imagine") ||
    lowerResponse.includes("visualise") ||
    lowerResponse.includes("visualize")
  ) {
    used.add("imagery");
  }

  // Flashcard detection (structured output)
  if (
    response.includes('"front"') ||
    response.includes('"back"') ||
    lowerResponse.includes("flashcard")
  ) {
    used.add("flashcard");
  }

  // Audio explanation detection
  if (
    lowerResponse.includes("listen") ||
    lowerResponse.includes("audio") ||
    lowerResponse.includes("out loud")
  ) {
    used.add("audio_explanation");
  }

  // Step sequence detection
  if (
    /step\s*\d/i.test(response) ||
    /first.*then.*finally/i.test(lowerResponse)
  ) {
    used.add("step_sequence");
  }

  // Real world action detection
  if (
    lowerResponse.includes("in real life") ||
    lowerResponse.includes("real world") ||
    lowerResponse.includes("hands-on")
  ) {
    used.add("real_world_action");
  }

  // Exam style detection
  if (
    lowerResponse.includes("mark scheme") ||
    lowerResponse.includes("marks") ||
    lowerResponse.includes("exam")
  ) {
    used.add("exam_style");
  }

  // Definition detection
  if (
    lowerResponse.includes("definition") ||
    lowerResponse.includes("defined as") ||
    lowerResponse.includes("means that")
  ) {
    used.add("definition");
  }

  return Array.from(used);
}

/**
 * Flashcard structure for output
 */
export interface Flashcard {
  type: "flashcard";
  front: string;
  back: string;
}

/**
 * Parse flashcards from tutor response
 */
export function parseFlashcards(response: string): Flashcard[] {
  const flashcards: Flashcard[] = [];

  // Look for JSON flashcard objects
  const regex = /\{[^{}]*"type"\s*:\s*"flashcard"[^{}]*\}/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(response)) !== null) {
    try {
      const parsed = JSON.parse(match[0]);
      if (parsed.front && parsed.back) {
        flashcards.push({
          type: "flashcard",
          front: parsed.front,
          back: parsed.back,
        });
      }
    } catch {
      // Invalid JSON, skip
    }
  }

  return flashcards;
}
