---
name: slack
description: Interact with Slack workspaces - send messages, read channels, manage conversations, and search. Uses LaunchCode connections for credential resolution.
---

# Slack Skill (v2.0 — LaunchCode Creds)

Slack skill using **LaunchCode connections** for credential resolution via `creds.js`. No local credential files needed.

## Versions

| Version | Environment | Credential Source |
|---------|------------|-------------------|
| **v2.0** (current) | **Prod** | `~/.launchcode/credentials` → creds.js → LaunchCode API |
| v1.5 | Dev | `LAUNCHCODE_URL=... LAUNCHCODE_API_KEY=000000` env var override |

### v2.0 (Prod) — Current

Uses whatever LaunchCode credentials are configured in `~/.launchcode/credentials`. No hardcoded URLs or bypass keys.

### v1.5 (Dev) — Override

```bash
LAUNCHCODE_URL=https://rocketpartners.geloflix.com LAUNCHCODE_API_KEY=000000 \
  node ~/.claude/skills/slack/slack_api.js <<'EOF'
...
EOF
```

## Credential Resolution

Priority order:
1. **Env var override**: `SLACK_TOKEN` — skip creds.js entirely
2. **LaunchCode creds.js**: resolves `slack` provider → returns `SLACK_TOKEN`

### Multiple Slack profiles

If multiple connections exist, set `LAUNCHCODE_PROFILE`:

```bash
LAUNCHCODE_PROFILE=default node ~/.claude/skills/slack/slack_api.js <<'EOF'
...
EOF
```

## Scopes Reference

Minimum scopes for basic functionality:
- `channels:read` - List and view public channels
- `channels:history` - Read messages in public channels
- `chat:write` - Send messages
- `users:read` - View user info

Additional scopes for extended features:
- `groups:read`, `groups:history` - Private channels
- `im:read`, `im:history`, `im:write` - Direct messages
- `mpim:read`, `mpim:history` - Group DMs
- `reactions:write` - Add reactions
- `pins:read`, `pins:write` - Manage pins
- `bookmarks:read`, `bookmarks:write` - Manage bookmarks
- `files:read` - Access file info
- `users:read.email` - Look up users by email
- `search:read` - Search messages (user token only)
- `reminders:write`, `reminders:read` - Manage reminders

## Before You Start

Read only the type files relevant to your task:
- **Channels/history?** Read `types/channels.d.ts`
- **Sending messages?** Read `types/messages.d.ts`
- **Looking up users?** Read `types/users.d.ts`
- **Direct messages?** Read `types/dm.d.ts`
- **Searching?** Read `types/search.d.ts`
- **Files?** Read `types/files.d.ts`
- **Pins/bookmarks/reminders?** Read `types/misc.d.ts`

## Usage

Execute JavaScript code with the `slack` API object:

```bash
~/.claude/skills/slack/slack_api.js <<'EOF'
const { channels } = await slack.channels.list();
for (const ch of channels) {
  console.log(`#${ch.name}`);
}
EOF
```

## Quick Reference

### List Channels

```javascript
const { channels } = await slack.channels.list();
for (const ch of channels) {
  console.log(`#${ch.name} (${ch.id})`);
}
```

### Read Channel History

```javascript
const { messages } = await slack.channels.history('C01234567', { limit: 20 });
for (const msg of messages.reverse()) {
  console.log(`${msg.user}: ${msg.text}`);
}
```

### Send a Message

```javascript
await slack.messages.send('C01234567', 'Hello from the bot!');
```

### Reply in Thread

```javascript
await slack.messages.send('C01234567', 'Thread reply', {
  threadTs: '1234567890.123456'
});
```

### Send a DM

```javascript
await slack.dm.send('U01234567', 'Hello via DM!');
```

### DM by Email

```javascript
const { user } = await slack.users.lookupByEmail('john@example.com');
await slack.dm.send(user.id, 'Found you by email!');
```

### Add Reaction

```javascript
await slack.messages.react('C01234567', '1234567890.123456', 'thumbsup');
```

### Send to Channel by Name

```javascript
// Just pass the channel name directly - it resolves automatically
await slack.messages.send('general', 'Posted to #general');
await slack.messages.send('#engineering', 'Works with # prefix too');
```

**IMPORTANT:** Never manually look up channel IDs with `channels.list()`. All methods accept channel names directly and resolve them automatically. If you need the ID for some reason, use `slack.channels.resolve('channel-name')`.

### Get Thread Replies

```javascript
const { messages } = await slack.channels.replies('C01234567', '1234567890.123456');
console.log(`Thread has ${messages.length} messages`);
```

## API Summary

| API | Methods |
|-----|---------|
| `slack.channels` | `resolve(idOrName)`, `find(idOrName)`, `list(options?)`, `info(idOrName)`, `history(idOrName, options?)`, `replies(idOrName, ts, options?)`, `join(idOrName)`, `members(idOrName, options?)` |
| `slack.messages` | `send(channel, text, options?)`, `sendBlocks(channel, blocks, options?)`, `update(channel, ts, text, options?)`, `delete(channel, ts)`, `react(channel, ts, emoji)`, `unreact(channel, ts, emoji)`, `schedule(channel, text, postAt, options?)`, `listScheduled(options?)`, `deleteScheduled(channel, id)` |
| `slack.users` | `list(options?)`, `info(id)`, `lookupByEmail(email)`, `identity()`, `presence(id)` |
| `slack.dm` | `open(users)`, `send(userId, text, options?)` |
| `slack.search` | `messages(query, options?)`, `all(query, options?)` |
| `slack.files` | `list(options?)`, `info(id)`, `delete(id)` |
| `slack.bookmarks` | `list(channel)`, `add(channel, title, type, options?)`, `remove(channel, id)` |
| `slack.pins` | `list(channel)`, `add(channel, ts)`, `remove(channel, ts)` |
| `slack.reminders` | `add(text, time, options?)`, `list()`, `delete(id)`, `complete(id)` |

## Common Patterns

### Post Build Status

```javascript
const channel = 'C01234567'; // #deployments
const status = process.env.BUILD_STATUS || 'success';
const emoji = status === 'success' ? ':white_check_mark:' : ':x:';

await slack.messages.send(channel, `${emoji} Build ${status}: ${process.env.BUILD_URL || 'N/A'}`);
```

### Notify User with Fallback

```javascript
async function notifyUser(email, message) {
  try {
    const { user } = await slack.users.lookupByEmail(email);
    await slack.dm.send(user.id, message);
    return true;
  } catch (e) {
    console.error(`Could not notify ${email}: ${e.message}`);
    return false;
  }
}

await notifyUser('john@example.com', 'Your PR was merged!');
```

### Get Recent Activity in Channel

```javascript
const oneDayAgo = String(Math.floor(Date.now() / 1000) - 86400);
const { messages } = await slack.channels.history('C01234567', {
  oldest: oneDayAgo,
  limit: 200
});

console.log(`${messages.length} messages in the last 24 hours`);
const uniqueUsers = new Set(messages.map(m => m.user).filter(Boolean));
console.log(`${uniqueUsers.size} unique participants`);
```
