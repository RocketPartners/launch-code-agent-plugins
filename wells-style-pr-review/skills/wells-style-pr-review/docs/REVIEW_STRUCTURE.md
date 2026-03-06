# Review Structure Guide

**When to use this guide:** When organizing your PR review feedback and determining issue severity

## Overview

Wells' review style is built on clear hierarchical organization. Every issue is categorized by severity and presented in priority order. This makes it immediately obvious what must be fixed now vs. what can wait.

The structure isn't arbitrary—it mirrors how developers should approach fixes: security first (data at risk), then functionality (features broken), then quality (maintainability), then style (nice-to-haves).

## Quick Start

**5-step review process:**

1. **Fetch the PR**: `gh pr view [number] --json title,body,files` and `gh pr diff [number]`
2. **Scan for security**: SQL injection, XSS, auth bypasses, secrets—these go first
3. **Find blockers**: Bugs that will crash, break features, or violate accessibility
4. **Note quality issues**: Pattern violations, duplication, maintainability problems
5. **List suggestions**: Style nitpicks, future improvements, optional enhancements

## Severity Categories

### Security (Always First)

**What goes here:**
- SQL injection vulnerabilities
- XSS (Cross-Site Scripting) risks
- Authentication bypasses
- Authorization failures (RLS policy issues, permission checks missing)
- Secrets exposure (.env files committed, API keys in code)
- CSRF vulnerabilities
- Insecure data transmission

**Priority level:** CRITICAL - Must fix before merge

**Example heading:**
```markdown
### Security

**1. SQL Injection Risk via String Interpolation (Critical)**

**File:** `backend/src/routes/users.js:47`

The query concatenates user input directly...
```

**CUSTOMIZE THIS:** Add security issues specific to your stack:
- **Go**: Race conditions, goroutine leaks, unsafe pointer usage, SQL injection via fmt.Sprintf
- **Rust**: Unsafe blocks without justification, Send/Sync violations, memory safety in FFI
- **Python**: Pickle deserialization, eval() usage, subprocess shell=True, YAML unsafe loading
- **Mobile**: Certificate pinning bypass, insecure data storage, deep link hijacking
- **Cloud/Infrastructure**: Exposed secrets in environment variables, overly permissive IAM roles, unencrypted data at rest
- **Microservices**: Service-to-service auth missing, API gateway bypasses, unvalidated JWT claims

---

### Blockers

**What goes here:**
- Runtime errors (TypeError, ReferenceError, null pointer exceptions)
- Broken functionality (features don't work as intended)
- Accessibility violations (WCAG 2.1 Level A/AA failures)
- Data loss risks (missing transaction handling, no error recovery)
- Critical performance issues (unbounded queries, N+1 problems)
- Breaking API changes without deprecation

**Priority level:** MUST FIX - Blocks merge

**Example heading:**
```markdown
### Blockers

**1. Variable Name Mismatch Causes ReferenceError (Critical Bug)**

**File:** `ProjectDetail.jsx:236`

Line 236:
\`\`\`js
const [selectedUserId, setSelectedProfileUserId] = useState(null);
\`\`\`

You defined the setter as \`setSelectedProfileUserId\`, but then call it as \`setSelectedUserId\` at lines 901 and 963...

**Fix:**
\`\`\`js
const [selectedUserId, setSelectedUserId] = useState(null);
\`\`\`
```

**CUSTOMIZE THIS:** Add blockers specific to your domain:
- **E-commerce**: Payment processing errors, cart corruption
- **Healthcare**: HIPAA violations, patient data exposure
- **Finance**: Transaction integrity, audit trail gaps
- **Real-time systems**: Race conditions, deadlocks

---

### Should-fix

**What goes here:**
- Pattern violations (deviating from established conventions)
- Code duplication (copy-paste that should be abstracted)
- Missing error handling (no try/catch, no validation)
- Performance concerns (not critical but noticeable)
- Maintainability issues (hard to understand, fragile)
- Test gaps (missing edge cases, incomplete coverage)
- Incomplete features (works but half-baked)

**Priority level:** FIX BEFORE MERGE - Not blocking but important

**Example heading:**
```markdown
### Should-fix

**2. Inconsistent API Helper Pattern (Pattern Violation)**

**File:** `sync-files/api.js:1086-1089`

You're building query strings manually:
\`\`\`js
const params = new URLSearchParams(opts).toString();
return request('GET', \`/api/endpoint?\${params}\`);
\`\`\`

But \`getTeamAchievements\` (line 1083) doesn't do this. Check how other functions in this file handle query params and match the pattern.
```

**CUSTOMIZE THIS:** Document your team's specific patterns:
- **React**: Component patterns, hook usage, state management, prop drilling limits
- **Backend**: Error handling, logging, transaction patterns, retry strategies
- **Database**: Migration conventions, query optimization, index strategies, RLS policies
- **Testing**: Test structure, mock strategies, assertion styles, coverage requirements
- **DevOps**: Deployment patterns, rollback procedures, feature flag usage
- **Documentation**: Code comment style, README requirements, API documentation standards

---

### Low Priority

**What goes here:**
- Style suggestions (formatting, naming that doesn't violate conventions)
- Future improvements (not needed now but worth mentioning)
- Nitpicks (personal preferences, minor inconsistencies)
- Documentation suggestions (comments, README updates)
- Refactoring opportunities (not urgent)

**Priority level:** OPTIONAL - Nice to have but don't block merge

**Example heading:**
```markdown
### Low priority

**6. Test file getting large (Maintenance Note)**

\`gamification.test.js\` is now 2,405 lines. Consider splitting in a future PR:
- \`gamification-achievements.test.js\`
- \`gamification-plugins.test.js\`
- \`gamification-kudos.test.js\`

Not blocking this PR, but track it for later.
```

---

## Review Flow

### Opening Line Template

Start every review with acknowledgment + expectation-setting:

```markdown
## Code Review — [PR Title]

[Name], [positive observation about the work], but [high-level concern or count of issues].

[If major issues:] We gotta [fix X] before this ships.
[If minor issues:] A few things to clean up and you're good to go.
[If excellent:] Solid work. [Minor suggestions] then ship it.
```

**Examples:**
- "Kerr, excellent work addressing every single issue from the previous review. You knocked out all blockers AND the polish items. This is exactly how code review should work."
- "Good catch on the timezone bug—this is a legit issue. The root cause analysis is solid, but the implementation has some issues that need cleanup."
- "Solid work on the rename and comprehensive E2E coverage. But I've got a **major issue** with the approach here."

---

### Category Structure

**Always use this order:**

1. **Security** (if any security issues)
2. **Blockers** (must fix to merge)
3. **Should-fix** (fix before merge, but not blocking)
4. **Low priority** (optional improvements)
5. **Questions for you** (clarifications needed)
6. **Final Verdict** (approve, block, or request changes)

**Example structure:**
```markdown
---

### Security

**1. [Issue title]**
[Details with file:line]

---

### Blockers

**2. [Issue title]**
[Details with file:line]

**3. [Issue title]**
[Details with file:line]

---

### Should-fix

**4. [Issue title]**
[Details with file:line]

---

### Low priority

**5. [Issue title]**
[Details with file:line]

---

### Questions for you

1. **Question 1** - [Context]
2. **Question 2** - [Context]

---

### Final Verdict

**APPROVED** — [Summary and next steps]
```

---

## Numbering Issues

**Number issues sequentially** across all categories:

```markdown
### Security
**1. SQL injection risk**

### Blockers
**2. Runtime error**
**3. Accessibility violation**

### Should-fix
**4. Pattern violation**
**5. Missing tests**
```

This makes it easy to reference: "Fix issues #1-3 before merge."

---

## File:Line Citations

**ALWAYS include specific location references:**

```markdown
**File:** `backend/src/routes.js:47`

**File:** `ProjectDetail.jsx:236, 901, 963`

**File:** Multiple files:
- `RecentActivityWidget.jsx:79`
- `RecentKudosFeed.jsx:80`
- `ProjectDetail.jsx:906`
```

**Why this matters:**
- Makes issues easy to find
- Shows you actually read the code
- Prevents vague "somewhere in that file" feedback
- Helps with verification after fixes

---

## Closing Templates

### Approval

```markdown
### Final Verdict

**APPROVED — Ship it immediately.**

[Acknowledge what was done well]

[Minor suggestions for follow-up if any]

Great work, [Name]. 🔥
```

### Blocked

```markdown
### Final Verdict

**BLOCKED — Critical issues must be fixed.**

[List specific blockers by number]

Fix [#1-3], then [next steps: retest, re-review, etc.].

[If many issues:] Don't try to fix everything at once. Focus on Security and Blockers first.
```

### Changes Requested

```markdown
### Final Verdict

**NEEDS CHANGES — Almost there.**

[What's blocking:]
- Fix [specific issue]
- Clarify [specific question]
- Test [specific scenario]

[What's good:]
- [Acknowledge positive aspects]

Clean up [X], verify [Y], and this is good to merge.
```

---

## Common Mistakes to Avoid

### ❌ Don't: Mix severities
```markdown
### Issues
1. SQL injection (security)
2. Typo in comment (low priority)
3. Runtime error (blocker)
```

### ✅ Do: Group by severity
```markdown
### Security
**1. SQL injection**

### Blockers
**2. Runtime error**

### Low priority
**3. Typo in comment**
```

---

### ❌ Don't: Vague locations
```markdown
The error handling is missing in several places.
```

### ✅ Do: Specific citations
```markdown
**Files:** Missing error handling:
- `api.js:45` - fetch() call has no try/catch
- `db.js:89` - query() doesn't handle connection errors
- `auth.js:123` - token refresh fails silently
```

---

### ❌ Don't: Just describe problems
```markdown
The WHERE clause is redundant.
```

### ✅ Do: Show the fix
```markdown
The WHERE clause is redundant—RLS policy already enforces this.

**Fix:** Remove lines 1396-1403 and add a comment:
\`\`\`sql
-- RLS policy cp_select enforces visibility automatically
ORDER BY tw.usage_count DESC
\`\`\`
```

---

## Related Documentation

- **[Communication Style](COMMUNICATION_STYLE.md)** - How to phrase feedback directly but kindly
- **[Technical Patterns](TECHNICAL_PATTERNS.md)** - What to look for in each category
- **[Examples](EXAMPLES.md)** - Full annotated reviews showing this structure in action
- **[Main Hub](../SKILL.md)** - Return to navigation hub
