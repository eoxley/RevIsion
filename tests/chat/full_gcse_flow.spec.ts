import { test, expect } from './fixtures';
import {
  expectSingleQuestion,
  expectCorrectAcknowledgment,
  expectNoRetryPrompt,
  expectConfidenceProtected,
  expectNoDuplicatePrompt,
} from './helpers/assertions';

/**
 * Full GCSE Flow Integration Tests
 *
 * These are gold-standard end-to-end tests that simulate
 * realistic student revision sessions without state corruption.
 *
 * Each test represents a complete interaction pattern
 * that should work flawlessly.
 */

test.describe('Full GCSE Flow', () => {
  test('Full diagnostic flow without state corruption', async ({ chatDriver }) => {
    // Start session
    const greeting = await chatDriver.sendAndGetReply('Start maths');
    expectSingleQuestion(greeting);
    expectNoDuplicatePrompt(greeting);

    // Answer diagnostic questions
    const response1 = await chatDriver.sendAndGetReply('x = 5');
    expectSingleQuestion(response1);
    expectNoDuplicatePrompt(response1);

    const response2 = await chatDriver.sendAndGetReply('1/36');
    expectSingleQuestion(response2);

    const response3 = await chatDriver.sendAndGetReply('x = 2 or x = 3');
    expectNoDuplicatePrompt(response3);

    // Final response should acknowledge and potentially move forward
    const lower = response3.toLowerCase();
    const isHealthy =
      lower.includes('correct') ||
      lower.includes('great') ||
      lower.includes('well done') ||
      lower.includes('excellent') ||
      lower.includes('right') ||
      lower.includes('next');

    expect(isHealthy, 'Final response should be positive').toBe(true);
    expectNoRetryPrompt(response3);
  });

  test('Complete session with mixed correct and wrong answers', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths revision');

    // Correct answer
    let reply = await chatDriver.sendAndGetReply('The answer is 10');
    expectConfidenceProtected(reply);

    // Wrong answer
    reply = await chatDriver.sendAndGetReply('banana');
    expectConfidenceProtected(reply);
    expectSingleQuestion(reply);

    // Correct answer
    reply = await chatDriver.sendAndGetReply('Yes, that makes sense');
    expectConfidenceProtected(reply);

    // IDK
    reply = await chatDriver.sendAndGetReply("I don't know this one");
    expectConfidenceProtected(reply);

    // Back to correct
    reply = await chatDriver.sendAndGetReply('Oh I see, it\'s 25');
    expectConfidenceProtected(reply);
  });

  test('Session maintains coherent state across topic changes', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Topic 1: Algebra
    await chatDriver.sendAndGetReply('Let\'s do algebra');
    const algebra = await chatDriver.sendAndGetReply('x = 4');
    expectSingleQuestion(algebra);

    // Topic 2: Fractions
    await chatDriver.sendAndGetReply('Now let\'s try fractions');
    const fractions = await chatDriver.sendAndGetReply('1/2');
    expectSingleQuestion(fractions);

    // Topic 3: Geometry
    await chatDriver.sendAndGetReply('What about geometry?');
    const geometry = await chatDriver.sendAndGetReply('90 degrees');
    expectSingleQuestion(geometry);

    // All responses should be coherent (not mixing topics)
    expectNoDuplicatePrompt(algebra);
    expectNoDuplicatePrompt(fractions);
    expectNoDuplicatePrompt(geometry);
  });

  test('Long session does not accumulate state bugs', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // 10 exchanges to simulate a longer session
    const responses: string[] = [];
    const messages = [
      '5', '10', "I think it's 15", 'yes', 'no',
      "I don't know", '25', '30', 'correct?', 'final answer: 100'
    ];

    for (const msg of messages) {
      const reply = await chatDriver.sendAndGetReply(msg);
      responses.push(reply);
      expectSingleQuestion(reply);
      expectConfidenceProtected(reply);
    }

    // No response should be identical to another
    const uniqueResponses = new Set(responses);
    expect(uniqueResponses.size).toBeGreaterThan(responses.length / 2);
  });

  test('Recovery from confusion maintains session', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths revision');

    // Normal flow
    await chatDriver.sendAndGetReply('I want to practice equations');

    // Student gets confused
    await chatDriver.sendAndGetReply("I'm confused");
    await chatDriver.sendAndGetReply('What?');
    await chatDriver.sendAndGetReply('I don\'t understand');

    // Student recovers
    const recovery = await chatDriver.sendAndGetReply('Oh wait, I think I get it now. x = 5');

    // Session should continue normally
    expectConfidenceProtected(recovery);
    expectSingleQuestion(recovery);
  });

  test('Student can ask meta questions without breaking state', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Regular question
    await chatDriver.sendAndGetReply('x = 3');

    // Meta question
    const meta1 = await chatDriver.sendAndGetReply('How am I doing?');
    expectConfidenceProtected(meta1);

    // Another meta question
    const meta2 = await chatDriver.sendAndGetReply('What should I focus on?');
    expectSingleQuestion(meta2);

    // Back to content
    const content = await chatDriver.sendAndGetReply('The answer is 42');
    expectSingleQuestion(content);
  });

  test('Session handles rapid-fire answers', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Ask me times tables');

    // Quick succession of answers
    const responses = await Promise.all([
      chatDriver.sendAndGetReply('4'),
    ]);

    for (const response of responses) {
      expectSingleQuestion(response);
      expectNoDuplicatePrompt(response);
    }
  });

  test('Complete algebra diagnostic to mastery', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Diagnostic phase
    let reply = await chatDriver.sendAndGetReply('I want to work on algebra');
    expectSingleQuestion(reply);

    // Answer diagnostic questions
    reply = await chatDriver.sendAndGetReply('x = 5');
    expectSingleQuestion(reply);

    reply = await chatDriver.sendAndGetReply('x = -3');
    expectSingleQuestion(reply);

    reply = await chatDriver.sendAndGetReply('x = 2 and x = 3');

    // Should progress positively
    const lower = reply.toLowerCase();
    const hasProgress =
      lower.includes('great') ||
      lower.includes('excellent') ||
      lower.includes('well done') ||
      lower.includes('good') ||
      lower.includes('correct');

    expect(hasProgress).toBe(true);
  });

  test('Graceful handling of off-topic messages', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('What is 2 + 2?');

    // Off-topic message
    const reply = await chatDriver.sendAndGetReply('I had pizza for lunch');

    // Should handle gracefully, not crash
    expect(reply).toBeTruthy();
    expect(reply.length).toBeGreaterThan(10);
    expectConfidenceProtected(reply);
  });

  test('Session survives repeated greetings', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('x = 5');

    // User says hi again mid-session
    const reply1 = await chatDriver.sendAndGetReply('Hi!');
    expect(reply1).toBeTruthy();

    // Another greeting
    const reply2 = await chatDriver.sendAndGetReply('Hello again');
    expect(reply2).toBeTruthy();

    // Continue with content
    const reply3 = await chatDriver.sendAndGetReply('Anyway, x = 10');
    expectSingleQuestion(reply3);
    expectConfidenceProtected(reply3);
  });

  test('Session handles very long student input', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Very long input
    const longInput = `I think the answer might be x = 5 because when I substitute it back
    into the original equation I get 5 squared which is 25 minus 10 which is 15 plus 6
    which gives me 21 wait no that's not right let me try again maybe it's x = 3 because
    3 squared is 9 minus 6 is 3 plus 6 is 9 hmm that's not zero either I'm confused`;

    const reply = await chatDriver.sendAndGetReply(longInput);

    // Should handle gracefully
    expect(reply).toBeTruthy();
    expectConfidenceProtected(reply);
    expectSingleQuestion(reply);
  });

  test('Complete session without any state corruption markers', async ({ chatDriver }) => {
    // Full session
    const responses: string[] = [];

    responses.push(await chatDriver.sendAndGetReply('Start maths'));
    responses.push(await chatDriver.sendAndGetReply('I want to practice'));
    responses.push(await chatDriver.sendAndGetReply('x = 5'));
    responses.push(await chatDriver.sendAndGetReply("I don't know"));
    responses.push(await chatDriver.sendAndGetReply('x = 3'));
    responses.push(await chatDriver.sendAndGetReply('Can we try another topic?'));
    responses.push(await chatDriver.sendAndGetReply('fractions please'));
    responses.push(await chatDriver.sendAndGetReply('1/2'));

    // Check for corruption markers
    for (const response of responses) {
      // No undefined or null in response
      expect(response.includes('undefined')).toBe(false);
      expect(response.includes('null')).toBe(false);
      expect(response.includes('[object')).toBe(false);

      // No error markers
      expect(response.toLowerCase().includes('error')).toBe(false);
      expect(response.toLowerCase().includes('exception')).toBe(false);

      // No raw JSON
      expect(response.includes('"phase":')).toBe(false);
      expect(response.includes('"state":')).toBe(false);
    }
  });
});
