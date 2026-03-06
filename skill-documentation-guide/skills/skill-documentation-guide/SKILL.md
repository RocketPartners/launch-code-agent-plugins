---
name: skill-documentation-guide
description: Proven patterns for creating well-organized, multi-file skill documentation. Transform bloated single files into maintainable multi-file plugins using progressive disclosure, scenario-based navigation, and content generalization. Based on 81% reduction success story (1,260 → 232 lines).
---

# Skill Documentation Guide


**When to use:** When creating or optimizing multi-file skill documentation, or when your skill file exceeds 800 lines and needs better organization.

**What this skill does:** Provides proven patterns, techniques, and checklists for transforming bloated single-file skills into well-structured, maintainable multi-file plugins with progressive disclosure and scenario-based navigation.

**Trigger phrases:** This skill is relevant when you encounter tasks related to:
- "publish this skill" or "publish the plugin"
- "update skill documentation" or "optimize skill docs"
- "create a new skill" or "write skill documentation"
- "split this skill file" or "organize skill documentation"
- "multi-file plugin" or "skill file structure"
- "skill documentation is too long" or "skill file exceeds X lines"
- "publishing to LaunchCode" or "upload to LaunchCode"
- "skill version" or "update plugin version"

---

## 🤖 INSTRUCTIONS FOR CLAUDE CODE

**When this skill is invoked, follow this exact workflow:**

### Step 1: Understand User Context (REQUIRED)

**Ask the user to clarify their goal using AskUserQuestion:**
- Creating a NEW skill from scratch?
- Optimizing EXISTING skill (>800 lines)?
- Publishing multi-file plugin?
- Making content reusable/generic?

### Step 2: Create Todo List (REQUIRED)

**Immediately use TodoWrite tool** to track progress:
- Add appropriate phase tasks based on user goal
- Mark tasks as `in_progress` as you work through them
- Mark tasks as `completed` immediately after finishing each one

### Step 3: Execute Appropriate Workflow

**Based on user goal, follow the relevant path:**

#### Path A: Creating NEW Skill
1. Read project context to understand what the skill does
2. Create SKILL.md with navigation hub structure (200-300 lines)
3. Use the **File Templates** section below
4. Identify 5-8 core topics needing separate guides
5. Create docs/ directory structure
6. Write focused guides (250-400 lines each) using templates
7. Add cross-references between all files
8. Create scenario-based navigation table

#### Path B: Optimizing EXISTING Skill (>800 lines)
1. Run `wc -l SKILL.md` to measure current size
2. Follow the **EMBEDDED 8-PHASE CHECKLIST** below
3. Get user approval after Phase 2 (structure plan)
4. Test navigation after Phase 4
5. Verify all links work before publishing

#### Path C: Publishing Multi-File Plugin
1. Verify all files exist in docs/ directory
2. Follow **Phase 5-6** instructions in the checklist below
3. Update publish-plugin.js with correct file paths
4. Test publish script locally first
5. Verify escaping for template literals
6. Publish and verify all files uploaded

#### Path D: Generalizing Content
1. Follow **Phase 3** instructions in the checklist below
2. Find project-specific names/examples
3. Replace with generic equivalents + "CUSTOMIZE THIS" comments
4. Provide 2-3 alternative examples for each
5. Test that examples still make sense

### Step 4: Verify and Document (ALWAYS)
- Test all navigation links work
- Verify structure is intuitive
- Run through user scenarios
- Mark all todos as completed
- Document lessons learned

---

## 📂 ACCESSING DOCUMENTATION FILES

**IMPORTANT:** This skill includes detailed guides in the docs/ directory. These files are part of the LaunchCode plugin storage, not the user's working directory.

### You DO NOT Need to Read Separate Files

**All essential instructions are embedded below:**
- **8-Phase Checklist** - Complete optimization process
- **File Templates** - Structure for navigation hub, focused guides, references
- **Generalization Patterns** - How to make content reusable
- **Publishing Instructions** - Multi-file plugin setup

### If User Asks for Full Documentation

Tell them: "The full detailed guides are available at:
- docs/DOCUMENTATION_PATTERNS.md - 9 organization patterns
- docs/PLUGIN_PUBLISHING.md - Multi-file publishing guide
- docs/GENERALIZATION.md - 8 generalization techniques
- docs/CONTENT_PATTERNS.md - Writing effective guides
- docs/CHECKLIST.md - Complete step-by-step process

Would you like me to describe a specific pattern, or would you prefer to read the full guide yourself?"

---

## 📋 EMBEDDED 8-PHASE OPTIMIZATION CHECKLIST

Use this when optimizing existing skill documentation (>800 lines).

### Phase 1: Audit Current State (15-30 min)

**ACTIONS:**
1. Count lines: `wc -l SKILL.md`
2. Identify topics: Run `grep "^## " SKILL.md` to list all sections
3. List user pain points: What's hard to find?
4. Check current plugin structure

**SUCCESS CRITERIA:**
- [ ] Line count recorded
- [ ] Topic list created (expect 5-15 topics)
- [ ] Current structure documented

**TodoWrite task:** "Audit current SKILL.md structure and metrics"

---

### Phase 2: Plan Target Structure (30-45 min)

**ACTIONS:**
1. Group related sections into topic clusters
2. Determine hierarchy: Navigation Hub → Focused Guides → Detailed Reference
3. Create file structure plan:
   ```
   SKILL.md (200-300 lines)
   docs/
     ├── GETTING_STARTED.md (250-400 lines)
     ├── COMMON_ISSUES.md (250-400 lines)
     ├── [TOPIC].md (250-400 lines for each core topic)
     └── DETAILED_REFERENCE.md (500-900 lines if needed)
   ```
4. Map user scenarios to documents
5. **Get user approval using AskUserQuestion before proceeding**

**SUCCESS CRITERIA:**
- [ ] File structure planned (5-8 focused guides)
- [ ] Scenario mapping table drafted
- [ ] User approved structure

**TodoWrite tasks:**
- "Plan target documentation structure"
- "Get user approval on structure plan"

---

### Phase 3: Generalize Content (45-60 min)

**ACTIONS FOR EACH FILE:**
1. Find project-specific names/examples
2. Replace with generic equivalents
3. Add "CUSTOMIZE THIS:" comments
4. Provide 2-3 alternative examples
5. Remove hardcoded values

**GENERALIZATION PATTERNS:**

```javascript
// ❌ BEFORE (project-specific)
const minutes = await fetchFromSlack(channel);
await saveToNotion(notionPageId, minutes);

// ✅ AFTER (generalized)
// CUSTOMIZE THIS: Replace with your data source
const data = await fetchData();
// Examples:
// - Slack: await fetchFromSlack(channel)
// - Database: await db.query('SELECT * FROM...')
// - API: await fetch('https://api.example.com/data')

// CUSTOMIZE THIS: Replace with your data destination
await saveData(data);
// Examples:
// - Notion: await saveToNotion(pageId, data)
// - Database: await db.insert('table', data)
// - File: await fs.writeFile('output.json', JSON.stringify(data))
```

**Replace specific IDs:**
```javascript
// ❌ BEFORE
const userId = 'U01ABC123XY';
const channelId = 'C01DEF456ZW';

// ✅ AFTER
const userId = 'USER-123'; // CUSTOMIZE THIS: Your user ID
const channelId = 'CHANNEL-456'; // CUSTOMIZE THIS: Your channel ID
```

**Replace specific field names:**
```markdown
// ❌ BEFORE
| Field | Type |
|-------|------|
| salesforceId | string |
| opportunityStage | enum |

// ✅ AFTER
| Field | Type | Description |
|-------|------|-------------|
| id | string | CUSTOMIZE THIS: Your external system ID |
| status | enum | CUSTOMIZE THIS: Your status field (e.g., stage, state, phase) |
```

**SUCCESS CRITERIA:**
- [ ] All project names replaced
- [ ] "CUSTOMIZE THIS:" comments added at every customization point
- [ ] Multiple examples provided (2-3 alternatives)
- [ ] Content still makes sense when generalized

**TodoWrite task:** "Generalize all project-specific content"

---

### Phase 4: Organize Documentation (60-90 min)

**ACTIONS:**
1. Create docs/ directory: `mkdir -p docs`
2. Create new SKILL.md as navigation hub (200-300 lines)
3. Extract focused guides (250-400 lines each)
4. Preserve detailed references (500-900 lines if needed)
5. Add cross-references everywhere
6. Test all internal links

**FILE TEMPLATES:**

#### Template 1: Navigation Hub (SKILL.md)

```markdown
# Skill: [Name]

**When to use:** [Clear trigger conditions]
**What this skill does:** [One paragraph]
**Trigger phrases:** [List of phrases]

---

## Quick Navigation

### Getting Started
- [Getting Started Guide](docs/GETTING_STARTED.md) - Prerequisites, setup, first steps
- [Quick Start Checklist](docs/GETTING_STARTED.md#quick-start) - 5-minute setup

### Core Guides
- [Guide 1](docs/GUIDE_1.md) - [One-line description]
- [Guide 2](docs/GUIDE_2.md) - [One-line description]
- [Guide 3](docs/GUIDE_3.md) - [One-line description]

### Troubleshooting
- [Common Issues](docs/COMMON_ISSUES.md) - Top 10 problems and solutions
- [FAQ](docs/FAQ.md) - Frequently asked questions

### Advanced Topics
- [Advanced Topic 1](docs/ADVANCED_1.md) - [One-line description]
- [Detailed Reference](docs/REFERENCE.md) - Complete implementation guide

---

## Critical Success Factors

[Top 10 most important points to avoid failure]

1. **Point 1** - Brief explanation
2. **Point 2** - Brief explanation
...
10. **Point 10** - Brief explanation

---

## When to Use Each Document

| Scenario | Document |
|----------|----------|
| I'm setting up for the first time | [Getting Started](docs/GETTING_STARTED.md) |
| I got error: "X" | [Common Issues](docs/COMMON_ISSUES.md) |
| I need to do task Y | [Guide Y](docs/GUIDE_Y.md) |
| I want to understand Z in depth | [Reference Z](docs/REFERENCE_Z.md) |

---

## Support Resources

- **Version**: X.Y.Z
- **Last Updated**: YYYY-MM-DD
- **Plugin**: Subscribe in LaunchCode
- **Documentation**: See docs/ folder
```

#### Template 2: Focused Guide (250-400 lines)

```markdown
# [Topic Name]

**When to use this guide:** [Specific scenarios where this guide helps]

## Overview

[2-3 paragraphs explaining what this guide covers and why it matters]

## Prerequisites

Before following this guide, ensure you have:
- [ ] Prerequisite 1
- [ ] Prerequisite 2
- [ ] Prerequisite 3

## Step-by-Step Instructions

### Step 1: [Action]

[Detailed explanation]

```[language]
// Code example
```

**Expected result:** [What should happen]

### Step 2: [Action]

[Detailed explanation]

```[language]
// Code example
```

**Expected result:** [What should happen]

[Continue with all steps...]

## Common Issues

### Issue 1: [Problem description]

**Symptom:** [What the user sees]

**Cause:** [Why it happens]

**Solution:**
```[language]
// Fix code
```

### Issue 2: [Problem description]

[Same structure as Issue 1]

## Best Practices

1. **Practice 1** - Explanation
2. **Practice 2** - Explanation
3. **Practice 3** - Explanation

## Related Documentation

- **[Guide 1](GUIDE_1.md)** - [Why relevant to this guide]
- [Guide 2](GUIDE_2.md) - [Why relevant to this guide]
- [Reference](REFERENCE.md) - [Deep dive on this topic]
```

#### Template 3: Detailed Reference (500-900 lines)

```markdown
# [Reference Topic Name]

**Purpose:** [Complete deep-dive reference for complex implementation]

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Implementation](#implementation)
4. [Testing](#testing)
5. [Common Pitfalls](#common-pitfalls)

## Overview

[Comprehensive explanation of the topic, when to use it, why it exists]

## Architecture

[Detailed architectural diagrams, patterns, design decisions]

## Implementation

### Complete Example

```[language]
// Full working implementation with extensive comments
```

### Step-by-Step Breakdown

[Detailed explanation of each part of the implementation]

## Testing

### Test Cases

```[language]
// Complete test suite
```

### Manual Testing Procedure

1. [Step 1]
2. [Step 2]
...

## Common Pitfalls

### Pitfall 1: [Description]

**Problem:** [What goes wrong]
**Why it happens:** [Root cause]
**How to avoid:** [Prevention]
**How to fix:** [Solution]

[Continue for all common pitfalls...]

## Performance Considerations

[Detailed performance analysis, benchmarks, optimization techniques]

## Related Documentation

- [Getting Started](GETTING_STARTED.md) - Basic setup
- [Guide](GUIDE.md) - Simplified version of this topic
```

**SUCCESS CRITERIA:**
- [ ] docs/ directory created
- [ ] SKILL.md rewritten as hub (200-300 lines)
- [ ] 5-8 focused guides created
- [ ] All cross-references working
- [ ] Scenario table complete and accurate

**TodoWrite tasks:**
- "Create docs/ directory and file structure"
- "Rewrite SKILL.md as navigation hub"
- "Extract content into focused guides"
- "Add cross-references between all files"

---

### Phase 5: Update Plugin Publisher (30-45 min)

**ACTIONS:**
1. Update publish-plugin.js to use correct Plugin object API
2. **CRITICAL**: Always update plugin metadata (version, description) for existing plugins
3. **CRITICAL**: Ensure file paths start with `skills/{slug}/` prefix
4. Ensure proper escaping for template literals
5. Verify file paths in upload structure
6. Test script locally before publishing

**⚠️ MANDATORY VERSION AND METADATA UPDATE:**

When republishing an existing plugin, you **MUST** call `api.plugins.update()` to update metadata INCLUDING the version field. Otherwise, the version shown in LaunchCode UI will not update.

**⚠️ CRITICAL FILE PATH REQUIREMENT:**

All skill files **MUST** be uploaded with the `skills/{slug}/` path prefix:
- ✅ CORRECT: `skills/your-skill-slug/SKILL.md`
- ❌ WRONG: `SKILL.md` (will not appear in Skills tab)

Without the proper prefix, LaunchCode will store the files but they won't be recognized as skill files and the Skills tab will show "No skills in this plugin."

**CORRECT CODE EXAMPLE FOR publish-plugin.js:**

```javascript
const fs = require('fs');
const path = require('path');

// Read main skill content
let skillContent = fs.readFileSync(path.join(__dirname, 'SKILL.md'), 'utf8');

// Remove first heading and prepare for frontmatter
skillContent = skillContent.replace(/^# Skill: [^\n]+\n/, '');

// Add frontmatter
const skillWithFrontmatter = `---
name: your-skill-slug
description: Your skill description
---

# Your Skill Name

${skillContent}`;

// List ALL documentation files
const docsFiles = [
  'docs/README.md',
  'docs/GETTING_STARTED.md',
  'docs/COMMON_ISSUES.md',
  'docs/GUIDE_1.md',
  'docs/GUIDE_2.md',
  // ... add all your docs files
];

// Read all files
const allDocsContent = {};
docsFiles.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    allDocsContent[filePath] = fs.readFileSync(fullPath, 'utf8');
  }
});

// Escape for template literal
function esc(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

// Output API script
console.log(\`
const skillContent = \\\`\${esc(skillWithFrontmatter)}\\\`;

const docsContent = {
\${Object.entries(allDocsContent).map(([filePath, content]) =>
  \`  '\${filePath}': \\\`\${esc(content)}\\\`\`
).join(',\\n')}
};

try {
  console.log('📦 Publishing plugin...');

  // Check if plugin exists
  let plugin;
  let isUpdate = false;

  try {
    plugin = await api.plugins.get('your-skill-slug');
    isUpdate = true;
    console.log('✓ Found existing plugin (will update)');

    // CRITICAL: Update metadata including version for existing plugins
    await api.plugins.update('your-skill-slug', {
      version: '1.0.0',  // UPDATE THIS WITH EACH RELEASE
      description: 'Your skill description',
      default_access: 'public_read'
    });
    console.log('✓ Plugin metadata updated (version will show in LaunchCode UI)');
  } catch (err) {
    // Plugin doesn't exist, create new one
    console.log('✓ Creating new plugin...');
    plugin = api.plugins.new({
      slug: 'your-skill-slug',
      display_name: 'Your Skill Name',
      plugin_type: 'skill',
      version: '1.0.0',
      description: 'Your skill description',
      default_access: 'public_read'
    });
  }

  // CRITICAL: Add files with proper skills/{slug}/ prefix
  // Files MUST start with 'skills/your-skill-slug/' or they won't appear in Skills tab
  plugin.addFile('skills/your-skill-slug/SKILL.md', skillContent);

  // Add all documentation files with proper prefix
  for (const [filePath, content] of Object.entries(docsContent)) {
    plugin.addFile('skills/your-skill-slug/' + filePath, content);
  }

  console.log('✓ Plugin configured with ' + (1 + Object.keys(docsContent).length) + ' files');

  // Save to LaunchCode (creates new plugin or updates files)
  await plugin.save();
  console.log('✓ Plugin files saved to LaunchCode');
  console.log('📚 Plugin Published Successfully!');

} catch (error) {
  console.error('❌ Error publishing plugin:', error.message);
  throw error;
}
\`);
```

**KEY DIFFERENCES FROM OLD BROKEN CODE:**

❌ **OLD (BROKEN)**:
- Used `api.plugins.create()` (doesn't exist)
- Used `api.plugins.setFiles()` (doesn't exist)
- Plugin metadata didn't update properly

✅ **NEW (WORKING)**:
- Uses `api.plugins.new()` to create Plugin object
- Uses `api.plugins.get()` to load existing plugin
- **Uses `api.plugins.update()` to update metadata/version for existing plugins**
- Uses `.addFile()` to add/update files
- Uses `.save()` to persist changes
- Plugin metadata (including version) updates correctly in LaunchCode UI

**CRITICAL: Escaping Function**

The esc() function MUST escape in this order:
1. Backslashes first: `\\` → `\\\\`
2. Backticks second: `` ` `` → ``\\` ``
3. Dollar signs last: `$` → `\\$`

**WRONG ORDER (will break):**
```javascript
function esc(str) {
  return str.replace(/`/g, '\\`')      // Backticks first - WRONG!
           .replace(/\$/g, '\\$')
           .replace(/\\/g, '\\\\');    // Backslashes last - WRONG!
}
```

**RIGHT ORDER (works correctly):**
```javascript
function esc(str) {
  return str.replace(/\\/g, '\\\\')    // Backslashes first - CORRECT!
           .replace(/`/g, '\\`')       // Backticks second - CORRECT!
           .replace(/\$/g, '\\$');     // Dollar signs last - CORRECT!
}
```

**SUCCESS CRITERIA:**
- [ ] All doc files listed in docsFiles array
- [ ] Escaping function correct (backslashes first!)
- [ ] File paths match actual structure
- [ ] Test mode runs without errors

**TodoWrite tasks:**
- "Update publish-plugin.js with all doc files"
- "Test publisher script locally"

---

### Phase 6: Publish Plugin (15-30 min)

**ACTIONS:**
1. Update version in publish-plugin.js
2. Update CHANGELOG.md with changes
3. Run publish script
4. Verify success message
5. Check files uploaded correctly in LaunchCode UI

**PUBLISH COMMAND:**
```bash
node publish-plugin.js | ~/.launchcode/scripts/api.js
```

**EXPECTED OUTPUT:**
```
📦 Found existing plugin, will update...
✅ Plugin metadata updated
✅ Skill files uploaded (X files)
📚 Plugin Published Successfully!
```

**SUCCESS CRITERIA:**
- [ ] Version incremented in publish-plugin.js
- [ ] CHANGELOG.md updated
- [ ] Plugin published successfully
- [ ] All files visible in LaunchCode UI

**TodoWrite tasks:**
- "Update version and CHANGELOG"
- "Publish plugin to LaunchCode"
- "Verify all files uploaded"

---

### Phase 7: Verify Everything Works (15-30 min)

**ACTIONS:**
1. Test from another directory
2. Try invoking with trigger phrases
3. Verify Claude can access instructions
4. Check scenario table accuracy
5. Test all internal links
6. Run through user scenarios

**VERIFICATION TESTS:**

**Test 1: Invocation from Different Directory**
```bash
cd /tmp
# Start Claude Code session
# Say: "Help me with [skill trigger phrase]"
# Verify: Skill loads without errors
```

**Test 2: Navigation Links**
- Open SKILL.md
- Click every link in Quick Navigation
- Verify all files load
- Check no broken links

**Test 3: User Scenarios**
- Follow scenario table for each use case
- Verify guidance is correct
- Ensure instructions work

**Test 4: Cross-References**
- Open each focused guide
- Click "Related Documentation" links
- Verify they lead to correct files

**SUCCESS CRITERIA:**
- [ ] Works from any directory
- [ ] All links functional
- [ ] Navigation intuitive
- [ ] No broken references
- [ ] User scenarios work

**TodoWrite task:** "Test skill from different directory and verify all links"

---

### Phase 8: Document and Cleanup (15-30 min)

**ACTIONS:**
1. Update PROJECT_README.md with new structure
2. Document lessons learned
3. Remove old backup files (keep one backup)
4. Commit changes with clear message

**VERSION SYNCHRONIZATION (CRITICAL):**

When updating version, you MUST update ALL of these:
1. **CHANGELOG.md** - Add new version entry with date
2. **publish-plugin.js** - Update `version` field in TWO places:
   - In `api.plugins.update()` call for existing plugins (updates LaunchCode UI)
   - In `api.plugins.new()` call for new plugins
3. **SKILL.md** - Update version in Support Resources section
4. **PROJECT_README.md** - Update version reference

**These versions must always match!**

**⚠️ MOST IMPORTANT: METADATA UPDATE**

When republishing an existing plugin, the publish script **MUST** call:
```javascript
await api.plugins.update('your-skill-slug', {
  version: '1.0.0',  // This updates the version shown in LaunchCode UI
  description: 'Your skill description',
  default_access: 'public_read'
});
```

Without this call, `.save()` will update files but NOT update the version displayed in the LaunchCode plugins detail page. Users will see the old version number even though files are updated.

**CHANGELOG ENTRY TEMPLATE:**
```markdown
## [X.Y.Z] - YYYY-MM-DD

### Changed
- Split documentation into X focused files
- Reduced main SKILL.md by XX%
- Generalized all project-specific content

### Added
- X focused guides in docs/
- Scenario-based navigation table
- Cross-references between documents

### Fixed
- [Any bugs or issues fixed]
```

**GIT COMMIT TEMPLATE:**
```bash
git add .
git commit -m "Optimize skill documentation structure

- Split SKILL.md into X focused files
- Generalized content for reusability
- Updated plugin publisher for multi-file support
- Main SKILL.md reduced from XXX to YYY lines (ZZ% reduction)

Version: X.Y.Z"
```

**SUCCESS CRITERIA:**
- [ ] All versions synchronized
- [ ] CHANGELOG entry added
- [ ] README updated
- [ ] Changes committed
- [ ] Old backups removed (keep 1)

**TodoWrite task:** "Update versions, CHANGELOG, and commit changes"

---

## 🧪 TESTING THIS SKILL

Use this section to verify the skill works correctly.

### Verification Checklist

**Test 1: Invocation from Another Directory**
1. `cd /tmp`
2. Start Claude Code session
3. Say: "I need to optimize my skill documentation"
4. ✅ Verify: Claude uses this skill without file read errors
5. ✅ Verify: TodoWrite tool used immediately
6. ✅ Verify: AskUserQuestion used to clarify goal

**Test 2: Todo List Creation**
1. Invoke skill with optimization request
2. ✅ Verify: TodoWrite tool creates task list
3. ✅ Verify: 8 phases added to todo list
4. ✅ Verify: Tasks marked in_progress → completed as work progresses

**Test 3: Embedded Instructions Accessible**
1. Ask Claude: "Show me the 8-phase checklist"
2. ✅ Verify: Can describe phases without reading separate files
3. ✅ Verify: No "file not found" errors
4. ✅ Verify: Uses templates from this file

**Test 4: Generalization Patterns**
1. Ask Claude to generalize project-specific code
2. ✅ Verify: Uses embedded patterns from Phase 3
3. ✅ Verify: Adds "CUSTOMIZE THIS" comments
4. ✅ Verify: Provides 2-3 example alternatives

**Test 5: Publishing Instructions**
1. Ask Claude to help publish multi-file plugin
2. ✅ Verify: Uses Phase 5-6 instructions
3. ✅ Verify: Checks escaping order (backslashes first)
4. ✅ Verify: Lists all files to include

### Success Criteria

- ✅ Works from any directory (no file path dependencies)
- ✅ Creates todo list automatically
- ✅ Uses embedded instructions (no external file reads required)
- ✅ Follows complete 8-phase process
- ✅ Asks clarifying questions before proceeding
- ✅ No file path errors or broken references

---

## Quick Navigation

### Core Guides
- [Documentation Organization Patterns](docs/DOCUMENTATION_PATTERNS.md) - Progressive disclosure, file structure, navigation strategies
- [Multi-File Plugin Publishing](docs/PLUGIN_PUBLISHING.md) - Publishing setup, escaping, testing, troubleshooting
- [Content Generalization Techniques](docs/GENERALIZATION.md) - Making project-specific content reusable
- [Effective Content Patterns](docs/CONTENT_PATTERNS.md) - Writing focused guides, length guidelines, structure
- [Optimization Checklist](docs/CHECKLIST.md) - Complete step-by-step process (8 phases)

### Overview
- [README](docs/README.md) - Full overview, transformation story, key metrics

---

## When to Use Each Document

| Scenario | Document |
|----------|----------|
| Starting a new skill from scratch | [DOCUMENTATION_PATTERNS.md](docs/DOCUMENTATION_PATTERNS.md) |
| Skill file is too large (>800 lines) | [CHECKLIST.md](docs/CHECKLIST.md) or use embedded checklist above |
| Publishing multi-file plugin | [PLUGIN_PUBLISHING.md](docs/PLUGIN_PUBLISHING.md) or use Phase 5-6 above |
| Making content reusable | [GENERALIZATION.md](docs/GENERALIZATION.md) or use Phase 3 above |
| Writing better focused guides | [CONTENT_PATTERNS.md](docs/CONTENT_PATTERNS.md) or use templates above |
| Need complete optimization process | Use embedded 8-phase checklist above |
| Understanding the full transformation | [README.md](docs/README.md) |

---

## Key Results (Real Implementation)

### LaunchCode Automation Skill Transformation

**Before:**
- 1,260 lines in single SKILL.md
- Hard to navigate
- Project-specific content
- Single file plugin

**After:**
- 232 lines in SKILL.md (81% reduction)
- 16 focused files organized in structure
- Fully generalized and reusable
- Complete multi-file plugin

**Metrics:**
- Main file: 81% smaller
- Documentation: Split into 15 focused files
- Average file length: ~350 lines (highly scannable)
- User navigation time: 70-90% faster

---

## Core Principles

### 1. Progressive Disclosure
Don't force users to read everything. Provide layers:
- **Layer 1**: Quick navigation hub (200-300 lines)
- **Layer 2**: Focused guides (250-400 lines each)
- **Layer 3**: Detailed reference (500-900 lines)

### 2. Scenario-Based Navigation
Users come with specific problems. Guide them with "When to Use Each Document" tables.

### 3. Focused Files
Each file should cover ONE topic thoroughly. If it's over 500 lines, consider splitting.

### 4. Cross-References
Every file should link to 3-5 related files with brief descriptions.

### 5. Generalization
Replace project-specific content with generic patterns and "CUSTOMIZE THIS" comments.

---

## Success Metrics

### Target Numbers

**Main Hub File:**
- 200-300 lines
- Quick navigation section
- Scenario mapping table
- Links to all guides

**Focused Guides:**
- 250-400 lines each
- One topic per file
- 5-8 guides for core functionality

**Detailed References:**
- 500-900 lines
- Deep implementation details
- 1-3 references for complex topics

**Overall:**
- 11-16 total files
- 70-90% reduction in main file
- User finds answer in <2 minutes

---

## What Makes This Different

### Traditional Approach
- Start writing in one file
- Keep adding content
- File grows to 1,000+ lines
- Hard to navigate
- Project-specific

### This Approach
- Design structure first
- Progressive disclosure layers
- Focused files (one topic each)
- Scenario-based navigation
- Generalized and reusable

### Results
- 81% reduction in main file size
- 70-90% faster user navigation
- Higher user satisfaction
- Easier to maintain
- More reusable

---

## Support Resources

- **Template Repository:** This skill serves as a template
- **Real Example:** LaunchCode Automation skill (see docs/README.md)
- **Complete Checklist:** See embedded 8-phase checklist above or docs/CHECKLIST.md
- **Pre-Publish Audit:** See docs/PRE_PUBLISH_AUDIT.md before publishing updates
- **Live Plugin:** Subscribe to "Skill Documentation Guide" plugin in LaunchCode
- **Reference Examples:** See reference/validate.js for validation script example
  - **Important:** This is for learning only - adapt it for your project
  - **Do NOT publish validate.js to LaunchCode** - it's for local testing only
- **Version:** 1.4.0 (see CHANGELOG.md)

---

**Based on real implementation:** LaunchCode Automation skill transformation (1,260 → 232 lines, 81% reduction)
