# Pre-Publish Audit Checklist

**IMPORTANT**: Run this audit checklist BEFORE publishing any updates to ensure all information is current and consistent.

---

## Automated Validation

Run the validation script first:

```bash
node validate.js
```

Fix any critical issues before proceeding with the manual audit.

---

## Manual Audit Checklist

### 1. Version Consistency

- [ ] Check CHANGELOG.md has the correct version number and date
- [ ] Verify SKILL.md footer shows current version
- [ ] Confirm PROJECT_README.md shows current version
- [ ] **CRITICAL**: Check publish-plugin.js has correct version in pluginData.version field
- [ ] Ensure version in plugin metadata matches documentation
- [ ] Ensure all "Current Version" references match

**Search commands:**
```bash
# Check all version references in documentation
grep -r "version\|Version\|v1\." --include="*.md" . | grep -v CHANGELOG | grep -v ".git"

# Verify publish-plugin.js version field
grep "version:" publish-plugin.js
```

**Important**: The `version` field in publish-plugin.js pluginData is displayed in the LaunchCode UI. Always update this field when publishing a new version.

---

### 2. Date Consistency

- [ ] All "Last Updated" dates are current
- [ ] CHANGELOG.md release dates are correct
- [ ] No outdated dates in documentation metadata

**Search command:**
```bash
grep -r "Last Updated\|Date:\|2026-01-" --include="*.md" . | grep -v ".git"
```

---

### 3. File Count Accuracy

- [ ] Check actual file count matches documentation
- [ ] Verify publish-plugin.js includes all files
- [ ] Confirm PROJECT_README.md file structure is accurate
- [ ] Update "Total files" references if structure changed

**Count files:**
```bash
# For Skill Documentation Guide
ls -1 SKILL.md README.md DOCUMENTATION_PATTERNS.md PLUGIN_PUBLISHING.md GENERALIZATION.md CONTENT_PATTERNS.md CHECKLIST.md CHANGELOG.md validate.js | wc -l

# Check what publish-plugin.js will upload
node -e "console.log(require('./publish-plugin.js'))" 2>&1 | grep "Total:"
```

---

### 4. Plugin Name Consistency

- [ ] No references to old names (e.g., "Skill Creation Guide")
- [ ] All references use current name: "Skill Documentation Guide"
- [ ] Plugin slug is correct: `skill-documentation-guide`
- [ ] Display name is correct: "Skill Documentation Guide"

**Search command:**
```bash
grep -r "Skill Creation\|skill-creation" --include="*.md" --include="*.js" . | grep -v CHANGELOG | grep -v ".git"
```

---

### 5. Cross-Reference Validation

- [ ] All internal links point to existing files
- [ ] No broken links to moved/renamed files
- [ ] References to other plugins are accurate
- [ ] Example code uses current file names

**Note:** The validation script checks internal links, but manually verify critical cross-references.

---

### 6. Example Code & Placeholders

- [ ] Template examples use generic names (not project-specific)
- [ ] Placeholder links are clearly marked as examples
- [ ] Code snippets are up-to-date with current patterns
- [ ] File paths in examples match current structure

---

### 7. Content Accuracy

- [ ] Success metrics are current (e.g., "81% reduction" is still accurate)
- [ ] File structure diagrams match reality
- [ ] Line count references are accurate
- [ ] "Before/After" comparisons use current numbers

**Verify:**
```bash
wc -l SKILL.md  # Should be ~240 lines for the hub
wc -l README.md DOCUMENTATION_PATTERNS.md PLUGIN_PUBLISHING.md  # Check against documented sizes
```

---

### 8. Outdated References Audit

Search for common outdated patterns:

```bash
# Old file counts
grep -r "7 files\|8 files" --include="*.md" . | grep -v "7 guide files" | grep -v ".git"

# Old directory references
grep -r "skill-creation" --include="*.md" --include="*.js" . | grep -v CHANGELOG | grep -v ".git"

# Outdated version references (when on v1.2.0, search for v1.0.0 references outside CHANGELOG)
grep -r "v1.0.0\|version 1.0" --include="*.md" . | grep -v CHANGELOG | grep -v ".git"
```

---

### 9. validate.js Documentation

- [ ] Confirm validate.js header explains it's for local testing only
- [ ] Verify reference/validate.js is documented as example only
- [ ] Check warnings about not publishing validate.js are clear
- [ ] Ensure instructions for adapting to own projects are present

**Check:**
```bash
head -20 validate.js  # Should have clear warnings
grep -n "DO NOT publish\|local testing" validate.js README.md CHANGELOG.md
```

---

### 10. Changelog Accuracy

- [ ] Move unreleased items to new version section
- [ ] Add release date to new version
- [ ] Categorize changes properly (Added, Changed, Removed, etc.)
- [ ] Update "Recent Changes" section in PROJECT_README.md

---

## Pre-Publish Command Sequence

Run these commands in order:

```bash
# 1. Run validation
node validate.js

# 2. Check for outdated references
grep -r "Skill Creation\|skill-creation\|v1.0.0\|7 files" --include="*.md" --include="*.js" . | grep -v CHANGELOG | grep -v ".git"

# 3. Verify version consistency
grep -r "version\|Version" --include="*.md" . | grep -v ".git" | head -20

# 4. Check dates
grep -r "Last Updated\|Date:" --include="*.md" . | grep -v ".git"

# 5. Count files that will be published
node publish-plugin.js 2>&1 | head -50 | grep -E "Total:|files"

# 6. Review changes (if in git)
git diff --name-only

# 7. Publish
node publish-plugin.js | ~/.launchcode/scripts/api.js
```

---

## Common Issues & Fixes

### Issue: Old file count references
**Search:** `grep -r "7 files\|16 files" --include="*.md" .`
**Fix:** Update to current file count

### Issue: Old plugin name
**Search:** `grep -r "Skill Creation" --include="*.md" .`
**Fix:** Replace with "Skill Documentation Guide"

### Issue: Outdated dates
**Search:** `grep -r "2026-01-20\|2026-01-21" --include="*.md" .`
**Fix:** Update to current release date or use "January 2026"

### Issue: Version mismatch
**Search:** Check CHANGELOG.md [Unreleased] section
**Fix:** Move items to new version section with proper date

### Issue: Broken links from refactoring
**Run:** `node validate.js`
**Fix:** Update file paths or add redirects

---

## Post-Publish Verification

After publishing:

1. [ ] Check plugin appears in LaunchCode UI
2. [ ] Verify all files are accessible
3. [ ] Test a few internal links by clicking them
4. [ ] Confirm version number displayed is correct
5. [ ] Check file count matches what was published

---

## For AI Assistants

When asked to update and publish this plugin:

1. **ALWAYS run this audit checklist first**
2. **Fix ALL issues found before publishing**
3. **Report what was updated** to the user
4. **Wait for user confirmation** if major issues are found
5. **Update CHANGELOG.md** with changes made
6. **Do NOT publish** if critical issues remain

### Standard Update Process:

```markdown
1. Review the changes being made
2. Update affected documentation files
3. Run automated validation: `node validate.js`
4. Run manual audit commands from this checklist
5. Fix any issues found
6. Update CHANGELOG.md [Unreleased] section
7. Report findings to user
8. Only publish after user approval
```

---

## Audit History

Keep track of audits performed:

### Latest Audit: 2026-01-22
- ✅ All version references current (v1.1.0)
- ✅ No "Skill Creation" references found
- ✅ File count accurate (9 files)
- ✅ Dates current (2026-01-22)
- ✅ validate.js properly documented
- ✅ CHANGELOG.md up to date

### Previous Audits:
- 2026-01-22: Initial audit checklist created
- (Add future audits here with date and key findings)

---

**Last Updated:** 2026-01-22
**Checklist Version:** 1.0.0
