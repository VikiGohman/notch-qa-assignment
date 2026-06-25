import { AuthService } from '../tests/support/auth.service';

async function main(): Promise<void> {
  await new AuthService().ensureAuthenticated({ forceLogin: true });
  console.log('Session refreshed. Run `npm test` or `npx playwright test`.\n');
}

main().catch((error: unknown) => {
  console.error('Login failed:', error);
  process.exit(1);
});
