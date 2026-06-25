import { test as base } from '@playwright/test';
import { GuardrailsPage } from '../pages/GuardrailsPage';
import { TestsPage } from '../pages/TestsPage';

type AppFixtures = {
  guardrailsPage: GuardrailsPage;
  testsPage: TestsPage;
};

export const test = base.extend<AppFixtures>({
  guardrailsPage: async ({ page }, use) => {
    await use(new GuardrailsPage(page));
  },

  testsPage: async ({ page }, use) => {
    await use(new TestsPage(page));
  },
});

export { expect } from '@playwright/test';
