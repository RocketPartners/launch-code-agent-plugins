# Effective Content Patterns

Proven patterns for writing clear, actionable, and maintainable skill documentation that helps users succeed.

---

## Core Writing Principles

### 1. Show, Don't Just Tell

**Poor**:
```markdown
Configure your Docker image properly to avoid errors.
```

**Good**:
```markdown
### Docker Configuration

❌ **Wrong:** `FROM node:18-alpine`
✅ **Correct:** `FROM public.ecr.aws/docker/library/node:18-alpine`

Avoids Docker Hub rate limits that cause build failures.
```

**Why it works**: Concrete examples with visual markers (❌ ✅) make the fix immediately actionable.

### 2. Problem → Solution → Why

**Structure**:
1. **Problem**: What breaks
2. **Solution**: How to fix it
3. **Why**: Understanding prevents future issues

**Example**:
```markdown
## Issue: Module Not Found Error

**Problem**: Job fails with `Error: Cannot find module '@slack/web-api'`

**Solution**:
```bash
# Install locally (not globally)
npm install @slack/web-api
```

**Why**: LaunchCode's Docker environment doesn't have access to global npm packages. All dependencies must be in local `node_modules`.
```

### 3. Progressive Complexity

**Bad order** (complex first):
```markdown
1. Configure distributed caching with Redis
2. Implement optimistic UI with background sync
3. Set up basic job structure
```

**Good order** (simple to complex):
```markdown
1. Set up basic job structure
2. Add data table operations
3. Implement optimistic UI for performance (optional)
```

### 4. Actionable > Theoretical

**Theoretical**:
```markdown
LaunchCode provides a robust API for container orchestration and data persistence.
```

**Actionable**:
```markdown
Create a data table to store your data:

```bash
echo "
await api.tables.create('items', 'Items table');
console.log('✅ Table created');
" | ~/.launchcode/scripts/api.js
```
```

---

## Content Patterns

### Pattern 1: Critical Success Factors

**Format**:
```markdown
## Critical Success Factors

Based on production experience, these prevent 90% of failures:

### 1. [Issue Category]
❌ **Wrong:** [Common mistake with code]
✅ **Correct:** [Right way with code]

[One-sentence explanation why]

### 2. [Next Issue]
...
```

**Real Example**:
```markdown
### 1. npm local installation
❌ **Wrong:** `npm install -g @slack/web-api`
✅ **Correct:** `npm install @slack/web-api` (no `-g`)

Node.js module resolution requires local packages.
```

**Guidelines**:
- Limit to 10 factors (most critical only)
- Use ❌ and ✅ for quick scanning
- Include actual code, not just descriptions
- Order by failure frequency
- One-line explanation maximum

### Pattern 2: Step-by-Step Guides

**Format**:
```markdown
## [Task Name]

### Prerequisites
- [ ] Item 1
- [ ] Item 2

### Step 1: [First Action]

[Explanation]

```language
[Code example]
```

[Expected result]

### Step 2: [Next Action]

...

### Verify Success

[How to confirm it worked]
```

**Real Example**:
```markdown
## Creating Your First Job

### Prerequisites
- [ ] Data table created
- [ ] LaunchCode API client configured
- [ ] Docker image built

### Step 1: Write Job Function

Create `jobs/my-job.js`:

```javascript
async function myJob(context, params = {}) {
  console.log('=== Job Started ===');
  return { success: true };
}

module.exports = myJob;
```

### Step 2: Create Job via API

```bash
echo "await api.container.jobs.create({...})" | ~/.launchcode/scripts/api.js
```

You should see: `✅ Job created`

### Verify Success

LaunchCode UI → Jobs → [job-name] → Run Now

Check logs for: `=== Job Started ===`
```

### Pattern 3: Comparison Tables

**Use for**: Showing trade-offs, performance differences, or option comparisons.

**Format**:
```markdown
| Approach | Metric 1 | Metric 2 | When to Use |
|----------|----------|----------|-------------|
| Option A | Value A1 | Value A2 | Scenario A |
| Option B | Value B1 | Value B2 | Scenario B |

**Recommendation**: [Clear guidance]
```

**Real Example**:
```markdown
| Pattern | Create | Get | Update | User Wait |
|---------|--------|-----|--------|-----------|
| **Direct API** | 300ms | 250ms | 300ms | 850ms |
| **Optimistic UI** | < 1ms | < 1ms | < 1ms | < 3ms ✅ |

**Recommendation**: Use optimistic UI for high-frequency operations (> 10/min) or user-facing applications.
```

### Pattern 4: Common Issues Section

**Format**:
```markdown
## Issue #N: [Short Title]

**Symptom**: [What the user sees]

**Cause**: [Why it happens]

**Solution**:
```language
[Fix code]
```

**Verification**: [How to confirm fixed]
```

**Real Example**:
```markdown
## Issue #3: bash command not found

**Symptom**: Job fails with `/bin/sh: bash: not found`

**Cause**: Alpine Linux doesn't include bash by default

**Solution**:
```dockerfile
RUN apk add --no-cache bash curl ca-certificates git
```

**Verification**: Job logs show no bash errors, job executes successfully
```

**Guidelines**:
- Number issues sequentially (#1, #2, #3)
- Start with symptom (what user sees)
- Include both cause and solution
- Provide verification step
- Link to related issues at end

### Pattern 5: Code Examples with Context

**Poor example** (no context):
```javascript
const result = await api.call();
return result;
```

**Good example** (full context):
```javascript
// lib/launchcode-client.js
class LaunchCodeClient {
  constructor() {
    this.apiUrl = process.env.LAUNCHCODE_API_URL;
    this.apiKey = process.env.LAUNCHCODE_API_KEY;

    if (!this.apiUrl || !this.apiKey) {
      throw new Error('Missing LAUNCHCODE_API_URL or LAUNCHCODE_API_KEY');
    }
  }

  async put(table, key, data) {
    const response = await fetch(`${this.apiUrl}/tables/docs/${table}/${key}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ json: data })
    });

    if (!response.ok) {
      throw new Error(`Failed to write to ${table}: ${response.statusText}`);
    }

    return await response.json();
  }
}

module.exports = LaunchCodeClient;
```

**What makes it good**:
- File path in comment (`lib/launchcode-client.js`)
- Complete, working code
- Error handling included
- Can be copy-pasted directly

### Pattern 6: Visual Markers

**Symbols to use**:
- ✅ Correct approach, success, good practice
- ❌ Wrong approach, failure, anti-pattern
- ⚠️ Warning, caution, important note
- 🔍 Debugging, investigation, detail
- 📊 Statistics, metrics, performance
- 📦 Package, deployment, build
- 🚀 Launch, production, ready
- 🔄 Sync, update, refresh
- ⏱️ Time, schedule, duration

**Example usage**:
```markdown
✅ All tests passed
❌ Build failed: missing dependency
⚠️ Credentials stored with secret: false are visible in logs
🔍 Debug: Cache hit rate 98.5%
📊 Performance: 267x faster
```

### Pattern 7: Architecture Diagrams

**Use ASCII art** for simple flows:

```markdown
## Data Flow

```
User Action
    ↓
In-Memory Cache (< 1ms)
    ↓
Sync Queue
    ↓
Background Process (every 2s)
    ↓
LaunchCode Data Table
```
```

**Use structured text** for complex flows:

```markdown
## Processing Pipeline

1. **Fetch Phase**
   - Job 1 runs daily at 9:00 AM
   - Fetches data from Slack/API
   - Stores in data table

2. **Process Phase**
   - Job 2 triggered by Job 1
   - Reads from data table
   - Applies business logic
   - Updates records

3. **Notify Phase**
   - Job 3 triggered by Job 2
   - Sends notifications
   - Logs results
```

### Pattern 8: Configuration Blocks

**Format**:
```markdown
## Configuration

```javascript
// CUSTOMIZE THIS: Your application configuration
const CONFIG = {
  // [Category] configuration
  setting1: process.env.VAR1 || 'default',  // [Description]
  setting2: process.env.VAR2 || 'default',  // [Description]

  // [Another category] configuration
  setting3: process.env.VAR3 || 'default'   // [Description]
};
```

**Explanation**:
- `setting1`: [Detailed description, when to change]
- `setting2`: [Detailed description, when to change]
```

**Real Example**:
```markdown
## Configuration

```javascript
// CUSTOMIZE THIS: Your Slack bot configuration
const SLACK_CONFIG = {
  // Bot credentials
  botToken: process.env.SLACK_BOT_TOKEN,  // Required: xoxb-...
  channelId: process.env.CHANNEL_ID,      // Required: C123ABC...

  // Search configuration
  searchText: process.env.SEARCH_TEXT || 'daily update',  // Text to search for
  timezone: process.env.TIMEZONE || 'America/New_York',   // For date calculations

  // Feature flags
  enableAI: process.env.ENABLE_AI === 'true',  // Use Claude for analysis
  notifyUsers: process.env.NOTIFY_USERS !== 'false'  // Send notifications
};
```

**Explanation**:
- `botToken`: Get from Slack → App Settings → OAuth & Permissions
- `channelId`: Right-click channel → Copy link → Extract ID
- `searchText`: Case-insensitive text to find in messages
- `enableAI`: Set to 'true' to enable Claude analysis (requires CLAUDE_API_KEY)
```

### Pattern 9: Troubleshooting Guide

**Format**:
```markdown
## Troubleshooting

### Problem: [User description]

**Check 1: [Most common cause]**
```bash
[Verification command]
```

Expected: [What should appear]
If not: [What to do]

**Check 2: [Second most common]**
...

**Still not working?**
- [Advanced check 1]
- [Advanced check 2]
- [Where to get help]
```

**Real Example**:
```markdown
## Troubleshooting

### Problem: Job doesn't execute

**Check 1: Script field is set correctly**
```bash
echo "await api.container.jobs.get('job-slug')" | ~/.launchcode/scripts/api.js
```

Expected: `script: "bash /app/run.sh"`
If not: Update with `script: "bash /app/run.sh"`

**Check 2: run.sh is executable**
```javascript
files: [
  {
    path: '/app/run.sh',
    content: '#!/bin/bash\n...',
    mode: '755'  // <-- Must be executable
  }
]
```

**Still not working?**
- Check job logs for error messages
- Verify all environment variables are set
- Test Docker image locally: `docker run -it image bash`
```

### Pattern 10: Related Documentation Links

**Always include at end**:

```markdown
---

## Related Documentation

- [Previous/Setup Topic](PREVIOUS.md) - Context or prerequisite
- [Alternative Approach](ALTERNATIVE.md) - Different solution
- [Next/Advanced Topic](NEXT.md) - Natural progression
- [Deep Dive](DETAILED.md) - Comprehensive reference
```

**Guidelines**:
- 3-5 links maximum
- Brief description (5-10 words)
- Order: previous → alternatives → next → deep dives
- Bold the most important link
- Consistent section name across all docs

---

## Writing Style Guidelines

### Voice and Tone

**Do**:
- Use active voice: "Create a job" not "A job should be created"
- Be direct: "Install packages locally" not "It is recommended to consider installing packages locally"
- Use "you": "You can configure..." not "One can configure..." or "Users can configure..."
- Be concise: Remove unnecessary words

**Don't**:
- Use passive voice
- Be vague or indirect
- Use academic or formal language
- Add fluff or filler

### Technical Accuracy

**Do**:
- Test all code examples
- Use correct terminology
- Specify versions when relevant
- Include error handling
- Show expected output

**Don't**:
- Use untested code
- Make assumptions
- Skip error cases
- Hide complexity that matters

### Code Examples

**Do**:
- Include file paths in comments
- Show complete, working code
- Add error handling
- Use realistic variable names
- Include imports/requires

**Don't**:
- Use fragments without context
- Skip error handling
- Use foo/bar/baz
- Assume imports

**Example (Good)**:
```javascript
// jobs/fetch-data.js
const SlackClient = require('./lib/slack-client');
const Database = require('./lib/database');

async function fetchData(context, params = {}) {
  try {
    const slackClient = new SlackClient();
    const database = new Database(context.launchcode);

    const messages = await slackClient.fetchMessages(
      process.env.CHANNEL_ID,
      params.date
    );

    for (const message of messages) {
      await database.create({
        text: message.text,
        timestamp: message.ts,
        date: params.date
      });
    }

    return { success: true, count: messages.length };
  } catch (error) {
    console.error('❌ Job failed:', error);
    throw error;
  }
}

module.exports = fetchData;
```

### Headings

**Structure**:
```markdown
# Document Title (H1 - one per document)

## Major Section (H2 - main topics)

### Subsection (H3 - supporting details)

#### Detail (H4 - rarely needed)
```

**Guidelines**:
- Only one H1 per document (the title)
- Use H2 for major sections
- Use H3 for subsections within H2
- Rarely use H4
- Make headings descriptive: "Creating Data Tables" not "Setup"
- Use parallel structure: "Creating...", "Configuring...", "Testing..."

### Lists

**When to use bullets**:
- Unordered items
- No sequence matters
- Options or alternatives

**When to use numbers**:
- Sequential steps
- Priority/rank order
- References (Issue #1, Issue #2)

**Example (Bullets)**:
```markdown
Prerequisites:
- Docker installed
- LaunchCode API access
- Node.js 18+
```

**Example (Numbers)**:
```markdown
Setup steps:
1. Create data table
2. Configure Docker image
3. Write job code
4. Deploy to LaunchCode
```

### Length Guidelines

| Document Type | Target Length | Notes |
|--------------|---------------|-------|
| Navigation Hub | 200-300 lines | Quick reference |
| Focused Guide | 250-400 lines | One topic, complete |
| Detailed Reference | 500-900 lines | Comprehensive deep-dive |
| Code Example | 10-50 lines | Complete but concise |
| Explanation | 1-3 sentences | Get to the point |

**Example: Comprehensive Technical Guide**

**docs/GRACEFUL_SHUTDOWN.md** (888 lines):
- **Type**: Detailed Reference
- **Topic**: Service lifecycle management for long-running services
- **Structure**:
  - Overview with Table of Contents
  - The Problem (symptoms + root causes with bad code)
  - The Solution (architecture diagram + principles)
  - Implementation Guide (3 detailed steps)
  - Code Examples (3 complete scenarios: Slack bot, Express server, generic)
  - Testing (manual + automated + container testing)
  - Common Pitfalls (6 detailed antipatterns with fixes)
  - Checklist (30+ items across 4 phases)
  - Real-World Results (before/after metrics)
  - Quick Reference (minimal viable implementation)

**Why it works**:
- Problem → Solution → Implementation structure
- ❌/✅ format throughout for clarity
- Complete, copy-pasteable code examples
- Multiple implementation examples for different service types
- Comprehensive testing guidance
- Real production metrics (v1.3.5 → v1.3.6 improvement)
- Quick reference at end for experienced users

**Result**: Users can implement graceful shutdown in any Node.js service with confidence.

---

## Content Organization

### Document Structure Template

```markdown
# Document Title

[2-3 sentence overview of what this covers]

---

## Section 1: [First Major Topic]

### Subsection 1.1
[Content...]

### Subsection 1.2
[Content...]

---

## Section 2: [Second Major Topic]

### Subsection 2.1
[Content...]

---

## Section N: [Final Major Topic]

[Content...]

---

## Related Documentation

- [Link 1](LINK1.md) - Description
- [Link 2](LINK2.md) - Description
```

### Information Hierarchy

**Organize by importance**:
1. **What it is / Why it matters** - Start with value
2. **How to use it** - Actionable steps
3. **Common issues** - Troubleshooting
4. **Advanced topics** - Deep dives
5. **Reference** - Complete details

**Example**:
```markdown
# Performance Optimization

[What: Optimistic UI pattern for 267x speed improvement]

## When to Optimize
[Why: High-frequency operations need instant feedback]

## Quick Start
[How: 3 steps to implement]

## Common Issues
[Troubleshooting: Cache misses, sync failures]

## Monitoring
[Advanced: Statistics, debugging]

## Complete Implementation
[Reference: Link to detailed guide]
```

---

## Quality Checklist

### Before Publishing

- [ ] All code examples tested and work
- [ ] File paths included in code comments
- [ ] Error handling shown in examples
- [ ] Expected output documented
- [ ] Common pitfalls addressed
- [ ] Related docs linked at end
- [ ] Headings form logical hierarchy
- [ ] Technical terms defined on first use
- [ ] Visual markers used appropriately (✅ ❌ ⚠️)
- [ ] No spelling or grammar errors
- [ ] Consistent terminology throughout
- [ ] Length appropriate for document type
- [ ] "CUSTOMIZE THIS" comments where needed
- [ ] Examples work for multiple use cases

### Content Quality Metrics

**Good documentation**:
- User finds answer in < 2 minutes
- Code examples work without modification
- Clear next steps provided
- Related content discoverable
- No questions left unanswered

**Poor documentation**:
- Vague descriptions without examples
- Untested code
- Missing context or prerequisites
- Dead-end (no related docs)
- Raises more questions than it answers

---

## Templates

### Issue Template

```markdown
## Issue #N: [Short Descriptive Title]

**Symptom**: [What user sees - error message, behavior]

**Cause**: [Root cause explanation]

**Solution**:
```[language]
[Fix code]
```

**Prevention**: [How to avoid in future]

**Related Issues**: [Links to similar issues]
```

### Feature Guide Template

```markdown
# [Feature Name]

[2-3 sentence overview]

---

## When to Use

[Use cases, scenarios]

---

## Quick Start

### Prerequisites
- [ ] Requirement 1
- [ ] Requirement 2

### Implementation

[Step-by-step with code]

---

## Configuration

[Configuration options]

---

## Common Patterns

[2-3 common usage examples]

---

## Troubleshooting

[Common issues and fixes]

---

## Related Documentation

[3-5 related links]
```

### API Reference Template

```markdown
## [Method Name]

[One-sentence description]

**Parameters**:
- `param1` (type): Description
- `param2` (type, optional): Description, default: value

**Returns**: Description of return value

**Example**:
```[language]
[Complete usage example]
```

**Notes**:
- Important detail 1
- Important detail 2
```

---

## Anti-Patterns to Avoid

### ❌ Wall of Text

**Don't**:
```markdown
To configure the system you need to first make sure that you have all the prerequisites installed and then you should create a configuration file with all the necessary settings including the API keys and then you should test the configuration to make sure everything works properly before deploying to production.
```

**Do**:
```markdown
## Configuration

### Prerequisites
- API keys obtained
- Configuration file created

### Steps
1. Create `config.js` with your settings
2. Test locally: `node test-config.js`
3. Deploy to production
```

### ❌ Code Without Context

**Don't**:
```javascript
const result = await fetch(url);
return result.json();
```

**Do**:
```javascript
// lib/api-client.js
async function getData(url) {
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${API_KEY}` }
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return await response.json();
}
```

### ❌ Assuming Knowledge

**Don't**:
```markdown
Configure the cron expression for your schedule.
```

**Do**:
```markdown
Configure the cron expression for your schedule:

```javascript
cron_expression: '0 9 * * *'  // Daily at 9:00 AM
```

Cron format: `minute hour day month weekday`
See: [Cron reference](docs/CRON_AND_TIMEZONE.md)
```

### ❌ Vague Error Messages

**Don't**:
```markdown
If you get an error, check your configuration.
```

**Do**:
```markdown
### Error: "Module not found"

This means npm packages aren't installed locally:

```bash
# Fix: Install locally (no -g flag)
npm install @slack/web-api
```

Verify: `ls node_modules/@slack/web-api` should show files.
```

---

## Copy-Paste Templates

Ready-to-use templates for creating common documentation patterns.

### Template: SKILL.md (Navigation Hub)

```markdown
# Skill: [Your Skill Name]

**When to use:** [Describe when users should use this skill - be specific]

**What this skill does:** [1-2 sentence description of what the skill provides]

---

## Quick Navigation

### Getting Started
- [Guide 1](docs/FILE1.md) - Brief description (5-7 words)
- [Guide 2](docs/FILE2.md) - Brief description (5-7 words)
- [Guide 3](docs/FILE3.md) - Brief description (5-7 words)

### Troubleshooting & Advanced
- [Common Issues](docs/COMMON_ISSUES.md) - Errors and solutions
- [Advanced Topic](docs/ADVANCED.md) - Deep dive topic

---

## When to Use Each Document

| Scenario | Document |
|----------|----------|
| [Common problem 1] | [FILE1.md](docs/FILE1.md) |
| [Common problem 2] | [FILE2.md](docs/FILE2.md) |
| [Common problem 3] | [COMMON_ISSUES.md](docs/COMMON_ISSUES.md) |

---

## Quick Start

### For New Users

1. Read [Guide 1](docs/FILE1.md) - [What they'll learn]
2. Read [Guide 2](docs/FILE2.md) - [What they'll learn]
3. Start using the skill!

### For Existing Users

- Need help with [X]? → [FILE1.md](docs/FILE1.md)
- Troubleshooting? → [COMMON_ISSUES.md](docs/COMMON_ISSUES.md)

---

## Key Results

[If applicable, show real metrics from implementation]

**Before:**
- [Problem metric 1]
- [Problem metric 2]

**After:**
- [Improvement metric 1]
- [Improvement metric 2]
```

### Template: Focused Guide (250-400 lines)

```markdown
# [Guide Topic Name]

Brief 1-2 sentence overview of what this guide covers.

---

## Table of Contents

1. [Overview](#overview)
2. [When to Use This](#when-to-use-this)
3. [Step-by-Step Guide](#step-by-step-guide)
4. [Common Patterns](#common-patterns)
5. [Troubleshooting](#troubleshooting)
6. [Related Documentation](#related-documentation)

---

## Overview

[2-3 paragraphs explaining what this is and why it matters]

**Key benefits:**
- Benefit 1
- Benefit 2
- Benefit 3

---

## When to Use This

Use this guide when:
- ✅ [Scenario 1]
- ✅ [Scenario 2]
- ✅ [Scenario 3]

Don't use this for:
- ❌ [Wrong scenario 1] - Use [OTHER_GUIDE.md] instead
- ❌ [Wrong scenario 2] - Use [ANOTHER_GUIDE.md] instead

---

## Step-by-Step Guide

### Step 1: [First Action]

[Explanation]

\`\`\`bash
# Example command
command here
\`\`\`

**Expected output:**
\`\`\`
Expected output here
\`\`\`

### Step 2: [Second Action]

[Explanation]

\`\`\`javascript
// Example code
code here
\`\`\`

**What this does:** [Explanation]

### Step 3: [Third Action]

[Continue pattern...]

---

## Common Patterns

### Pattern 1: [Pattern Name]

**Use case:** [When to use this pattern]

**Implementation:**
\`\`\`javascript
// Code example
\`\`\`

**Result:** [What happens]

### Pattern 2: [Pattern Name]

[Continue pattern...]

---

## Troubleshooting

### Issue: [Common Error Message]

**Symptoms:**
- [Symptom 1]
- [Symptom 2]

**Solution:**
\`\`\`bash
# Fix command
\`\`\`

**Why this works:** [Explanation]

---

## Related Documentation

- **[GUIDE1.md](GUIDE1.md)** - [When to read this next]
- **[GUIDE2.md](GUIDE2.md)** - [Related topic]
- **[REFERENCE.md](REFERENCE.md)** - [Deep dive on this topic]
```

### Template: Troubleshooting Section

```markdown
## Troubleshooting

### Issue: [Error Message or Problem]

**Symptoms:**
- [Observable symptom 1]
- [Observable symptom 2]
- [Observable symptom 3]

**Root Cause:**
[Explain why this happens in 1-2 sentences]

**Solution:**

\`\`\`bash
# Step 1: [What this does]
command here

# Step 2: [What this does]
command here
\`\`\`

**Verify the fix:**
\`\`\`bash
# Check that it works
verification command
# Expected: [what you should see]
\`\`\`

**Why this works:**
[Explanation of the solution]

---

### Issue: [Next Problem]

[Continue pattern...]
```

### Template: Before/After Comparison

```markdown
## Results

### Before Optimization

**Problems:**
- [Problem 1 with metric]
- [Problem 2 with metric]
- [Problem 3 with metric]

**Example:**
\`\`\`
[Code or scenario showing the problem]
\`\`\`

### After Optimization

**Improvements:**
- ✅ [Improvement 1 with metric]
- ✅ [Improvement 2 with metric]
- ✅ [Improvement 3 with metric]

**Example:**
\`\`\`
[Code or scenario showing the solution]
\`\`\`

### Metrics Summary

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| [Metric 1] | [value] | [value] | [%] |
| [Metric 2] | [value] | [value] | [%] |
| [Metric 3] | [value] | [value] | [%] |
```

### Template: Quick Reference Table

```markdown
## Quick Reference

| Task | Command | When to Use |
|------|---------|-------------|
| [Task 1] | \`command1\` | [Scenario] |
| [Task 2] | \`command2\` | [Scenario] |
| [Task 3] | \`command3\` | [Scenario] |

### Common Workflows

**Workflow 1: [Name]**
\`\`\`bash
# Step 1
command1

# Step 2
command2

# Step 3
command3
\`\`\`

**Workflow 2: [Name]**
\`\`\`bash
# Steps...
\`\`\`
```

### Template: Decision Tree

```markdown
## Which [Option] Should I Use?

### Decision Flow

1. **Do you need [capability X]?**
   - → YES: Use [Option A] - See [GUIDE_A.md]
   - → NO: Continue to step 2

2. **Is [condition Y] true?**
   - → YES: Use [Option B] - See [GUIDE_B.md]
   - → NO: Continue to step 3

3. **Are you optimizing for [metric Z]?**
   - → YES: Use [Option C] - See [GUIDE_C.md]
   - → NO: Use [Option D] - See [GUIDE_D.md]

### Comparison Table

| Feature | Option A | Option B | Option C |
|---------|----------|----------|----------|
| [Feature 1] | ✅ | ❌ | ✅ |
| [Feature 2] | ❌ | ✅ | ✅ |
| [Feature 3] | ✅ | ✅ | ❌ |
| **Best for** | [Use case] | [Use case] | [Use case] |
```

### Template: Progressive Example (Simple → Complex)

```markdown
## Examples

### Example 1: Basic Usage

**Scenario:** [Simplest possible use case]

\`\`\`javascript
// Minimal code
const result = simpleFunction();
\`\`\`

**Result:** [What happens]

---

### Example 2: With Configuration

**Scenario:** [Add one complexity]

\`\`\`javascript
// Add configuration
const result = simpleFunction({
  option1: 'value'
});
\`\`\`

**Result:** [What changes]

---

### Example 3: Production-Ready

**Scenario:** [Real-world complete example]

\`\`\`javascript
// Full implementation with error handling
async function productionExample() {
  try {
    const result = await complexFunction({
      option1: 'value',
      option2: 'value',
      errorHandler: (err) => console.error(err)
    });
    return result;
  } catch (error) {
    // Handle errors
  }
}
\`\`\`

**Result:** [Complete behavior]
```

---

## Using These Templates

### Quick Start

1. **Copy template** - Select the template you need
2. **Replace placeholders** - Fill in all `[brackets]`
3. **Add real examples** - Replace generic code with actual code
4. **Test links** - Verify all internal links work
5. **Run validation** - Use `node validate.js`

### Customization Tips

- **Keep structure** - The sections are proven to work
- **Add context** - Include project-specific details
- **Use real metrics** - Replace example metrics with actual data
- **Update cross-references** - Link to your actual files

### Common Mistakes to Avoid

❌ **Don't skip sections** - Each serves a purpose
❌ **Don't use Lorem Ipsum** - Use real or realistic content
❌ **Don't forget links** - Cross-references are essential
❌ **Don't ignore feedback** - Update based on user questions

---

## Next Steps

Now that you understand content patterns, apply them using:
- [Documentation patterns](DOCUMENTATION_PATTERNS.md) - Organize content
- [Plugin publishing](PLUGIN_PUBLISHING.md) - Publish multi-file plugins
- [Generalization](GENERALIZATION.md) - Make content reusable
- [Checklist](CHECKLIST.md) - Complete optimization checklist
