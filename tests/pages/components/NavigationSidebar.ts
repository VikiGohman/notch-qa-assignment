import { Locator, Page } from '@playwright/test';
import { TIMEOUTS } from '../../support/timeouts';

export class NavigationSidebar {
  private readonly testsLink: Locator;

  constructor(private readonly page: Page) {
    this.testsLink = page.getByRole('link', { name: 'Tests' });
  }

  async waitUntilAuthenticated(): Promise<void> {
    await this.testsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.manualLogin });
  }

  async openTests(): Promise<void> {
    await this.testsLink.click();
  }
}
