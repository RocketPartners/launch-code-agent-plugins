# Commit with Context - Skill Implementation v1.0

## Skill Purpose

This skill guides users through creating contextual git commits with AI-powered assistance, capturing work intention for cross-timezone team handoffs. Features smart context pre-filling, repo learning, metrics tracking, and commit quality scoring.

---

## When This Skill Is Invoked

### Primary Invocations
- `/commit-with-context` - Main commit workflow
- "create a contextual commit"
- "commit with context"
- "commit with handoff notes"
- "make a commit for my team"
- "create a structured commit"

### Utility Invocations
- `/commit-context generate-pr` - Generate PR description from commits
- `/commit-context search [term]` - Search commits by structured fields
- `/commit-context history` - Show interactive commit history
- `/commit-context quality` - Analyze commit message quality
- `/commit-context analytics` - Show commit analytics

---

## Enhanced Workflow

### Phase 0: Intelligence Gathering (NEW)

Before asking any questions, intelligently analyze the repository and changes:

#### 0.1: Learn from Repository History

```bash
# Get recent commits to learn team style
git log -20 --pretty=format:"%s|||%b"
```

**Detect patterns:**
- Commit type format (lowercase vs uppercase, colon vs parentheses)
- Ticket reference patterns (JIRA-123, #123, etc.)
- Team-specific conventions
- Typical "Next:" patterns
- Common vocabulary and phrasing

**Example detection:**
```
Analyzing repository commit history...

✓ Pattern detected: Team uses lowercase types (fix:, feat:)
✓ Pattern detected: Commits include JIRA tickets (format: JIRA-####)
✓ Pattern detected: "Next:" often mentions PR reviews
✓ Style: Summaries average 45 characters

I'll match your team's style automatically!
```

#### 0.2: Parse Branch Name

```bash
# Get current branch
git branch --show-current
```

**Parse patterns:**
- `feature/TICKET-123-description` → Type: Feature, Ticket: TICKET-123
- `fix/bug-in-cart` → Type: Fix, Description: bug in cart
- `username/add-feature` → Author context
- `hotfix/production-issue` → Type: Hotfix, Urgency: High

**Auto-extract and pre-fill:**
```
Branch: feature/JIRA-1234-add-dark-mode

Auto-detected:
✓ Type: Feature
✓ Ticket: JIRA-1234
✓ Description: Add dark mode

I'll pre-fill this information in your commit!
```

#### 0.3: Intelligent Change Analysis

```bash
# Detailed diff analysis
git diff --staged --numstat
git diff --staged --name-status
git diff --staged
```

**Analyze changes to detect:**
- New files → Feature commit
- Test files modified → Include test info
- Error handling added → Fix or Refactor
- Performance keywords (cache, optimize, async) → Perf commit
- Security keywords (auth, encrypt, validate) → Security commit
- Function/class names changed → Extract for approach

**Smart suggestions:**
```
Analyzing your changes...

📊 Change Summary:
  • 2 files modified (src/cart.js, src/cart.test.js)
  • 47 lines added, 12 removed
  • Functions modified: calculateTotal(), applyPromo()
  • Tests added: 23 new test lines

🎯 Intelligent Detection:
  • Type suggestion: Fix (existing code modified with tests)
  • Approach hint: Modified calculateTotal() in cart.js
  • Impact: Medium (47 lines, 2 files)

I'll use this context to help draft your commit!
```

#### 0.4: Find Related Context

```bash
# Find related commits
git log --all --grep="cart\|promo" --oneline -10
git log --all -- src/cart.js --oneline -5
```

**Detect:**
- Previous commits touching same files
- Recent commits with similar keywords
- Related bug fixes or features
- Potential dependencies

**Present connections:**
```
📎 Related Context Found:
  • Previous commit: a3f2b1c "Fix: Cart shipping calculation"
  • Same files: 3 other commits in last 2 weeks
  • Related: commit def789 mentions "promo"

Would you like me to link these in your commit?
```

#### 0.5: Detect Multi-Part Series

```bash
# Check for existing series
git log --all --grep="part [0-9]" --oneline -20
```

**Detect patterns:**
- "(part 1/3)" in commit messages
- Sequential related commits
- Branch naming patterns with parts

**Suggest continuation:**
```
🔗 Multi-Part Series Detected:
  • Found: "Feature: User dashboard (part 1/3)"
  • Last part: 1 of 3
  • Suggested: This could be part 2/3

Would you like to continue this series?
```

---

### Phase 1: Validate Prerequisites

1. **Check if in a git repository:**
   ```bash
   git rev-parse --is-inside-work-tree
   ```
   - If not, inform user and exit

2. **Check for staged changes:**
   ```bash
   git diff --staged --name-only
   ```
   - If none, show `git status` and guide user

3. **Run Phase 0 intelligence gathering** (see above)

---

### Phase 2: Smart Context Pre-filling

Present pre-filled suggestions based on Phase 0 analysis:

```
Based on my analysis, here's what I detected:

Type: Fix (suggested - existing code modified)
Problem: [Pre-filled from commit analysis or ask user]
Approach: Modified calculateTotal() in src/cart.js [detected from diff]
Files: src/cart.js, src/cart.test.js
Ticket: JIRA-1234 [from branch name]

Let me ask you a few questions to refine this...
```

---

### Phase 3: Gather Context from User (Enhanced)

Use AskUserQuestion with intelligent defaults and suggestions.

#### Question 1: Confirm/Refine Commit Type

```
Based on your changes, I suggest: "Fix"

Detected because:
  • Existing files modified (not new feature)
  • Tests updated (indicates fixing behavior)
  • No new functionality added

Is "Fix" correct, or would you like to choose a different type?

Options:
  - Fix (Recommended) - Bug fixes
  - Refactor - Code restructuring
  - Perf - Performance improvements
  - Feature - New functionality
```

#### Question 2: Problem Statement

**Pre-fill if detected, otherwise ask:**

```
I noticed you modified calculateTotal() and applyPromo() functions.

What problem are you solving?

[Pre-filled suggestion based on diff analysis]
Example: "Cart calculates wrong total when applying multiple promos"

Or describe in your own words (1-2 sentences):
```

**Provide smart prompts:**
- If test files: "What bug were you fixing or what scenario were you testing?"
- If new files: "What new functionality does this add?"
- If performance changes: "What was slow? What's the impact?"

#### Question 3: Approach (with auto-suggestion)

```
How did you solve this?

Auto-detected from your changes:
  • Modified: calculateTotal() in src/cart.js
  • Added: Tests in src/cart.test.js
  • Lines: +47, -12

Suggested approach:
"Modified calculateTotal() to sort promos by priority before applying"

Does this capture your approach, or would you like to refine it?
```

#### Question 4: Status (with intelligent defaults)

```
What's the current state of this work?

Based on your changes:
  • Tests added: ✓
  • Documentation updated: ?
  • Ready for production: ?

Options:
  - Complete (Recommended) - Tests passing, ready to merge
  - WIP - More work needed
  - Blocked - Waiting on dependency
```

#### Question 5: Next Steps (with smart suggestions)

```
What should happen next?

Smart suggestions based on your changes:
  • "Add tests for edge case with 5+ stacked promos"
  • "Monitor cart error rates in production after deploy"
  • "Apply same fix pattern to shipping calculation"

Select one or write your own:
```

#### Question 6: Insights and Gotchas

```
Any insights, gotchas, or debugging notes?

Prompts:
  • Did you try anything that didn't work?
  • Any environment-specific behavior?
  • Performance considerations?
  • Security implications?

[Optional - can skip if nothing notable]
```

---

### Phase 4: Calculate Metrics and Impact (NEW)

Automatically calculate and include:

```bash
# Calculate comprehensive metrics
git diff --staged --numstat | awk '{added+=$1; removed+=$2} END {print "Added:", added, "Removed:", removed}'
git diff --staged --name-only | wc -l  # Files changed
# Check if tests exist
git diff --staged | grep -c "test\|spec"
```

**Generate impact section:**
```
Impact:
  📊 Changes: +47 lines, -12 lines across 2 files
  📁 Files: src/cart.js, src/cart.test.js
  ✅ Tests: 23 test lines added
  ⚡ Performance: No impact expected
  👥 Users affected: Cart checkout users (~500/day)
```

---

### Phase 5: Construct Enhanced Commit Message

#### 5.1: Generate Summary with Validation

```
Generating summary...

Draft: "Fix: Cart total incorrect with stacked promos"

✓ Length: 45 characters (optimal: under 50)
✓ Format: [Type]: [Description]
✓ Style: Matches team convention (lowercase "fix:")
✓ Clarity: Specific and actionable
```

#### 5.2: Build Complete Message with Visual Indicators (NEW)

```
Fix: 🐛 Cart total incorrect with stacked promos

Problem: ⚠️ Users reported wrong totals when applying 3+ promotional codes
Approach: 🔧 Sorted promos by priority in calculateTotal() before applying discounts
Status: ✅ Complete - Bug fixed, tests passing, deployed to staging
Next: 📝 Add edge case tests for 5+ stacked promos and null priority handling
Note: 💡 Tried async Promise.all() approach but caused race conditions. Sync approach is simpler and reliable.

Impact: 📊
  • Changes: +47 lines, -12 lines (2 files)
  • Tests: 23 test cases added
  • Users affected: ~500/day checkout users
  • Performance: No regression (tested with 100 concurrent carts)

Related: 📎
  • Previous fix: a3f2b1c (Cart shipping calculation)
  • See also: docs/cart-architecture.md

Ticket: 🎫 JIRA-1234
Branch: feature/JIRA-1234-fix-cart-promos

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Note:** Emojis are optional - ask user preference or detect from repo style.

#### 5.3: Commit Quality Scoring (NEW)

```
📊 Commit Quality Score: 9.5/10

Strengths:
  ✅ Clear problem statement
  ✅ Technical approach with specifics
  ✅ Status and next steps defined
  ✅ Debugging insights included
  ✅ Metrics and impact quantified
  ✅ Related commits linked

Suggestions:
  ⚠️ Consider adding: Performance benchmarks (optional)

This is an excellent commit message! 🎉
```

#### 5.4: Validation and Linting (NEW)

```
Validating commit message...

✅ Summary length: 45 chars (under 50)
✅ Required fields present: Problem, Approach, Status, Next
✅ Format: Correct structure
✅ Style: Matches repository conventions
✅ Clarity: Specific and actionable
⚠️ Suggestion: Consider shortening summary by 2 characters

Overall: Ready to commit!
```

---

### Phase 6: Create the Commit (Enhanced)

#### 6.1: Show Final Review

Display the complete commit message with syntax highlighting:

```markdown
Ready to commit! Here's your final message:

```
Fix: 🐛 Cart total incorrect with stacked promos

Problem: ⚠️ Users reported wrong totals when applying 3+ promotional codes
Approach: 🔧 Sorted promos by priority in calculateTotal() before applying discounts
Status: ✅ Complete - Bug fixed, tests passing
Next: 📝 Add edge case tests for 5+ stacked promos
Note: 💡 Tried async approach but caused race conditions. Sync is simpler.

Impact: 📊
  • Changes: +47 lines, -12 lines (2 files)
  • Tests: 23 test cases added

Ticket: 🎫 JIRA-1234

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

Quality Score: 9.5/10 ⭐

Does this look good? [Yes/Edit/Cancel]
```

#### 6.2: Execute Commit

```bash
git commit -m "$(cat <<'EOF'
[Full commit message here]
EOF
)"
```

#### 6.3: Post-Commit Actions

```
Commit created successfully! ✅

📋 Summary:
  Commit: a1b2c3d
  Files: 2 modified
  Lines: +47, -12

🔍 Review: git show HEAD
📤 Push: git push origin feature/JIRA-1234-fix-cart-promos
✏️ Amend: git commit --amend

📊 Commit Stats (this week):
  • Your commits: 8 total
  • Contextual: 7/8 (87.5%)
  • Avg quality: 8.9/10
```

---

## Utility Commands (NEW)

### Generate PR Description

**Invocation:** `/commit-context generate-pr`

```bash
# Analyze commits in current branch
git log origin/main..HEAD --pretty=format:"%s|||%b"
```

**Generate structured PR:**
```markdown
## Summary
Fix cart calculation bug with multiple promotional codes

## Changes
This PR includes 3 commits:
1. Fix: Cart total incorrect with stacked promos (a3f2b1c)
2. Test: Add comprehensive promo stacking tests (b4c5d6e)
3. Docs: Update cart calculation documentation (c7d8e9f)

## Implementation Details
- Modified calculateTotal() to sort promos by priority
- Added 23 new test cases for edge scenarios
- Updated architecture docs with promo logic

## Testing
✅ All tests passing (87% coverage → 92%)
✅ Manual testing with 5+ stacked promos
✅ Performance testing with 100 concurrent carts

## Impact
- Users affected: ~500/day
- Performance: No regression
- Risk: Low (well-tested edge cases)

## Notes for Reviewers
- Async approach was attempted but caused race conditions (see commit a3f2b1c)
- Priority field added to Promo model (default: 100)
- Edge case handling for null priority needed in follow-up

## Related
- Fixes: JIRA-1234
- Related: #456 (shipping calculation)

---
Generated from commits using /commit-context 🤖
```

### Search Commits

**Invocation:** `/commit-context search [term]`

```bash
# Search by structured fields
git log --all --grep="Problem.*${term}" --pretty=format:"%h - %s%n%b%n---"
```

**Examples:**
```
/commit-context search "performance"
→ Finds all commits with "performance" in Problem field

/commit-context search "Status: WIP"
→ Finds all work-in-progress commits

/commit-context search "cart"
→ Finds all commits mentioning "cart"
```

### Interactive Commit History

**Invocation:** `/commit-context history`

```
📜 Interactive Commit History

┌─ Feature: User Dashboard (Series 1/3)
│  ├─ ✅ Part 1: Layout and auth (a3f2b1c)
│  ├─ ✅ Part 2: Order history (b4c5d6e)
│  └─ 🔄 Part 3: Profile (WIP) (c7d8e9f)
│     Next: Add profile photo upload
│
├─ Fix: Cart Calculation Bug (a1b2c3d)
│  └─ Status: ✅ Complete
│     Impact: 500 users/day
│
└─ Refactor: Auth Service (d4e5f6a)
   ├─ Status: ✅ Complete
   └─ Follow-up: Tests needed (Blocked) ⛔
      Blocker: Waiting for mock library update

Legend:
  ✅ Complete  🔄 WIP  ⛔ Blocked

Use: /commit-context show [commit] for details
```

### Commit Analytics

**Invocation:** `/commit-context analytics [timeframe]`

```
📊 Commit Analytics (Last 30 Days)

Overview:
  • Total commits: 47
  • Contextual commits: 42/47 (89%)
  • Average quality score: 8.7/10

Breakdown by Type:
  • Features: 18 (38%)
  • Fixes: 15 (32%)
  • Refactors: 8 (17%)
  • Tests: 4 (9%)
  • Docs: 2 (4%)

Status Distribution:
  • Complete: 40 (85%)
  • WIP: 5 (11%)
  • Blocked: 2 (4%)

Top Contributors:
  1. Alice: 18 commits (avg quality: 9.2)
  2. Bob: 15 commits (avg quality: 8.5)
  3. Carol: 14 commits (avg quality: 8.8)

Quality Trends:
  Week 1: 8.2/10
  Week 2: 8.5/10
  Week 3: 8.9/10
  Week 4: 9.1/10 ↗️ Improving!

Blocked Work:
  • JIRA-1234: Waiting for API key (5 days)
  • JIRA-5678: Waiting for design approval (2 days)
```

---

## Error Handling (Enhanced)

### Smart Error Recovery

**No Staged Changes:**
```
No staged changes detected.

I can see you have modified files:
  • src/cart.js (modified)
  • src/cart.test.js (modified)

Would you like me to stage them for you?
  [Stage all] [Stage selectively] [Cancel]
```

**Commit Hook Failure:**
```
Pre-commit hook failed: ESLint errors found

Detected issues:
  • src/cart.js:42 - Unused variable 'temp'
  • src/cart.js:67 - Missing semicolon

Would you like me to:
  [Run eslint --fix] [Skip hook (not recommended)] [Cancel]
```

**Merge Conflicts:**
```
⚠️ Merge conflicts detected

Cannot commit while conflicts exist. Files with conflicts:
  • src/cart.js

Resolve conflicts first:
  1. Edit the files to resolve conflicts
  2. git add <resolved-files>
  3. Run /commit-with-context again
```

---

## Advanced Features

### Template Recommendation (NEW)

Based on detected patterns, suggest appropriate templates:

```
Based on your changes, I recommend using:

🎯 "Hotfix Template"
  Reason: Urgency detected (production branch, error keywords)
  Includes: Urgency, Downtime, Root Cause fields

Would you like to use this template? [Yes/No/See other templates]
```

### Multi-Part Series Tracking (NEW)

When continuing a series:

```
Detected: Continuing "User Dashboard" feature series

Series Progress:
  ✅ Part 1/4: Layout and auth
  ✅ Part 2/4: Order history
  🔄 Part 3/4: Profile (this commit)
  ⏳ Part 4/4: Settings

This commit will be marked as "part 3/4"

Summary suggestion: "Feature: User dashboard (part 3/4) - profile page"
```

---

## Success Criteria (Enhanced)

A successful execution results in:

1. ✅ Staged changes committed with structured message
2. ✅ Intelligent pre-filling based on repo and diff analysis
3. ✅ Commit type matches team conventions
4. ✅ Metrics and impact automatically calculated
5. ✅ Quality score 7.0+ (aim for 8.5+)
6. ✅ Related context linked where applicable
7. ✅ Summary under 50 characters and clear
8. ✅ All required fields filled meaningfully
9. ✅ User understands what was committed and why
10. ✅ Next steps documented for future work

---

## Implementation Notes

- All new features are progressive enhancements
- Graceful fallback if git commands fail
- User can disable emoji mode, metrics, or any feature
- Quality scoring is educational, not blocking
- Smart suggestions can be overridden
- Template recommendations are optional
- Analytics respect privacy (local only)

---

## Related Documentation

- [Getting Started](docs/GETTING_STARTED.md) - First-time setup
- [Templates](docs/TEMPLATES.md) - Commit templates
- [Examples](docs/EXAMPLES.md) - Real-world examples
- [Usage Guide](docs/USAGE.md) - Complete workflow
- [Advanced Features](docs/ADVANCED.md) - Customization
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues
