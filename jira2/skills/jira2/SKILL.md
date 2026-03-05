---
name: jira2
description: "Jira skill using LaunchCode creds.js for credential resolution. POC for LaunchCode skills with abstracted credentials."
---

# Jira Skill (v2 — LaunchCode Creds)

Jira skill that uses **LaunchCode connections** for credential resolution instead of local `~/.jira/credentials` files. Proof-of-concept for how LaunchCode skills can abstract credentials via `creds.js`, removing the need for skills to manage their own credential storage.

## Versions

| Version | Environment | Credential Source |
|---------|------------|-------------------|
| **v2.0** (current) | **Prod** | `~/.launchcode/credentials` → creds.js → LaunchCode API |
| v1.5 | Dev | Hardcoded `LAUNCHCODE_URL=https://rocketpartners.geloflix.com LAUNCHCODE_API_KEY=000000` |

### v2.0 (Prod) — Current

Uses whatever LaunchCode credentials are configured in `~/.launchcode/credentials`. No hardcoded URLs or bypass keys. This is what ships.

### v1.5 (Dev) — Override

To use the dev instance, set env vars before invoking:

```bash
LAUNCHCODE_URL=https://rocketpartners.geloflix.com LAUNCHCODE_API_KEY=000000 \
  LAUNCHCODE_PROFILE=test node ~/.claude/skills/jira2/jira_api.js <<'EOF'
...
EOF
```

The v1.5 dev bypass works because `creds.js` checks `LAUNCHCODE_URL`/`LAUNCHCODE_API_KEY` env vars before reading the credentials file. No code change needed — same binary, different env.

## How It Works — Credential Abstraction

The skill never touches credentials directly. It delegates to `creds.js`, which resolves them from LaunchCode's connection API. The skill only sees the final `jira` object with authenticated methods.

```
LAUNCHCODE_PROFILE=test node jira_api.js <<'EOF' ... EOF
│
├─ getCredentials()
│  │
│  ├─ 1. Check env var overrides (JIRA_URL + JIRA_API_KEY or JIRA_TOKEN)
│  │     → if present, return immediately (skip creds.js)
│  │
│  └─ 2. resolveOrExit('atlassian')
│        │
│        │  cmd: node ~/.launchcode/scripts/creds.js atlassian test --json
│        │  env: LAUNCHCODE_URL + LAUNCHCODE_API_KEY (LAUNCHCODE_PROFILE stripped)
│        │
│        └─ execSync(cmd, { env })
│           │
│           │  creds.js internals:
│           │  ├─ parseArgs() → provider="atlassian", profile="test"
│           │  ├─ ENV_KEY_MAP check → ATLASSIAN_* not in env → skip
│           │  ├─ loadCredentials() → resolve LaunchCode API url + key
│           │  └─ resolveProvider(baseUrl, apiKey, "atlassian", "test")
│           │       └─ GET /api/connections/resolve/atlassian?profile=test
│           │
│           ├─ exit 0 → {"ATLASSIAN_URL":"...","ATLASSIAN_EMAIL":"...","ATLASSIAN_API_KEY":"..."}
│           ├─ exit 2 → {"status":"needs_profile","profiles":[...]}
│           └─ exit 1 → error
│
├─ Map ATLASSIAN_* → internal creds:
│  ├─ ATLASSIAN_TOKEN → { authType: "bearer", token }
│  └─ ATLASSIAN_URL/EMAIL/API_KEY → { authType: "basic", email, apiKey }
│
├─ request(method, path, body)
│  ├─ bearer → Authorization: Bearer <token>
│  └─ basic  → Authorization: Basic <base64(email:apiKey)>
│  └─ fetch(baseUrl + path, options)
│
└─ Execute user code from stdin with authenticated `jira` object
```

**What this abstracts:** The skill has zero knowledge of where credentials are stored, how OAuth tokens are refreshed, or how to manage credential files. All of that is handled by LaunchCode connections + `creds.js`. Skills just declare which provider they need (`atlassian`) and get back ready-to-use env vars.

**What this does NOT abstract:** Credentials still pass through the process as strings (creds.js stdout → jira_api.js memory). This is not a security boundary hiding secrets from Claude Code — if Claude ran `creds.js --json` directly, it would see the raw values. The abstraction is about **skill simplicity**, not secret isolation.

## Credential Resolution

Priority order:
1. **Env var overrides**: `JIRA_URL` + `JIRA_API_KEY` or `JIRA_TOKEN` — skip creds.js entirely
2. **LaunchCode creds.js**: resolves `atlassian` provider, maps `ATLASSIAN_*` → `JIRA_*`

Supports both **Basic Auth** (API key connections) and **Bearer Auth** (OAuth2 connections).

### Multiple Atlassian profiles

If multiple connections exist, set `LAUNCHCODE_PROFILE` to choose:

```bash
LAUNCHCODE_PROFILE=test node ~/.claude/skills/jira2/jira_api.js <<'EOF'
...
EOF
```

Without it, the script exits with code 2 and prints structured JSON to stdout:
```json
{"status":"needs_profile","provider":"atlassian","profiles":[...]}
```
When you see exit code 2, parse the JSON, use AskUserQuestion to let the user pick a profile, then retry with `LAUNCHCODE_PROFILE=<chosen>` set.

## Before You Start

Read only the type files relevant to your task:
- **Searching/viewing issues?** Read `types/issues.d.ts`
- **Listing projects?** Read `types/projects.d.ts`
- **Looking up users?** Read `types/users.d.ts`
- **Finding custom fields?** Read `types/fields.d.ts`

## Usage

Simple query:

```bash
node ~/.claude/skills/jira2/jira_api.js <<'EOF'
const result = await jira.issues.search('assignee = currentUser() ORDER BY updated DESC', { maxResults: 5 });
for (const issue of result.issues) {
  console.log(`${issue.key}: ${issue.fields.summary}`);
}
EOF
```

Multiple operations:

```bash
node ~/.claude/skills/jira2/jira_api.js <<'EOF'
const result = await jira.issues.search(
  'assignee = currentUser() AND type = Bug AND priority = High AND status != Done'
);

for (const issue of result.issues) {
  const { transitions } = await jira.issues.getTransitions(issue.key);
  const inProgress = transitions.find(t => t.name === 'In Progress');

  console.log(`${issue.key}: ${issue.fields.summary}`);
  console.log(`  Status: ${issue.fields.status.name}`);
  console.log(`  Can transition to In Progress: ${inProgress ? 'yes' : 'no'}`);
  console.log('');
}
EOF
```

## Quick Reference

### List Projects

```javascript
const result = await jira.projects.list();
for (const p of result.values) {
  console.log(`${p.key}: ${p.name}`);
}
```

### Search Issues (JQL)

```javascript
const result = await jira.issues.search('project = PROJ AND status != Done ORDER BY updated DESC');
for (const issue of result.issues) {
  console.log(`${issue.key}: ${issue.fields.summary} [${issue.fields.status.name}]`);
}
```

Common JQL:
- `assignee = currentUser()` - Your issues
- `project = PROJ` - All in project
- `status = "In Progress"` - By status
- `type = Bug AND priority = High` - Filter combos
- `updated >= -7d` - Recent activity

### Get Issue Details

```javascript
const issue = await jira.issues.get('PROJ-123');
console.log(JSON.stringify(issue.fields, null, 2));
```

### Update Issue

```javascript
await jira.issues.update('PROJ-123', {
  summary: 'Updated title',
  priority: { name: 'High' },
  labels: ['backend', 'urgent']
});
```

### Transition Issue

```javascript
const { transitions } = await jira.issues.getTransitions('PROJ-123');
const done = transitions.find(t => t.name === 'Done');
if (done) {
  await jira.issues.transition('PROJ-123', done.id);
}
```

## API Summary

| API | Methods |
|-----|---------|
| `jira.projects` | `list(options?)`, `get(key, options?)` |
| `jira.issues` | `search(jql, options?)`, `get(key, options?)`, `update(key, fields)`, `updateWithOperations(key, ops)`, `getTransitions(key)`, `transition(key, id, fields?)`, `getEditMeta(key)` |
| `jira.users` | `search(query, options?)`, `assignable(project, options?)` |
| `jira.fields` | `list()` |
