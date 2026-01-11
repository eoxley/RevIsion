/**
 * Intent Classifier
 *
 * Classifies student input BEFORE validation to prevent
 * explanations being marked as wrong answers.
 *
 * This is content-agnostic and works across all subjects.
 */

export type StudentIntent =
  | 'solution'      // Direct answer attempt
  | 'explanation'   // Showing working/reasoning
  | 'uncertainty'   // Don't know
  | 'question'      // Asking for clarification
  | 'skip'          // Wants to move on
  | 'meta';         // Off-topic/greeting

/**
 * Patterns for detecting uncertainty (highest priority)
 */
const UNCERTAINTY_PATTERNS = [
  /^i\s*(don'?t|do\s*not)\s*know/i,
  /^idk$/i,
  /^no\s*idea/i,
  /^not\s*sure/i,
  /^i('m|\s*am)\s*not\s*sure/i,
  /^i\s*(have\s*)?no\s*(idea|clue)/i,
  /^(i\s*)?(can'?t|cannot)\s*(remember|recall)/i,
  /^i\s*(forgot|forget)/i,
  /^pass$/i,
  /^\?+$/,
];

/**
 * Patterns for detecting skip requests
 */
const SKIP_PATTERNS = [
  /^(skip|next|move\s*on)\b/i,
  /can\s*we\s*(skip|move\s*on)/i,
  /let'?s\s*(skip|move\s*on)/i,
  /i\s*want\s*to\s*(skip|move\s*on)/i,
  /different\s*(question|topic|one)/i,
  /try\s*(something|another|a\s*different)/i,
  /can\s*we\s*try\s*something\s*else/i,
];

/**
 * Patterns for detecting questions (asking, not answering)
 */
const QUESTION_PATTERNS = [
  /^what\s+(do\s+you\s+mean|does\s+that\s+mean|is\s+that)/i,
  /^(can|could)\s+you\s+(explain|clarify|help)/i,
  /^how\s+(do|does|should|would)/i,
  /^why\s+(do|does|is|are|should)/i,
  /^i\s*don'?t\s*understand/i,
  /^what'?s\s+(a|an|the)/i,
];

/**
 * Patterns for detecting explanations (showing working)
 */
const EXPLANATION_MARKERS = [
  /\b(because|since|therefore|so\s+that|which\s+means)\b/i,
  /\b(if\s+you|when\s+you|first\s+you|then\s+you)\b/i,
  /\b(by\s+using|by\s+substitut|by\s+factor|by\s+expand)\b/i,
  /\b(the\s+reason|this\s+means|this\s+shows|this\s+gives)\b/i,
  /\b(i\s+would|you\s+would|we\s+would)\s+(start|begin|first)/i,
  /\b(step\s+1|step\s+one|first\s+step|to\s+solve\s+this)\b/i,
  /\b(working|method|approach|process)\b/i,
  /\b(substitute|factorise|factorize|expand|simplify|rearrange)\b/i,
];

/**
 * Patterns for detecting meta/off-topic messages
 */
const META_PATTERNS = [
  /^(hi|hello|hey|hiya)\b/i,
  /^(thanks|thank\s*you|cheers|ta)\b/i,
  /^(ok|okay|sure|yes|no|yep|nope|yeah|nah)$/i,
  /^(good|great|cool|nice|awesome)$/i,
  /^(bye|goodbye|see\s*you|later)\b/i,
];

/**
 * Check if input looks like a direct answer (has answer-like structure)
 */
const ANSWER_PATTERNS = [
  /^-?\d+(\.\d+)?$/,                          // Plain number: 5, -3, 2.5
  /^[a-z]\s*=\s*-?\d+/i,                      // Variable assignment: x = 5
  /^-?\d+\s*(,|or|and)\s*-?\d+/i,             // Multiple values: 2, 4 or 2 and 4
  /^[a-z]\s*=\s*-?\d+\s*(,|or|and)/i,         // x = 2 or x = 4
  /^\(?[a-z]\s*[+\-]\s*\d+\)?\s*\(?[a-z]/i,   // Factored form: (x+2)(x-3)
  /^(true|false)$/i,                          // Boolean
  /^[a-e]$/i,                                 // Multiple choice: a, b, c, d, e
  /^(yes|no)$/i,                              // Yes/no answer
];

/**
 * Classify the intent of a student message
 *
 * Priority order:
 * 1. Uncertainty (highest - student explicitly doesn't know)
 * 2. Skip (explicit request to move on)
 * 3. Question (asking for clarification)
 * 4. Meta (greetings, thanks, etc.)
 * 5. Explanation (showing reasoning without final answer)
 * 6. Solution (default - treat as answer attempt)
 */
export function classifyIntent(message: string): StudentIntent {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();

  // Empty or very short non-answer
  if (trimmed.length === 0) {
    return 'uncertainty';
  }

  // 1. Check for uncertainty (highest priority)
  if (UNCERTAINTY_PATTERNS.some(p => p.test(lower))) {
    return 'uncertainty';
  }

  // 2. Check for skip request
  if (SKIP_PATTERNS.some(p => p.test(lower))) {
    return 'skip';
  }

  // 3. Check for questions (asking, not answering)
  // Must end with ? AND match question patterns AND not look like an answer
  if (trimmed.endsWith('?')) {
    if (QUESTION_PATTERNS.some(p => p.test(lower))) {
      return 'question';
    }
    // "is it 5?" is still a solution attempt
    if (!ANSWER_PATTERNS.some(p => p.test(lower.replace(/\?$/, '').trim()))) {
      return 'question';
    }
  }

  // 4. Check for meta/off-topic
  if (META_PATTERNS.some(p => p.test(lower))) {
    return 'meta';
  }

  // 5. Check for explanation (showing working but no clear final answer)
  // Only classify as explanation if it has markers AND doesn't look like a direct answer
  const hasExplanationMarkers = EXPLANATION_MARKERS.some(p => p.test(lower));
  const looksLikeAnswer = ANSWER_PATTERNS.some(p => p.test(lower));

  if (hasExplanationMarkers && !looksLikeAnswer) {
    // Additional check: if message is very short, probably still an answer
    if (trimmed.length > 20) {
      return 'explanation';
    }
  }

  // 6. Default: treat as solution attempt
  return 'solution';
}

/**
 * Get the appropriate response guidance for each intent
 */
export function getIntentGuidance(intent: StudentIntent): {
  shouldValidate: boolean;
  responseAction: string;
  nextState: 'await_input' | 'record';
} {
  switch (intent) {
    case 'solution':
      return {
        shouldValidate: true,
        responseAction: 'VALIDATE_AND_RESPOND',
        nextState: 'record',
      };

    case 'explanation':
      return {
        shouldValidate: false,
        responseAction: 'ACKNOWLEDGE_REASONING',
        nextState: 'await_input',
      };

    case 'uncertainty':
      return {
        shouldValidate: false,
        responseAction: 'PROVIDE_SCAFFOLDING',
        nextState: 'await_input',
      };

    case 'question':
      return {
        shouldValidate: false,
        responseAction: 'ANSWER_QUESTION',
        nextState: 'await_input',
      };

    case 'skip':
      return {
        shouldValidate: false,
        responseAction: 'SKIP_TO_NEXT',
        nextState: 'record',
      };

    case 'meta':
      return {
        shouldValidate: false,
        responseAction: 'BRIEF_ACKNOWLEDGE',
        nextState: 'await_input',
      };
  }
}

/**
 * Check if intent requires requesting a final answer
 */
export function needsFinalAnswer(intent: StudentIntent): boolean {
  return intent === 'explanation' || intent === 'question' || intent === 'meta';
}

/**
 * Check if intent should be recorded as a question result
 */
export function shouldRecordResult(intent: StudentIntent): boolean {
  return intent === 'solution' || intent === 'skip';
}
