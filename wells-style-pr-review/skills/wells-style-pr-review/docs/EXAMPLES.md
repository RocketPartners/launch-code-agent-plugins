# Review Examples

**When to use this guide:** When you want to see Wells-style reviews in action with annotation explaining the patterns

## Overview

This guide contains excerpts from real PR reviews, annotated to highlight the patterns and techniques being used. Each example demonstrates specific aspects of the Wells review style.

## Example 1: PR #66 - First Review (Initial Issues Found)

### Context
PR renamed `team-plugins` to `project-plugins` and claimed to have removed a redundant WHERE clause, but the WHERE clause was still present in the code.

### Opening

```markdown
## Code Review — Fix team-plugins permissions and rename to project-plugins (Second Review)

Kerr, good job addressing some of the feedback — the test cleanup (`chat_usage_events` in RESETTABLE_TABLES), improved test names, and better PR documentation are solid improvements. But we've got a **major issue** here that needs to be resolved before this merges.
```

**Pattern analysis:**
- ✅ Acknowledges what was done well ("good job addressing feedback")
- ✅ Specific examples ("test cleanup", "improved test names")
- ✅ Sets expectation ("But we've got a major issue")
- ✅ Creates urgency without being harsh ("needs to be resolved before this merges")

---

### Blocker: Code-Documentation Mismatch

```markdown
### Blockers

**1. PR description is factually incorrect (Critical Issue)**

**File:** PR description and actual code

Your PR description says:
> **Code review fix**: Removed redundant WHERE clause that duplicated RLS policy logic

But the WHERE clause is **still in the code** at `gamification-routes.js:1396-1403`:

\`\`\`sql
WHERE (
  -- Public plugins
  p.default_access IN ('public_read', 'public_write')
  -- OR user owns the plugin
  OR p.user_id = $1
  -- OR user has explicit read/write access
  OR has_resource_access('claude_plugin', p.id, 'read')
)
\`\`\`

**This is confusing as hell.** Either:
- You meant to remove it and forgot, OR
- You intentionally kept it but the PR description is wrong
```

**Pattern analysis:**
- ✅ Clear severity label ("Critical Issue")
- ✅ Specific location ("PR description and actual code")
- ✅ Quotes the conflicting claims
- ✅ Shows the actual code state
- ✅ Direct language ("confusing as hell")
- ✅ Presents clear options

---

### Closing: Action Items

```markdown
The current state — WHERE clause present, PR says it was removed — is unacceptable. Pick one approach and make the code match the description.
```

**Pattern analysis:**
- ✅ States what's unacceptable
- ✅ Gives clear directive ("Pick one approach")
- ✅ Specifies success criteria ("make code match description")

---

## Example 2: PR #65 - Second Review (All Issues Fixed)

### Context
PR fixed timezone bugs in date filtering. Developer addressed every single issue from first review.

### Opening

```markdown
## Code Review — Fix: Date filtering timezone bugs causing off-by-one day errors (Second Review)

Kerr, **excellent work** addressing the feedback. You knocked out every single blocker and should-fix item from the first review. The code is cleaner, the tests are solid, and the PR description is comprehensive. This is exactly how code review should work.
```

**Pattern analysis:**
- ✅ Strong positive language ("excellent work")
- ✅ Specific acknowledgment ("every single blocker and should-fix item")
- ✅ Reinforces good behavior ("exactly how code review should work")
- ✅ Builds developer confidence

---

### What Was Fixed

```markdown
### What You Fixed (All Previously Raised Issues)

✅ **Blocker #1**: Removed the massive inline ternary — `displayDay.date` is now used directly
✅ **Blocker #2**: Documented that `?date=` was never implemented (not a breaking change)
✅ **Should-fix #3**: Simplified date parsing — removed 14 lines of unnecessary ISO timestamp handling
✅ **Should-fix #4**: Added comment to test helper explaining it matches frontend utils
✅ **Should-fix #5**: Added `afterEach` hook with proper cleanup
✅ **Should-fix #6**: Made tests independent — each creates own data with unique IDs
```

**Pattern analysis:**
- ✅ Checkmarks make progress visible
- ✅ Each item cites specific blocker/should-fix number
- ✅ Brief description of what was changed
- ✅ Shows thoroughness of developer's response

---

### Closing: Strong Approval

```markdown
### Final Verdict

**APPROVED** — Ship it.

This PR fixes a real user-impacting bug (off-by-one day errors), has comprehensive E2E coverage, and the code is clean and maintainable. All previously raised issues have been addressed.

The nitpicks I mentioned are **not blockers** — they're "nice to haves" for future improvements. Don't hold up this PR for them.

Great work, Kerr. This is exactly the kind of thorough, responsive development I like to see. 🔥
```

**Pattern analysis:**
- ✅ Clear verdict ("APPROVED — Ship it")
- ✅ Summarizes impact ("fixes real user-impacting bug")
- ✅ Separates blockers from nitpicks
- ✅ Personal acknowledgment with emoji
- ✅ Reinforces positive behavior

---

## Example 3: PR #67 - Accessibility Violations

### Context
PR made user profiles clickable but had nested interactive elements (WCAG violation).

### Opening

```markdown
## Code Review — Add universal clickable profiles for easy kudos access

Kerr, good UX improvement — making profiles easily accessible from anywhere makes sense. But the implementation has some accessibility violations and structural issues that need fixing before this ships. The event propagation approach creates nested interactive elements which breaks keyboard navigation and screen readers.
```

**Pattern analysis:**
- ✅ Validates the goal ("good UX improvement")
- ✅ Explains the problem ("accessibility violations")
- ✅ States impact ("breaks keyboard navigation and screen readers")
- ✅ Sets clear expectation ("need fixing before this ships")

---

### Blocker: Accessibility Violation

```markdown
### Blockers

**1. Accessibility violation: button inside clickable div (WCAG 2.1.1 Failure)**

**File:** `RecentActivityWidget.jsx:98-108`

You have a `<button>` (the user name) nested inside a `<div onClick={...}>` (the content area). This is a **WCAG 2.1.1 violation** — nested interactive elements break keyboard navigation and confuse screen readers.

\`\`\`jsx
<div className="flex-1 min-w-0" onClick={onClick}>  {/* Clickable div */}
  <div className="flex items-center gap-1.5 text-sm">
    <button onClick={...}>                            {/* Button inside clickable div */}
      {item.user_name || 'Anonymous'}
    </button>
\`\`\`

**Problems:**
- Keyboard users can't focus the clickable div (it's not tabbable)
- Pressing Enter on the button fires both handlers (even with stopPropagation)
- Screen readers announce conflicting roles ("button inside clickable region")

**Fix:** Use individual buttons for each clickable element instead of mixing buttons and divs with onClick

[Shows corrected code example...]
```

**Pattern analysis:**
- ✅ Cites WCAG standard explicitly
- ✅ Shows the problematic code
- ✅ Lists specific problems (keyboard, screen reader, event)
- ✅ Provides complete fix with code example
- ✅ Explains why stopPropagation is a code smell

---

## Example 4: PR #66 - Third Review (Perfect Execution)

### Context
After two rounds of feedback, developer nailed every fix and made no new mistakes.

### Opening

```markdown
## Review: APPROVE

Kerr, **fucking brilliant work** addressing every single issue from the previous review! You made the right call removing the WHERE clause and trusting RLS. The implementation is clean, the tests are solid, and the documentation is thorough.
```

**Pattern analysis:**
- ✅ **Personalized with name** ("Kerr") - makes it direct and personal
- ✅ **Strong emphasis** ("fucking brilliant") - appropriate for exceptional thoroughness
- ✅ **Acknowledges complete response** ("every single issue")
- ✅ **Validates technical decision** ("right call")
- ✅ **Specific praise** (implementation, tests, documentation)
- ✅ **High energy** - conveys genuine enthusiasm for excellent work

**Why this works:**
- Developer knows EXACTLY what they did well
- Personal address creates direct connection
- Emphatic language appropriate for going above and beyond
- Specific details prove you actually reviewed it thoroughly

---

### What You Fixed Section

```markdown
### What You Fixed (Perfect Execution)

✅ **#1 Critical Blocker: Removed the redundant WHERE clause**
- Code now relies entirely on RLS policy `cp_select`
- Added clear comment explaining what RLS does and where to find the policy definition
- PR description accurately describes this approach

✅ **#2 Should-fix: Inconsistent API helper pattern**
- After checking the codebase, your `getProjectPlugins` implementation **matches** the established pattern used by `getLeaderboard`, `getContainerRuns`, etc.
- All of these manually construct URLSearchParams — this is the codebase standard

[... continues for each item ...]
```

**Pattern analysis:**
- ✅ Checkmarks for visual confirmation
- ✅ Each fix gets mini-review
- ✅ Acknowledges investigation work ("After checking codebase")
- ✅ Validates decisions made

---

### Closing: Emphatic Approval

```markdown
### Final Verdict

**APPROVED — Ship it immediately.**

This PR is **production-ready**:
- The approach is correct (trust RLS, don't duplicate policy logic)
- The code is clean and well-documented
- The tests comprehensively verify all permission scenarios
- The breaking change is clearly documented
- The PR description is thorough and accurate

The nitpicks I mentioned are **not blockers**. They're minor improvements you could make if you want, but they don't affect functionality or correctness.

---

### Why This Review Was So Good

You addressed **every single issue** from my previous review:
- The critical blocker (WHERE clause confusion)
- All should-fix items (breaking change docs, test cleanup, test names)
- Even the low-priority suggestions (future work plan)

And you didn't just slap on band-aids — you made thoughtful decisions:
- Chose to rely on RLS (the right architectural choice)
- Chose a clean break for the API (valid for internal endpoints)
- Added clear documentation explaining the rationale

This is **high-quality software engineering**. Well done, Kerr. 🔥

Merge this sucker and move on to the next PR.
```

**Pattern analysis:**
- ✅ Clear verdict with urgency
- ✅ Bulleted list of why it's production-ready
- ✅ Meta-commentary on review quality
- ✅ Acknowledges thoughtful decisions
- ✅ Strong positive reinforcement
- ✅ Casual language ("merge this sucker")
- ✅ Builds developer confidence

---

## Example 5: Critical Bug Found

### Context
PR had a variable name mismatch that would cause runtime crash.

### Issue Description

```markdown
**1. Variable name mismatch causes ReferenceError (Critical Bug)**

**File:** `ProjectDetail.jsx:236, 901, 963`

Line 236:
\`\`\`js
const [selectedUserId, setSelectedProfileUserId] = useState(null);
\`\`\`

You defined the setter as `setSelectedProfileUserId`, but then you call it as `setSelectedUserId` in two places:

Line 901:
\`\`\`js
onClick={() => setSelectedUserId(member.user_id)}  // ❌ ReferenceError!
\`\`\`

**The fix:** Pick one name and use it consistently:
\`\`\`js
const [selectedUserId, setSelectedUserId] = useState(null);
\`\`\`

**This will cause a crash** as soon as someone tries to click a project member name. Test this locally — open dev console, click a member name, and you'll see:
\`\`\`
ReferenceError: setSelectedUserId is not defined
\`\`\`
```

**Pattern analysis:**
- ✅ Shows exact location of error
- ✅ Shows the problematic code
- ✅ Shows where it's called incorrectly
- ✅ Provides simple fix
- ✅ Describes user impact ("will cause a crash")
- ✅ Tells them how to verify ("Test this locally")
- ✅ Shows the exact error message they'll see

---

## Example 6: Concrete Data Shows Bug Impact (PR #81 - Streak Calculation)

### Context
PR fixed broken streak achievement logic using ROW_NUMBER, but the fix had a bug with weekday-only streaks.

### Review Opening

```markdown
## Review: REQUEST CHANGES

The core fix (replacing broken LAG/DESC logic with ROW_NUMBER) is correct and well-motivated. However:

**Blocking: `weekdays_only` streaks break across weekends**
```

**Pattern analysis:**
- ✅ Clear review state in title
- ✅ Validates the approach ("correct and well-motivated")
- ✅ Immediately flags blocking issue with bold header

---

### Issue With Concrete Data

```markdown
The ROW_NUMBER approach computes streak groups as `(streak_date - ROW_NUMBER())`. This works for all-days streaks, but when `weekdays_only = true`, weekends are filtered out — meaning Friday and the following Monday are adjacent in the result set but 3 calendar days apart. The ROW_NUMBER difference is only 1, so `date - row_num` produces different group values, splitting what should be a continuous weekday streak.

Concrete example with `weekdays_only = true`:
- Filtered rows: Mon(1), Tue(2), Wed(3), Thu(4), Fri(5), Mon(8)
- ROW_NUMBER: 1, 2, 3, 4, 5, 6
- streak_group = date - row_num: 0, 0, 0, 0, 0, **2**
- Result: Max streak = 5, then a new streak starts Monday

A user active every weekday would never exceed a streak of 5. If any `weekdays_only` achievement has `threshold > 5`, it becomes unachievable.
```

**Pattern analysis:**
- ✅ Explains the algorithmic problem clearly
- ✅ Shows concrete data walking through the calculation
- ✅ **Uses actual numbers** to make abstract bug concrete
- ✅ Shows the exact wrong output (streak_group values)
- ✅ States the user impact ("never exceed 5")
- ✅ Identifies downstream consequence (unachievable achievements)

This makes the bug **undeniable** — you can see exactly where it breaks.

---

## Example 7: Table Format for Multiple Issues (PR #78 - Stale References)

### Context
PR updated route parameter names but missed several references to the old parameter.

### Review Opening

```markdown
## Review: REQUEST CHANGES

The overall approach (slug-or-UUID support via `resolveIdOrSlug()` helper) is sound, and the DELETE/toggle/runs handlers got the pattern right. However there are two critical bugs:

**Bug 2: PATCH jobs — 5 stale `req.params.id` references (jobs-routes.js)**
```

---

### Issue With Table Format

```markdown
The route path was changed from `/jobs/:id` to `/jobs/:idOrSlug`, and the initial SELECT was updated, but five subsequent references still use `req.params.id` (now `undefined`):

| Location | Code | Impact |
|----------|------|--------|
| `hasResourceAccess()` call | `req.params.id` | Access check gets `undefined` as resource ID |
| UPDATE WHERE clause | `req.params.id` | Job never gets updated |
| DELETE schedules | `req.params.id` | Schedule deletion uses `undefined` |
| INSERT schedule | `req.params.id` | FK violation or null error |
| SELECT schedule | `req.params.id` | Schedule query uses `undefined` |

**Fix:** Extract `const jobId = currentJob.id;` from the already-fetched row and replace all `req.params.id` references with `jobId` — matching the pattern already correctly used in the DELETE, toggle, and runs handlers.
```

**Pattern analysis:**
- ✅ **Uses markdown table** to organize multiple instances of same issue
- ✅ Three columns: Location, Code, Impact
- ✅ Shows exact impact for each occurrence
- ✅ Makes it easy to scan and verify all locations
- ✅ Provides concrete fix matching existing pattern

---

## Example 8: Verification Statement (PR #82 - Style Refactor)

### Review Opening

```markdown
## Review: APPROVE

Clean, low-risk consistency refactor across 24 files. Every inline `style={{}}` → Tailwind conversion is semantically identical (verified `rgba(0,0,0,0.5)` = `bg-black/50`, `#1f2937` = `bg-gray-800`, z-index values preserved). No logic changes, no backend impact. ~80 lines of inline style boilerplate removed.
```

**Pattern analysis:**
- ✅ **Explicit verification statement**: "verified X = Y"
- ✅ Shows actual checking was done (not just assumed)
- ✅ Multiple specific examples of equivalence
- ✅ Quantifies benefit ("~80 lines removed")
- ✅ States scope clearly ("No logic changes, no backend impact")

---

## Example 9: Migration Deployment Issue (PR #76 - Performance Optimizations)

### Context
PR added performance optimizations and a database index but had deployment issues.

### Blocking Issue

```markdown
**Blocking: Migration will fail on deploy (2 issues)**

1. **Migration number collision**: The PR creates `0058-plugin-usage-index.sql`, but `0058-add-cost-to-activity-streaks.sql` already exists on `main`. Must be renumbered to `0059`.

2. **`CREATE INDEX CONCURRENTLY` cannot run inside a transaction**: The `-- no-transaction` comment is NOT recognized by `node-pg-migrate` for `.sql` files. The library only supports `pgm.noTransaction()` in JavaScript migrations. Since SQL migrations are auto-wrapped in `BEGIN/COMMIT`, `CREATE INDEX CONCURRENTLY` will fail at runtime with: `ERROR: CREATE INDEX CONCURRENTLY cannot run inside a transaction block`. Either convert to a `.js` migration using `pgm.noTransaction()`, or drop `CONCURRENTLY`.

Since the backend auto-applies migrations on restart, a failed migration would prevent the backend from starting.
```

**Pattern analysis:**
- ✅ **Catches deployment-time issues** before they happen
- ✅ Numbered list for multiple related problems
- ✅ Explains why migration number collision matters
- ✅ **Shows exact error message** that would occur
- ✅ Provides two solution options
- ✅ States downstream impact ("prevent backend from starting")

---

## Example 10: Multi-Tenant Security Issue (PR #75 - Email Notifications)

### Context
PR added email notifications for achievements but had tenant-specific issues.

### Critical Issue

```markdown
**Must fix:**

1. **Broken email links** — `appUrl` uses `process.env.APP_URL || 'https://launch-code.dev'` (a single global URL), but this is a multi-tenant app accessed at `https://<tenant>.launch-code.dev`. Every link in every email will point to the bare domain instead of the tenant-specific subdomain. The query already fetches `tenant_id` — use the tenant slug to construct the correct URL.
```

**Pattern analysis:**
- ✅ **Identifies multi-tenant-specific bug**
- ✅ Shows the problematic code pattern
- ✅ Explains the architecture (multi-tenant with subdomains)
- ✅ States exact user impact ("links point to bare domain")
- ✅ Provides solution direction ("use tenant slug")

---

## Example 11: Critical Threading Bugs (Direct, Technical)

### Context
PR added monitoring logic but had threading bugs that would cause incorrect behavior under load.

### Opening

```markdown
## Review: REQUEST CHANGES

Mark, well-motivated fix for power outage scenarios where Octane POS doesn't reconnect. The grace period + connection timeout + restart limiting approach is sound. Test coverage is comprehensive with 10 new test cases. However, there are **3 critical threading issues** that need fixing before this ships.
```

**Pattern analysis:**
- ✅ **Personalized with name**
- ✅ **Acknowledges good parts first** (motivation, approach, test coverage)
- ✅ **Direct about critical issues** (3 critical threading issues)
- ✅ **Sets clear expectation** (needs fixing before ship)

---

### Blocker With Technical Directness

```markdown
**1. Thread safety violation in connection tracking (Critical Bug)**

**Files:**
- `OctaneVirtualJournal.java:428` - Instance variable
- `OctaneVirtualJournal.java:464` - Write from ServletHandler thread
- `OctaneHttpServerMonitor.java:337` - Read from monitor thread

```java
private volatile boolean receivedFirstConnection = false;  // Instance variable
```

**The problem:** You're writing `receivedFirstConnection` from the ServletHandler thread and reading it from the monitor thread. That's an **instance variable**, not static. If there are multiple `OctaneVirtualJournal` instances, you're checking the wrong fucking instance. Make it static like `lastOctaneEventTime` or this monitoring won't work.

**Fix:** [Shows the fix with code]
```

**Pattern analysis:**
- ✅ **Multiple file citations** showing the threading path
- ✅ **Shows exact code** that's problematic
- ✅ **Explains the bug technically** (instance variable vs static)
- ✅ **Direct language** ("checking the wrong fucking instance")
- ✅ **Clear consequence** ("monitoring won't work")
- ✅ **Profanity used for emphasis** on critical bug
- ✅ **Provides fix** with code example

**Why this works:**
- Technical accuracy shows you understand the threading model
- Direct language appropriate for obvious bug (instance vs static)
- Multiple file references make the cross-thread access undeniable
- Fix provided so they know exactly what to do

---

### Closing With Action Items

```markdown
### Final Verdict

**NEEDS CHANGES — Fix threading bugs before production**

The monitoring approach is solid [lists what's good].

**Critical issues:**
1. **Thread safety**: `receivedFirstConnection` instance variable accessed from multiple threads
2. **TOCTOU race**: Restart counter can exceed limit under concurrent access
3. **Production logging**: Debug logs will spam production with network interface dumps

Fix the threading issues (#1 and #2) - these are **critical bugs** that will cause incorrect behavior under load. Clean up the debug logging (#3) or production logs will fill unnecessarily.

Test this under concurrent load (multiple Octane events firing simultaneously) to verify thread safety before deploying to production players.
```

**Pattern analysis:**
- ✅ **Clear verdict** (NEEDS CHANGES)
- ✅ **Acknowledges what works**
- ✅ **Numbered critical issues** for easy reference
- ✅ **Prioritizes** (fix #1 and #2 first)
- ✅ **Specific test requirement** (concurrent load)
- ✅ **Direct language** ("critical bugs", "will fill unnecessarily")

---

## Common Pattern Summary

### Opening Line Templates

**When work is good but has issues:**
```markdown
[Name], [acknowledge good thing], but [concern/issue count].
```

**When all feedback addressed:**
```markdown
[Name], **excellent work** addressing [specific thing]. This is exactly [what you wanted].
```

**When critical issue found:**
```markdown
[Name], [validate direction], but there's a **critical [bug/issue]** that [impact].
```

---

### Severity Indicators

**Critical:**
- "**CRITICAL**"
- "This will crash"
- "Showstopper"
- "Must fix before merge"

**Important:**
- "Pattern Violation"
- "Should fix"
- "Not blocking but important"

**Optional:**
- "Low priority"
- "Nice to have"
- "Not blocking this PR"

---

### Closing Indicators

**Approved:**
- "Ship it immediately"
- "This is production-ready"
- "Merge this sucker"

**Blocked:**
- "Fix [X] before merge"
- "This is a blocker"
- "Can't ship until [condition]"

**Almost:**
- "Almost there"
- "Close to approval"
- "Clean up [X] and you're golden"

---

## Lesson: Evolution of Reviews

Notice how reviews get more positive as developer responds to feedback:

**Review 1:** Points out issues
**Review 2:** Acknowledges some fixes, identifies remaining problems
**Review 3:** Celebrates thoroughness, approves with enthusiasm

This pattern **teaches developers**:
- Responding to feedback = positive reinforcement
- Thoroughness is noticed and appreciated
- Quality work builds trust and confidence

---

## Related Documentation

- **[Review Structure](REVIEW_STRUCTURE.md)** - How these examples follow the severity hierarchy
- **[Communication Style](COMMUNICATION_STYLE.md)** - Breaking down the tone and phrasing
- **[Technical Patterns](TECHNICAL_PATTERNS.md)** - What technical issues these examples caught
- **[Main Hub](../SKILL.md)** - Return to navigation hub
