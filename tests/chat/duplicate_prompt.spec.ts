import { test, expect } from './fixtures';
import { expectNoDuplicatePrompt } from './helpers/assertions';

/**
 * Duplicate Prompt Prevention Tests
 *
 * These tests verify that the AI never repeats the same question
 * or prompt within a single response or across consecutive turns.
 *
 * Duplicate prompts indicate:
 * - State corruption
 * - Message handling bugs
 * - Lost context
 */

test.describe('Duplicate Prompt Prevention', () => {
  test('Single response contains no duplicate lines', async ({ chatDriver }) => {
    const reply = await chatDriver.sendAndGetReply('Start maths revision');

    expectNoDuplicatePrompt(reply);
  });

  test('Response after answer contains no duplicates', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    const reply = await chatDriver.sendAndGetReply('x = 5');

    expectNoDuplicatePrompt(reply);
  });

  test('Response after help request contains no duplicates', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    const reply = await chatDriver.sendAndGetReply('I don\'t understand, can you explain?');

    expectNoDuplicatePrompt(reply);
  });

  test('Long explanation contains no repeated paragraphs', async ({ chatDriver }) => {
    // Request something that generates a longer response
    const reply = await chatDriver.sendAndGetReply(
      'Explain how to solve quadratic equations step by step'
    );

    expectNoDuplicatePrompt(reply);
  });

  test('AI does not repeat question after partial answer', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start algebra');

    // First response (contains a question)
    const response1 = await chatDriver.sendAndGetReply('Solve x² - 5x + 6 = 0');

    // Give partial answer
    const response2 = await chatDriver.sendAndGetReply('x = 2');

    // The second response should acknowledge, not repeat the original question
    expectNoDuplicatePrompt(response2);

    // Also check the question isn't repeated verbatim
    const questionFromResponse1 = response1.split('?')[0];
    if (questionFromResponse1 && questionFromResponse1.length > 20) {
      expect(response2.includes(questionFromResponse1)).toBe(false);
    }
  });

  test('AI does not repeat same hint twice', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Wrong answer
    await chatDriver.sendAndGetReply('I think the answer is 0');

    // Another wrong answer
    const response = await chatDriver.sendAndGetReply('Still 0?');

    expectNoDuplicatePrompt(response);
  });

  test('Consecutive responses have unique content', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Collect multiple responses
    const response1 = await chatDriver.sendAndGetReply('What is 2 + 2?');
    const response2 = await chatDriver.sendAndGetReply('4');
    const response3 = await chatDriver.sendAndGetReply('ok');

    // No response should be a duplicate of another
    expect(response1 !== response2).toBe(true);
    expect(response2 !== response3).toBe(true);
    expect(response1 !== response3).toBe(true);
  });

  test('System does not echo user input back as duplicate', async ({ chatDriver }) => {
    const userMessage = 'I want to practice quadratic equations';
    await chatDriver.sendAndGetReply('Start maths');
    const reply = await chatDriver.sendAndGetReply(userMessage);

    // The AI should not repeat the user's input verbatim
    const userWords = userMessage.toLowerCase();
    const replyLower = reply.toLowerCase();

    // It's okay to reference the topic, but not copy the whole sentence
    expect(replyLower.includes(userWords)).toBe(false);
  });
});
