import { test, expect } from './fixtures';
import { expectConfidenceProtected, expectNoRetryPrompt } from './helpers/assertions';

/**
 * Confidence Protection Tests
 *
 * These tests verify that the AI never damages student confidence
 * through harsh language, impatient responses, or gaslighting.
 *
 * Confidence killers to catch:
 * - "You should know this"
 * - "We already covered this"
 * - "That's basic"
 * - Marking correct answers as wrong (gaslighting)
 * - Excessive repetition of failures
 */

test.describe('Confidence Protection', () => {
  test('No harsh language after wrong answer', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Ask me a question');

    const reply = await chatDriver.sendAndGetReply('completely wrong answer');

    expectConfidenceProtected(reply);
  });

  test('No harsh language after multiple wrong answers', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('Ask me something');

    // Multiple wrong attempts
    await chatDriver.sendAndGetReply('wrong');
    await chatDriver.sendAndGetReply('wrong again');
    const reply = await chatDriver.sendAndGetReply('still wrong');

    expectConfidenceProtected(reply);
  });

  test('Encouraging tone when student struggles', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    const reply = await chatDriver.sendAndGetReply('This is really hard and I\'m struggling');

    const lower = reply.toLowerCase();

    // Should have encouraging elements
    const hasEncouragement =
      lower.includes('okay') ||
      lower.includes('don\'t worry') ||
      lower.includes('it\'s fine') ||
      lower.includes('normal') ||
      lower.includes('help') ||
      lower.includes('together') ||
      lower.includes('try') ||
      lower.includes('let\'s');

    expect(hasEncouragement, 'Should be encouraging when student struggles').toBe(true);
    expectConfidenceProtected(reply);
  });

  test('Does not gaslight correct answers as wrong', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('What is 2 + 2?');

    const reply = await chatDriver.sendAndGetReply('4');

    // Should NOT say it's wrong when it's correct
    const lower = reply.toLowerCase();
    const markedWrong =
      lower.includes('wrong') ||
      lower.includes('incorrect') ||
      lower.includes('not quite') ||
      lower.includes('try again');

    expect(markedWrong, 'Should not mark correct answer as wrong (gaslighting)').toBe(false);
  });

  test('Acknowledges effort even on wrong answer', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('What is 15 x 7?');

    // Close but wrong answer
    const reply = await chatDriver.sendAndGetReply('100');

    const lower = reply.toLowerCase();

    // Should not be harsh about the attempt
    expectConfidenceProtected(reply);

    // Should give constructive feedback
    const hasConstructive =
      lower.includes('close') ||
      lower.includes('good') ||
      lower.includes('try') ||
      lower.includes('think') ||
      lower.includes('almost') ||
      lower.includes('hint') ||
      !lower.includes('wrong'); // or doesn't use "wrong" at all

    expect(hasConstructive, 'Should give constructive feedback').toBe(true);
  });

  test('Patient response to repeated questions', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Ask the same thing multiple times (confused student)
    await chatDriver.sendAndGetReply('How do I do this?');
    await chatDriver.sendAndGetReply('I still don\'t understand');
    const reply = await chatDriver.sendAndGetReply('Can you explain again?');

    expectConfidenceProtected(reply);

    // Should not express frustration
    const lower = reply.toLowerCase();
    const hasFrustration =
      lower.includes('already told') ||
      lower.includes('i said') ||
      lower.includes('again') && lower.includes('already') ||
      lower.includes('listen');

    expect(hasFrustration, 'Should not express frustration at repeated questions').toBe(false);
  });

  test('Celebrates success appropriately', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');
    await chatDriver.sendAndGetReply('What is 5 x 5?');

    const reply = await chatDriver.sendAndGetReply('25');

    const lower = reply.toLowerCase();

    // Should celebrate
    const hasCelebration =
      lower.includes('correct') ||
      lower.includes('right') ||
      lower.includes('great') ||
      lower.includes('well done') ||
      lower.includes('excellent') ||
      lower.includes('brilliant') ||
      lower.includes('perfect') ||
      lower.includes('yes') ||
      lower.includes('good');

    expect(hasCelebration, 'Should celebrate correct answer').toBe(true);
  });

  test('Does not mock student knowledge level', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    const reply = await chatDriver.sendAndGetReply('What is addition?');

    const lower = reply.toLowerCase();

    // Should not mock for basic questions
    const hasMocking =
      lower.includes('really?') ||
      lower.includes('seriously') ||
      lower.includes('you don\'t know') ||
      lower.includes('should know') ||
      lower.includes('basic') ||
      lower.includes('easy');

    expect(hasMocking, 'Should not mock for basic questions').toBe(false);
    expectConfidenceProtected(reply);
  });

  test('Supportive when student says they are nervous', async ({ chatDriver }) => {
    const reply = await chatDriver.sendAndGetReply('I\'m nervous about my exams');

    const lower = reply.toLowerCase();

    // Should be supportive
    const hasSupportive =
      lower.includes('normal') ||
      lower.includes('okay') ||
      lower.includes('understand') ||
      lower.includes('help') ||
      lower.includes('don\'t worry') ||
      lower.includes('natural') ||
      lower.includes('together');

    expect(hasSupportive, 'Should be supportive about exam nerves').toBe(true);
    expectConfidenceProtected(reply);
  });

  test('Recovery from panic mode is gentle', async ({ chatDriver }) => {
    await chatDriver.sendAndGetReply('Start maths');

    // Express panic
    const reply = await chatDriver.sendAndGetReply('I can\'t do this anymore, it\'s too hard!');

    const lower = reply.toLowerCase();

    expectConfidenceProtected(reply);

    // Should offer a way out or simplification
    const hasRecovery =
      lower.includes('break') ||
      lower.includes('step back') ||
      lower.includes('easier') ||
      lower.includes('simpler') ||
      lower.includes('different') ||
      lower.includes('help') ||
      lower.includes('okay') ||
      lower.includes('fine');

    expect(hasRecovery, 'Should offer gentle recovery from panic').toBe(true);
  });
});
