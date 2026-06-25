import { TEST_MESSAGES } from '../../support/constants';
import { resolveCustomerSenderEmail } from '../../support/helpers';
import { test } from '../../fixtures';

/**
 * Google auth is handled by `tests/global-setup.ts` (wired in `playwright.config.ts`).
 * Run with `npx playwright test` — no separate setup script is required.
 */
test.describe('Automation Audit — Email pattern unassignment', () => {
  /**
   * @precondition Patterns from `tests/support/test-data/guardio.dev.ts` (or `TEST_EMAIL_PATTERN_CASES`)
   *   must exist at `EMAIL_PATTERN_PRECONDITION` in `tests/support/constants.ts`.
   */
  test('conversation is unassigned when sender email matches a configured pattern', async ({
    guardrailsPage,
    testsPage,
  }, testInfo) => {
    const senderIndex = testInfo.retry;
    const customerEmail = resolveCustomerSenderEmail(senderIndex);

    testInfo.annotations.push({
      type: 'customer-sender-email',
      description: customerEmail,
    });

    await guardrailsPage.openAndWaitForAuthentication();
    await guardrailsPage.navigation.openTests();
    await testsPage.expectLoaded();
    await testsPage.openPlayground();

    await testsPage.sendCustomerMessage(customerEmail, TEST_MESSAGES.customerHi);

    const outcome = await testsPage.chat.pollForOutcome();
    await testsPage.chat.assertUnassignedWhenEmailPatternMatches(customerEmail, outcome);
  });
});
