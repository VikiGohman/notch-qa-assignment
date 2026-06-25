import { AuthService } from './support/auth.service';

/**
 * Ensures a saved Google session exists before any test runs.
 * Wired from `playwright.config.ts` — do not run manually.
 */
export default async function globalSetup(): Promise<void> {
  const forceLogin = process.env.FORCE_AUTH_LOGIN === '1';
  await new AuthService().ensureAuthenticated({ forceLogin });
}
