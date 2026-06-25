import type { EmailPatternCase } from './types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function validateEmailPatternCases(value: unknown): readonly EmailPatternCase[] {
  if (!Array.isArray(value)) {
    throw new Error('TEST_EMAIL_PATTERN_CASES must be a JSON array');
  }

  if (value.length === 0) {
    throw new Error('TEST_EMAIL_PATTERN_CASES must include at least one case');
  }

  return value.map((item, index) => {
    if (!isRecord(item)) {
      throw new Error(`TEST_EMAIL_PATTERN_CASES[${index}] must be an object`);
    }

    const { pattern, senderEmail } = item;

    if (typeof pattern !== 'string' || pattern.trim() === '') {
      throw new Error(`TEST_EMAIL_PATTERN_CASES[${index}].pattern must be a non-empty string`);
    }

    if (typeof senderEmail !== 'string' || senderEmail.trim() === '') {
      throw new Error(
        `TEST_EMAIL_PATTERN_CASES[${index}].senderEmail must be a non-empty string`,
      );
    }

    return { pattern, senderEmail };
  });
}

export function parseEmailPatternCasesFromEnv(raw: string): readonly EmailPatternCase[] {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`TEST_EMAIL_PATTERN_CASES must be valid JSON: ${message}`);
  }

  return validateEmailPatternCases(parsed);
}
