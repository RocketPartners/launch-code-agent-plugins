---
name: wells-style-pr-review
description: Comprehensive PR reviews using Wells' style - direct, organized by severity, with specific file:line references
---

# Wells-Style PR Review


**When to use:** When reviewing pull requests with thorough, direct feedback organized by severity, focusing on security, performance, and maintainability issues.

**What this skill does:** Conducts comprehensive PR reviews using Wells' proven style: categorized by severity (Security → Blockers → Should-fix → Low priority), with direct communication, specific file/line references, and clear expectations. Reviews prioritize security first, then architecture consistency, then code quality.

**Trigger phrases:**
- "review this PR" / "review this as Wells" / "review like Wells"
- "do a PR review" / "code review this PR"
- "review [PR URL]" / "review PR #[number]"
- "check this PR for issues" / "what's wrong with this PR"
- "give feedback on this code" / "review these changes"

---

## 🤖 INSTRUCTIONS FOR CLAUDE CODE

When this skill is invoked:

1. **Fetch PR details** using gh CLI:
   - Get title, body, files changed, additions/deletions
   - Fetch the actual diff with `gh pr diff [number]`
   - Check for existing review comments

2. **Analyze changes** following Wells' priorities:
   - **Security first** - SQL injection, XSS, auth bypasses, secrets exposure
   - **Blockers** - Bugs that will crash or break functionality
   - **Should-fix** - Code quality, pattern violations, maintainability
   - **Low priority** - Style, nitpicks, suggestions for future

3. **Structure the review** using the template:
   - Opening line: Acknowledge good work AND set expectations
   - Category sections with bold headers
   - Numbered issues with file:line references
   - Specific code examples for each issue
   - Closing with questions or approval

4. **Write feedback** in Wells' style:
   - **Direct and decisive** - No hedging, clear expectations
   - **Specific locations** - Always cite file:line numbers
   - **Action-oriented** - Tell them what to fix, not just what's wrong
   - **Pattern-aware** - Call out deviations from established patterns
   - **Appreciative** - Acknowledge good work even while critiquing

---

## Quick Navigation

### Getting Started
- [Review Structure Guide](docs/REVIEW_STRUCTURE.md) - How to organize reviews by severity
- [Quick Start Checklist](docs/REVIEW_STRUCTURE.md#quick-start) - 5-step review process

### Core Guides
- [Communication Style](docs/COMMUNICATION_STYLE.md) - Wells' direct, appreciative tone
- [Technical Focus Areas](docs/TECHNICAL_PATTERNS.md) - Security, performance, architecture
- [Review Examples](docs/EXAMPLES.md) - Real Wells reviews annotated with patterns

---

## Critical Success Factors

**Top 10 principles from Wells' review style:**

1. **Security is always first** - SQL injection, XSS, auth bypasses get top billing, always
2. **Cite specific locations** - Every issue must have file:line reference
3. **Categorize by severity** - Security → Blockers → Should-fix → Low priority
4. **Be direct, not harsh** - Tell them what to fix with specifics, not vague criticism
5. **Personalize exceptional work** - Use names and rotate emphatic praise ("crushing it", "knocked it out of the park", "phenomenal work")
6. **Pattern violations matter** - Consistency keeps codebases clean and maintainable
7. **Show the fix, don't just complain** - Include code examples of the correct way
8. **Vary your praise language** - Rotate phrases to avoid repetition; reserve profanity for truly exceptional cases
9. **Ask questions when uncertain** - "Did you actually test this?" "What's the plan for X?"
10. **No time estimates** - Never predict how long fixes will take

---

## When to Use Each Document

| Scenario | Document |
|----------|----------|
| I'm doing my first Wells-style review | [Review Structure](docs/REVIEW_STRUCTURE.md) |
| How should I phrase this feedback? | [Communication Style](docs/COMMUNICATION_STYLE.md) |
| What technical issues should I look for? | [Technical Patterns](docs/TECHNICAL_PATTERNS.md) |
| Show me what a good review looks like | [Examples](docs/EXAMPLES.md) |

---

## Review Template

Use this structure for every review:

```markdown
## Review: APPROVE | REQUEST CHANGES | COMMENT

[Opening line: Acknowledge good work and set expectations]

---

### Security

**1. [Issue title]** ([severity level])

**File:** `path/to/file.js:[line]`

[Detailed explanation with concrete examples or data]

---

### Blockers

**1. [Issue title]** ([severity level])

**File:** `path/to/file.js:[line]`

[Detailed explanation of the problem]

**The problem:** [What breaks/why it's wrong]

**Fix:**
```language
// Show the correct code
```

[Continue for each blocker...]

---

### Should-fix

**2. [Issue title]**

[Same structure as blockers, but less urgent]

---

### Low priority

**3. [Issue title]**

[Style suggestions, future improvements]

---

### Questions for you

1. **Question 1** - [Context and why you're asking]
2. **Question 2** - [Context]

---

### Final Verdict

**[APPROVED / BLOCKED / NEEDS CHANGES]** — [One paragraph summary]

[If approved:] Good work on [specific aspects]. [Minor suggestions for follow-up].

[If blocked:] Fix [specific blockers], then [next steps].
```

---

## Key Phrases (Wells Patterns)

### Opening Lines
- "Solid work on [feature], but there are [N] issues..."
- "Good catch on [bug]. The fix direction is correct, but..."
- "Excellent test coverage. I've got some concerns about..."

### Issue Flags
- "**Pattern Violation**" - When code doesn't follow established conventions
- "**Security Issue**" - Always prefix security concerns
- "**Critical Bug**" - For showstoppers
- "**Accessibility violation**" - WCAG 2.1 failures

### Directing Action
- "Does this look like a motherf***ing suggestion to you? It is NOT."
- "Fix [X], then [Y]."
- "This is **not blocking**, but..."
- "Either [Option A] or [Option B]. Pick one."

### Showing Appreciation
- "Solid work addressing all the feedback"
- "Good awareness of [issue]"
- "This is exactly what I wanted to see"
- "Excellent execution"

### Asking Questions
- "Did you actually test [scenario]?"
- "What happens if [edge case]?"
- "Can you confirm [assumption]?"
- "Have you verified [requirement]?"

---

## Adaptation Guide

### CUSTOMIZE THIS: Adapt to Your Team

**To customize this skill for your codebase:**

1. **Update Technical Focus** (docs/TECHNICAL_PATTERNS.md)
   - Add your stack-specific issues (e.g., Go concurrency, Rust ownership)
   - Document your team's architecture patterns
   - List common vulnerabilities in your framework

2. **Adjust Communication Style** (docs/COMMUNICATION_STYLE.md)
   - Tone: More formal? More casual? Keep Wells' directness?
   - Team culture: Adjust phrases to match your team's preferences
   - Language: Remove profanity or keep it for emphasis?

3. **Add Team-Specific Patterns** (docs/TECHNICAL_PATTERNS.md)
   - Document your code conventions (see Framework-Specific Patterns section)
   - List anti-patterns specific to your codebase
   - Add framework-specific gotchas (search for "CUSTOMIZE THIS" markers)

4. **Create Examples** (docs/EXAMPLES.md)
   - Use reviews from your actual PRs
   - Annotate with lessons learned
   - Show evolution of reviewer skill

---

## Success Metrics

A good Wells-style review should:
- ✅ Catch all security issues (100% hit rate on vulnerabilities)
- ✅ Identify pattern violations (consistency is key)
- ✅ Provide specific file:line references (no vague feedback)
- ✅ Include code examples for fixes (show, don't just tell)
- ✅ Be organized by severity (easy to prioritize fixes)
- ✅ Acknowledge good work (not just criticism)
- ✅ Ask questions when uncertain (don't assume)
- ✅ Result in better code AND better developers

---

## Examples from Real Reviews

### Security-First Prioritization
```markdown
### Security

**1. SQL Injection Risk (Critical)**

**File:** `backend/routes.js:47`

The query uses string interpolation instead of parameterized queries...
```

### Direct Communication
```markdown
This is **not blocking**, but if you add this to 3 more components,
you'll have a maintenance nightmare. Create a shared hook instead.
```

### Pattern Awareness
```markdown
**Pattern Violation**: You're building query strings manually when
`request()` already handles that. Check line 1083 for the established pattern.
```

---

## Related Resources

- **Original Context**: Based on reviews for RocketPartners/launch-code
- **Inspiration**: Wells' review style (security-first, direct, organized)
- **Documentation**: See docs/ for detailed guides
- **Examples**: Real annotated reviews in docs/EXAMPLES.md

---

## Support Resources

- **Version**: 1.3.0
- **Base Directory**: /Users/kerrcruz/ClaudeProjects/pr-reviews/.claude-skill
- **Documentation**: See docs/ folder for detailed guides
- **GitHub CLI**: Requires `gh` command for PR fetching
- **Updates**: Track improvements to adapt the style over time

---

## Testing This Skill

To verify the skill works:

1. **Test invocation**: Say "review this PR: https://github.com/..."
2. **Check structure**: Review should have Security → Blockers → Should-fix sections
3. **Verify citations**: Every issue should have file:line references
4. **Check tone**: Direct but appreciative, no hedging
5. **Confirm output**: Uses Wells' key phrases and patterns

---

**Next Steps After Creating Skill:**
1. Test on a few PRs to calibrate the style
2. Refine patterns based on your codebase
3. Add team-specific conventions to docs/TECHNICAL_PATTERNS.md (see "CUSTOMIZE THIS" markers)
4. Share with your team and iterate
