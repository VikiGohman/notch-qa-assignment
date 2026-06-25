import { defineConfig } from '@playwright/test';
import {
  BASE_URL,
  STEALTH_LAUNCH_OPTIONS,
  STORAGE_STATE_PATH,
} from './tests/support/auth.config';

export default defineConfig({
  testDir: './tests/specs',
  globalSetup: require.resolve('./tests/global-setup'),
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 180_000,
  expect: {
    timeout: 60_000,
  },
  reporter: 'list',
  use: {
    baseURL: BASE_URL,
    headless: false,
    channel: 'chrome',
    storageState: STORAGE_STATE_PATH,
    viewport: { width: 1440, height: 900 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
    launchOptions: STEALTH_LAUNCH_OPTIONS,
  },
});
