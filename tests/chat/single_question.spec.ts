import { test, expect } from './fixtures';
import { expectSingleQuestion, countQuestions } from './helpers/assertions';

/**
 * Single Question Enforcement Tests
 *
 * These tests verify that the AI asks only ONE question per turn.
 * Multiple questions per response causes cognitive overload and
 * makes it impossible for the evaluator to know which question
 * the student is answering.
 *
 * Test Strategy:
 * - Send various prompts and verify responses contain max 1 question
 * - Test different session phases (greeting, revision, diagnostic)
 */

test.describe('Single Question Enforcement', () => {
  test('AI asks only one question per turn on session start', async ({ chatDriver }) => {
    // The initial greeting message should have at most one question
    const reply = await chatDriver.sendAndGetReply('Hi, I want to start revising');

    expectSingleQuestion(reply);
  });

  test('AI asks only one question when starting maths revision', async ({ chatDriver }) => {
    const reply = await chatDriver.sendAndGetReply('Start maths');

    expectSingleQuestion(reply);
  });

  test('AI asks only one question after correct answer', async ({ chatDriver }) => {
    // Start a session
    await chatDriver.sendAndGetReply('Start maths');

    // Give a correct answer (generic)
    const reply = await chatDriver.sendAndGetReply('The answer is 5');

    expectSingleQuestion(reply);
  });

  test('AI asks only one question after wrong answer', async ({ chatDriver }) => {
    // Start a session
    await chatDriver.sendAndGetReply('Start maths');

    // Give a wrong answer (intentionally incorrect)
    const reply = await chatDriver.sendAndGetReply('I think the answer is banana');

    expectSingleQuestion(reply);
  });

  test('AI asks only one question when providing help', async ({ chatDriver }) => {
    // Start a session
    await chatDriver.sendAndGetReply('Start maths');

    // Ask for help
    const reply = await chatDriver.sendAndGetReply('I need help with this');

    expectSingleQuestion(reply);
  });

  test('AI asks only one question in diagnostic phase', async ({ chatDriver }) => {
    // Start subject-specific revision which triggers diagnostic
    const reply = await chatDriver.sendAndGetReply('I want to revise algebra');

    expectSingleQuestion(reply);
  });

  test('Multiple exchanges maintain single question rule', async ({ chatDriver }) => {
    // Test across multiple turns
    const responses: string[] = [];

    responses.push(await chatDriver.sendAndGetReply('Start maths revision'));
    responses.push(await chatDriver.sendAndGetReply('x = 5'));
    responses.push(await chatDriver.sendAndGetReply('Yes'));
    responses.push(await chatDriver.sendAndGetReply('I think so'));

    // Every response should have at most one question
    for (let i = 0; i < responses.length; i++) {
      const questionCount = countQuestions(responses[i]);
      expect(questionCount, `Response ${i + 1} has ${questionCount} questions`).toBeLessThanOrEqual(1);
    }
  });

  test('Question count never exceeds one even with complex topics', async ({ chatDriver }) => {
    // Start with a complex topic that might tempt multiple questions
    const reply = await chatDriver.sendAndGetReply(
      'I need help with quadratic equations, specifically factorising and using the formula'
    );

    const questionCount = countQuestions(reply);
    expect(questionCount).toBeLessThanOrEqual(1);
  });
});
