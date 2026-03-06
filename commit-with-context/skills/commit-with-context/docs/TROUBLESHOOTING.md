# Troubleshooting

**When to use this guide:** You're experiencing problems using the commit-with-context skill or have questions about specific scenarios.

## Overview

This guide covers common issues, solutions, and frequently asked questions about creating contextual commits.

---

## Common Issues

### Issue 1: Skill Not Found or Not Loading

**Symptom:**
```
Error: Skill 'commit-with-context' not found
```

**Possible Causes:**
1. Skill not installed
2. Plugin cache needs refresh
3. Typo in skill name

**Solutions:**

**Solution A: Verify Installation**
```bash
# Check if plugin is installed
claude-code plugins list | grep commit-with-context
```

**Solution B: Refresh Plugin Cache**
```bash
# Sync plugins
claude-code plugins sync
```

**Solution C: Reinstall Plugin**
```bash
# Reinstall from LaunchCode
claude-code plugins install launchcode:commit-with-context
```

**Solution D: Use Correct Invocation**
Try these phrases:
- `/commit-with-context`
- `Create a contextual commit`
- `I need to commit with context`

---

### Issue 2: "No Changes Staged" Error

**Symptom:**
```
Error: No changes staged for commit
```

**Cause:**
You haven't run `git add` to stage your changes.

**Solution:**

**Step 1: Check Status**
```bash
git status
# Shows unstaged and staged changes
```

**Step 2: Stage Changes**
```bash
# Stage specific files
git add path/to/file.js

# Stage all changes
git add .

# Stage interactively
git add -p
```

**Step 3: Verify Staging**
```bash
git diff --staged
# Should show the changes to be committed
```

**Step 4: Try Skill Again**
```
/commit-with-context
```

---

### Issue 3: Commit Message Too Long

**Symptom:**
Git warns that commit message is too long, or some tools truncate it.

**Cause:**
You provided very detailed answers, resulting in a large commit message.

**Solution:**

**Best Practice: Balance Detail and Length**

✅ **Good Length:**
```
Fix: Cart total incorrect with stacked promos

Problem: Users reported wrong totals when applying 3+ promo codes
Approach: Sort promos by priority in PromoEngine.calculateDiscount() before applying
Status: Complete - Fix deployed and monitored
Next: Add tests for all promo combinations
Note: Bug existed since v2.1.0, found via support tickets

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

❌ **Too Long:**
```
Fix: Shopping cart total calculation is incorrect when users stack multiple promotional codes

Problem: Over the past 3 weeks, we've received 47 support tickets from users reporting that when they apply more than 2 promotional codes to their shopping cart, the total amount calculated at checkout is incorrect. Users are expecting a specific discount amount based on the promotional codes they entered, but the system is calculating a different total. This has resulted in customer dissatisfaction and loss of trust in our promotional system...

[continues for 50 more lines]
```

**Tips to Keep It Concise:**
1. **Use bullet points** instead of long paragraphs
2. **Be specific, not verbose**: "Increased timeout from 5s to 30s" instead of "I noticed that the timeout was too short so I thought it would be good to increase it..."
3. **Link to external docs** for extensive context: "See docs/architecture.md for full design"
4. **Use abbreviations** where appropriate: "DB" instead of "database"

---

### Issue 4: Don't Know What to Write

**Symptom:**
You're stuck when answering the prompt questions, unsure what level of detail is appropriate.

**Solution:**

**Use the "5 W's" Framework:**
- **Who**: Who is affected? (users, team, system)
- **What**: What specifically changed?
- **When**: When did you make this change?
- **Where**: Where in the codebase?
- **Why**: Why was this change necessary?

**Example Application:**

**Question:** "What problem are you solving?"

❌ **Too vague:** "Fixing a bug"

✅ **Use 5 W's:**
- **Who**: Users checking out
- **What**: Getting wrong total
- **When**: When applying multiple promos
- **Where**: In shopping cart
- **Why**: Promo codes applied in wrong order

**Answer:** "Users get wrong checkout total when applying multiple promo codes because PromoEngine applies them in wrong order"

---

### Issue 5: Git Rejects Commit Due to Hooks

**Symptom:**
```
Pre-commit hook failed
Commit aborted
```

**Cause:**
Your repository has git hooks (pre-commit, commit-msg) that validate commits, and your commit doesn't pass validation.

**Common Hook Issues:**

**Issue 5A: Linting Failures**

**Symptom:**
```
ESLint found errors in staged files
```

**Solution:**
```bash
# Fix linting errors
npm run lint --fix

# Stage the fixes
git add .

# Try committing again
/commit-with-context
```

**Issue 5B: Test Failures**

**Symptom:**
```
Tests must pass before committing
```

**Solution:**
```bash
# Run tests
npm test

# Fix failing tests
# Re-stage changes
git add .

# Try committing again
/commit-with-context
```

**Issue 5C: Commit Message Format**

**Symptom:**
```
Commit message doesn't match required format
```

**Cause:**
Your repository requires specific commit message format (e.g., Conventional Commits) that conflicts with contextual commit format.

**Solution:**

**Option 1: Update Hook to Allow Contextual Commits**
Edit `.git/hooks/commit-msg` to accept your format.

**Option 2: Skip Hook Temporarily** (not recommended)
```bash
git commit --no-verify -m "your message"
```

**Option 3: Adapt Format to Hook Requirements**
If your repo requires "feat:" or "fix:" prefix, ensure your contextual commit starts with that:
```
fix: Cart total incorrect with stacked promos

Problem: ...
```

---

### Issue 6: Commit Created But Looks Wrong

**Symptom:**
Commit was created successfully, but when you view it, the formatting is messed up or information is missing.

**Solution:**

**View the Commit:**
```bash
git log -1
# or
git show HEAD
```

**If Formatting Is Wrong:**

**Problem:** Line breaks or formatting lost

**Fix:** Amend the commit:
```bash
git commit --amend
# Your editor opens, fix the formatting
# Save and close
```

**If Information Is Missing:**

**Problem:** Forgot to include important context

**Fix:** Amend and add the missing info:
```bash
git commit --amend -m "$(cat <<'EOF'
Fix: Cart total incorrect with stacked promos

Problem: Users reported wrong totals when applying 3+ promo codes
Approach: Sort promos by priority before applying
Status: Complete
Next: Add edge case tests
Note: Also fixed related bug in discount calculation (CVE-2024-001)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Issue 7: Too Much Context, Slowing Down Team

**Symptom:**
Team feedback that commit messages are "too long" or "too much to read."

**Cause:**
You're including too much detail for simple changes.

**Solution:**

**Tailor Context to Change Size:**

**Small Changes (< 50 lines):**
```
Fix: Typo in error message

Problem: Error message said "teh" instead of "the"
Approach: Fixed typo in src/errors.ts line 42
Status: Complete
Next: N/A
Note: Found during code review

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Medium Changes (50-200 lines):**
```
Feature: Add loading spinner to submit button

Problem: Users clicking submit multiple times, creating duplicate orders
Approach: Added loading state to submit button, disabled while processing
Status: Complete - Deployed and tested
Next: Apply same pattern to other forms
Note: Using existing LoadingButton component

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Large Changes (200+ lines):**
```
Refactor: Extract payment logic into PaymentService

Problem: PaymentController was 800+ lines, hard to test, causing bugs
Approach: Created PaymentService with process(), refund(), validate() methods
Status: Complete - All tests passing
Next: Apply to ShippingController and OrderController
Note: Maintained backward compatibility, no API changes
Metrics:
  - PaymentController: 823 → 156 lines
  - Test coverage: 45% → 87%
  - Cyclomatic complexity: 34 → 8

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Rule of Thumb:**
- Typo/trivial fix: 3-4 lines of context
- Small feature: 5-8 lines of context
- Major feature/refactor: 10-15 lines of context
- Critical production issue: 15-20+ lines (worth the detail)

---

## Frequently Asked Questions

### Q1: Do I need to use this for every commit?

**A:** No! Use contextual commits when context matters:

**Use for:**
- ✅ Bug fixes (especially production bugs)
- ✅ New features
- ✅ Refactoring
- ✅ Work in progress / handoffs
- ✅ Security fixes
- ✅ Performance optimizations

**Don't need for:**
- ❌ Typo fixes (unless in critical docs)
- ❌ Formatting/whitespace changes
- ❌ Dependency version bumps (unless breaking)
- ❌ Generated code (migrations, etc.)

### Q2: What if I don't know the "Next" step yet?

**A:** It's okay to be uncertain, just be honest:

**Options:**
```
Next: Unclear - need to monitor production metrics before deciding next steps
```

```
Next: Depends on user feedback - might need to adjust approach
```

```
Next: To be determined in planning meeting tomorrow
```

**Important:** Even "I don't know" is better than leaving it blank. It tells the next person you consciously thought about it.

### Q3: Can I edit a commit after creating it?

**A:** Yes, with `git commit --amend`, but be careful:

**Safe to Amend:**
- ✅ Commit is not pushed yet
- ✅ You're working alone on the branch
- ✅ Just fixing a typo or adding missing context

**Dangerous to Amend:**
- ❌ Commit is already pushed
- ❌ Others might have pulled your branch
- ❌ Commit is in main/master branch

**How to Amend:**
```bash
# Edit the last commit message
git commit --amend

# Edit and add more files
git add forgotten-file.js
git commit --amend --no-edit
```

**If Already Pushed:**
```bash
# Force push (coordinate with team!)
git push --force-with-lease
```

### Q4: What about confidential information?

**A:** Never put secrets or sensitive data in commits!

**Do NOT include:**
- ❌ API keys or credentials
- ❌ Customer personal information
- ❌ Internal server names/IPs
- ❌ Confidential business metrics
- ❌ Security vulnerability details (before patch)

**Instead:**
```
Note: API configuration updated (see 1Password for credentials)
```

```
Next: Fix security issue documented in private security doc
```

```
Problem: Customer data leak (details in incident report IR-2024-042)
```

### Q5: How do I handle commits in public open-source projects?

**A:** Adapt for public audience:

**Private Repo:**
```
Problem: Marketing team reported dashboard loading slowly for enterprise clients
Note: Affects clients like Acme Corp, BigCo Inc (see internal ticket #4521)
```

**Public Repo:**
```
Problem: Dashboard performance degrades with large datasets (10,000+ records)
Note: Reported by multiple enterprise users via support channel
```

**Guidelines:**
- Don't mention specific client names
- Don't reference internal tools (JIRA, etc.)
- Generalize the problem
- Assume anyone can read it

### Q6: My team doesn't use this - should I still do it?

**A:** Yes! Here's why:

**Benefits Even If Team Doesn't Use It:**
1. **Future you** will thank yourself
2. **Code reviews** will be faster (reviewers understand context)
3. **Debugging** is easier (clear change history)
4. **Setting example** might inspire team adoption
5. **Job transitions** - new people appreciate context

**Start Small:**
- Use it for your own commits
- Share benefits you notice
- Celebrate good commit messages in code reviews
- Add to team onboarding docs

### Q7: What if I made a mistake and need to revert?

**A:** Your contextual commit makes reverting easier!

**Reverting with Context:**
```bash
# Revert the commit
git revert HEAD

# Git opens editor with message like:
# Revert "Fix: Cart total incorrect with stacked promos"
#
# This reverts commit abc123.
#
# [Original commit message is included]

# Add context about WHY you're reverting:
Revert "Fix: Cart total incorrect with stacked promos"

This reverts commit abc123def456.

Reason for Revert: Fix caused checkout to fail for users with gift cards
Impact: Reverted to restore checkout functionality, investigating proper fix
Next: Fix gift card interaction bug, then re-apply promo fix
Note: Original fix was correct for promo logic, but didn't account for gift card edge case
```

### Q8: Can I automate this?

**A:** Partially - see [Advanced Usage](ADVANCED.md) for automation options.

**What Can Be Automated:**
- ✅ Extracting file changes and diffs
- ✅ Suggesting commit type based on changes
- ✅ Formatting the commit message structure
- ✅ Adding Co-Authored-By automatically

**What Can't Be Automated:**
- ❌ Understanding the "why" (your intention)
- ❌ Knowing what you tried that didn't work
- ❌ Determining what should happen next
- ❌ Sharing insights and gotchas

**Best Approach:** Use the skill to guide you, don't try to fully automate away the thinking.

### Q9: How do I search through contextual commits?

**A:** Use git log with grep:

**Search by Problem:**
```bash
git log --all --grep="Problem.*payment"
```

**Search by Approach:**
```bash
git log --all --grep="Approach.*Redis"
```

**Search by Status:**
```bash
git log --all --grep="Status: WIP"
```

**Search by Next Steps:**
```bash
git log --all --grep="Next.*test"
```

**Search by Author and Type:**
```bash
git log --author="Jane" --grep="Fix:"
```

**Advanced Search:**
```bash
# Find all blocked commits
git log --all --grep="Status: Blocked"

# Find all hotfixes
git log --all --grep="Hotfix:"

# Find commits mentioning specific files
git log --all --grep="AuthService"
```

### Q10: What if English isn't my first language?

**A:** That's perfectly fine! Focus on clarity over perfect grammar.

**Tips:**
1. **Use simple sentences**: Short and direct is better than complex
2. **Use tools**: Grammarly or similar can help
3. **Templates**: Use the templates - fill in the blanks
4. **Technical terms**: Technical terms are universal
5. **Ask Claude**: "Help me rephrase this commit message"

**Example in Simple English:**
```
Fix: Login page broken

Problem: Login page shows error when user clicks submit button
Approach: Fixed JavaScript error in login.js line 42 (variable name wrong)
Status: Complete - Login works now
Next: Add tests to prevent this bug again
Note: Found error in browser console, simple typo fix

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

This is great! Simple, clear, effective.

---

## Getting Help

### If Issue Not Listed Here

1. **Check other docs:**
   - [Usage Guide](USAGE.md) - Complete workflow
   - [Templates](TEMPLATES.md) - Message templates
   - [Examples](EXAMPLES.md) - Real examples
   - [Advanced Usage](ADVANCED.md) - Customization

2. **Ask Claude:**
   ```
   I'm having trouble with commit-with-context: [describe issue]
   ```

3. **Check git logs:**
   ```bash
   git log -5  # See recent commits
   git reflog  # See recent git operations
   ```

4. **Repository issues:**
   ```
   Report at: github.com/your-org/your-repo/issues
   ```

---

## Related Documentation

- **[Usage Guide](USAGE.md)** - Detailed workflow and best practices
- **[Getting Started](GETTING_STARTED.md)** - First-time setup
- **[Templates](TEMPLATES.md)** - Message templates
- **[Examples](EXAMPLES.md)** - Real-world examples
- **[Workflows](WORKFLOWS.md)** - Daily workflow integration
- **[Advanced Usage](ADVANCED.md)** - Customization and automation
