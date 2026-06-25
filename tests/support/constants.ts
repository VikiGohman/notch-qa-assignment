export const ROUTES = {
  guardrails: '/config/guardrails',
  tests: '/tests',
} as const;

/** Where unassign rules are configured in the app UI. */
export const EMAIL_PATTERN_PRECONDITION = {
  configPath: ROUTES.guardrails,
  section: 'Automation Audit → Email patterns to unassign',
} as const;

export const TEST_MESSAGES = {
  customerHi: 'hi',
} as const;
