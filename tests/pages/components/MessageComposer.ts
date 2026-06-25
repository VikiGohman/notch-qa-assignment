import { expect, Locator, Page } from '@playwright/test';

export class MessageComposer {
  private readonly customerField: Locator;
  private readonly messageEditor: Locator;
  private readonly sendAsCustomerButton: Locator;

  constructor(private readonly page: Page) {
    this.customerField = page.getByPlaceholder(
      'e.g. mark@meta.com, you can keep it empty to test as a lead',
    );
    this.messageEditor = page.locator('[id^="quill-editor-message"] .ql-editor').first();
    this.sendAsCustomerButton = page.getByRole('button', { name: 'Send as customer' });
  }

  async fillCustomerIdentifier(identifier: string): Promise<void> {
    await expect(this.customerField).toBeVisible();
    await this.customerField.fill(identifier);
  }

  async composeAndSendAsCustomer(message: string): Promise<void> {
    await expect(this.messageEditor).toBeVisible();
    await this.messageEditor.click();
    await this.messageEditor.fill(message);
    await expect(this.sendAsCustomerButton).toBeEnabled();
    await this.sendAsCustomerButton.click();
  }
}
