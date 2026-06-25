import { GUARDIO_DEV_EMAIL_PATTERN_CASES } from './guardio.dev';
import { parseEmailPatternCasesFromEnv } from './parse-env';
import type { EmailPatternCase } from './types';

/**
 * Returns email-pattern cases for the active test environment.
 * Override with `TEST_EMAIL_PATTERN_CASES` (JSON array of `{ pattern, senderEmail }`).
 */
export function getEmailPatternCases(): readonly EmailPatternCase[] {
  const raw = process.env.TEST_EMAIL_PATTERN_CASES;

  if (raw) {
    return parseEmailPatternCasesFromEnv(raw);
  }

  return GUARDIO_DEV_EMAIL_PATTERN_CASES;
}

export function getCustomerSenderEmails(): readonly string[] {
  return getEmailPatternCases().map(({ senderEmail }) => senderEmail);
}
