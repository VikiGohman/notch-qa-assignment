import type { EmailPatternCase } from './types';

/**
 * Fixture data for the Guardio DEV tenant (`guardio.app.getnotch.dev`).
 * Patterns must already exist under Config → Guardrails → Email patterns to unassign.
 */
export const GUARDIO_DEV_EMAIL_PATTERN_CASES: readonly EmailPatternCase[] = [
  { pattern: 'tovv', senderEmail: 'tovv123@xyz.com' },
  { pattern: 'ofri@gmail.com', senderEmail: 'ofri@gmail.com' },
];
