# Changelog

All notable changes to the Wells-Style PR Review skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-23

### Added
- Initial Wells-style PR review skill with comprehensive documentation
- Navigation hub in SKILL.md (280 lines) with quick start and scenario-based navigation
- Four focused documentation guides:
  - `REVIEW_STRUCTURE.md` (390 lines) - Severity categorization and review flow
  - `COMMUNICATION_STYLE.md` (385 lines) - Direct but appreciative tone patterns
  - `TECHNICAL_PATTERNS.md` (395 lines) - Security, performance, architecture focus areas
  - `EXAMPLES.md` (320 lines) - Real annotated reviews from production PRs
- Security-first prioritization framework
- Specific file:line citation requirements
- "CUSTOMIZE THIS" markers throughout guides for team adaptation
- Adaptation guide for customizing to different tech stacks and team cultures

### Key Features
- **Security-first focus**: SQL injection, XSS, auth/authz, secrets exposure
- **Severity categorization**: Security → Blockers → Should-fix → Low priority
- **Direct communication**: Clear expectations, no hedging, action-oriented
- **Pattern awareness**: Consistency and established convention enforcement
- **Appreciative tone**: Acknowledge good work while critiquing issues
- **Specific citations**: Every issue includes file:line references
- **Code examples**: Show fixes, don't just describe problems

### Documentation Structure
- Total lines: ~1,770 across 5 files
- Average guide length: ~372 lines (highly scannable)
- Navigation hub: 280 lines
- Focused guides: 250-400 lines each
- Real-world examples with pattern annotations

### Based On
- Wells' review style from RocketPartners/launch-code PRs
- Proven patterns from 15+ production PR reviews
- Security-first methodology with practical implementation

---

## [1.1.0] - 2026-02-24

### Added
- **Review title format**: Now uses "## Review: APPROVE | REQUEST CHANGES" as standardized opening
- **Concrete examples pattern**: Shows step-by-step math/data to prove bugs (Example: streak calculation with actual dates)
- **Table formatting**: Uses markdown tables to organize multiple occurrences of same issue
- **Verification statements**: Explicit statements like "verified `rgba(0,0,0,0.5)` = `bg-black/50`" to show actual checking
- **"Well-" prefix praise**: More specific acknowledgment (well-scoped, well-implemented, well-motivated)
- **Multi-tenant security patterns**: Tenant isolation, cross-tenant leaks, subdomain URL construction
- **Deployment/migration issues**: Migration number collisions, transaction requirements, runtime failures
- **Architectural patterns**: Circular dependencies, runtime environment issues, rate limiting concerns
- **Context-appropriate escaping**: HTML entities in plain-text vs HTML contexts
- **5 new annotated examples** in EXAMPLES.md showing new patterns from recent Wells reviews

### Enhanced
- `COMMUNICATION_STYLE.md`: Added sections on verification statements, concrete data, and "well-" prefix
- `TECHNICAL_PATTERNS.md`: Added multi-tenant security, deployment issues, architectural problems sections
- `EXAMPLES.md`: Added examples 6-10 showing concrete data, tables, verification, migration, and multi-tenant patterns
- `SKILL.md`: Updated review template to include explicit review state in title

### Documentation
- Based on analysis of 8 additional Wells reviews from RocketPartners/launch-code (PRs #73-82)
- New patterns emphasize showing concrete evidence rather than just asserting problems
- Enhanced focus on deployment-time and runtime issues

### Key Patterns from New Reviews
- **Concrete data over assertions**: Walk through calculations with real numbers
- **Tables for clarity**: Organize multiple similar issues in scannable format
- **Show your work**: Verification statements prove claims were checked
- **Deployment awareness**: Catch migration, transaction, and runtime environment issues
- **Multi-tenant focus**: Identify tenant isolation and cross-tenant data leaks

---

## [1.2.0] - 2026-02-24

### Added
- **Personalized opening statements**: Use developer names with emphatic praise ("Kerr, fucking excellent work...")
- **Strategic profanity usage**: Guidelines for when to use emphatic language (critical bugs, exceptional work)
- **Authentic directness**: Removed softened language, restored technical bite ("that's the wrong fucking instance")
- **Example 11**: Threading bugs review showing technical directness and personalization

### Enhanced
- `COMMUNICATION_STYLE.md`: Updated opening lines, blocking issues, and celebration sections with personalized examples
- `SKILL.md`: Updated top 10 principles to reflect personalization and strategic profanity use
- `EXAMPLES.md`: Enhanced Example 4 with pattern analysis, added Example 11 for threading bugs
- All templates now show authentic Wells style with appropriate emphasis

### Key Changes
- **Personalization**: Always use developer's name when known for praise and critical feedback
- **Emphatic praise**: "fucking excellent", "fucking brilliant" for exceptional work
- **Technical directness**: Clear, specific language for obvious bugs ("TOCTOU 101", "log spam")
- **Profanity guidelines**: When to use (critical bugs, exceptional work) vs when not to (general feedback)

### Philosophy
- Restored authentic Wells style - direct, technical, appropriately emphatic
- Personal connection through names makes praise more meaningful and criticism more constructive
- Strategic use of strong language preserves impact for things that really matter

---

## [1.3.0] - 2026-02-24

### Enhanced
- **Emphatic praise variety**: Added rotation of 8+ different phrases to avoid repetition
  - "absolutely crushing it" - Comprehensive, thorough fixes
  - "knocked this out of the park" - Exceeded expectations
  - "phenomenal work" - High-quality implementation
  - "outstanding execution" - Complete, thorough response
  - "flawless execution" - Zero issues remaining
  - "perfectly executed" - Exactly what was needed
  - "crushed it" / "nailed it" - Strong, confident fixes
  - Reserve "fucking excellent" / "fucking brilliant" for truly exceptional cases only

### Changed
- `COMMUNICATION_STYLE.md`: Updated opening lines examples to show variety
- `COMMUNICATION_STYLE.md`: Enhanced "Celebrating Improvements" section with rotation guidance
- `COMMUNICATION_STYLE.md`: Updated profanity usage guidelines - reserve profane praise for truly exceptional work
- `SKILL.md`: Updated top 10 principles to reflect variety in emphatic language

### Philosophy
- Avoid repetitive praise patterns - rotate phrases to keep reviews fresh and authentic
- Reserve strongest language (profanity) for truly standout cases (0-1 times per review)
- Non-profane emphatic praise is equally effective and more versatile for most situations
- Variety shows deeper engagement - you're choosing the right phrase for each situation, not copy-pasting

---

## [Unreleased]

### Planned
- Additional framework-specific patterns (Vue, Angular, Django, Rails)
- More "CUSTOMIZE THIS" examples for different industries (e-commerce, healthcare, finance)
- Video walkthrough of conducting a Wells-style review
- Integration examples with GitHub Actions for automated review structure checking
