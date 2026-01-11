import { Page, expect } from '@playwright/test';

/**
 * Chat Driver Abstraction
 *
 * Provides a clean interface for interacting with the MyRevisionary chat interface.
 * This keeps tests readable and maintainable.
 */
export class ChatDriver {
  constructor(private page: Page) {}

  /**
   * Navigate to the dashboard (chat interface)
   */
  async goto() {
    await this.page.goto('/dashboard');
    await this.waitForChatReady();
  }

  /**
   * Wait for the chat interface to be fully loaded and ready
   */
  async waitForChatReady() {
    await this.page.waitForSelector('[data-testid="chat-container"]', {
      state: 'visible',
      timeout: 30000,
    });
    await this.page.waitForSelector('[data-testid="chat-input"]', {
      state: 'visible',
      timeout: 30000,
    });
  }

  /**
   * Send a message and wait for AI response
   */
  async sendAndGetReply(message: string): Promise<string> {
    // Fill the input
    await this.page.fill('[data-testid="chat-input"]', message);

    // Click send
    await this.page.click('[data-testid="send-button"]');

    // Wait for loading to start and finish
    await this.waitForResponse();

    // Get the last AI message
    const reply = await this.getLastAIMessage();
    return reply;
  }

  /**
   * Send a message without waiting for response
   */
  async sendMessage(message: string): Promise<void> {
    await this.page.fill('[data-testid="chat-input"]', message);
    await this.page.click('[data-testid="send-button"]');
  }

  /**
   * Wait for AI response to complete
   */
  async waitForResponse(timeout: number = 60000): Promise<void> {
    // Wait for loading indicator to appear (may not always appear if response is fast)
    try {
      await this.page.waitForSelector('[data-testid="loading-indicator"]', {
        state: 'visible',
        timeout: 2000,
      });
    } catch {
      // Loading indicator might not appear for fast responses
    }

    // Wait for loading indicator to disappear
    await this.page.waitForSelector('[data-testid="loading-indicator"]', {
      state: 'detached',
      timeout: timeout,
    });

    // Small delay to ensure DOM is updated
    await this.page.waitForTimeout(500);
  }

  /**
   * Get the last AI message text
   */
  async getLastAIMessage(): Promise<string> {
    const messages = await this.page.locator('[data-testid="chat-message-assistant"]').all();
    if (messages.length === 0) {
      return '';
    }
    return await messages[messages.length - 1].innerText();
  }

  /**
   * Get all AI messages
   */
  async getAllAIMessages(): Promise<string[]> {
    const messages = await this.page.locator('[data-testid="chat-message-assistant"]').all();
    const texts: string[] = [];
    for (const msg of messages) {
      texts.push(await msg.innerText());
    }
    return texts;
  }

  /**
   * Get the last user message text
   */
  async getLastUserMessage(): Promise<string> {
    const messages = await this.page.locator('[data-testid="chat-message-user"]').all();
    if (messages.length === 0) {
      return '';
    }
    return await messages[messages.length - 1].innerText();
  }

  /**
   * Get total message count
   */
  async getMessageCount(): Promise<{ user: number; assistant: number }> {
    const userMessages = await this.page.locator('[data-testid="chat-message-user"]').count();
    const assistantMessages = await this.page.locator('[data-testid="chat-message-assistant"]').count();
    return { user: userMessages, assistant: assistantMessages };
  }

  /**
   * Get the current session phase from the header
   */
  async getCurrentPhase(): Promise<string | null> {
    const phaseElement = await this.page.locator('[data-testid="session-phase"]');
    return await phaseElement.getAttribute('data-phase');
  }

  /**
   * Check if chat is in loading state
   */
  async isLoading(): Promise<boolean> {
    const loadingIndicator = await this.page.locator('[data-testid="loading-indicator"]').count();
    return loadingIndicator > 0;
  }

  /**
   * Start a subject-focused revision session
   * Clicks on a subject card to enter revision mode
   */
  async startSubjectSession(subjectCode: string): Promise<void> {
    // Click the subject card
    await this.page.click(`[data-subject="${subjectCode}"]`);
    await this.waitForChatReady();
  }

  /**
   * Clear the input field
   */
  async clearInput(): Promise<void> {
    await this.page.fill('[data-testid="chat-input"]', '');
  }

  /**
   * Get current input value
   */
  async getInputValue(): Promise<string> {
    return await this.page.inputValue('[data-testid="chat-input"]');
  }
}

/**
 * Create a new ChatDriver instance
 */
export function createChatDriver(page: Page): ChatDriver {
  return new ChatDriver(page);
}
