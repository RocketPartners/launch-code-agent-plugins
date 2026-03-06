# Documentation Organization Patterns

Proven patterns for organizing complex skill documentation that improve readability, maintainability, and user experience.

---

## Pattern 1: Navigation Hub

**Problem**: Users overwhelmed by 1000+ line documents. Don't know where to start or how to find specific information.

**Solution**: Transform main file into concise navigation hub that guides users to focused content.

### Structure

```markdown
# Skill: [Skill Name]

**When to use:** Clear, one-sentence description
**What this skill does:** Brief explanation

---

## Quick Navigation

### Getting Started
- [Prerequisites & Setup](docs/GETTING_STARTED.md)
- [Creating Your First Job](docs/JOB_CREATION.md)

### Troubleshooting & Optimization
- [Common Issues](docs/COMMON_ISSUES.md)
- [Performance Guide](docs/PERFORMANCE.md)

### Configuration
- [Scheduling](docs/SCHEDULING.md)
- [Security](docs/SECURITY.md)

---

## Critical Success Factors
(Top 10 most important fixes - concise)

---

## Quick Start Checklist
(Bullet-point checklist)

---

## When to Use Each Document

| Scenario | Document |
|----------|----------|
| First time setup | GETTING_STARTED.md |
| Job failing | COMMON_ISSUES.md |
```

### Guidelines

1. **Keep main file under 300 lines**
2. **Use hierarchy in navigation** (Getting Started, Advanced, etc.)
3. **Link every focused guide**
4. **Include scenario table** for common user needs
5. **Put critical info first** (success factors, checklist)

### Benefits

- Users find relevant content in < 30 seconds
- Clear learning path from beginner to advanced
- Easy to scan and bookmark
- Professional, organized appearance

### Visual: File Structure

```
your-skill/
│
├── SKILL.md (Hub - 200-300 lines)
│   ├─► Quick Navigation
│   ├─► Scenario Table
│   ├─► Critical Success Factors
│   └─► Quick Start Checklist
│
├── docs/
│   │
│   ├── GETTING_STARTED.md (250-400 lines)
│   │   └─► Prerequisites, setup, first steps
│   │
│   ├── COMMON_ISSUES.md (250-400 lines)
│   │   └─► Troubleshooting, error solutions
│   │
│   ├── TOPIC1.md (250-400 lines)
│   │   └─► Focused topic guide
│   │
│   ├── TOPIC2.md (250-400 lines)
│   │   └─► Focused topic guide
│   │
│   └── ... (5-8 more focused guides)
│
├── DETAILED_REFERENCE_1.md (500-900 lines)
│   └─► Deep dive: complete implementation
│
├── DETAILED_REFERENCE_2.md (500-900 lines)
│   └─► Deep dive: issue history & solutions
│
└── publish-plugin.js
    └─► Publishing automation

User Flow:
┌──────────┐     ┌──────────┐     ┌──────────┐
│ SKILL.md │ ──► │ docs/*.md│ ──► │ *REF*.md │
│  (Start) │     │ (Action) │     │  (Deep)  │
└──────────┘     └──────────┘     └──────────┘
   "Where?"      "How to fix?"    "Why/Details?"
```

---

## Pattern 2: Progressive Disclosure

**Problem**: Mixing overview content with detailed implementation confuses users with different knowledge levels.

**Solution**: Layer information from high-level overview to detailed reference.

### Three Layers

**Layer 1: Navigation Hub (Main SKILL.md)**
- What the skill does
- When to use it
- Where to find specific help
- Critical success factors (concise)

**Layer 2: Focused Guides (docs/*.md)**
- One topic per guide
- 200-400 lines each
- Actionable steps
- Cross-references to related guides
- Link to Layer 3 for details

**Layer 3: Detailed Reference (root/*.md)**
- Complete implementations
- Comprehensive troubleshooting
- Issue timelines and history
- 500+ lines of deep-dive content

### Visual Structure

```
User Navigation Journey
═══════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────┐
│                    SKILL.md (Layer 1)                    │
│                   Navigation Hub                         │
│                    200-300 lines                         │
│                                                          │
│  • Quick Navigation (grouped by category)                │
│  • Scenario Table (problem → solution)                   │
│  • Critical Success Factors (top 10)                     │
│  • Quick Start (3-5 steps)                              │
└─────────────┬───────────────────────────────────────────┘
              │
      User clicks on topic link
              │
              ▼
┌──────────────────────────────────────────────────────────┐
│               Focused Guides (Layer 2)                    │
│                  docs/*.md files                          │
│                  250-400 lines each                       │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │GETTING_  │  │JOB_      │  │COMMON_   │  │SECURITY │ │
│  │STARTED.md│  │CREATION  │  │ISSUES.md │  │.md      │ │
│  │          │  │.md       │  │          │  │         │ │
│  │• Steps   │  │• Steps   │  │• Problems│  │• Config │ │
│  │• Examples│  │• Examples│  │• Solutions│  │• Best   │ │
│  │• Links   │  │• Links   │  │• Links   │  │ Practices│ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬────┘ │
│       │             │              │              │       │
│       └─────────────┴──────────────┴──────────────┘       │
│                          │                                 │
│              "See [REFERENCE] for details"                │
└──────────────────────────┼───────────────────────────────┘
                           │
                 User needs deep dive
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│            Detailed References (Layer 3)                  │
│                  root/*.md files                          │
│                  500-900 lines each                       │
│                                                           │
│  ┌────────────────────┐  ┌────────────────────┐         │
│  │OPTIMISTIC_UI.md    │  │DATA_TABLE_ISSUES  │         │
│  │                    │  │.md                 │         │
│  │• Full architecture │  │• Complete timeline │         │
│  │• Complete code     │  │• All issues + fixes│         │
│  │• Benchmarks        │  │• Version history   │         │
│  │• Migration guide   │  │• Testing guide     │         │
│  │• Monitoring        │  │• Key learnings     │         │
│  └────────────────────┘  └────────────────────┘         │
└──────────────────────────────────────────────────────────┘

Information Density
═══════════════════════════════════════════════════════════

Layer 1:  ████░░░░░░░░░░░░░░░░  10% - "Just enough to navigate"
Layer 2:  ████████████░░░░░░░░  60% - "Actionable steps & examples"
Layer 3:  ████████████████████  100% - "Complete deep dive"

User Time Investment
═══════════════════════════════════════════════════════════

Layer 1:  1-2 minutes  → Find the right guide
Layer 2:  5-15 minutes → Implement the solution
Layer 3:  30-60 minutes → Master the topic
```

### Example: Performance Documentation

**Layer 1 (SKILL.md):**
```markdown
### 10. Performance optimization
❌ **Slow:** Direct API calls (~300ms)
✅ **Fast:** Cache-first with background sync (< 1ms)

267x performance improvement for high-frequency operations.
```

**Layer 2 (docs/PERFORMANCE.md):**
```markdown
# Performance Optimization

## When to Optimize
- High-frequency operations (> 10/minute)
- User-facing applications requiring instant feedback

## Solution Overview
Optimistic UI with background sync provides 267x improvement.

## Quick Start
1. Replace lib/database.js with optimistic version
2. No code changes required in your jobs
3. Monitor with getStats()

See [OPTIMISTIC_UI.md](OPTIMISTIC_UI.md) for complete implementation.
```

**Layer 3 (OPTIMISTIC_UI.md):**
```markdown
# Optimistic UI Implementation

## Complete Architecture
[Detailed diagram]

## Full Database Class Implementation
[650 lines of complete code]

## Migration Guide
[Step-by-step migration]

## Performance Benchmarks
[Detailed metrics]
```

### Guidelines

1. **Don't mix layers** - Keep overview separate from implementation
2. **Always link down** - Layer 1 → Layer 2 → Layer 3
3. **Cross-reference up** - Layer 3 mentions it's referenced from Layer 2
4. **Let users choose depth** - Don't force them through all layers

---

## Pattern 3: Scenario-Based Navigation

**Problem**: Users come with specific problems, not abstract learning goals. "I need to fix this error" not "I want to learn about data tables."

**Solution**: Create "When to Use Each Document" table that maps user problems to solutions.

### Template

```markdown
## When to Use Each Document

| Scenario | Document |
|----------|----------|
| Setting up for the first time | [GETTING_STARTED.md](docs/GETTING_STARTED.md) |
| Writing job code | [JOB_CREATION.md](docs/JOB_CREATION.md) |
| Job failing with errors | [COMMON_ISSUES.md](docs/COMMON_ISSUES.md) |
| Operations are slow | [PERFORMANCE.md](docs/PERFORMANCE.md) |
| Need instant feedback | [OPTIMISTIC_UI.md](OPTIMISTIC_UI.md) |
| Scheduling jobs | [CRON_AND_TIMEZONE.md](docs/CRON_AND_TIMEZONE.md) |
| Managing credentials | [SECURITY.md](docs/SECURITY.md) |
| Integrating with Slack | [SLACK_INTEGRATION.md](docs/SLACK_INTEGRATION.md) |
| Testing before deploy | [TESTING.md](docs/TESTING.md) |
| Understanding sync issues | [DATA_TABLE_ISSUES.md](DATA_TABLE_ISSUES.md) |
```

### Guidelines

1. **Use user language** - "Job failing" not "Debugging methodology"
2. **Cover common workflows** - Setup, build, troubleshoot, optimize
3. **Be specific** - "Operations are slow" not "Performance topics"
4. **Include 8-12 scenarios** - Comprehensive but scannable
5. **Keep table in main SKILL.md** - First place users look

### Real Example from Our Optimization

We transformed this scattered information:
- "See Docker configuration section on line 450"
- "Troubleshooting starts at line 890"
- "For performance issues, check line 650"

Into this clear mapping:
```markdown
| Job failing with errors | COMMON_ISSUES.md |
| Operations are slow | PERFORMANCE.md |
```

Result: Users find solutions **10x faster**.

---

## Pattern 4: Cross-Referencing Web

**Problem**: Isolated documents create dead ends. Users read one guide and don't discover related helpful content.

**Solution**: Every document links to related documents, creating a web of interconnected knowledge.

### Structure

Every focused guide should have:

```markdown
# Guide Title

[Main content...]

---

## Related Documentation

- [Previous Topic](PREVIOUS.md) - What comes before this
- [Next Topic](NEXT.md) - Natural progression
- [Alternative Approach](ALTERNATIVE.md) - Different solution
- [Deep Dive](DETAILED.md) - More comprehensive coverage
```

### Real Example

**docs/COMMON_ISSUES.md** ends with:
```markdown
## Related Documentation

- [Getting Started](GETTING_STARTED.md) - Initial setup to avoid issues
- [Performance](PERFORMANCE.md) - Solving race conditions and slow operations
- [Security](SECURITY.md) - Environment variable configuration
- [Testing](TESTING.md) - Verifying fixes work
```

**docs/PERFORMANCE.md** ends with:
```markdown
## Related Documentation

- [OPTIMISTIC_UI.md](OPTIMISTIC_UI.md) - **Complete implementation guide**
- [DATA_TABLE_ISSUES.md](DATA_TABLE_ISSUES.md) - **Issue history and solutions**
- [Common Issues](COMMON_ISSUES.md) - Race condition troubleshooting
- [Testing](TESTING.md) - Performance testing procedures
```

### Guidelines

1. **3-5 related docs per guide** - Enough options, not overwhelming
2. **Include brief descriptions** - Why link is relevant
3. **Bold key recommendations** - Guide users to best next step
4. **Two-way links** - If A links to B, B should link to A
5. **Consistent section name** - Always "Related Documentation"

---

## Pattern 5: Critical Success Factors First

**Problem**: Users fail at common pitfalls, then have to search documentation for fixes.

**Solution**: List top 10 critical fixes right at the start of main file.

### Format

```markdown
## Critical Success Factors

Based on production deployment experience, these are the most critical fixes:

### 1. [Problem Category]
❌ **Wrong:** [Common mistake]
✅ **Correct:** [Right way]

[One-sentence explanation why]

### 2. [Next Problem]
❌ **Wrong:** [Common mistake]
✅ **Correct:** [Right way]

[One-sentence explanation why]
```

### Real Example

```markdown
### 1. npm local installation
❌ **Wrong:** `npm install -g @slack/web-api`
✅ **Correct:** `npm install @slack/web-api` (no `-g`)

Node.js module resolution requires local packages.

### 2. Amazon ECR
❌ **Wrong:** `FROM node:18-alpine`
✅ **Correct:** `FROM public.ecr.aws/docker/library/node:18-alpine`

Avoids Docker Hub rate limits.
```

### Guidelines

1. **Limit to 10 factors** - Most critical only
2. **Use visual markers** - ❌ and ✅ for quick scanning
3. **One line explanation** - Why it matters
4. **Order by frequency** - Most common failures first
5. **Based on real issues** - Production experience, not theory

### Impact

Users implementing these 10 factors first **avoid 90% of common failures**.

---

## Pattern 6: Focused Topic Files

**Problem**: Long documents force users to read irrelevant sections to find what they need.

**Solution**: One file per topic, 200-400 lines, focused and complete.

### File Naming

Use clear, specific names:
- ✅ `GETTING_STARTED.md` (clear what's inside)
- ✅ `COMMON_ISSUES.md` (problem-focused)
- ✅ `SLACK_INTEGRATION.md` (specific integration)
- ❌ `GUIDE.md` (too vague)
- ❌ `MISCELLANEOUS.md` (catch-all is a code smell)
- ❌ `NOTES.md` (unstructured)

### Content Structure

Each focused file should have:

```markdown
# Topic Name

## Overview
[2-3 sentences: what this covers]

---

## Section 1: [Specific Aspect]
[Content...]

## Section 2: [Another Aspect]
[Content...]

## Section 3: [Final Aspect]
[Content...]

---

## Related Documentation
[Links to 3-5 related guides]
```

### Length Guidelines

- **Too short (< 100 lines)**: Probably should be merged with another topic
- **Good (200-400 lines)**: Focused, complete, scannable
- **Too long (> 500 lines)**: Consider splitting into sub-topics

**Exception**: Detailed reference docs (Layer 3) can be 500-800 lines because they're comprehensive deep-dives that users reference, not read cover-to-cover.

### Real Example: docs/SECURITY.md

**Length**: 180 lines
**Focused topic**: Environment variable security
**Structure**:
1. Overview: secret: true vs secret: false
2. The Critical Limitation (what developers need to know)
3. When to Use Each Setting
4. Security Best Practices
5. Credential Management Patterns
6. Related Documentation

**Result**: Users learn security model in 5 minutes.

---

## Pattern 7: Quick Start Checklist

**Problem**: Users don't know what to verify before deploying. Forget critical steps.

**Solution**: Comprehensive checklist at start of main file.

### Format

```markdown
## Quick Start Checklist

Before deploying, verify:

- [ ] Item that prevents failure #1
- [ ] Item that prevents failure #2
- [ ] Configuration requirement
- [ ] Environment setup
- [ ] Testing step
```

### Real Example

```markdown
## Quick Start Checklist

Before creating a job, verify:

- [ ] Using Amazon Public ECR base image
- [ ] bash, curl, ca-certificates, git installed
- [ ] npm packages installed locally (no `-g`)
- [ ] WORKDIR set to /app
- [ ] SHELL set to bash
- [ ] Setup script (`run.sh`) created with LaunchCode configuration
- [ ] `script` field set to `bash /app/run.sh`
- [ ] Require paths use `./lib/` not `../lib/`
- [ ] Timezone specified in schedules
- [ ] Environment variables configured
- [ ] Credentials use `secret: false` (for code access)
- [ ] All source files included in `files` array
```

### Guidelines

1. **Ordered by workflow** - Follow natural setup sequence
2. **Specific and actionable** - Can be checked off
3. **10-20 items** - Comprehensive but not overwhelming
4. **Include performance items** - If applicable to most users
5. **Link to details** - Each item has detailed guide

---

## Pattern 8: Comparison Tables

**Problem**: Users don't understand trade-offs or performance differences.

**Solution**: Use tables to show clear comparisons.

### Format

```markdown
| Approach | Pros | Cons | When to Use |
|----------|------|------|-------------|
| Option A | Fast, Simple | Limited features | Small projects |
| Option B | Full-featured | Complex setup | Enterprise |
```

### Real Example: Performance

```markdown
| Pattern | Create | Get | Update | Total | User Wait |
|---------|--------|-----|--------|-------| ---------|
| **Direct API** | 300ms | 250ms | 300ms | 850ms | 850ms |
| **With Retries** | 300ms | 200ms | 300ms | 800ms | 800ms |
| **Optimistic UI** | < 1ms | < 1ms | < 1ms | < 3ms | < 3ms ✅ |

**267x faster for users!**
```

### Guidelines

1. **Use for 2-4 options** - More than 4 gets cluttered
2. **Quantify differences** - Numbers, not just "faster"
3. **Bold the winner** - If there is one
4. **Add context below** - Explain significance

---

## Pattern 9: Service Lifecycle Documentation

**Problem**: Long-running services (bots, servers, workers) need proper shutdown handling but lack comprehensive guidance.

**Solution**: Create detailed reference documentation covering complete service lifecycle, not just happy path.

### When to Use This Pattern

For services that:
- Run continuously (Socket Mode bots, HTTP servers, workers)
- Maintain persistent connections (WebSocket, database pools, Redis)
- Use background intervals/timers
- Deploy to containers (Docker, Kubernetes)

### Structure

```markdown
# Service Lifecycle Pattern

## Overview
[2-3 sentences: what this covers and when to use]

## The Problem
[Symptoms users experience without proper lifecycle management]

## The Solution
[Architecture diagram showing lifecycle sequence]

## Implementation Guide
[Step-by-step with complete code examples]

## Code Examples
[Multiple complete examples for different service types]

## Testing
[Manual + automated testing procedures]

## Common Pitfalls
[6-10 specific mistakes with solutions]

## Checklist
[30+ verification items across design, implementation, testing, deployment]

## Real-World Results
[Before/after metrics showing impact]
```

### Real Example: docs/GRACEFUL_SHUTDOWN.md

**Length**: 888 lines (detailed reference)
**Topic**: Graceful shutdown for long-running services
**Structure**:
1. Overview (when to use, benefits)
2. The Problem (symptoms, root causes with bad code examples)
3. The Solution (architecture, key principles)
4. Implementation Guide (3 detailed steps with code)
5. Code Examples (3 complete scenarios: Slack bot, Express server, generic)
6. Testing (manual + automated + container testing)
7. Common Pitfalls (6 specific mistakes with fixes)
8. Checklist (30+ items across 4 phases)
9. Real-World Results (before/after metrics)
10. Quick Reference (minimal viable implementation)

**Key features**:
- ❌/✅ format showing wrong vs. right
- Complete, copy-pasteable code examples
- Testing scripts included
- Real production metrics (v1.3.5 → v1.3.6)
- Version history table

**Why it works**:
- Covers complete lifecycle (not just startup)
- Shows consequences of not implementing (zombie connections, cache misses)
- Multiple implementation examples for different service types
- Comprehensive testing guidance
- Practical checklist for all phases

**Result**: Single-connection success, 2-second clean shutdown, no zombie processes.

---

## Antipatterns to Avoid

### ❌ Antipattern 1: Everything in One File
```
SKILL.md (2000 lines)
├── Everything about everything
└── Users give up and ask for help instead
```

**Why it fails**: Cognitive overload, hard to maintain, poor user experience.

### ❌ Antipattern 2: No Navigation Structure
```
Multiple files but no clear entry point or organization.
Users don't know where to start.
```

**Why it fails**: Fragmentation without coherence.

### ❌ Antipattern 3: Technical Jargon in Scenario Table
```markdown
| Scenario | Document |
| Database abstraction layer architectural patterns | ARCHITECTURE.md |
| Asynchronous event-driven microservice orchestration | ASYNC.md |
```

**Why it fails**: Users don't think in technical terms when they have problems.

**Fix**: Use problem language:
```markdown
| Scenario | Document |
| Job failing with errors | COMMON_ISSUES.md |
| Operations are slow | PERFORMANCE.md |
```

### ❌ Antipattern 4: Orphaned Documents
Files with no links in or out. Users never discover them.

**Fix**: Navigation hub links to all docs + cross-references between docs.

### ❌ Antipattern 5: Inconsistent Depth
Mixing high-level overview and detailed implementation in same document.

**Fix**: Use progressive disclosure pattern (3 layers).

---

## Migration Strategy

### Step 1: Audit Current State
- Count lines in main file
- List distinct topics covered
- Note what users struggle to find

### Step 2: Design Structure
- Identify 8-12 focused topics for docs/ folder
- Determine what stays in main file (navigation, critical factors, checklist)
- Identify 2-3 detailed references (also goes in docs/)

### Step 3: Extract Content
- Copy/paste sections into new focused files
- Don't rewrite yet - just organize

### Step 4: Rewrite Navigation Hub
- Quick navigation section
- Critical success factors (condense to 10)
- Quick start checklist
- Scenario table
- Links to all guides

### Step 5: Add Cross-References
- Every doc links to 3-5 related docs
- Two-way linking
- Consistent "Related Documentation" sections

### Step 6: Verify Navigation
- Can user find answer to common problem in < 1 minute?
- Are all files discoverable?
- Do links work?

### Step 7: Update Plugin
- Modify publisher to read all files
- Test plugin install
- Verify file structure

---

## Success Metrics

Your documentation structure is successful when:

1. **Users find answers quickly**
   - < 30 seconds to identify right document
   - < 2 minutes to find specific answer

2. **Main file is scannable**
   - < 300 lines
   - Clear sections
   - Visual hierarchy

3. **No orphaned content**
   - Every file linked from navigation
   - Every file cross-references related content

4. **Consistent structure**
   - Similar files have similar layouts
   - Predictable sections
   - Related Documentation always at end

5. **Users discover related content**
   - Read one guide, find 2 more that help
   - Natural learning progression

6. **Maintainers can update easily**
   - Know exactly where new content goes
   - Can change one topic without affecting others
   - Clear version control diffs

---

## Tools and Techniques

### Measuring Document Length
```bash
wc -l SKILL.md
# Before: 1260 SKILL.md
# After: 232 SKILL.md
```

### Finding Orphaned Links
```bash
# List all .md files
find . -name "*.md"

# Search for each filename in all docs
grep -r "FILENAME.md" .
```

### Checking Cross-Reference Consistency
```bash
# If A links to B, does B link to A?
# Check manually or write a script
```

---

## Next Steps

Now that you understand documentation patterns, learn how to:
- [Publish multi-file plugins](PLUGIN_PUBLISHING.md)
- [Generalize content for reuse](GENERALIZATION.md)
- [Write effective content](CONTENT_PATTERNS.md)
- [Follow optimization checklist](CHECKLIST.md)
