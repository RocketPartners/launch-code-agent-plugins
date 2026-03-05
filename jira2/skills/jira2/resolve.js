/**
 * Shared credential resolver for LaunchCode connections.
 *
 * Wraps ~/.launchcode/scripts/creds.js with a clean API.
 * Import from any provider file:
 *   import { resolve, requireResolve } from './resolve.js';
 */

import { execSync } from 'child_process';
import { homedir } from 'os';
import { join } from 'path';

/**
 * Resolve credentials for a provider via creds.js.
 * Returns { status: 'ok', data } | { status: 'needs_profile', profiles } | { status: 'error', message }
 */
export function resolve(provider, profile) {
  const credsPath = join(homedir(), '.launchcode', 'scripts', 'creds.js');
  const args = [provider, profile, '--json'].filter(Boolean).join(' ');
  const cmd = `node ${credsPath} ${args}`;

  // Strip LAUNCHCODE_PROFILE from child env — profile is passed as positional arg
  const env = { ...process.env };
  delete env.LAUNCHCODE_PROFILE;

  try {
    const out = execSync(cmd, { encoding: 'utf8', env, stdio: ['pipe', 'pipe', 'pipe'] });
    return { status: 'ok', data: JSON.parse(out.trim()) };
  } catch (e) {
    if (e.status === 2) {
      return { status: 'needs_profile', profiles: JSON.parse(e.stdout.trim()).profiles };
    }
    return { status: 'error', message: e.stderr || e.message };
  }
}

/**
 * Resolve credentials or throw with a helpful message.
 * Use this when you need credentials and can't proceed without them.
 */
export function requireResolve(provider, profile) {
  const result = resolve(provider, profile || process.env.LAUNCHCODE_PROFILE || null);
  if (result.status === 'needs_profile') {
    const list = result.profiles.map(p => {
      const hint = p.hint ? ` (${p.hint})` : '';
      return `  ${p.profile_name} [${p.connection_type}]${hint}`;
    }).join('\n');
    throw new Error(`Multiple ${provider} profiles found. Set LAUNCHCODE_PROFILE to choose:\n${list}`);
  }
  if (result.status === 'error') {
    throw new Error(`Failed to resolve ${provider} credentials via creds.js: ${result.message}`);
  }
  return result.data;
}

/**
 * Resolve credentials, or print structured JSON and exit(2) on multiple profiles.
 * Designed for provider scripts so Claude Code can parse the output and prompt the user.
 *
 * On needs_profile: prints JSON to stdout and calls process.exit(2).
 * On error: prints error to stderr and calls process.exit(1).
 * On success: returns the env vars object.
 */
export function resolveOrExit(provider, profile) {
  const result = resolve(provider, profile || process.env.LAUNCHCODE_PROFILE || null);
  if (result.status === 'needs_profile') {
    console.log(JSON.stringify({
      status: 'needs_profile',
      provider,
      profiles: result.profiles
    }));
    process.exit(2);
  }
  if (result.status === 'error') {
    console.error(`Failed to resolve ${provider} credentials: ${result.message}`);
    process.exit(1);
  }
  return result.data;
}
