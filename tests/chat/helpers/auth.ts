import { Page } from '@playwright/test';

/**
 * Authentication helpers for E2E tests
 *
 * These helpers manage test user authentication.
 * Tests require an authenticated session to access the chat interface.
 */

// Test user credentials (should be set in environment or use a dedicated test account)
const TEST_EMAIL = process.env.TEST_USER_EMAIL || 'test@myrevisionary.com';
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD || 'TestPassword123!';

/**
 * Login to the application
 */
export async function login(page: Page): Promise<void> {
  await page.goto('/login');

  // Wait for login form
  await page.waitForSelector('input[type="email"]', { state: 'visible' });

  // Fill credentials
  await page.fill('input[type="email"]', TEST_EMAIL);
  await page.fill('input[type="password"]', TEST_PASSWORD);

  // Submit
  await page.click('button[type="submit"]');

  // Wait for redirect to dashboard
  await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 30000 });
}

/**
 * Logout from the application
 */
export async function logout(page: Page): Promise<void> {
  // Navigate to profile or look for logout button
  // Implementation depends on where the logout button is
  await page.goto('/');
  // Clear cookies to force logout
  await page.context().clearCookies();
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  await page.goto('/dashboard');
  // If redirected to login, not authenticated
  const url = page.url();
  return !url.includes('/login');
}

/**
 * Setup authenticated session for tests
 * Can be used in beforeEach or as a fixture
 */
export async function setupAuthenticatedSession(page: Page): Promise<void> {
  const isAuth = await isAuthenticated(page);
  if (!isAuth) {
    await login(page);
  }
}

/**
 * Navigate to dashboard as authenticated user
 */
export async function goToDashboard(page: Page): Promise<void> {
  await setupAuthenticatedSession(page);
  await page.goto('/dashboard');
  await page.waitForSelector('[data-testid="chat-container"]', {
    state: 'visible',
    timeout: 30000,
  });
}

/**
 * Skip onboarding if necessary
 * Some test accounts may need to complete onboarding first
 */
export async function skipOnboardingIfNeeded(page: Page): Promise<void> {
  const url = page.url();
  if (url.includes('/onboarding')) {
    // Check if there's a skip button or navigate directly
    const skipButton = await page.locator('text=Skip').first();
    if (await skipButton.isVisible()) {
      await skipButton.click();
    } else {
      // Navigate directly to dashboard
      await page.goto('/dashboard');
    }
  }
}
