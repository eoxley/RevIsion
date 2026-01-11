import { test, expect } from './fixtures';
import {
  expectCorrectAcknowledgment,
  expectPartialAcknowledgment,
  expectNoRetryPrompt,
} from './helpers/assertions';

/**
 * Multi-Answer Math Handling Tests
 *
 * THIS IS THE CRITICAL BUG TEST FILE
 *
 * These tests verify that quadratic equations and other multi-answer
 * problems are handled correctly:
 * - Full solution (both answers) is recognized as complete
 * - Partial answer (one root) is acknowledged but prompts for second
 * - System doesn't loop infinitely or mark correct as wrong
 *
 * The quadratic x² - 5x + 6 = 0 has solutions x = 2 and x = 3
 */

test.describe('Multi-Answer Math Handling', () => {
  test('Accepts full multi-answer solution and moves on', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths revision');

    // Ask a quadratic question
    await chatDriver.sendAndGetReply('Give me a quadratic to solve');

    // Provide both answers
    const reply = await chatDriver.sendAndGetReply('x = 2 or x = 3');

    // Should acknowledge as correct
    expectCorrectAcknowledgment(reply);

    // Should NOT ask to try again
    expectNoRetryPrompt(reply);
  });

  test('Accepts alternative format: x = 2 and x = 3', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Solve x² - 5x + 6 = 0');

    const reply = await chatDriver.sendAndGetReply('x = 2 and x = 3');

    expectCorrectAcknowledgment(reply);
    expectNoRetryPrompt(reply);
  });

  test('Accepts alternative format: x = 2, x = 3', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Solve x² - 5x + 6 = 0');

    const reply = await chatDriver.sendAndGetReply('x = 2, x = 3');

    expectCorrectAcknowledgment(reply);
    expectNoRetryPrompt(reply);
  });

  test('Accepts alternative format: 2 and 3', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Solve x² - 5x + 6 = 0');

    const reply = await chatDriver.sendAndGetReply('2 and 3');

    expectCorrectAcknowledgment(reply);
    expectNoRetryPrompt(reply);
  });

  test('Partial answer acknowledged without marking wrong', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Solve x² - 5x + 6 = 0');

    // Give only one answer
    const reply = await chatDriver.sendAndGetReply('x = 2');

    // Should acknowledge the partial answer positively
    expectPartialAcknowledgment(reply);
  });

  test('Completing partial answer results in full acknowledgment', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Solve x² - 5x + 6 = 0');

    // Give first answer
    await chatDriver.sendAndGetReply('x = 2');

    // Give second answer
    const reply = await chatDriver.sendAndGetReply('x = 3');

    // Should now acknowledge as complete
    expectCorrectAcknowledgment(reply);
    expectNoRetryPrompt(reply);
  });

  test('Order of answers does not matter', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Solve x² - 5x + 6 = 0');

    // Give answers in reverse order
    const reply = await chatDriver.sendAndGetReply('x = 3 or x = 2');

    expectCorrectAcknowledgment(reply);
    expectNoRetryPrompt(reply);
  });

  test('Simultaneous equations handled correctly', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths revision');

    // Request simultaneous equations
    const setupReply = await chatDriver.sendAndGetReply('Give me simultaneous equations to solve');

    // Provide both values
    const reply = await chatDriver.sendAndGetReply('x = 3 and y = 2');

    // Should handle gracefully (may or may not be the exact values, but should process)
    expect(reply.toLowerCase()).not.toContain('error');
  });

  test('Negative roots handled correctly', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Ask about a quadratic with negative roots (x² + 5x + 6 = 0 → x = -2 or x = -3)
    await chatDriver.sendAndGetReply('Solve x² + 5x + 6 = 0');

    const reply = await chatDriver.sendAndGetReply('x = -2 or x = -3');

    expectCorrectAcknowledgment(reply);
  });

  test('Mixed positive and negative roots handled', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // x² - x - 6 = 0 → x = 3 or x = -2
    await chatDriver.sendAndGetReply('Solve x² - x - 6 = 0');

    const reply = await chatDriver.sendAndGetReply('x = 3 or x = -2');

    expectCorrectAcknowledgment(reply);
  });

  test('Fractional answers handled correctly', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Ask about an equation with fraction solutions
    await chatDriver.sendAndGetReply('What is half of 1/3?');

    const reply = await chatDriver.sendAndGetReply('1/6');

    // Should accept the fraction
    expectCorrectAcknowledgment(reply);
  });

  test('Does not create infinite loop on repeated correct answer', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Solve x² - 5x + 6 = 0');

    // Give full correct answer
    const reply1 = await chatDriver.sendAndGetReply('x = 2 or x = 3');
    expectCorrectAcknowledgment(reply1);

    // Repeat the same answer (user might do this by accident)
    const reply2 = await chatDriver.sendAndGetReply('x = 2 or x = 3');

    // Should not ask to try again or create a loop
    expectNoRetryPrompt(reply2);

    // Should either acknowledge again or move forward
    const lower = reply2.toLowerCase();
    const isReasonable =
      lower.includes('already') ||
      lower.includes('correct') ||
      lower.includes('move') ||
      lower.includes('next') ||
      lower.includes('right');
    expect(isReasonable).toBe(true);
  });
});
