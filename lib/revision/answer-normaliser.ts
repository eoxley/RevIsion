/**
 * Answer Normaliser
 *
 * Normalises student answers before validation to handle:
 * - Different orderings (x=2 or x=4 vs x=4 or x=2)
 * - Different formats (x=2, x=4 vs 2 and 4 vs "2, 4")
 * - Filler phrases ("I think the answer is...")
 *
 * This is content-agnostic and works across all subjects.
 */

/**
 * Filler phrases to remove from the start of answers
 */
const FILLER_PREFIXES = [
  /^(i\s+think|i\s+believe|i\s+guess|maybe|probably)\s*/i,
  /^(the\s+answer\s+is|it'?s|that'?s|it\s+would\s+be|it\s+is)\s*/i,
  /^(so|well|um|uh|like|okay|ok)\s*/i,
  /^(my\s+answer\s+is|i\s+would\s+say|i'?d\s+say)\s*/i,
];

/**
 * Filler phrases to remove from the end of answers
 */
const FILLER_SUFFIXES = [
  /\s*(i\s+think|right|correct|yeah|yes|no)\s*\??$/i,
  /\s*(isn'?t\s+it|is\s+it|right)\s*\??$/i,
];

/**
 * Separators that indicate multiple values in an answer
 */
const VALUE_SEPARATORS = /\s*(?:,|;|\band\b|\bor\b|\bwith\b|&)\s*/i;

/**
 * Pattern to extract numeric/variable values from mathematical expressions
 */
const MATH_VALUE_PATTERN = /[a-z]\s*=\s*(-?\d+(?:\.\d+)?(?:\/\d+)?)/gi;

/**
 * Normalise a single answer value
 */
function normaliseValue(value: string): string {
  let normalised = value.trim().toLowerCase();

  // Remove variable assignment (x = 5 → 5)
  const mathMatch = normalised.match(/^[a-z]\s*=\s*(.+)$/i);
  if (mathMatch) {
    normalised = mathMatch[1].trim();
  }

  // Remove surrounding quotes
  normalised = normalised.replace(/^["']|["']$/g, '');

  // Normalise fractions: convert to decimal for comparison
  const fractionMatch = normalised.match(/^(-?\d+)\/(\d+)$/);
  if (fractionMatch) {
    const num = parseFloat(fractionMatch[1]);
    const denom = parseFloat(fractionMatch[2]);
    if (denom !== 0) {
      // Keep as fraction string but also store decimal
      normalised = (num / denom).toString();
    }
  }

  // Normalise whitespace
  normalised = normalised.replace(/\s+/g, ' ').trim();

  return normalised;
}

/**
 * Remove filler phrases from an answer
 */
function removeFiller(answer: string): string {
  let cleaned = answer.trim();

  // Remove prefix fillers
  for (const pattern of FILLER_PREFIXES) {
    cleaned = cleaned.replace(pattern, '');
  }

  // Remove suffix fillers
  for (const pattern of FILLER_SUFFIXES) {
    cleaned = cleaned.replace(pattern, '');
  }

  return cleaned.trim();
}

/**
 * Split answer into multiple values if it contains separators
 */
function tokeniseAnswer(answer: string): string[] {
  return answer
    .split(VALUE_SEPARATORS)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

/**
 * Normalise an answer to a set of values for comparison
 *
 * Examples:
 * - "x = 2 or x = 4" → Set{"2", "4"}
 * - "I think it's 2, 4" → Set{"2", "4"}
 * - "x=4 or x=2" → Set{"2", "4"}
 * - "the answer is 5" → Set{"5"}
 */
export function normaliseToSet(answer: string): Set<string> {
  // Step 1: Remove filler phrases
  const cleaned = removeFiller(answer);

  // Step 2: Tokenise into parts
  const tokens = tokeniseAnswer(cleaned);

  // Step 3: Normalise each token
  const normalisedValues = tokens.map(normaliseValue);

  // Step 4: Return as set (removes duplicates, order-independent)
  return new Set(normalisedValues.filter(v => v.length > 0));
}

/**
 * Compare two sets for equality
 */
function setsEqual<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) return false;
  const aArray = Array.from(a);
  for (let i = 0; i < aArray.length; i++) {
    if (!b.has(aArray[i])) return false;
  }
  return true;
}

/**
 * Get intersection of two sets
 */
function setIntersection<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>();
  const aArray = Array.from(a);
  for (let i = 0; i < aArray.length; i++) {
    if (b.has(aArray[i])) {
      result.add(aArray[i]);
    }
  }
  return result;
}

/**
 * Validate a student answer against expected answer
 *
 * Uses set-based comparison for order-independent matching.
 *
 * Returns:
 * - 'correct': All expected values present, no extra values
 * - 'partial': Some expected values present
 * - 'incorrect': No expected values present or fundamentally wrong
 */
export function validateNormalisedAnswer(
  studentAnswer: string,
  expectedAnswer: string
): 'correct' | 'partial' | 'incorrect' {
  const studentSet = normaliseToSet(studentAnswer);
  const expectedSet = normaliseToSet(expectedAnswer);

  // Handle empty cases
  if (studentSet.size === 0) {
    return 'incorrect';
  }

  if (expectedSet.size === 0) {
    // No expected answer to compare against
    // Fall back to basic matching
    return 'incorrect';
  }

  // Check for exact match (sets are equal)
  if (setsEqual(studentSet, expectedSet)) {
    return 'correct';
  }

  // Check for partial match (some overlap)
  const intersection = setIntersection(studentSet, expectedSet);

  if (intersection.size > 0) {
    // Student got some values right
    if (intersection.size === expectedSet.size) {
      // All expected values present, but student has extras
      // Still count as correct (extra work is fine)
      return 'correct';
    }
    return 'partial';
  }

  // No overlap at all
  return 'incorrect';
}

/**
 * Alternative validation that handles numeric tolerance
 * For answers where small floating point differences shouldn't matter
 */
export function validateWithTolerance(
  studentAnswer: string,
  expectedAnswer: string,
  tolerance: number = 0.001
): 'correct' | 'partial' | 'incorrect' {
  const studentSet = normaliseToSet(studentAnswer);
  const expectedSet = normaliseToSet(expectedAnswer);

  if (studentSet.size === 0) {
    return 'incorrect';
  }

  // Try numeric comparison with tolerance
  const studentNumbers = Array.from(studentSet)
    .map(v => parseFloat(v))
    .filter(n => !isNaN(n));

  const expectedNumbers = Array.from(expectedSet)
    .map(v => parseFloat(v))
    .filter(n => !isNaN(n));

  if (studentNumbers.length > 0 && expectedNumbers.length > 0) {
    // Both have numeric values - compare with tolerance
    let matchCount = 0;

    for (const expected of expectedNumbers) {
      for (const student of studentNumbers) {
        if (Math.abs(student - expected) <= tolerance) {
          matchCount++;
          break;
        }
      }
    }

    if (matchCount === expectedNumbers.length) {
      return 'correct';
    } else if (matchCount > 0) {
      return 'partial';
    }
  }

  // Fall back to string comparison
  return validateNormalisedAnswer(studentAnswer, expectedAnswer);
}

/**
 * Check if an answer contains mathematical expressions
 * that might need special handling
 */
export function containsMathExpression(answer: string): boolean {
  const mathPatterns = [
    /[a-z]\s*=\s*-?\d/i,           // Variable assignment
    /\d\s*[+\-*/^]\s*\d/,          // Arithmetic
    /\(\s*[a-z]\s*[+\-]/i,         // Factored form start
    /\d\s*\/\s*\d/,                // Fraction
    /\bsqrt\b|\broot\b/i,          // Square root
    /\^\s*\d/,                     // Exponent
  ];

  return mathPatterns.some(p => p.test(answer));
}

/**
 * Normalise text-based answers (non-math)
 * Used for English, Science terminology, etc.
 */
export function normaliseTextAnswer(answer: string): string {
  let normalised = removeFiller(answer);

  // Lowercase
  normalised = normalised.toLowerCase();

  // Remove articles for key term matching
  normalised = normalised.replace(/\b(a|an|the)\b/gi, '');

  // Normalise whitespace
  normalised = normalised.replace(/\s+/g, ' ').trim();

  // Remove common punctuation
  normalised = normalised.replace(/[.,!;:'"]/g, '');

  return normalised;
}
