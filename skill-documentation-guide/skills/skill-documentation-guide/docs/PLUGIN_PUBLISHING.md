# Multi-File Plugin Publishing

Complete guide to publishing LaunchCode plugins with multiple documentation files, proper directory structure, and content escaping.

---

## Overview

LaunchCode plugins support multi-file structures, allowing you to organize documentation into focused guides while maintaining proper hierarchy and navigation.

### Single-File Plugin (Old Way)
```
Plugin Files:
└── skills/my-skill/SKILL.md (1260 lines, everything mixed together)
```

### Multi-File Plugin (Optimized Way)
```
Plugin Files:
├── skills/my-skill/SKILL.md (232 lines, navigation hub)
├── skills/my-skill/docs/GETTING_STARTED.md
├── skills/my-skill/docs/COMMON_ISSUES.md
├── skills/my-skill/docs/PERFORMANCE.md
├── skills/my-skill/docs/SECURITY.md
├── skills/my-skill/docs/TESTING.md
├── skills/my-skill/DETAILED_REFERENCE.md
└── skills/my-skill/ISSUE_HISTORY.md
```

---

## Publisher Script Structure

### Approach 1: Simple Directory Publishing (Recommended)

The simplest approach when you don't need to modify files:

```javascript
/**
 * Publish a LaunchCode skill with multiple documentation files
 * Usage: node publish-plugin.js | ~/.launchcode/scripts/api.js
 */

const path = require('path');

const pluginDir = path.join(__dirname);

console.log(`
try {
  console.log('📦 Publishing plugin...');

  // Create plugin object from directory (loads all files automatically)
  const plugin = await api.plugins.fromDirectory('${pluginDir}', {
    slug: 'my-skill-slug',
    display_name: 'My Skill Name',
    description: 'Brief description for skill listing',
    version: '1.0.0',
    plugin_type: 'skill',
    default_access: 'public_read'
  });

  console.log('✓ Plugin object created with ' + plugin.files.length + ' files');

  // Save to LaunchCode (creates plugin + uploads all files)
  await plugin.save();
  console.log('✓ Plugin saved successfully!');

} catch (error) {
  console.error('❌ Error:', error.message);
  throw error;
}
`);
```

**How it works:**
- `api.plugins.fromDirectory()` recursively reads all files from the directory
- Returns a Plugin object with all files loaded
- `.save()` handles both creation and updates automatically
- Persists plugin metadata and uploads all files in one operation

### Approach 2: Manual File Control (Advanced)

Use this when you need to modify file contents (e.g., add frontmatter, transform paths):

```javascript
/**
 * Publish a LaunchCode skill with multiple documentation files
 * Usage: node publish-plugin.js | ~/.launchcode/scripts/api.js
 */

const fs = require('fs');
const path = require('path');

// 1. Read the main skill content
let skillContent = fs.readFileSync(
  path.join(__dirname, 'SKILL.md'),
  'utf8'
);

// 2. Remove first heading and add frontmatter
skillContent = skillContent.replace(/^# Skill: .+\n/, '');

const skillWithFrontmatter = `---
name: my-skill-slug
description: Brief description for skill listing
---

# My Skill Name

${skillContent}`;

// 3. Define documentation files to include
const docsFiles = [
  'docs/GETTING_STARTED.md',
  'docs/COMMON_ISSUES.md',
  'docs/PERFORMANCE.md'
];

const referenceFiles = [
  'DETAILED_REFERENCE.md',
  'ISSUE_HISTORY.md'
];

// 4. Read all files into memory
const allDocsContent = {};
[...docsFiles, ...referenceFiles].forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    allDocsContent[filePath] = fs.readFileSync(fullPath, 'utf8');
  }
});

// 5. Escape function for template literals
function esc(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

// 6. Output the API script
console.log(`
const skillContent = \`${esc(skillWithFrontmatter)}\`;

const docsContent = {
${Object.entries(allDocsContent).map(([filePath, content]) =>
  `  '${filePath}': \`${esc(content)}\``
).join(',\n')}
};

try {
  console.log('📦 Publishing plugin...');

  // Check if plugin already exists
  let plugin;
  try {
    plugin = await api.plugins.get('my-skill-slug');
    console.log('✓ Found existing plugin (will update)');
  } catch (err) {
    // Plugin doesn't exist, create new one
    console.log('✓ Creating new plugin...');
    plugin = api.plugins.new({
      slug: 'my-skill-slug',
      display_name: 'My Skill Name',
      plugin_type: 'skill',
      version: '1.0.0',
      description: 'Detailed description of what this skill does',
      default_access: 'public_read'
    });
  }

  // Add/update SKILL.md file
  plugin.addFile('skills/my-skill-slug/SKILL.md', skillContent);

  // Add all documentation files
  for (const [filePath, content] of Object.entries(docsContent)) {
    plugin.addFile('skills/my-skill-slug/' + filePath, content);
  }

  console.log('✓ Plugin configured with ' + (1 + Object.keys(docsContent).length) + ' files');

  // Save to LaunchCode (creates/updates plugin + uploads files)
  await plugin.save();
  console.log('✓ Plugin saved successfully!');

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📚 Plugin Published Successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

} catch (error) {
  console.error('❌ Error publishing plugin:', error.message);
  throw error;
}
`);
```

**How it works:**
- `api.plugins.new()` creates an empty Plugin object
- `api.plugins.get()` loads an existing plugin as a Plugin object
- `.addFile(path, content)` adds or updates a file in the plugin
- `.save()` persists everything to LaunchCode

### Comparison

| Feature | Approach 1 (fromDirectory) | Approach 2 (Manual) |
|---------|---------------------------|---------------------|
| **Simplicity** | ✅ Very simple | ⚠️ More code |
| **File modification** | ❌ Can't modify | ✅ Full control |
| **Frontmatter** | ❌ Can't add | ✅ Can add |
| **Path transformation** | ❌ Uses actual paths | ✅ Can remap |
| **Selective inclusion** | ❌ Includes everything | ✅ Choose files |
| **Best for** | New plugins, simple updates | Complex transformations |

---

## Key Components Explained

### 1. Frontmatter for Skills

Skills require YAML frontmatter:

```markdown
---
name: skill-slug-here
description: One-line description that appears in skill listings
---

# Skill Display Name

Rest of content...
```

**Important**:
- `name`: Must match plugin slug (lowercase, hyphens)
- `description`: Shown in Claude Code skill listings
- First heading after frontmatter: Display name

### 2. Content Escaping

**Critical**: Template literals in content must be escaped for the generated API script.

```javascript
function esc(str) {
  return str
    .replace(/\\/g, '\\\\')  // Escape backslashes first
    .replace(/`/g, '\\`')    // Escape backticks
    .replace(/\$/g, '\\$');  // Escape dollar signs
}
```

**Why**: The publisher outputs JavaScript code that contains the documentation as template literals. Without escaping:
- Backticks in docs would break the template literal
- `${variable}` in docs would be interpolated
- Backslashes would escape characters

### 3. File Path Structure (CRITICAL)

**⚠️ MANDATORY PATH PREFIX**: All skill files **MUST** start with `skills/{slug}/` or they will not appear in the Skills tab.

Plugin files use a nested structure:

```javascript
{
  path: 'skills/SKILL-SLUG/SKILL.md',  // ✅ CORRECT - starts with skills/
  content: '...'
}
{
  path: 'skills/SKILL-SLUG/docs/GETTING_STARTED.md',  // ✅ CORRECT
  content: '...'
}
```

**❌ COMMON MISTAKE - Files without prefix:**
```javascript
{
  path: 'SKILL.md',  // ❌ WRONG - missing skills/{slug}/ prefix
  content: '...'
}
{
  path: 'docs/GETTING_STARTED.md',  // ❌ WRONG - missing prefix
  content: '...'
}
```

**What happens with wrong paths:**
- Files are uploaded successfully (no error)
- Files are stored in LaunchCode database
- **BUT** Skills tab shows "No skills in this plugin"
- SKILL.md and CLAUDE.md are not recognized as skill files
- Plugin appears broken to users

**Pattern**: `skills/{slug}/{file-path}`

The `{file-path}` preserves your local directory structure:
- `docs/GETTING_STARTED.md` → `skills/my-skill/docs/GETTING_STARTED.md`
- `REFERENCE.md` → `skills/my-skill/REFERENCE.md`

**Always prefix with `skills/{slug}/` when using `.addFile()`:**
```javascript
// ✅ CORRECT
plugin.addFile('skills/my-skill/SKILL.md', content);
plugin.addFile('skills/my-skill/docs/GUIDE.md', content);

// ❌ WRONG - will be stored but not recognized
plugin.addFile('SKILL.md', content);
plugin.addFile('docs/GUIDE.md', content);
```

### 4. Plugin Object API Methods

The Plugin object provides these methods for file manipulation:

```javascript
// Add or update a file
plugin.addFile(path, content);

// Add file from disk (reads file for you)
await plugin.addFileFromDisk(pluginPath, localPath);

// Remove a file
plugin.removeFile(path);

// Get file content
const content = plugin.getFile(path);

// Save plugin (create or update)
await plugin.save();
```

**Example usage:**

```javascript
// Create/load plugin
const plugin = api.plugins.new({ slug: 'my-skill', ... });

// Add multiple files
plugin.addFile('skills/my-skill/SKILL.md', skillContent);
plugin.addFile('skills/my-skill/docs/README.md', docsContent);

// Add file directly from disk
await plugin.addFileFromDisk(
  'skills/my-skill/scripts/example.js',
  '/Users/me/project/example.js'
);

// Check if file exists
const existingContent = plugin.getFile('skills/my-skill/SKILL.md');
if (existingContent) {
  console.log('File already exists, will be updated');
}

// Remove unwanted file
plugin.removeFile('skills/my-skill/old-file.md');

// Save everything to LaunchCode
await plugin.save();
```

**Key behaviors:**
- `.addFile()` creates new files or overwrites existing ones
- `.save()` persists all files in a single operation
- Files are stored in memory until `.save()` is called
- `.save()` automatically handles create vs. update logic

### 5. File Reading Pattern

```javascript
const allDocsContent = {};

[...docsFiles, ...referenceFiles].forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    allDocsContent[filePath] = fs.readFileSync(fullPath, 'utf8');
  }
});
```

**Benefits**:
- Checks if file exists before reading
- Stores with relative path as key
- Easy to iterate when building files array

### 5. Create vs. Update Logic

The Plugin object pattern handles both create and update automatically:

```javascript
let plugin;

try {
  // Try to load existing plugin
  plugin = await api.plugins.get('my-skill-slug');
  console.log('✓ Found existing plugin (will update)');
} catch (err) {
  // Plugin doesn't exist, create new one
  console.log('✓ Creating new plugin...');
  plugin = api.plugins.new({
    slug: 'my-skill-slug',
    display_name: 'My Skill Name',
    plugin_type: 'skill',
    version: '1.0.0',
    description: 'Description...',
    default_access: 'public_read'
  });
}

// Add/update files (works for both new and existing plugins)
plugin.addFile('skills/my-skill-slug/SKILL.md', content);

// Save (creates new plugin or updates existing one)
await plugin.save();
```

**How it works:**
- `api.plugins.get()` returns a Plugin object for existing plugins
- `api.plugins.new()` returns a Plugin object for new plugins
- Both objects have the same `.addFile()` and `.save()` methods
- `.save()` detects whether plugin is new or existing and handles accordingly

### 6. Plugin Metadata Fields

```javascript
const pluginData = {
  slug: 'my-skill-slug',           // Required: URL-safe identifier (lowercase, hyphens)
  display_name: 'My Skill Name',   // Required: Human-readable name shown in UI
  plugin_type: 'skill',            // Required: Type of plugin ('skill', 'command', etc.)
  version: '1.0.0',                // Optional: Version displayed in LaunchCode UI
  description: 'Description...',   // Required: Brief description for listings
  default_access: 'public_read'    // Required: Access level ('public_read', 'private', etc.)
};
```

**Version Management**:
- The `version` field is displayed in the LaunchCode UI
- Update this whenever you publish changes
- Recommended: Use semantic versioning (1.0.0, 1.1.0, 2.0.0)
- Keep synchronized with CHANGELOG.md and documentation
- Include in both create and update calls

**⚠️ CRITICAL VERSION SYNCHRONIZATION REQUIREMENT**:

When you update the version in CHANGELOG.md, you **MUST** also update the `version` field in the `pluginData` object in `publish-plugin.js`. These two locations must always match:

1. **CHANGELOG.md**: Document the version and changes
2. **publish-plugin.js**: Update the `pluginData.version` field

**Failure to synchronize versions will result in**:
- LaunchCode UI showing outdated version numbers
- Users unable to identify which version they have installed
- Confusion about what changes are included in their version

**Best Practice**: Read version from a single source file:
```javascript
// Read version from SKILL.md or CHANGELOG.md
const skillContent = fs.readFileSync('SKILL.md', 'utf8');
const versionMatch = skillContent.match(/\*\*Version:\*\* (\d+\.\d+\.\d+)/);
const version = versionMatch ? versionMatch[1] : '1.0.0';

const pluginData = {
  // ... other fields
  version: version
};
```

---

## Real Example: Our LaunchCode Automation Plugin

### Complete Publisher Script

```javascript
/**
 * Publish the "LaunchCode Automation Guide" skill as a LaunchCode plugin
 * Usage: node publish-plugin.js | ~/.launchcode/scripts/api.js
 */

const fs = require('fs');
const path = require('path');

// Read the skill content (without the first heading)
let skillContent = fs.readFileSync(
  path.join(__dirname, 'SKILL.md'),
  'utf8'
);

// Remove the first heading line and prepare for frontmatter
// Note: This example uses "Create LaunchCode Automation" as the skill name
// The plugin display name can be different (e.g., "LaunchCode Automation Guide")
skillContent = skillContent.replace(/^# Skill: Create LaunchCode Automation\n/, '');

// Add frontmatter to the skill content
const skillWithFrontmatter = `---
name: create-launchcode-automation
description: Expert guidance for creating LaunchCode jobs, data tables, and scheduled automations. Covers Docker configuration, Slack integrations, timezone handling, and all common pitfalls with tested solutions.
---

# Create LaunchCode Automation

${skillContent}`;

// Read all documentation files (all now in docs/)
const docsFiles = [
  'docs/GETTING_STARTED.md',
  'docs/JOB_CREATION.md',
  'docs/COMMON_ISSUES.md',
  'docs/CRON_AND_TIMEZONE.md',
  'docs/SECURITY.md',
  'docs/SLACK_INTEGRATION.md',
  'docs/TESTING.md',
  'docs/PERFORMANCE.md',
  'docs/GRACEFUL_SHUTDOWN.md',  // Service lifecycle management
  'docs/OPTIMISTIC_UI.md',       // Detailed reference
  'docs/DATA_TABLE_ISSUES.md'    // Detailed reference
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
console.log(`
const skillContent = \`${esc(skillWithFrontmatter)}\`;

// Documentation files
const docsContent = {
${Object.entries(allDocsContent).map(([filePath, content]) =>
  `  '${filePath}': \`${esc(content)}\``
).join(',\n')}
};

try {
  // Try to get existing plugin
  let pluginId;
  let isUpdate = false;

  try {
    const response = await api.plugins.get('launchcode-automation-guide');
    const existingPlugin = response.plugin || response;
    pluginId = existingPlugin.id;
    isUpdate = true;
    console.log('📦 Found existing plugin, will update...');
    console.log('   Plugin ID:', pluginId);
  } catch (err) {
    if (err.message && err.message.includes('404')) {
      console.log('📦 Creating new plugin...');
    } else {
      throw err;
    }
  }

  // Create or update plugin metadata
  const pluginData = {
    slug: 'launchcode-automation-guide',
    display_name: 'LaunchCode Automation Guide',
    plugin_type: 'skill',
    version: '1.3.0',  // Update this with each release
    description: 'Expert guidance for creating LaunchCode jobs, data tables, and scheduled automations. Covers Docker configuration, Slack integrations, timezone handling, and all common pitfalls with tested solutions.',
    default_access: 'public_read'
  };

  let plugin;
  if (isUpdate) {
    plugin = await api.plugins.update(pluginId, {
      display_name: pluginData.display_name,
      version: pluginData.version,  // Updates version in LaunchCode UI
      description: pluginData.description,
      default_access: pluginData.default_access
    });
    console.log('✅ Plugin metadata updated');
  } else {
    const createResponse = await api.plugins.create(pluginData);
    plugin = createResponse.plugin || createResponse;
    pluginId = plugin.id;
    console.log('✅ Plugin created');
    console.log('   Plugin ID:', pluginId);
  }

  // Build files array with all documentation
  const files = [
    {
      path: 'skills/create-launchcode-automation/SKILL.md',
      content: skillContent
    }
  ];

  // Add all documentation files
  for (const [filePath, content] of Object.entries(docsContent)) {
    files.push({
      path: 'skills/create-launchcode-automation/' + filePath,
      content: content
    });
  }

  await api.plugins.setFiles(pluginId, files);
  console.log('✅ Skill files uploaded (' + files.length + ' files)');

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📚 Plugin Published Successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('Plugin Details:');
  console.log('  Name:', pluginData.display_name);
  console.log('  Slug:', pluginData.slug);
  console.log('  Type:', pluginData.plugin_type);
  console.log('  Access:', pluginData.default_access);
  console.log('  ID:', pluginId);
  console.log('');
  console.log('📖 Documentation Structure:');
  console.log('  • SKILL.md (main entry point)');
  console.log('  • docs/ (11 documentation files)');
  console.log('    - 8 core guides');
  console.log('    - 3 detailed references');
  console.log('  • Total: ' + files.length + ' files');

} catch (error) {
  console.error('❌ Error publishing plugin');
  console.error('Error details:', error.message);
  if (error.stack) {
    console.error('Stack trace:');
    console.error(error.stack);
  }
  throw error;
}
`);
```

### Output When Run

```bash
$ node publish-plugin.js | ~/.launchcode/scripts/api.js

📦 Found existing plugin, will update...
   Plugin ID: 19e7fe16-9b84-4694-951f-dd7a8227d95e
✅ Plugin metadata updated
✅ Skill files uploaded (11 files)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 Plugin Published Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Plugin Details:
  Name: LaunchCode Automation Guide
  Slug: launchcode-automation-guide
  Type: skill
  Access: public_read
  ID: 19e7fe16-9b84-4694-951f-dd7a8227d95e

📖 Documentation Structure:
  • SKILL.md (main entry point)
  • docs/ (11 documentation files)
    - 8 core guides
    - 3 detailed references
  • Total: 12 files
```

---

## Common Issues and Solutions

### Issue 1: "No skills in this plugin" Error (MOST COMMON)

**Problem**: Plugin uploads successfully but Skills tab shows "No skills in this plugin".

**Symptom**:
- Files are stored in LaunchCode
- No upload errors
- Plugin appears in list
- But SKILL.md and CLAUDE.md not recognized
- Skills tab is empty

**Root Cause**: Files uploaded WITHOUT the required `skills/{slug}/` path prefix.

**Diagnosis**:
```javascript
// Check file paths
const plugin = await api.plugins.get('your-slug');
plugin.files.forEach(f => console.log(f.path));

// ❌ WRONG - missing prefix:
// SKILL.md
// docs/GUIDE.md

// ✅ CORRECT - with prefix:
// skills/your-slug/SKILL.md
// skills/your-slug/docs/GUIDE.md
```

**Solution**: Always add the `skills/{slug}/` prefix when calling `.addFile()`:
```javascript
// ✅ CORRECT
plugin.addFile('skills/my-skill/SKILL.md', skillContent);
plugin.addFile('skills/my-skill/CLAUDE.md', claudeContent);
plugin.addFile('skills/my-skill/docs/GUIDE.md', guideContent);

// ❌ WRONG - missing prefix
plugin.addFile('SKILL.md', skillContent);  // Will upload but not work!
```

**Fix for existing plugin with wrong paths**:
```javascript
// Remove files without prefix
const plugin = await api.plugins.get('your-slug');
const filesToRemove = plugin.files.filter(f => !f.path.startsWith('skills/'));
filesToRemove.forEach(f => plugin.removeFile(f.path));

// Re-add with correct paths
plugin.addFile('skills/your-slug/SKILL.md', skillContent);
// ... add all files with correct prefix

await plugin.save();
```

### Issue 2: Content Not Escaped Properly

**Problem**: Plugin upload succeeds but skill content is corrupted or missing sections.

**Symptom**: Code blocks missing, variables interpolated, backslashes removed.

**Solution**: Ensure `esc()` function is complete:
```javascript
function esc(str) {
  return str
    .replace(/\\/g, '\\\\')  // MUST be first
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}
```

**Order matters**: Escape backslashes first, otherwise you'll double-escape the escapes.

### Issue 3: Files Not Appearing in Plugin

**Problem**: Published successfully but some files missing from plugin.

**Diagnosis**:
```javascript
// Check if file exists
const fullPath = path.join(__dirname, filePath);
console.log('Checking:', fullPath, fs.existsSync(fullPath));
```

**Common causes**:
- Typo in file path
- File not created yet
- Wrong directory reference

**Solution**: Verify all file paths exist before publishing.

### Issue 4: Plugin Get Returns Unexpected Structure

**Problem**: `api.plugins.get()` returns different structure than expected.

**Symptom**: Can't find plugin ID or metadata.

**Solution**: Handle both possible response structures:
```javascript
const response = await api.plugins.get('slug');
const existingPlugin = response.plugin || response;
pluginId = existingPlugin.id;
```

### Issue 5: Version Not Updating in UI

**Problem**: Published new version but LaunchCode UI still shows old version.

**Root Cause**: Forgot to call `api.plugins.update()` to update metadata.

**Solution**: Always update metadata for existing plugins:
```javascript
// MUST call this for existing plugins
await api.plugins.update('your-slug', {
  version: '1.1.0',  // This updates UI
  description: 'Updated description',
  default_access: 'public_read'
});
```

Without this call, `.save()` updates files but NOT the version field displayed in LaunchCode.

### Issue 6: Frontmatter Not Parsed

**Problem**: Skill doesn't appear in listings or name is wrong.

**Symptom**: Plugin exists but isn't recognized as a skill.

**Solution**: Verify frontmatter format:
```markdown
---
name: exact-slug-match
description: Brief description
---

# Display Name

Content starts here
```

**Requirements**:
- Three dashes before and after
- `name` must match plugin slug exactly
- No extra spaces or formatting
- Empty line after closing `---`

---

## Testing Your Publisher

### 1. Dry Run Test

Add a test mode to your publisher:

```javascript
const TEST_MODE = process.argv.includes('--test');

if (TEST_MODE) {
  console.log('=== TEST MODE ===');
  console.log('Files that would be uploaded:');
  files.forEach(f => {
    console.log(`  ${f.path} (${f.content.length} bytes)`);
  });
  console.log('\nTotal files:', files.length);
  console.log('Total size:', files.reduce((sum, f) => sum + f.content.length, 0), 'bytes');
  process.exit(0);
}
```

Run: `node publish-plugin.js --test`

### 2. Verify Escaping

```javascript
// Test escaping with problematic content
const testContent = 'Code: `const x = ${variable}` and \\ backslash';
const escaped = esc(testContent);
console.log('Original:', testContent);
console.log('Escaped:', escaped);
```

### 3. Check File Reading

```javascript
console.log('=== File Reading Test ===');
[...docsFiles, ...referenceFiles].forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  const exists = fs.existsSync(fullPath);
  const size = exists ? fs.statSync(fullPath).size : 0;
  console.log(`${exists ? '✓' : '✗'} ${filePath} (${size} bytes)`);
});
```

---

## Best Practices

### 1. Version Your Plugin

Add version info to output:

```javascript
const PLUGIN_VERSION = '1.3.0';

console.log('Plugin version:', PLUGIN_VERSION);
console.log('Last updated:', new Date().toISOString());
```

### 2. Validate Before Publishing

```javascript
// Ensure all required files exist
const requiredFiles = ['SKILL.md', 'docs/GETTING_STARTED.md'];
const missing = requiredFiles.filter(f =>
  !fs.existsSync(path.join(__dirname, f))
);

if (missing.length > 0) {
  console.error('❌ Missing required files:', missing);
  process.exit(1);
}
```

### 3. Show File Statistics

```javascript
console.log('📊 File Statistics:');
files.forEach(f => {
  const lines = f.content.split('\n').length;
  const size = (f.content.length / 1024).toFixed(1);
  console.log(`  ${f.path}: ${lines} lines, ${size} KB`);
});
```

### 4. Handle Errors Gracefully

```javascript
try {
  await api.plugins.setFiles(pluginId, files);
  console.log('✅ Files uploaded successfully');
} catch (error) {
  console.error('❌ File upload failed');
  console.error('Error:', error.message);
  console.error('Plugin ID:', pluginId);
  console.error('File count:', files.length);
  throw error;
}
```

### 5. Document Publishing Process

Add comments to your publisher:

```javascript
/**
 * Publish the "My Skill" plugin to LaunchCode
 *
 * Prerequisites:
 * - LaunchCode API credentials configured
 * - All documentation files exist
 *
 * Usage:
 *   node publish-plugin.js | ~/.launchcode/scripts/api.js
 *
 * Test mode:
 *   node publish-plugin.js --test
 *
 * Output:
 * - Creates or updates plugin with slug 'my-skill'
 * - Uploads SKILL.md + 8 docs + 2 reference files
 * - Total: 11 files
 */
```

---

## Plugin Directory Structure Best Practices

### Recommended Structure

```
your-plugin-repo/
├── SKILL.md (Main skill file)
├── docs/ (Focused guides)
│   ├── GETTING_STARTED.md
│   ├── COMMON_ISSUES.md
│   ├── ADVANCED_TOPIC.md
│   └── INTEGRATION.md
├── DETAILED_REFERENCE.md (Deep-dive content)
├── ISSUE_HISTORY.md (Comprehensive troubleshooting)
├── publish-plugin.js (Publisher script)
├── package.json (If using npm packages)
└── README.md (Local development docs)
```

### Files to Include in Plugin

**Always include**:
- SKILL.md (with frontmatter)
- All docs/ guides
- Detailed reference documents

**Don't include**:
- publish-plugin.js (local tooling)
- README.md (local development docs)
- package.json (local dependencies)
- .git/ (version control)

### File Path Mapping

Your local structure → Plugin structure:

```
Local:
├── SKILL.md
├── docs/GETTING_STARTED.md
└── REFERENCE.md

Plugin:
├── skills/my-skill/SKILL.md
├── skills/my-skill/docs/GETTING_STARTED.md
└── skills/my-skill/REFERENCE.md
```

The publisher adds the `skills/my-skill/` prefix automatically.

---

## Troubleshooting Checklist

Before publishing:
- [ ] All documentation files exist
- [ ] Frontmatter is correctly formatted
- [ ] `esc()` function escapes backslashes, backticks, and dollar signs
- [ ] File paths use forward slashes (not backslashes)
- [ ] Content is UTF-8 encoded
- [ ] No binary files in documentation array
- [ ] Plugin slug matches frontmatter `name`
- [ ] Description is under 200 characters
- [ ] All cross-reference links will work in plugin structure

After publishing:
- [ ] Plugin appears in LaunchCode UI
- [ ] All files are present
- [ ] File contents are correct (not corrupted)
- [ ] Links between documents work
- [ ] Skill appears in Claude Code skill listings
- [ ] Description displays correctly

---

## Next Steps

Now that you understand plugin publishing, learn how to:
- [Generalize content for reuse](GENERALIZATION.md)
- [Write effective content](CONTENT_PATTERNS.md)
- [Apply documentation patterns](DOCUMENTATION_PATTERNS.md)
- [Follow optimization checklist](CHECKLIST.md)
