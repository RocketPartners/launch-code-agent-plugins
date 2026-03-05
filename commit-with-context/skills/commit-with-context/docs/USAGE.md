# Usage Guide

**When to use this guide:** You understand the basics and want to learn the complete workflow, best practices, and advanced usage patterns.

## Overview

This guide covers the complete workflow for creating contextual commits, from staging changes to verifying the commit. You'll learn how to craft effective commit messages that serve as documentation for your team.

## Complete Workflow

### Phase 1: Prepare Your Changes

Before creating a contextual commit, ensure your changes are ready:

#### 1.1 Review What Changed

```bash
git status
# See all modified, added, deleted files

git diff
# See unstaged changes in detail

git diff --staged
# See what's already staged
```

#### 1.2 Stage Relevant Changes

```bash
# Stage specific files
git add path/to/file1.js path/to/file2.js

# Stage all changes in a directory
git add src/components/

# Stage interactively (choose which changes to stage)
git add -p
```

**Best Practice:** Stage related changes together. If you fixed multiple unrelated bugs, create separate contextual commits for each.

#### 1.3 Verify Staging

```bash
git status
# Confirm correct files are staged

git diff --staged
# Review exactly what will be committed
```

### Phase 2: Invoke the Skill

Multiple ways to invoke:

#### Option 1: Slash Command
```
/commit-with-context
```

#### Option 2: Natural Language
```
Create a commit with context for my team
```

```
I need to make a contextual commit
```

```
Help me commit these changes with handoff notes
```

### Phase 3: Context Gathering

The skill will ask you structured questions. Here's how to answer effectively:

#### Question 1: What problem are you solving?

**Purpose:** Explain the "why" behind your changes.

**Good answers:**
- ✅ "Users couldn't reset password when email contained + character"
- ✅ "Dashboard loading takes 12+ seconds on production"
- ✅ "Team needed visibility into background job status"

**Bad answers:**
- ❌ "Fixed a bug" (too vague)
- ❌ "Updated the code" (states what, not why)
- ❌ "Made changes" (no context)

**Template:**
```
[User/System] couldn't/needed to [action] when/because [condition]
```

#### Question 2: What approach did you take?

**Purpose:** Explain your solution strategy and key implementation details.

**Good answers:**
- ✅ "Added URL encoding to email parameter in PasswordReset.sendLink()"
- ✅ "Implemented Redis caching for dashboard queries with 5min TTL"
- ✅ "Created JobStatusTracker service with real-time WebSocket updates"

**Bad answers:**
- ❌ "Fixed it" (how?)
- ❌ "Changed some files" (which ones? what changed?)
- ❌ "Made it work" (no technical detail)

**Template:**
```
[Added/Modified/Refactored] [component/function] to [action] by [technical approach]
```

#### Question 3: Is this complete, WIP, or blocked?

**Purpose:** Signal the state of work for handoffs.

**Choose:**

**Complete** - Work is done and tested
```
Status: Complete - Feature working and tested
Status: Complete - Bug fixed, monitoring in production
Status: Complete - Refactor done, all tests passing
```

**WIP (Work In Progress)** - Partial work, can be continued
```
Status: WIP - Core logic done, tests needed
Status: WIP - Frontend done, backend integration pending
Status: WIP - 80% complete, edge cases remaining
```

**Blocked** - Work stopped due to external dependency
```
Status: Blocked - Waiting for API key from vendor
Status: Blocked - Need design approval before proceeding
Status: Blocked - Depends on PR #123 being merged
```

#### Question 4: What should the next person know?

**Purpose:** Guide the next developer (or future you) on what to do next.

**Good answers:**
- ✅ "Add tests for null email case and special characters"
- ✅ "Monitor cache hit rate in production, adjust TTL if needed"
- ✅ "Implement error handling for WebSocket disconnections"

**Bad answers:**
- ❌ "Nothing" (there's always a next step!)
- ❌ "Done" (even complete work has potential improvements)
- ❌ "More work" (be specific!)

**Template for Complete work:**
```
Add tests for [scenarios] / Monitor [metric] / Document [feature]
```

**Template for WIP/Blocked:**
```
Continue by [next concrete action] / Waiting for [specific dependency]
```

#### Question 5: Any gotchas or debugging notes?

**Purpose:** Share insights that aren't obvious from the code.

**Good answers:**
- ✅ "Bug only reproduces in production due to different CORS settings"
- ✅ "Tried async approach but caused race conditions, sync is simpler"
- ✅ "Cache must be invalidated after data updates or will show stale data"

**Bad answers:**
- ❌ "None" (really? no insights at all?)
- ❌ "Everything is in the code" (insights aren't always in code)
- ❌ "N/A" (at least mention what you tried that didn't work)

**Template:**
```
Tried [approach A] but [problem], [approach B] works because [reason]
```

**Template for production gotchas:**
```
Only reproduces when [condition] because [reason]
```

### Phase 4: Review Generated Commit

The skill generates a structured commit message. Review it carefully:

```
Fix: Password reset fails for emails with + char

Problem: Users couldn't reset password when email contained + character
Approach: Added URL encoding to email parameter in PasswordReset.sendLink()
Status: Complete - Bug fixed, monitoring in production
Next: Add tests for other special characters (@, %, &, etc.)
Note: Bug only reproduces in production due to different URL parsing in AWS

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Check:**
- [ ] Summary is clear and under 50 characters
- [ ] Problem describes "why" not "what"
- [ ] Approach has technical detail
- [ ] Status is accurate
- [ ] Next steps are actionable
- [ ] Notes share non-obvious insights

### Phase 5: Commit and Verify

The skill creates the commit automatically. Verify it worked:

```bash
# View the commit
git log -1

# View commit with diff
git show

# View commit in pretty format
git log -1 --pretty=medium
```

## Best Practices

### 1. Commit Frequency

**Do commit when:**
- ✅ A logical unit of work is complete
- ✅ Tests are passing
- ✅ You're about to switch tasks
- ✅ End of day (for handoff)
- ✅ Before a risky refactor

**Don't commit when:**
- ❌ Code doesn't compile/run
- ❌ You're in the middle of a thought
- ❌ Tests are failing (unless WIP commit)

### 2. Commit Granularity

**Good granularity:**
- ✅ One bug fix per commit
- ✅ One feature per commit (or multiple if feature is small)
- ✅ Related refactors together

**Bad granularity:**
- ❌ 10 unrelated changes in one commit
- ❌ Committing after every line change
- ❌ Mixing bug fixes and features

### 3. Writing Clear Problems

**Be specific about impact:**

❌ **Bad:** "Login broken"
✅ **Good:** "Login fails with 500 error when password is empty"

❌ **Bad:** "Performance issue"
✅ **Good:** "Dashboard load time is 15s on production, users timing out"

❌ **Bad:** "Need feature"
✅ **Good:** "Support team needs to see customer order history to answer questions"

### 4. Writing Clear Approaches

**Include technical specifics:**

❌ **Bad:** "Fixed the bug"
✅ **Good:** "Added null check in validatePassword() before calling bcrypt.compare()"

❌ **Bad:** "Improved performance"
✅ **Good:** "Cached database queries using Redis with 10min TTL, reduced load from 15s to 2s"

❌ **Bad:** "Added feature"
✅ **Good:** "Created OrderHistory component that fetches from /api/orders and displays in table"

### 5. Meaningful Next Steps

**Make them actionable:**

❌ **Bad:** "More work needed"
✅ **Good:** "Add pagination to order history (API supports it, UI doesn't yet)"

❌ **Bad:** "Testing"
✅ **Good:** "Write tests for error cases: empty response, network timeout, invalid order ID"

❌ **Bad:** "Improvements"
✅ **Good:** "Consider adding export to CSV feature (requested by 3 support reps)"

## Advanced Usage

### Customizing Commit Types

Beyond the standard types, you can create custom types for your team:

- `Hotfix:` - Emergency production fixes
- `Security:` - Security-related changes
- `Perf:` - Performance improvements
- `Build:` - Build system changes
- `CI:` - Continuous integration changes
- `Deps:` - Dependency updates

### Multi-Part Commits

For large features, create multiple contextual commits:

**Commit 1:**
```
Feature: User profile page (part 1/3) - UI components

Problem: Users need to view and edit their profile information
Approach: Created ProfilePage, ProfileForm, and AvatarUpload components
Status: WIP - UI complete, API integration next
Next: Connect to /api/profile endpoint
Note: Using shadcn/ui components for consistent styling
```

**Commit 2:**
```
Feature: User profile page (part 2/3) - API integration

Problem: Profile page needs to load and save data
Approach: Integrated ProfileService with React Query for data fetching/mutations
Status: WIP - CRUD operations working, validation needed
Next: Add form validation and error handling
Note: API returns 422 for validation errors, handle in UI
```

**Commit 3:**
```
Feature: User profile page (part 3/3) - validation & tests

Problem: Need to validate profile data and ensure reliability
Approach: Added Zod schema validation and Vitest component tests
Status: Complete - Feature fully implemented and tested
Next: Monitor user adoption metrics in analytics
Note: Email validation includes disposable email check
```

### Handling Urgent Fixes

For urgent production fixes, add urgency context:

```
Hotfix: Payment processing failing for Stripe customers

Problem: All Stripe payments failing with "Invalid API Key" error since 2pm
Approach: Rotated API key in environment variables, restarted app servers
Status: Complete - Payments working again, monitoring closely
Next: Investigate why old key was revoked, add alerting for payment failures
Note: Stripe revoked key due to suspected compromise (found in public GitHub)
Urgency: P0 - Production payments down for 45 minutes
```

## Integration with Tools

### Git Hooks

You can create a pre-commit hook to remind you to use contextual commits:

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Remember: Use /commit-with-context for better handoff documentation!"
```

### IDE Integration

Configure your IDE to show a reminder:
- VS Code: Add to tasks.json
- IntelliJ: Add to commit template
- Vim: Add to commit message template

### Team Adoption

Strategies for team adoption:
1. Start with your own commits
2. Share benefits in standup
3. Create team examples document
4. Add to onboarding checklist
5. Celebrate good commit messages

## Common Scenarios

### Scenario 1: Bug Fix

```
Fix: Email verification link expires too quickly

Problem: Users complaining verification links expire before they can click them
Approach: Increased token TTL from 1 hour to 24 hours in AuthService.generateToken()
Status: Complete - Change deployed, monitoring support tickets
Next: Consider adding "resend verification" button if still issues
Note: Checked with security team, 24 hours is acceptable for this use case
```

### Scenario 2: New Feature

```
Feature: Add dark mode toggle to settings

Problem: Users requested dark mode for late-night usage
Approach: Implemented ThemeProvider with localStorage persistence and system preference detection
Status: Complete - Dark mode working across all pages
Next: Add dark mode to admin panel (separate codebase)
Note: Used CSS variables for theming, easy to add more themes later
```

### Scenario 3: Refactoring

```
Refactor: Extract payment logic from OrderController

Problem: OrderController was 800+ lines and hard to test
Approach: Created PaymentService with process(), refund(), and validate() methods
Status: Complete - All tests passing, behavior unchanged
Next: Apply same pattern to ShippingController and InventoryController
Note: Maintained backward compatibility, existing API contracts unchanged
```

### Scenario 4: Work in Progress

```
WIP: Implement real-time notifications system

Problem: Users need immediate alerts for important events
Approach: Set up WebSocket server with Socket.io and notification event handlers
Status: WIP - Server working, client integration pending
Next: Create NotificationProvider component and hook up to UI
Note: Using Redis pub/sub for multi-server support, tested with 2 servers
```

### Scenario 5: Blocked Work

```
Blocked: Add payment processing for European customers

Problem: Need to support EUR and GBP currencies for EU expansion
Approach: Started Stripe multi-currency setup and currency conversion logic
Status: Blocked - Waiting for legal approval for EU payment processing
Next: Resume once legal completes GDPR compliance review (ETA: 2 weeks)
Note: Code is ready, just needs config enabled once legal approves
```

## Tips for Success

1. **Answer honestly** - Don't embellish or oversimplify
2. **Be specific** - Include names of functions, files, services
3. **Think about your audience** - Write for someone picking up the work
4. **Share failures** - What didn't work is as valuable as what did
5. **Update later** - If you forgot something, you can amend the commit

## Related Documentation

- **[Commit Templates](TEMPLATES.md)** - Ready-to-use templates for different scenarios
- **[Examples](EXAMPLES.md)** - More real-world examples
- **[Workflows](WORKFLOWS.md)** - Integrate into daily workflow
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions
- **[Advanced Usage](ADVANCED.md)** - Customization and automation
