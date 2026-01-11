import { test as base, expect } from '@playwright/test';
import { ChatDriver, createChatDriver } from './helpers/chat-driver';
import { goToDashboard } from './helpers/auth';

/**
 * Extended test fixtures for conversation integrity tests
 *
 * These fixtures provide:
 * - Authenticated page (logged in user)
 * - ChatDriver instance for interacting with chat
 */

type ChatFixtures = {
  chatDriver: ChatDriver;
  authenticatedPage: typeof base;
};

/**
 * Extended test with chat fixtures
 */
export const test = base.extend<ChatFixtures>({
  // ChatDriver fixture - provides clean interface to chat
  chatDriver: async ({ page }, use) => {
    // Setup: Navigate to dashboard and wait for chat
    await goToDashboard(page);

    // Create driver
    const driver = createChatDriver(page);

    // Use the driver in the test
    await use(driver);

    // Teardown: nothing special needed
  },
});

export { expect };

/**
 * Test configuration recommendations:
 *
 * 1. Set environment variables for test credentials:
 *    TEST_USER_EMAIL=test@myrevisionary.com
 *    TEST_USER_PASSWORD=yourpassword
 *
 * 2. Create a dedicated test user account in Supabase
 *    with pre-configured VARK profile and subjects
 *
 * 3. For CI, consider using Supabase test mode or
 *    seeding test data before runs
 */
