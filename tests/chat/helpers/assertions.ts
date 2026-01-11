import { expect } from '@playwright/test';

/**
 * Conversation Integrity Assertion Helpers
 *
 * These assertions verify learning-state integrity, not mathematical correctness.
 * Use them to test conversation behavior and state management.
 */

/**
 * Assert that the text contains at most one question
 * A question is identified by a question mark
 */
export function expectSingleQuestion(text: string): void {
  const questionMarks = (text.match(/\?/g) || []).length;
  expect(questionMarks, `Expected at most 1 question, but found ${questionMarks} in: "${text.substring(0, 200)}..."`).toBeLessThanOrEqual(1);
}

/**
 * Assert that the text contains no duplicate lines
 * This catches cases where the AI repeats the same prompt
 */
export function expectNoDuplicatePrompt(text: string): void {
  const lines = text
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 10); // Ignore short lines (like "Listen" button text)

  const seen = new Set<string>();
  const duplicates: string[] = [];

  for (const line of lines) {
    if (seen.has(line)) {
      duplicates.push(line);
    }
    seen.add(line);
  }

  expect(duplicates.length, `Found duplicate lines: ${duplicates.join(', ')}`).toBe(0);
}

/**
 * Assert that the response acknowledges a correct answer
 * Checks for positive indicators and absence of negative ones
 */
export function expectCorrectAcknowledgment(text: string): void {
  const lower = text.toLowerCase();

  // Should contain positive indicators
  const hasPositive =
    lower.includes('correct') ||
    lower.includes('right') ||
    lower.includes('well done') ||
    lower.includes('excellent') ||
    lower.includes('great') ||
    lower.includes('yes') ||
    lower.includes('perfect') ||
    lower.includes('spot on') ||
    lower.includes('brilliant');

  // Should NOT contain negative indicators
  const hasNegative =
    lower.includes('incorrect') ||
    lower.includes('wrong') ||
    lower.includes('not quite') ||
    lower.includes('try again') ||
    lower.includes('not correct') ||
    lower.includes('that\'s not');

  expect(hasPositive, `Expected positive acknowledgment in: "${text.substring(0, 200)}..."`).toBe(true);
  expect(hasNegative, `Found unexpected negative feedback in: "${text.substring(0, 200)}..."`).toBe(false);
}

/**
 * Assert that the response acknowledges a partial answer
 * Should be positive but indicate more is needed
 */
export function expectPartialAcknowledgment(text: string): void {
  const lower = text.toLowerCase();

  // Should acknowledge the partial answer positively
  const hasPositive =
    lower.includes('correct') ||
    lower.includes('right') ||
    lower.includes('yes') ||
    lower.includes('good') ||
    lower.includes('that\'s one');

  // Should indicate more is expected
  const hasMoreExpected =
    lower.includes('another') ||
    lower.includes('other') ||
    lower.includes('more') ||
    lower.includes('also') ||
    lower.includes('second');

  // Should NOT mark as wrong
  const hasNegative =
    lower.includes('wrong') ||
    lower.includes('incorrect') ||
    lower.includes('not quite');

  expect(hasPositive, `Expected partial acknowledgment in: "${text.substring(0, 200)}..."`).toBe(true);
  expect(hasNegative, `Should not mark partial answer as wrong: "${text.substring(0, 200)}..."`).toBe(false);
}

/**
 * Assert that the response provides scaffolding help
 * Used when student says "I don't know"
 */
export function expectScaffolding(text: string): void {
  const lower = text.toLowerCase();

  const hasScaffolding =
    lower.includes('let\'s break') ||
    lower.includes('step by step') ||
    lower.includes('first') ||
    lower.includes('start with') ||
    lower.includes('think about') ||
    lower.includes('remember') ||
    lower.includes('hint') ||
    lower.includes('try thinking') ||
    lower.includes('consider') ||
    lower.includes('what do you know about') ||
    lower.includes('let me help');

  // Should NOT reset or abandon
  const hasAbandon =
    lower.includes('let\'s move on') ||
    lower.includes('different topic') ||
    lower.includes('skip this');

  expect(hasScaffolding, `Expected scaffolding help in: "${text.substring(0, 200)}..."`).toBe(true);
  expect(hasAbandon, `Should not abandon topic when student needs help: "${text.substring(0, 200)}..."`).toBe(false);
}

/**
 * Assert that the response does NOT ask to try again
 * Used after a correct answer has been given
 */
export function expectNoRetryPrompt(text: string): void {
  const lower = text.toLowerCase();

  const hasRetryPrompt =
    lower.includes('try again') ||
    lower.includes('have another go') ||
    lower.includes('give it another');

  expect(hasRetryPrompt, `Should not prompt for retry: "${text.substring(0, 200)}..."`).toBe(false);
}

/**
 * Assert that confidence is protected (no harsh criticism)
 */
export function expectConfidenceProtected(text: string): void {
  const lower = text.toLowerCase();

  const harshWords = [
    'you should know this',
    'we covered this',
    'i already explained',
    'pay attention',
    'you\'re not listening',
    'that\'s basic',
    'you should remember',
    'disappointing',
    'frustrated'
  ];

  for (const harsh of harshWords) {
    expect(lower.includes(harsh), `Found harsh language "${harsh}" in: "${text.substring(0, 200)}..."`).toBe(false);
  }
}

/**
 * Assert that the response is a question (ends with ?)
 */
export function expectIsQuestion(text: string): void {
  const trimmed = text.trim();
  // Check if any sentence ends with ?
  const hasQuestion = trimmed.includes('?');
  expect(hasQuestion, `Expected a question in: "${text.substring(0, 200)}..."`).toBe(true);
}

/**
 * Assert that the response moves forward (new topic or advancement)
 */
export function expectProgressForward(text: string): void {
  const lower = text.toLowerCase();

  const hasProgress =
    lower.includes('next') ||
    lower.includes('now let\'s') ||
    lower.includes('moving on') ||
    lower.includes('great') ||
    lower.includes('excellent') ||
    lower.includes('mastered') ||
    lower.includes('well done');

  expect(hasProgress, `Expected forward progress in: "${text.substring(0, 200)}..."`).toBe(true);
}

/**
 * Count questions in text
 */
export function countQuestions(text: string): number {
  return (text.match(/\?/g) || []).length;
}

/**
 * Extract questions from text
 */
export function extractQuestions(text: string): string[] {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s);
  const questions: string[] = [];

  // Find sentences that were followed by ?
  const parts = text.split('?');
  for (let i = 0; i < parts.length - 1; i++) {
    const lastSentence = parts[i].split(/[.!]/).pop()?.trim();
    if (lastSentence) {
      questions.push(lastSentence + '?');
    }
  }

  return questions;
}
