import path from 'path';

export const AUTH_DIR = path.join(process.cwd(), 'playwright', '.auth');
export const STORAGE_STATE_PATH = path.join(AUTH_DIR, 'user.json');
export const CHROME_PROFILE_DIR = path.join(AUTH_DIR, 'chrome-profile');

export const BASE_URL = 'https://guardio.app.getnotch.dev';
export const GUARDRAILS_URL = `${BASE_URL}/config/guardrails`;

/** Chrome launch options that reduce Google "browser may not be secure" blocks. */
export const STEALTH_LAUNCH_OPTIONS = {
  args: ['--disable-blink-features=AutomationControlled'],
  ignoreDefaultArgs: ['--enable-automation'],
};
