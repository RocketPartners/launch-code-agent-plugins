# Skill: Commit with Context

**When to use:** When committing code changes that need clear intention preserved for cross-timezone team handoffs, code reviews, or future reference.

**What this skill does:** Guides you through capturing work intention in git commits by prompting for problem/approach/status/next steps, then generates structured commit messages that answer "why" not just "what."

**Trigger phrases:** This skill is relevant when you encounter:
- "create a commit with context"
- "commit with handoff notes"
- "contextual commit"
- "commit for team handoff"
- "structured commit message"
- "commit with work state"

---

## Quick Navigation

### Getting Started
- [Getting Started Guide](docs/GETTING_STARTED.md) - Prerequisites, setup, first commit
- [Quick Start Checklist](docs/GETTING_STARTED.md#quick-start) - 5-minute first use

### Core Guides
- [Usage Guide](docs/USAGE.md) - Step-by-step workflow for creating contextual commits
- [Commit Templates](docs/TEMPLATES.md) - Templates for features, fixes, WIP, blocked work
- [Examples](docs/EXAMPLES.md) - Real-world examples of effective commit messages
- [Workflows](docs/WORKFLOWS.md) - Integrating with daily workflows and PR processes

### Troubleshooting
- [Common Issues](docs/TROUBLESHOOTING.md) - Top problems and solutions
- [FAQ](docs/TROUBLESHOOTING.md#faq) - Frequently asked questions

### Advanced Topics
- [Advanced Usage](docs/ADVANCED.md) - Customization, team conventions, automation

---

## Critical Success Factors

Top 10 most important points for effective contextual commits:

1. **Explain Why, Not Just What** - Focus on the problem you're solving and the reasoning behind your approach
2. **Capture Work State** - Always indicate if work is complete, WIP, or blocked so the next person knows where to start
3. **Document Next Steps** - Tell future you (or teammates) what needs to happen next
4. **Include Debugging Insights** - Note any gotchas or discoveries that aren't obvious from the code
5. **Use Present Tense** - Write commit summaries in imperative mood (e.g., "Fix bug" not "Fixed bug")
6. **Keep Summary Under 50 Chars** - First line should be scannable in git log
7. **Add Context in Body** - Use the commit body for details, never cram everything into the summary
8. **Flag Stopping Points** - Indicate if this is a good handoff point vs. mid-work
9. **Reference Issues/Tickets** - Link to relevant context (e.g., "Fixes #123" or "See ticket ABC-456")
10. **Be Specific About Problems** - "Fix cart calculation" is better than "Fix bug"

---

## When to Use Each Document

| Scenario | Document |
|----------|----------|
| I'm using this skill for the first time | [Getting Started](docs/GETTING_STARTED.md) |
| I need to create a contextual commit now | [Usage Guide](docs/USAGE.md) |
| What template should I use for my type of change? | [Commit Templates](docs/TEMPLATES.md) |
| Show me examples of good commit messages | [Examples](docs/EXAMPLES.md) |
| How do I integrate this into my daily workflow? | [Workflows](docs/WORKFLOWS.md) |
| I got an error or something isn't working | [Troubleshooting](docs/TROUBLESHOOTING.md) |
| I want to customize for my team | [Advanced Usage](docs/ADVANCED.md) |

---

## Skill Workflow Overview

When you invoke this skill, here's what happens:

1. **Analysis** - The skill analyzes your staged changes using `git status` and `git diff --staged`
2. **Context Gathering** - You're prompted for:
   - What problem are you solving?
   - What approach did you take?
   - Work state: Complete / WIP / Blocked?
   - What should the next person know?
   - Any gotchas or debugging notes?
3. **Commit Generation** - A structured commit message is created with all context
4. **Execution** - The commit is created and verified with `git log`

---

## Quick Example

**Traditional commit:**
```
git commit -m "fix bug"
```

**Contextual commit with this skill:**
```
Fix: Cart calculates wrong total with stacked promos

Problem: PromoEngine applied discounts in wrong order
Approach: Sort promotions by priority before applying in loop
Status: Core logic fixed, tests passing
Next: Need to handle edge case when priority is null
Note: Tried async approach first but caused race conditions

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Result:** Next developer (or future you) knows exactly what was done, why, and what to do next.

---

## Key Benefits

- **Reduced Back-and-Forth** - Fewer "what were you trying to do?" questions
- **Knowledge Transfer** - Each commit becomes mini documentation
- **Faster Onboarding** - New team members understand historical decisions
- **Better Code Reviews** - Reviewers understand intention immediately
- **Cross-Timezone Handoffs** - Work seamlessly across time zones
- **Debugging Context** - Future debugging starts with more context

---

## Integration Points

This skill integrates well with:
- **Daily Standup** - Commits document what you accomplished
- **Code Reviews** - PR descriptions can reference commit context
- **Documentation** - Commit history becomes living documentation
- **Incident Response** - Understand why changes were made
- **Knowledge Management** - Commits become searchable knowledge base

---

## Support Resources

- **Version**: 1.0.0
- **Last Updated**: 2026-02-21
- **Plugin**: launchcode:commit-with-context
- **Documentation**: See docs/ folder for detailed guides
- **Related Skills**:
  - `launchcode:commit` - Standard commit workflow
  - `launchcode:learn-and-explore` - Codebase exploration

---

**Next Steps:** Start with the [Getting Started Guide](docs/GETTING_STARTED.md) to create your first contextual commit.
