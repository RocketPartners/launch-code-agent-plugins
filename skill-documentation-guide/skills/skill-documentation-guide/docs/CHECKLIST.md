# Skill Optimization Checklist

Step-by-step checklist for optimizing LaunchCode skill documentation from bloated single-file to well-organized multi-file structure.

---

## Overview

This checklist guides you through the complete optimization process:

1. **Audit** - Understand current state
2. **Plan** - Design target structure
3. **Generalize** - Make content reusable
4. **Organize** - Split into focused files
5. **Publish** - Update plugin with new structure
6. **Verify** - Confirm everything works

**Estimated time**: 4-6 hours for comprehensive skill documentation
**Result**: 70-90% reduction in main file size, improved user experience

---

## Phase 1: Audit Current State

### 1.1 Measure Documentation Size

- [ ] Count lines in main SKILL.md file
  ```bash
  wc -l SKILL.md
  ```
  **Record**: _____ lines

- [ ] Identify if optimization is needed
  - [ ] > 800 lines = Definitely needs splitting
  - [ ] 500-800 lines = Consider splitting
  - [ ] < 500 lines = Probably fine as-is

### 1.2 List All Topics Covered

- [ ] Read through main file and list major topics
  ```markdown
  Topics found:
  1. _______________________
  2. _______________________
  3. _______________________
  4. _______________________
  5. _______________________
  6. _______________________
  7. _______________________
  8. _______________________
  ```

- [ ] Count distinct topics: _____
  - [ ] 8+ topics = Definitely split
  - [ ] 5-7 topics = Consider splitting
  - [ ] < 5 topics = May be fine

### 1.3 Identify Project-Specific Content

- [ ] Search for hard-coded names
  ```bash
  grep -r "John\|Jane\|Bob" --include="*.js" --include="*.md" .
  ```

- [ ] Search for specific IDs/patterns
  ```bash
  grep -r "REQ-\|U[0-9A-Z]\{9\}" --include="*.js" .
  ```

- [ ] List project-specific terms found:
  ```markdown
  Specific Terms:
  - _______________________
  - _______________________
  - _______________________
  ```

### 1.4 Check Plugin Structure

- [ ] Verify current plugin files
  ```bash
  # Check publish script
  cat publish-plugin.js
  ```

- [ ] Count files currently published: _____
  - [ ] 1 file = Need to add multi-file support
  - [ ] Multiple files = Verify structure

---

## Phase 2: Plan Target Structure

### 2.1 Design Documentation Hierarchy

Based on topics identified, plan structure:

**Main Navigation Hub** (200-300 lines):
- [ ] Quick navigation section
- [ ] Critical success factors (top 10)
- [ ] Quick start checklist
- [ ] Scenario mapping table
- [ ] Links to all guides

**Focused Guides** (250-400 lines each, in docs/):
- [ ] Guide 1: _______________________ (docs/_______________________. md)
- [ ] Guide 2: _______________________ (docs/_______________________. md)
- [ ] Guide 3: _______________________ (docs/_______________________. md)
- [ ] Guide 4: _______________________ (docs/_______________________. md)
- [ ] Guide 5: _______________________ (docs/_______________________. md)
- [ ] Guide 6: _______________________ (docs/_______________________. md)
- [ ] Guide 7: _______________________ (docs/_______________________. md)
- [ ] Guide 8: _______________________ (docs/_______________________. md)

**Detailed Reference** (500-900 lines, also in docs/):
- [ ] Reference 1: _______________________ (docs/_______________________. md)
- [ ] Reference 2: _______________________ (docs/_______________________. md)
- [ ] Reference 3: _______________________ (docs/_______________________. md) (optional - for service lifecycle, etc.)

### 2.2 Map Content to Files

For each section in current SKILL.md:

- [ ] Section: _______________________ → File: _______________________
- [ ] Section: _______________________ → File: _______________________
- [ ] Section: _______________________ → File: _______________________
- [ ] Section: _______________________ → File: _______________________
- [ ] Section: _______________________ → File: _______________________

### 2.3 Plan Generalization

Create mapping table for project-specific → generic:

| Current Term | Generic Term | Examples |
|--------------|-------------|----------|
| ____________ | ____________ | ________ |
| ____________ | ____________ | ________ |
| ____________ | ____________ | ________ |
| ____________ | ____________ | ________ |

---

## Phase 3: Generalize Content

### 3.1 Replace Project-Specific Terms

- [ ] Create replacement script
  ```bash
  cat > generalize.sh << 'EOF'
  #!/bin/bash
  # Replace most specific terms first
  find . -type f \( -name "*.js" -o -name "*.md" \) -exec sed -i '' \
    -e 's/PROJECT_SPECIFIC_1/GENERIC_1/g' \
    -e 's/PROJECT_SPECIFIC_2/GENERIC_2/g' \
    {} +
  EOF
  chmod +x generalize.sh
  ```

- [ ] Review changes before committing
  ```bash
  git diff
  ```

- [ ] Run replacement script
  ```bash
  ./generalize.sh
  ```

### 3.2 Add Customization Comments

For each generic section:

- [ ] Add "CUSTOMIZE THIS" comment
- [ ] Provide 2-3 example alternatives
- [ ] Show pattern to follow

**Template**:
```javascript
// CUSTOMIZE THIS: [What to customize]
// Examples:
// - Option 1: [example]
// - Option 2: [example]
// - Option 3: [example]
[generic code]
```

### 3.3 Update Field Names

- [ ] Replace specific field names with generic equivalents
  - [ ] Domain-specific → `name`, `type`, `status`
  - [ ] Specific IDs → `ITEM-xxx` format
  - [ ] Specific users → `user_123`, `User One`

### 3.4 Generalize Examples

- [ ] Update code examples to show multiple use cases
- [ ] Add comments explaining how to adapt
- [ ] Provide realistic but generic data

---

## Phase 4: Organize Documentation

### 4.1 Create Directory Structure

- [ ] Create docs folder
  ```bash
  mkdir -p docs
  ```

- [ ] Create placeholder files
  ```bash
  touch docs/GETTING_STARTED.md
  touch docs/COMMON_ISSUES.md
  # ... create all planned files
  ```

### 4.2 Extract Content to Focused Files

For each focused guide:

- [ ] Copy relevant sections from main SKILL.md
- [ ] Add proper heading (# Guide Name)
- [ ] Add 2-3 sentence overview
- [ ] Organize into logical sections
- [ ] Add "Related Documentation" section at end
- [ ] Verify length (250-400 lines target)

**Guides created**:
- [ ] docs/GETTING_STARTED.md (_____ lines)
- [ ] docs/COMMON_ISSUES.md (_____ lines)
- [ ] docs/_______________________ (_____ lines)
- [ ] docs/_______________________ (_____ lines)
- [ ] docs/_______________________ (_____ lines)

### 4.3 Rewrite Main SKILL.md

- [ ] Remove extracted content (keep in backup)
- [ ] Add Quick Navigation section
  ```markdown
  ## Quick Navigation

  ### Getting Started
  - [Link 1](docs/FILE1.md) - Description

  ### Advanced Topics
  - [Link 2](docs/FILE2.md) - Description
  ```

- [ ] Condense Critical Success Factors to 10 items
- [ ] Add Quick Start Checklist
- [ ] Create scenario mapping table
  ```markdown
  ## When to Use Each Document

  | Scenario | Document |
  |----------|----------|
  | Problem 1 | docs/SOLUTION1.md |
  | Problem 2 | docs/SOLUTION2.md |
  ```

- [ ] Add Support Resources section
- [ ] Verify length: _____ lines (target: 200-300)

### 4.4 Add Cross-References

For each focused guide:

- [ ] Add "Related Documentation" section at end
- [ ] Link to 3-5 related guides
- [ ] Include brief descriptions (5-10 words)
- [ ] Bold most important link

**Verification**: Each file should link to and from at least 2 other files.

### 4.5 Review Navigation Flow

Test navigation paths:

- [ ] New user path: SKILL.md → GETTING_STARTED.md → JOB_CREATION.md
- [ ] Troubleshooting path: SKILL.md → COMMON_ISSUES.md → specific issue
- [ ] Advanced path: SKILL.md → ADVANCED.md → DETAILED_REFERENCE.md

---

## Phase 5: Update Plugin Publisher

### 5.1 Modify publish-plugin.js

- [ ] Add docs file list
  ```javascript
  const docsFiles = [
    'docs/GETTING_STARTED.md',
    'docs/COMMON_ISSUES.md',
    // ... all docs files
  ];
  ```

- [ ] Add reference file list
  ```javascript
  const referenceFiles = [
    'DETAILED_REFERENCE.md',
    'ISSUE_HISTORY.md'
  ];
  ```

- [ ] Update file reading logic
  ```javascript
  const allDocsContent = {};
  [...docsFiles, ...referenceFiles].forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
      allDocsContent[filePath] = fs.readFileSync(fullPath, 'utf8');
    }
  });
  ```

- [ ] Update files array building
  ```javascript
  // Add main SKILL.md
  const files = [
    {
      path: 'skills/SKILL-SLUG/SKILL.md',
      content: skillContent
    }
  ];

  // Add all documentation files
  for (const [filePath, content] of Object.entries(docsContent)) {
    files.push({
      path: 'skills/SKILL-SLUG/' + filePath,
      content: content
    });
  }
  ```

### 5.2 Test Publisher Locally

- [ ] Add test mode to publisher
  ```javascript
  const TEST_MODE = process.argv.includes('--test');

  if (TEST_MODE) {
    console.log('Files that would be uploaded:');
    files.forEach(f => console.log(`  ${f.path} (${f.content.length} bytes)`));
    process.exit(0);
  }
  ```

- [ ] Run test mode
  ```bash
  node publish-plugin.js --test
  ```

- [ ] Verify all files listed: _____ total files
  - [ ] Main SKILL.md included
  - [ ] All docs/ files included
  - [ ] Reference files included

### 5.3 Verify Escaping

- [ ] Test escape function handles backticks
- [ ] Test escape function handles dollar signs
- [ ] Test escape function handles backslashes
- [ ] Check code blocks preserved correctly

---

## Phase 6: Publish Plugin

### 6.1 Pre-Publish Verification

- [ ] All files exist and have content
  ```bash
  for file in SKILL.md docs/*.md *.md; do
    [ -f "$file" ] && echo "✓ $file" || echo "✗ $file missing"
  done
  ```

- [ ] Frontmatter correctly formatted
  ```markdown
  ---
  name: skill-slug
  description: Brief description
  ---
  ```

- [ ] No broken links between files
- [ ] All "CUSTOMIZE THIS" comments added
- [ ] Code examples tested

### 6.2 Publish to LaunchCode

- [ ] Run publisher script
  ```bash
  node publish-plugin.js | ~/.launchcode/scripts/api.js
  ```

- [ ] Verify output shows success
  ```
  ✅ Plugin metadata updated
  ✅ Files uploaded (XX files)
  📚 Plugin Published Successfully!
  ```

- [ ] Note plugin ID: _______________________

### 6.3 Verify in LaunchCode UI

- [ ] Plugin appears in LaunchCode plugins list
- [ ] Display name correct
- [ ] Description correct
- [ ] File count matches expected: _____ files
- [ ] All files visible in plugin editor

---

## Phase 7: Verify Everything Works

### 7.1 Test Navigation

From main SKILL.md:

- [ ] Quick navigation links work
- [ ] Scenario table links work
- [ ] All guide links load correctly

From focused guides:

- [ ] Related documentation links work
- [ ] Links to reference docs work
- [ ] Cross-references between guides work

### 7.2 Test Content Quality

- [ ] Code examples copy-paste correctly
- [ ] No corrupted content (escaped characters)
- [ ] Images/diagrams display (if any)
- [ ] Formatting preserved (code blocks, lists, tables)

### 7.3 User Experience Test

Simulate user scenarios:

- [ ] Scenario 1: New user needs to get started
  - Start at SKILL.md
  - Follow navigation to GETTING_STARTED.md
  - Can complete setup successfully?

- [ ] Scenario 2: User has error message
  - Find in scenario table → COMMON_ISSUES.md
  - Issue documented with solution?
  - Solution works?

- [ ] Scenario 3: User wants to optimize
  - Find in scenario table → PERFORMANCE.md
  - Clear path to detailed reference?
  - Implementation instructions clear?

---

## Phase 8: Document and Cleanup

### 8.1 Update Local README

- [ ] Update README.md with new structure
- [ ] Document publishing process
- [ ] Add contribution guidelines (if applicable)

### 8.2 Create Backup

- [ ] Backup original SKILL.md
  ```bash
  cp SKILL.md SKILL.md.backup
  ```

- [ ] Commit changes
  ```bash
  git add .
  git commit -m "Optimize skill documentation structure

  - Split SKILL.md into 11 focused files
  - Generalized content for reusability
  - Updated plugin publisher for multi-file support
  - Main SKILL.md reduced from XXX to XXX lines"
  ```

### 8.3 Document Changes

**⚠️ CRITICAL: Version Synchronization Required**

When updating the version, you MUST update it in ALL of these locations:

- [ ] **1. CHANGELOG.md** - Add new version entry with date and changes
- [ ] **2. publish-plugin.js** - Update `pluginData.version` field (displayed in LaunchCode UI)
- [ ] **3. SKILL.md footer** - Update version reference
- [ ] **4. PROJECT_README.md** - Update version reference

**These versions must always match.** Failure to synchronize will cause version confusion in the LaunchCode UI.

- [ ] Create CHANGELOG.md entry
  ```markdown
  ## [Version] - [Date]

  ### Changed
  - Split documentation into 11 focused files
  - Reduced main SKILL.md by XX%
  - Generalized all project-specific content
  - Added multi-file plugin support

  ### Added
  - 8 focused guides in docs/
  - 2 detailed reference documents
  - Scenario-based navigation table
  - Cross-references between documents
  ```

---

## Success Metrics

### Before Optimization

- Main file length: _____ lines
- Number of files: _____ (usually 1)
- Plugin size: _____ files
- User time to find answer: _____ minutes

### After Optimization

- Main file length: _____ lines (target: 70-90% reduction)
- Number of files: _____ (target: 11-13 total, including SKILL.md)
- Plugin size: _____ files (should match)
- User time to find answer: _____ minutes (target: < 2 min)

### Quality Checks

- [ ] Main file under 300 lines
- [ ] Average focused guide length 250-400 lines
- [ ] All files have cross-references
- [ ] Scenario table covers 8-12 common problems
- [ ] No orphaned files (all linked from navigation)
- [ ] All code examples tested and work
- [ ] No project-specific content remaining
- [ ] "CUSTOMIZE THIS" comments at all customization points

---

## Troubleshooting Checklist

### Issue: Plugin Upload Fails

- [ ] Check escaping function handles all characters
  ```javascript
  function esc(str) {
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  }
  ```

- [ ] Verify all files exist
  ```bash
  node publish-plugin.js --test
  ```

- [ ] Check file paths use forward slashes
- [ ] Verify content is UTF-8 encoded

### Issue: Content Appears Corrupted

- [ ] Escape backslashes first in esc() function
- [ ] Check for unmatched template literals
- [ ] Verify code blocks use proper syntax

### Issue: Links Don't Work

- [ ] Check relative paths are correct
  - Same dir: `FILE.md`
  - Subdirectory: `docs/FILE.md`
  - Parent dir: `../FILE.md`

- [ ] Verify file names match exactly (case-sensitive)
- [ ] Test all links in plugin editor

### Issue: Files Missing from Plugin

- [ ] Verify files in docs array
- [ ] Check file path exists locally
- [ ] Ensure file reading logic correct
- [ ] Check files array building logic

---

## Post-Optimization Maintenance

### Regular Updates

- [ ] Review documentation quarterly
- [ ] Update code examples when APIs change
- [ ] Add new issues to COMMON_ISSUES.md as discovered
- [ ] Keep cross-references current
- [ ] Monitor user feedback for gaps

### Version Control

**⚠️ VERSION SYNCHRONIZATION CHECKLIST**

Every time you publish an update, complete ALL of these steps:

- [ ] **Step 1**: Update CHANGELOG.md with new version number and date
- [ ] **Step 2**: Update `pluginData.version` in publish-plugin.js (this is what LaunchCode UI displays)
- [ ] **Step 3**: Update version in SKILL.md footer
- [ ] **Step 4**: Update version in PROJECT_README.md
- [ ] **Step 5**: Verify all versions match before publishing
- [ ] Tag each published version
  ```bash
  git tag -a v1.0.0 -m "Optimized documentation structure"
  ```

- [ ] Document breaking changes
- [ ] **CRITICAL**: Double-check that version in publish-plugin.js pluginData.version field matches CHANGELOG.md

### Continuous Improvement

- [ ] Track which documents users access most
- [ ] Monitor support questions for missing content
- [ ] Add new guides as topics emerge
- [ ] Refine scenario table based on user needs
- [ ] Update examples with production learnings

---

## Quick Reference

### File Structure Template

```
your-skill/
├── SKILL.md (200-300 lines - Navigation hub)
├── docs/
│   ├── Core Guides (250-400 lines each)
│   │   ├── GETTING_STARTED.md
│   │   ├── COMMON_ISSUES.md
│   │   ├── TOPIC1.md
│   │   ├── TOPIC2.md
│   │   └── TOPIC3.md
│   │
│   └── Detailed References (500-900 lines each)
│       ├── DETAILED_IMPLEMENTATION.md
│       ├── ISSUE_HISTORY.md
│       └── SERVICE_LIFECYCLE.md (optional)
│
├── publish-plugin.js
└── README.md
```

### Time Estimates

- Phase 1 (Audit): 30-60 minutes
- Phase 2 (Plan): 30-45 minutes
- Phase 3 (Generalize): 1-2 hours
- Phase 4 (Organize): 2-3 hours
- Phase 5 (Publisher): 30-60 minutes
- Phase 6 (Publish): 15-30 minutes
- Phase 7 (Verify): 30-60 minutes
- Phase 8 (Document): 30-45 minutes

**Total**: 4-6 hours for comprehensive optimization

### Key Success Indicators

✅ Main file reduced by 70-90%
✅ 11-13 total files (1 hub + 8-10 core guides + 2-3 detailed references)
✅ All documentation in docs/ folder
✅ User finds answer in < 2 minutes
✅ All code examples work without modification
✅ No project-specific content remains
✅ Clear navigation from any starting point

---

## Additional Resources

- [Documentation Patterns](DOCUMENTATION_PATTERNS.md) - Organization strategies
- [Plugin Publishing](PLUGIN_PUBLISHING.md) - Multi-file setup
- [Generalization](GENERALIZATION.md) - Making content reusable
- [Content Patterns](CONTENT_PATTERNS.md) - Writing effective guides

---

**Checklist Version**: 1.0
**Last Updated**: 2026-01-21
**Based On**: LaunchCode Automation skill optimization (1260 → 232 lines, 81% reduction)
