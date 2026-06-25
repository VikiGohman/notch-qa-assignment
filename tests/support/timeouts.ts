export const TIMEOUTS = {
  manualLogin: 120_000,
  assistantResponse: 45_000,
  pollInterval: 1_000,
  userMessageVisible: 30_000,
} as const;

export interface PollOptions {
  /** Max time to wait for assistant reply or error. Default: `TIMEOUTS.assistantResponse`. */
  timeoutMs?: number;
  /** Delay between polls. Default: `TIMEOUTS.pollInterval`. */
  intervalMs?: number;
}

export const DEFAULT_CHAT_OUTCOME_POLL = {
  timeoutMs: TIMEOUTS.assistantResponse,
  intervalMs: TIMEOUTS.pollInterval,
} satisfies Required<PollOptions>;
