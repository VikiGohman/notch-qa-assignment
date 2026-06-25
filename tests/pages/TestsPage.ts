import { expect, Page } from '@playwright/test';
import { ROUTES } from '../support/constants';
import { BasePage } from './BasePage';
import { ChatPanel } from './components/ChatPanel';
import { MessageComposer } from './components/MessageComposer';
import { PlaygroundPanel } from './components/PlaygroundPanel';

export class TestsPage extends BasePage {
  readonly playground: PlaygroundPanel;
  readonly composer: MessageComposer;
  readonly chat: ChatPanel;

  constructor(page: Page) {
    super(page);
    this.playground = new PlaygroundPanel(page);
    this.composer = new MessageComposer(page);
    this.chat = new ChatPanel(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(ROUTES.tests));
  }

  async openPlayground(): Promise<void> {
    await this.playground.open();
  }

  async sendCustomerMessage(identifier: string, message: string): Promise<void> {
    await this.composer.fillCustomerIdentifier(identifier);
    await this.composer.composeAndSendAsCustomer(message);
    await this.chat.waitUntilVisible();
    await this.chat.waitForCustomerMessage(message);
  }
}
