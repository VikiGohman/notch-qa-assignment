import fs from 'fs';
import { chromium, type BrowserContext } from 'playwright';
import {
  AUTH_DIR,
  CHROME_PROFILE_DIR,
  GUARDRAILS_URL,
  STEALTH_LAUNCH_OPTIONS,
  STORAGE_STATE_PATH,
} from './auth.config';

export class AuthService {
  async ensureAuthenticated(options: { forceLogin?: boolean } = {}): Promise<void> {
    fs.mkdirSync(AUTH_DIR, { recursive: true });

    if (!options.forceLogin && (await this.hasValidSession())) {
      console.log('Using saved Google session.\n');
      return;
    }

    await this.performManualLogin();
  }

  private async hasValidSession(): Promise<boolean> {
    if (!fs.existsSync(STORAGE_STATE_PATH)) {
      return false;
    }

    const browser = await chromium.launch({
      channel: 'chrome',
      headless: true,
      ...STEALTH_LAUNCH_OPTIONS,
    });

    try {
      const context = await browser.newContext({
        storageState: STORAGE_STATE_PATH,
      });
      const page = await context.newPage();

      await page.goto(GUARDRAILS_URL);
      await page.getByRole('link', { name: 'Tests' }).waitFor({
        state: 'visible',
        timeout: 20_000,
      });

      await context.close();
      return true;
    } catch {
      console.log('Saved session expired or invalid — Google login required.\n');
      return false;
    } finally {
      await browser.close();
    }
  }

  private async performManualLogin(): Promise<void> {
    const context = await chromium.launchPersistentContext(CHROME_PROFILE_DIR, {
      channel: 'chrome',
      headless: false,
      viewport: { width: 1440, height: 900 },
      ...STEALTH_LAUNCH_OPTIONS,
    });

    try {
      const page = context.pages()[0] ?? (await context.newPage());

      console.log('\nOpening Notch in Google Chrome…');
      console.log('Sign in with Google in the browser window.');
      console.log('Playwright starts tests once the Tests link appears.\n');

      await page.goto(GUARDRAILS_URL);
      await page.getByRole('link', { name: 'Tests' }).waitFor({
        state: 'visible',
        timeout: 300_000,
      });

      await this.saveSession(context);
      console.log(`\nLogin saved to ${STORAGE_STATE_PATH}`);
    } finally {
      await context.close();
    }
  }

  private async saveSession(context: BrowserContext): Promise<void> {
    await context.storageState({ path: STORAGE_STATE_PATH });
  }
}
