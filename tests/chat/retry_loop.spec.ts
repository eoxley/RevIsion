import { test, expect } from './fixtures';
import { expectNoRetryPrompt, expectProgressForward } from './helpers/assertions';

/**
 * Retry Loop Escape Tests
 *
 * These tests verify that the system provides an escape hatch
 * from retry loops. Students should never be trapped asking
 * the same question forever.
 *
 * Escape conditions:
 * - Correct answer given (should move on)
 * - Multiple failed attempts (should provide scaffolding then reveal)
 * - Student explicitly asks to move on
 * - Maximum attempts reached
 */

test.describe('Retry Loop Escape', () => {
  test('Does not loop after correct answer already given', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Set up a question context
    await chatDriver.sendAndGetReply('Ask me a question about algebra');

    // Give a correct answer
    await chatDriver.sendAndGetReply('x = 5');

    // Try to answer again (simulate confusion or double-tap)
    const followUp = await chatDriver.sendAndGetReply('x = 5');

    expectNoRetryPrompt(followUp);
  });

  test('Provides escape after multiple wrong attempts', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Ask me a multiplication question');

    // Give wrong answers multiple times
    await chatDriver.sendAndGetReply('wrong answer 1');
    await chatDriver.sendAndGetReply('wrong answer 2');
    const response3 = await chatDriver.sendAndGetReply('wrong answer 3');

    // After 3 wrong attempts, should provide more help or reveal answer
    const lower = response3.toLowerCase();
    const hasHelp =
      lower.includes('hint') ||
      lower.includes('answer') ||
      lower.includes('let me help') ||
      lower.includes('correct answer') ||
      lower.includes('here\'s how') ||
      lower.includes('the answer is');

    expect(hasHelp, 'Should provide help after multiple wrong attempts').toBe(true);
  });

  test('Student can request to move on', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Ask me about fractions');

    // Give wrong answer
    await chatDriver.sendAndGetReply('I have no idea');

    // Explicitly ask to skip
    const reply = await chatDriver.sendAndGetReply('Can we move on to something else?');

    const lower = reply.toLowerCase();
    const acceptsRequest =
      lower.includes('sure') ||
      lower.includes('okay') ||
      lower.includes('let\'s') ||
      lower.includes('of course') ||
      lower.includes('no problem') ||
      lower.includes('next') ||
      lower.includes('different');

    expect(acceptsRequest, 'Should accept request to move on').toBe(true);
  });

  test('Student can ask to skip difficult question', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths revision');

    // Ask for hard question
    await chatDriver.sendAndGetReply('Give me a difficult question');

    // Request skip
    const reply = await chatDriver.sendAndGetReply('This is too hard, can you skip it?');

    const lower = reply.toLowerCase();
    const skipsOrHelps =
      lower.includes('skip') ||
      lower.includes('another') ||
      lower.includes('different') ||
      lower.includes('easier') ||
      lower.includes('let me help') ||
      lower.includes('try this instead');

    expect(skipsOrHelps).toBe(true);
  });

  test('Correct answer breaks retry cycle', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Set up question
    await chatDriver.sendAndGetReply('What is 5 + 5?');

    // Wrong answers
    await chatDriver.sendAndGetReply('9');
    await chatDriver.sendAndGetReply('11');

    // Correct answer should break the cycle
    const reply = await chatDriver.sendAndGetReply('10');

    // Should acknowledge and move forward, not retry
    expectProgressForward(reply);
    expectNoRetryPrompt(reply);
  });

  test('System does not repeat same wrong-answer feedback', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Ask me a question');

    // Multiple wrong attempts
    const response1 = await chatDriver.sendAndGetReply('wrong');
    const response2 = await chatDriver.sendAndGetReply('still wrong');
    const response3 = await chatDriver.sendAndGetReply('wrongest');

    // Each response should be somewhat different (not copy-paste feedback)
    const responses = [response1, response2, response3];
    const unique = new Set(responses.map(r => r.toLowerCase().substring(0, 50)));

    // At least 2 unique responses expected (some variation)
    expect(unique.size).toBeGreaterThanOrEqual(2);
  });

  test('Retry prompt includes variation each time', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('What is 2 times 3?');

    // Collect retry prompts
    const responses: string[] = [];
    responses.push(await chatDriver.sendAndGetReply('wrong'));
    responses.push(await chatDriver.sendAndGetReply('still wrong'));

    // Should have some variation in feedback
    expect(responses[0]).not.toBe(responses[1]);
  });

  test('Eventually reveals answer or provides direct help', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('What is the capital of France in maths terms?');

    // Multiple confused responses
    let response: string;
    for (let i = 0; i < 5; i++) {
      response = await chatDriver.sendAndGetReply('I really do not know');
    }

    // After many attempts, should either reveal or provide substantial help
    const lower = response!.toLowerCase();
    const hasResolution =
      lower.includes('answer') ||
      lower.includes('it\'s') ||
      lower.includes('correct answer') ||
      lower.includes('here\'s') ||
      lower.includes('the solution') ||
      lower.includes('let me show') ||
      lower.includes('let me explain') ||
      lower.includes('different') ||
      lower.includes('move on');

    expect(hasResolution, 'Should eventually provide resolution').toBe(true);
  });
});
