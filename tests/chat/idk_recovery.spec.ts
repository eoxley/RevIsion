import { test, expect } from './fixtures';
import { expectScaffolding, expectConfidenceProtected } from './helpers/assertions';

/**
 * "I Don't Know" Recovery Tests
 *
 * These tests verify that when a student says "I don't know",
 * the system provides scaffolding help instead of:
 * - Repeating the question
 * - Moving to a new topic (abandonment)
 * - Marking as wrong
 *
 * Scaffolding should:
 * - Break down the problem
 * - Provide hints
 * - Reference prior knowledge
 * - Guide step-by-step
 */

test.describe('I Don\'t Know Recovery', () => {
  test('i dont know triggers scaffolding, not reset', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Ask me about quadratics');

    const reply = await chatDriver.sendAndGetReply('i dont know');

    expectScaffolding(reply);
    expectConfidenceProtected(reply);
  });

  test('I don\'t know with apostrophe handled', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('What is algebra?');

    const reply = await chatDriver.sendAndGetReply("I don't know");

    expectScaffolding(reply);
  });

  test('IDK abbreviation handled', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Ask me something');

    const reply = await chatDriver.sendAndGetReply('idk');

    expectScaffolding(reply);
  });

  test('Not sure triggers scaffolding', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('What is the formula?');

    const reply = await chatDriver.sendAndGetReply("I'm not sure");

    expectScaffolding(reply);
  });

  test('No idea triggers scaffolding', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('How do you solve this?');

    const reply = await chatDriver.sendAndGetReply('no idea');

    expectScaffolding(reply);
  });

  test('Can\'t remember triggers scaffolding', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('What was the method we used?');

    const reply = await chatDriver.sendAndGetReply("I can't remember");

    expectScaffolding(reply);
    expectConfidenceProtected(reply);
  });

  test('Blank answer triggers scaffolding', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('What is 5 x 5?');

    // Just a question mark or minimal response
    const reply = await chatDriver.sendAndGetReply('?');

    // Should either scaffold or prompt for more
    const lower = reply.toLowerCase();
    const hasGuidance =
      lower.includes('hint') ||
      lower.includes('help') ||
      lower.includes('try') ||
      lower.includes('think') ||
      lower.includes('what do you') ||
      lower.includes('can you');

    expect(hasGuidance, 'Should provide guidance for blank answer').toBe(true);
  });

  test('Scaffolding breaks down the problem', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Solve x² + 5x + 6 = 0');

    const reply = await chatDriver.sendAndGetReply("I don't know how to start");

    const lower = reply.toLowerCase();

    // Should break down the problem
    const hasBreakdown =
      lower.includes('step') ||
      lower.includes('first') ||
      lower.includes('start') ||
      lower.includes('begin') ||
      lower.includes('factorise') ||
      lower.includes('factor') ||
      lower.includes('look for') ||
      lower.includes('find');

    expect(hasBreakdown, 'Should break down the problem').toBe(true);
    expectScaffolding(reply);
  });

  test('Scaffolding does not just repeat question', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    const question = await chatDriver.sendAndGetReply('What is the area of a circle?');

    const reply = await chatDriver.sendAndGetReply("I don't know");

    // Should NOT just repeat "What is the area of a circle?"
    // Should provide help instead
    expectScaffolding(reply);

    // Check it's not just the question repeated
    const questionWords = question.toLowerCase().split(' ').filter(w => w.length > 4);
    const replyWords = reply.toLowerCase().split(' ').filter(w => w.length > 4);

    // Should have some different content (new guidance)
    const overlap = questionWords.filter(w => replyWords.includes(w));
    const overlapRatio = overlap.length / questionWords.length;

    // Allow some overlap (topic reference is fine) but not full repetition
    expect(overlapRatio).toBeLessThan(0.8);
  });

  test('Multiple IDKs lead to more direct help', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('What is 7 x 8?');

    // Multiple "don't know" responses
    await chatDriver.sendAndGetReply("I don't know");
    await chatDriver.sendAndGetReply('still no idea');
    const reply = await chatDriver.sendAndGetReply("I really don't know");

    const lower = reply.toLowerCase();

    // After multiple IDKs, should give more direct help
    const hasDirectHelp =
      lower.includes('answer') ||
      lower.includes('56') ||
      lower.includes('seven times eight') ||
      lower.includes('let me help') ||
      lower.includes('here\'s') ||
      lower.includes('the result') ||
      lower.includes('think of it as');

    expect(hasDirectHelp, 'Should provide more direct help after multiple IDKs').toBe(true);
  });

  test('IDK does not abandon the topic', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    const topic = 'algebra';
    await chatDriver.sendAndGetReply(`Teach me about ${topic}`);

    const reply = await chatDriver.sendAndGetReply("I don't know what that is");

    const lower = reply.toLowerCase();

    // Should NOT abandon to new topic
    const hasAbandon =
      lower.includes('different topic') ||
      lower.includes('something else instead') ||
      lower.includes('move on to');

    expect(hasAbandon, 'Should not abandon topic when student needs help').toBe(false);

    // Should stay on topic or introduce it
    const staysOnTopic =
      lower.includes('algebra') ||
      lower.includes('equation') ||
      lower.includes('variable') ||
      lower.includes('let me explain') ||
      lower.includes('x') ||
      lower.includes('letter');

    expect(staysOnTopic, 'Should stay on topic or introduce it').toBe(true);
  });

  test('Emoji confusion doesn\'t crash scaffolding', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Ask me something');

    // Student uses emoji to express confusion
    const reply = await chatDriver.sendAndGetReply('😕 no idea');

    // Should still provide scaffolding
    const lower = reply.toLowerCase();
    const hasResponse =
      lower.includes('help') ||
      lower.includes('try') ||
      lower.includes('let') ||
      lower.includes('think') ||
      lower.includes('hint');

    expect(hasResponse, 'Should handle emoji + IDK').toBe(true);
  });
});
