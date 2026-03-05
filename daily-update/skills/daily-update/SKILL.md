---
name: daily-update
description: >
  Auto-detect daily work (PRs, in-progress items) and send a formatted update to Slack.
  Reads git history, GitHub PRs, and Obsidian work item files to build the update.
---

# Daily Update

Send a daily work status update to a Slack channel. Auto-detects what you worked on today.

## When to Use

When the user says "send daily update", "daily standup", "send update to slack", or "what did I work on today".

## How It Works

1. **Auto-detect repo** from current working directory (`git remote get-url origin`)
2. **Gather PRs** authored by the user today via `gh pr list`
3. **Read Obsidian work items** from `~/Documents/Obsidian Vault/LaunchCode/` — files with frontmatter `status` field
4. **Build the update message** organized by status
5. **Ask which Slack channel** to send to
6. **Show draft** for confirmation
7. **Send** via the bundled Slack API

## Data Sources

### GitHub PRs
```bash
gh pr list --author @me --state all --json number,title,url,state,isDraft,createdAt,mergedAt,labels
```

For each PR, extract:
- **Title** and **URL**
- **Status**: merged, approved/ready-for-review, in-review (draft), open
- **Nature**: infer from title prefix or labels (fix, feat, refactor, chore)

### Obsidian Work Items
Read `.md` files from `~/Documents/Obsidian Vault/LaunchCode/` recursively. Parse YAML frontmatter for:
- `status`: draft, in-progress, in-review, merged, done
- `pr`: PR link (to cross-reference with GitHub data)
- `date`: when the work was done
- `tags`: for categorization

Include items where:
- `status` is `in-progress` or `in-review` (active work)
- `date` matches today
- Has no PR link (work not yet in a PR)

### Git Worktrees
```bash
git worktree list
```

For each worktree on a non-main branch:
- Check commits ahead of main: `git -C <worktree-path> log --oneline main..HEAD`
- Check for a matching PR: `gh pr list --head <branch-name> --json number,title,url,state,isDraft`
- Cross-reference with Obsidian work items by PR URL

Include active worktrees (commits ahead > 0) as work items even if they weren't touched today — they represent in-flight work.

### Git Log (fallback context)
```bash
git log --oneline --since="midnight" --author="$(git config user.name)"
```

## Message Format

The Slack message should use this structure:

```
*Daily Update — <repo name> — <date>*

*Ready for Review*
• *<PR title>* (<PR link>)
  <problem description — 2-3 lines explaining what was broken and why, written so someone unfamiliar can understand>

*In Progress*
• *<PR title>* (<PR link>)
  <problem description>

*Merged Today*
• *<PR title>* (<PR link>)

*Other*
• <non-PR work — tooling, skills, infra, etc.>
```

### Problem Descriptions

Each active item (Ready for Review, In Progress) MUST include a short problem description below the title. This is the most important part — it tells the team *what was actually wrong*, not just *what files changed*.

**Good example:**
```
• *Fix: Slug availability checking on agents/new and tables/new* (#110)
  agents/new returned "unable to check availability" instead of a green checkmark.
  tables/new had no visual validation at all — no checkmark, no spinner.
  Both were inconsistent with plugins/new which worked correctly.
```

**Bad example (too vague):**
```
• *Fix: Slug availability checking on agents/new and tables/new* (#110)
  Fixed slug checking on two pages.
```

**Where to get the description:**
1. **Obsidian work item** — read the `## Problem` section. This is the best source.
2. **PR body** — look for a Goal or Problem section.
3. **Commit messages** — piece together the "why" from commit history.
4. **Ask the user** — if none of the above exist, ask before sending.

The description should read like how you'd explain it to a teammate:
- Name the specific pages/features affected
- Describe what the user saw (the symptom)
- Contrast with expected behavior or a working reference
- 2-3 lines max, no jargon

### Other Rules
- Skip empty sections
- Bold section headers with Slack markdown (`*bold*`)
- Use bullet points (`•`) with indented description lines
- "Other" section is for non-PR work (tooling, skills, plugin fixes) — one-liners are fine here
- "Merged Today" items don't need descriptions (they're done)

## Sending to Slack

Use the bundled `slack_send.js` script:

```bash
skills/daily-update/slack_send.js <<'EOF'
await slack.send('channel-name', `message text`);
EOF
```

The script uses LaunchCode connections for auth (`~/.launchcode/scripts/creds.js slack`).

## Flow

1. Run the detection commands (git, gh, obsidian reads) in parallel
2. Build the categorized update
3. If no work detected, tell the user "Nothing found for today"
4. Show the draft message to the user
5. Ask: "Send to which Slack channel?" (or use channel from args if provided)
6. On confirmation, send via `slack_send.js`
7. Report success with link to channel
