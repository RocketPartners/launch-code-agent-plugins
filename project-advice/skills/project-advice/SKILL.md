---
name: project-advice
description: Handles advice surfaced by the project-advice hook. Defines how to present advice, handle user responses (show more/got it/dismiss), and save new advice. Do not invoke manually.
---

# Project Advice — Response Rules

The UserPromptSubmit hook automatically searches for and surfaces relevant team
advice. When you see hook output starting with 💡, follow these rules.

## Scratchpad

Maintain in working memory for the session:

\`\`\`
<!-- ADVICE_SCRATCHPAD
git_remote: null
surfaced: []
dismissed: []
-->
\`\`\`

## Session Start (Silent)

Read \`~/.launchcode/tenants/{tenant}/project-context.json\` (tenant from
\`$LAUNCHCODE_TENANT\` or \`~/.launchcode/credentials\` under \`[default]\`).
Store \`git_remote\` in scratchpad. Say nothing.

## When Hook Surfaces Advice

When you see a 💡 message from the hook with an \`advice_id\`:

1. Check if the \`advice_id\` is in scratchpad \`surfaced\` or \`dismissed\` — if so, ignore silently
2. Present the advice to the user exactly as the hook formatted it
3. Add the \`advice_id\` to scratchpad \`surfaced\`
4. Handle the user's response:
   - **"show more"**, "expand", "details" → call \`search_advice\` with the advice_id to get full content, display it, then continue
   - **"got it"**, "ok", "sure", "yeah", "thanks" → acknowledge briefly, keep working. Stays in scratchpad only (may appear in future sessions)
   - **"dismiss"**, "not relevant", "skip", "nah" → write dismissal to data table:
     \`\`\`bash
     ~/.launchcode/scripts/api.js <<'DISMISS'
     await api.tables.docs.put('advice_dismissals', '{advice_id}', { advice_id: '{advice_id}', dismissed_at: new Date().toISOString() });
     DISMISS
     \`\`\`
     Move to scratchpad \`dismissed\`. Permanent — never shown again.

## When a Problem Resolves

**Triggers:** "that worked", "it's working", "finally", "nice", or failing tests now pass.

1. Ask **once**: "Want to save this as advice for the team?"
2. If yes → call \`store_advice\` with title, content, summary, tags, git_remote from scratchpad, session_id from \`$CLAUDE_SESSION_ID\`
3. If no → don't ask again this session

## Hard Rules

- **NEVER surface an advice_id already in scratchpad \`surfaced\` or \`dismissed\`**
- **ALWAYS attribute**: "@{user_name} left advice..." — never anonymous
- **Max ONE advice per hook trigger** — the hook handles this
- **NEVER announce** "no advice found" — if hook outputs nothing, say nothing
- **NEVER surface advice more than twice total in a session** unless user asks for more
