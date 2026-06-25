import { expect, Locator, Page } from '@playwright/test';
import { pollUntil } from '../../support/helpers';
import { DEFAULT_CHAT_OUTCOME_POLL, PollOptions, TIMEOUTS } from '../../support/timeouts';

/** Assistant greeting that indicates the conversation is still assigned. */
const ASSIGNED_REPLY_PATTERN = /how can i (help|assist)/i;

/** Chat error copy shown when unassignment blocks a normal reply. */
const ERROR_TEXT_PATTERN = /error|failed|unable/i;

export interface ChatOutcome {
  assistantResponded: boolean;
  errorVisible: boolean;
  assistantText: string;
}

export class ChatPanel {
  private readonly wrapper: Locator;
  private readonly assistantMessages: Locator;
  private readonly errorIndicators: Locator;

  constructor(private readonly page: Page) {
    this.wrapper = page.locator('#chat-wrapper');
    this.assistantMessages = this.wrapper.locator('[role="assistant"]');
    this.errorIndicators = this.wrapper.getByText(ERROR_TEXT_PATTERN);
  }

  async waitUntilVisible(): Promise<void> {
    await expect(this.wrapper).toBeVisible();
  }

  async waitForCustomerMessage(message: string): Promise<void> {
    const userMessage = this.wrapper.locator('[role="user"]').filter({ hasText: message });
    await expect(userMessage).toBeVisible({ timeout: TIMEOUTS.userMessageVisible });
  }

  async pollForOutcome(options: PollOptions = {}): Promise<ChatOutcome> {
    const { timeoutMs, intervalMs } = { ...DEFAULT_CHAT_OUTCOME_POLL, ...options };

    const outcome = await pollUntil(
      async () => ({
        assistantResponded: (await this.assistantMessages.count()) > 0,
        errorVisible: (await this.errorIndicators.count()) > 0,
        assistantText:
          (await this.assistantMessages.first().textContent())?.trim() ?? '',
      }),
      (result) => result.assistantResponded || result.errorVisible,
      {
        timeoutMs,
        intervalMs,
        timeoutMessage: `Timed out after ${timeoutMs}ms waiting for assistant reply or error in chat`,
      },
    );

    return outcome;
  }

  async assertUnassignedWhenEmailPatternMatches(
    customerIdentifier: string,
    outcome: ChatOutcome,
  ): Promise<void> {
    if (outcome.assistantResponded) {
      const conversationStillAssigned = ASSIGNED_REPLY_PATTERN.test(outcome.assistantText);

      await expect(
        conversationStillAssigned,
        `Expected unassignment for "${customerIdentifier}", but assistant replied: "${outcome.assistantText}"`,
      ).toBe(false);
      return;
    }

    await expect(
      outcome.errorVisible || !outcome.assistantResponded,
      `Expected no assistant reply or an error for "${customerIdentifier}" when email pattern matches`,
    ).toBe(true);
  }
}
