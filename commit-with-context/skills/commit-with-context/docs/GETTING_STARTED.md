# Getting Started with Commit with Context

**When to use this guide:** You're using the commit-with-context skill for the first time and want to understand the basics.

## Overview

The commit-with-context skill transforms your git commits from simple "what changed" messages into rich documentation that explains why changes were made, what approach was taken, and what needs to happen next. This is especially valuable for:

- **Cross-timezone teams** - Team members can pick up where you left off without waiting for you
- **Future you** - Understanding your own code weeks or months later
- **Code reviews** - Reviewers understand context immediately
- **Documentation** - Your git history becomes living documentation

## Prerequisites

Before using this skill, ensure you have:

- [ ] Git installed and configured
- [ ] A git repository initialized
- [ ] Claude Code CLI installed and working
- [ ] Some changes staged for commit (`git add` already run)
- [ ] Basic understanding of git commit workflow

## Quick Start

### 5-Minute First Commit

1. **Stage your changes:**
   ```bash
   git add path/to/changed/files
   ```

2. **Invoke the skill:**
   In Claude Code, say:
   ```
   /commit-with-context
   ```
   Or simply:
   ```
   Create a contextual commit
   ```

3. **Answer the prompts:**
   The skill will ask you:
   - What problem are you solving?
   - What approach did you take?
   - Is this complete, WIP, or blocked?
   - What should the next person know?
   - Any gotchas or debugging notes?

4. **Review and confirm:**
   The skill shows you the generated commit message and creates the commit.

5. **Verify:**
   Check your commit:
   ```bash
   git log -1
   ```

That's it! You've created your first contextual commit.

## Your First Contextual Commit

Let's walk through a realistic example.

### Scenario
You've just fixed a bug where the shopping cart was calculating wrong totals when multiple promotions were stacked.

### Step 1: Stage Your Changes

```bash
git status
# See what files changed

git add src/promo-engine.js src/promo-engine.test.js
# Stage the relevant files
```

### Step 2: Invoke the Skill

In Claude Code:
```
Hey, I need to commit these changes with context for my team
```

### Step 3: Answer the Prompts

The skill will analyze your changes and then ask:

**Q: What problem are you solving?**
```
Users reported incorrect totals when stacking multiple promotions
```

**Q: What approach did you take?**
```
Added priority sorting in PromoEngine.calculateDiscount() before applying discounts
```

**Q: Is this complete, WIP, or blocked?**
```
Complete - Core fix done and tests passing
```

**Q: What should the next person know?**
```
Need to add edge case handling for when priority is null
```

**Q: Any gotchas or debugging notes?**
```
Tried async approach first but caused race conditions. Sync approach is simpler and works.
```

### Step 4: Generated Commit

The skill generates:

```
Fix: Cart calculates wrong total with stacked promos

Problem: Users reported incorrect totals when stacking multiple promotions
Approach: Added priority sorting in PromoEngine.calculateDiscount() before applying discounts
Status: Complete - Core fix done and tests passing
Next: Need to add edge case handling for when priority is null
Note: Tried async approach first but caused race conditions. Sync approach is simpler and works.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Step 5: Verify

```bash
git log -1
# Shows your contextual commit message

git show
# Shows the commit with the full diff
```

## Understanding the Commit Structure

Every contextual commit follows this structure:

```
[Type]: Brief summary (under 50 chars)

Problem: What issue are you solving?
Approach: How did you solve it?
Status: [Complete|WIP|Blocked]
Next: What's the next step?
Note: Any gotchas or insights

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Commit Type Prefixes

Common types:
- `Fix:` - Bug fixes
- `Feature:` - New functionality
- `Refactor:` - Code restructuring
- `Docs:` - Documentation changes
- `Test:` - Test additions/changes
- `WIP:` - Work in progress
- `Blocked:` - Work is blocked

See [Commit Templates](TEMPLATES.md) for full list and when to use each.

## What Makes a Good Contextual Commit?

### Good Example ✅

```
Fix: Cart API returns 500 when coupon code invalid

Problem: API crashes with unhandled exception when invalid coupon applied
Approach: Added validation in CouponService.validate() with proper error handling
Status: Complete - Fix deployed and monitoring
Next: Consider adding rate limiting to prevent brute force coupon guessing
Note: Error was not caught in tests because test data only used valid coupons

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Why it's good:**
- Clear problem statement
- Explains the solution approach
- Indicates completion status
- Suggests next improvement
- Shares debugging insight

### Bad Example ❌

```
fix bug
```

**Why it's bad:**
- What bug?
- How was it fixed?
- Is it fully fixed?
- What else needs to be done?
- No context for future developers

## Common First-Time Mistakes

### 1. Being Too Vague

❌ **Bad:**
```
Problem: It wasn't working
```

✅ **Good:**
```
Problem: Login form submission fails silently when email field is empty
```

### 2. Skipping the "Next" Step

❌ **Bad:**
```
Status: Complete
Next: (blank)
```

✅ **Good:**
```
Status: Complete - Auth flow working
Next: Add tests for edge cases (empty fields, SQL injection attempts)
```

### 3. Not Sharing Debugging Insights

❌ **Bad:**
```
Note: (blank)
```

✅ **Good:**
```
Note: The bug only reproduces in production because dev environment has different CORS settings
```

## Next Steps

Now that you've created your first contextual commit, explore:

- **[Usage Guide](USAGE.md)** - Detailed workflow and best practices
- **[Commit Templates](TEMPLATES.md)** - Templates for different types of changes
- **[Examples](EXAMPLES.md)** - More real-world examples
- **[Workflows](WORKFLOWS.md)** - Integrate into your daily workflow

## Quick Reference

### Invoking the Skill

Any of these work:
- `/commit-with-context`
- `Create a contextual commit`
- `Commit with handoff notes`
- `I need to commit with context`

### Required Information

Be ready to answer:
1. What problem are you solving?
2. What approach did you take?
3. Status (Complete/WIP/Blocked)?
4. What's next?
5. Any insights or gotchas?

### Best Practices

- Stage changes first (`git add`)
- Be specific, not vague
- Always fill in "Next" field
- Share debugging insights
- Keep summary under 50 chars

---

**Related Documentation:**
- [Usage Guide](USAGE.md) - Complete workflow details
- [Commit Templates](TEMPLATES.md) - Message templates
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues
