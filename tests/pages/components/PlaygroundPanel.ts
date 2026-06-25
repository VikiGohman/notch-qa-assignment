import { expect, Locator, Page } from '@playwright/test';

export class PlaygroundPanel {
  private readonly playgroundLink: Locator;

  constructor(private readonly page: Page) {
    this.playgroundLink = page.getByRole('link', { name: 'Playground' });
  }

  async open(): Promise<void> {
    await expect(this.playgroundLink).toBeVisible();
    await this.playgroundLink.click();
    await expect(this.page).toHaveURL(/\/conversations\/inbox\/playground\//);
  }
}
