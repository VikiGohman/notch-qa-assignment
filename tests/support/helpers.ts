import { getCustomerSenderEmails } from './test-data';

/**
 * Returns a sender email from the active environment's email-pattern cases.
 * @see `tests/support/test-data/` — defaults to `guardio.dev.ts`; override via `TEST_EMAIL_PATTERN_CASES`.
 */
export function resolveCustomerSenderEmail(index = 0): string {
  const senderEmails = getCustomerSenderEmails();
  const normalizedIndex =
    ((index % senderEmails.length) + senderEmails.length) % senderEmails.length;

  return senderEmails[normalizedIndex];
}

export interface PollUntilOptions {
  timeoutMs: number;
  intervalMs: number;
  timeoutMessage?: string;
}

export async function pollUntil<T>(
  evaluate: () => Promise<T>,
  isDone: (value: T) => boolean,
  options: PollUntilOptions,
): Promise<T> {
  const {
    timeoutMs,
    intervalMs,
    timeoutMessage = 'Polling timed out before condition was met',
  } = options;

  let latest = await evaluate();
  if (isDone(latest)) {
    return latest;
  }

  // Timeout starts after the initial evaluation so a tight deadline cannot
  // throw before the first intervalMs wait has elapsed at least once.
  const deadline = Date.now() + timeoutMs;

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    latest = await evaluate();

    if (isDone(latest)) {
      return latest;
    }

    if (Date.now() >= deadline) {
      throw new Error(timeoutMessage);
    }
  }
}
