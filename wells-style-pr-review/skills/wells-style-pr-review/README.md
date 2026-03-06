# Wells-Style PR Review Skill

A local skill for conducting thorough, direct PR reviews organized by severity with specific file:line references.

## Quick Start

### Activate the skill in any Claude Code session:

```bash
cd /path/to/any/project
# In Claude Code session, say:
"review this PR: https://github.com/org/repo/pull/123"
```

The skill will automatically:
1. Fetch PR details via `gh` CLI
2. Analyze changes for security, blockers, quality issues
3. Generate a Wells-style review with categorized feedback

## Structure

```
.claude-skill/
├── SKILL.md                    # Navigation hub (280 lines)
├── docs/
│   ├── REVIEW_STRUCTURE.md     # How to organize reviews (390 lines)
│   ├── COMMUNICATION_STYLE.md  # Wells' direct tone (385 lines)
│   ├── TECHNICAL_PATTERNS.md   # What to look for (395 lines)
│   └── EXAMPLES.md             # Real annotated reviews (320 lines)
└── README.md                   # This file
```

## Key Features

### Security-First Focus
- SQL injection detection
- XSS vulnerabilities
- Auth/authz bypasses
- Secrets exposure

### Severity Categorization
1. **Security** - Always first, critical risks
2. **Blockers** - Must fix before merge
3. **Should-fix** - Important quality issues
4. **Low priority** - Suggestions for future

### Direct Communication
- Specific file:line references
- Clear expectations (no hedging)
- Appreciative even while critiquing
- Action-oriented feedback

## Customization

The skill is fully generalized with "CUSTOMIZE THIS" comments throughout. Adapt it for your team:

1. **Technical Patterns** (`docs/TECHNICAL_PATTERNS.md`)
   - Add stack-specific issues (Go, Rust, Python, etc.)
   - Document your architecture patterns
   - List framework-specific gotchas

2. **Communication Style** (`docs/COMMUNICATION_STYLE.md`)
   - Adjust formality level
   - Remove/keep profanity based on culture
   - Modify directness to match team

3. **Review Structure** (`docs/REVIEW_STRUCTURE.md`)
   - Add company-specific severity levels
   - Document team conventions
   - Customize category names

## Usage Examples

### Basic PR Review
```
"review PR #123"
"review this: https://github.com/org/repo/pull/456"
```

### Follow-up Review
```
"review PR #123 again"
"second review for PR #456"
```

### Stack-Specific
```
"review this React PR"
"review this backend API change"
```

## What Makes This Style Different

### Traditional Reviews
- "Consider maybe changing this..."
- "You might want to..."
- Vague locations ("somewhere in that file")
- Mixed severity (hard to prioritize)

### Wells Style
- "Fix X, then Y"
- "This will crash when [condition]. Fix: [solution]"
- Specific citations (file:line)
- Clear severity categories

## Success Metrics

A good review should:
- ✅ Catch 100% of security issues
- ✅ Provide specific file:line references
- ✅ Organize by severity (easy to prioritize)
- ✅ Include fix examples (show, don't just tell)
- ✅ Acknowledge good work
- ✅ Ask questions when uncertain

## Testing the Skill

1. **Test invocation:**
   ```
   cd /tmp
   # In Claude Code: "review this PR: [URL]"
   ```

2. **Verify structure:**
   - Security → Blockers → Should-fix sections
   - Every issue has file:line reference
   - Direct tone, no hedging

3. **Check output:**
   - Uses Wells' key phrases
   - Organized by severity
   - Includes code examples

## File Metrics

- **Total lines:** ~1,770
- **Main hub:** 280 lines (navigation)
- **Average guide:** 372 lines (scannable)
- **Focused guides:** 4 files covering core topics

## Version History

### 1.2.0 - Authentic Directness (2026-02-24)
- **Personalized statements**: Use developer names ("Kerr, fucking excellent work...")
- **Strategic profanity**: When to use emphatic language (critical bugs, exceptional work)
- **Technical directness**: Restored bite ("that's the wrong fucking instance", "log spam")
- **Enhanced examples**: Threading bugs review, personalized praise patterns
- **Updated guidelines**: When to use strong language vs when not to

### 1.1.0 - Enhanced Patterns (2026-02-24)
- **Review title format**: Standardized "## Review: APPROVE | REQUEST CHANGES"
- **Concrete data examples**: Step-by-step math/calculations to prove bugs
- **Table formatting**: Markdown tables for multiple similar issues
- **Verification statements**: Explicit "verified X = Y" to show checking
- **Multi-tenant security**: Tenant isolation, cross-tenant leaks, subdomain issues
- **Deployment issues**: Migration collisions, transaction requirements
- **Architectural patterns**: Circular dependencies, runtime environment issues
- **5 new annotated examples** from recent Wells reviews (PRs #73-82)

### 1.0.0 - Initial Release (2026-02-23)
- Navigation hub with quick start
- 4 focused guides (Structure, Style, Patterns, Examples)
- Fully generalized with customization points
- Based on real PR reviews from RocketPartners/launch-code

## Related Resources

- **Based on:** Wells' review style from Launch Code PR reviews
- **Documentation pattern:** Follows skill-documentation-guide
- **Claude Code:** Requires `gh` CLI for PR fetching

---

**Next Steps:**
1. Test on a few PRs to calibrate
2. Customize for your stack/team
3. Share with teammates
4. Iterate based on feedback
