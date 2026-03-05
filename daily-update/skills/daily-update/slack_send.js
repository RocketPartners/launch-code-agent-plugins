#!/usr/bin/env node
/**
 * Minimal Slack API — send messages only.
 * Auth via LaunchCode connections.
 */

import { homedir } from 'os';
import { join } from 'path';
import { execFileSync } from 'child_process';

// ============================================================================
// CREDENTIALS
// ============================================================================

let token;
if (process.env.SLACK_TOKEN || process.env.SLACK_API_KEY) {
  token = (process.env.SLACK_TOKEN || process.env.SLACK_API_KEY).trim();
} else {
  try {
    const out = execFileSync('node', [join(homedir(), '.launchcode', 'scripts', 'creds.js'), 'slack', '--json'], {
      encoding: 'utf8', stdio: ['pipe', 'pipe', 'inherit']
    });
    const env = JSON.parse(out);
    token = env.SLACK_TOKEN || env.SLACK_API_KEY;
  } catch {
    console.error('Slack not connected. Add a Slack connection in LaunchCode.');
    process.exit(1);
  }
}

// ============================================================================
// HTTP
// ============================================================================

async function request(method, endpoint, body = null, queryParams = null) {
  let url = `https://slack.com/api/${endpoint}`;
  if (queryParams) {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(queryParams)) {
      if (v !== undefined && v !== null) params.append(k, String(v));
    }
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  }
  const options = {
    method,
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json; charset=utf-8' }
  };
  if (body && method !== 'GET') options.body = JSON.stringify(body);
  const response = await fetch(url, options);
  const data = await response.json();
  if (!data.ok) throw new Error(`Slack API error (${endpoint}): ${data.error}`);
  return data;
}

// ============================================================================
// CHANNEL RESOLVER
// ============================================================================

const channelCache = new Map();

async function resolveChannel(channelOrName) {
  if (/^[CDG][A-Z0-9]+$/.test(channelOrName)) return channelOrName;
  const name = channelOrName.replace(/^#/, '');
  if (channelCache.has(name)) return channelCache.get(name);

  let cursor;
  do {
    const result = await request('GET', 'conversations.list', null, {
      types: 'public_channel,private_channel',
      exclude_archived: true, limit: 200, cursor
    });
    const match = result.channels.find(c => c.name === name);
    if (match) {
      channelCache.set(name, match.id);
      return match.id;
    }
    cursor = result.response_metadata?.next_cursor;
  } while (cursor);

  throw new Error(`Channel not found: #${name}. Make sure the bot has been invited.`);
}

// ============================================================================
// API
// ============================================================================

const slack = {
  send: async (channel, text) => {
    const channelId = await resolveChannel(channel);
    return request('POST', 'chat.postMessage', { channel: channelId, text, mrkdwn: true });
  },
  resolveChannel
};

// ============================================================================
// EXECUTE
// ============================================================================

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const code = Buffer.concat(chunks).toString('utf-8');
  if (!code.trim()) { console.error('No code provided via stdin'); process.exit(1); }
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  await new AsyncFunction('slack', code)(slack);
}

main().catch(err => { console.error(err.message); process.exit(1); });
