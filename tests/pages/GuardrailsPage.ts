import { Page } from '@playwright/test';
import { ROUTES } from '../support/constants';
import { BasePage } from './BasePage';
import { NavigationSidebar } from './components/NavigationSidebar';

export class GuardrailsPage extends BasePage {
  readonly navigation: NavigationSidebar;

  constructor(page: Page) {
    super(page);
    this.navigation = new NavigationSidebar(page);
  }

  async openAndWaitForAuthentication(): Promise<void> {
    await this.goto(ROUTES.guardrails);
    await this.navigation.waitUntilAuthenticated();
  }
}
