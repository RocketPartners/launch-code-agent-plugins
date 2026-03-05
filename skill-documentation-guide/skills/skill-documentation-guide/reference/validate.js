/**
 * Pre-publish validation script for Skill Documentation Guide
 * Usage: node validate.js
 *
 * IMPORTANT: This script is for LOCAL TESTING ONLY.
 * DO NOT publish this file to LaunchCode in your own plugins.
 *
 * This file is included in the Skill Documentation Guide plugin
 * as a REFERENCE EXAMPLE (in reference/ folder) for learning purposes.
 *
 * To use in your own project:
 * 1. Copy this file to your project root
 * 2. Customize the requiredFiles array for your structure
 * 3. Run locally: node validate.js
 * 4. DO NOT include it in your publish-plugin.js docsFiles array
 *
 * Checks:
 * - All files exist
 * - No broken internal links
 * - File sizes are reasonable
 * - Required sections present
 */

const fs = require('fs');
const path = require('path');

// Files that should exist
const requiredFiles = [
  'SKILL.md',
  'CHANGELOG.md',
  'PROJECT_README.md',
  'docs/README.md',
  'docs/DOCUMENTATION_PATTERNS.md',
  'docs/PLUGIN_PUBLISHING.md',
  'docs/GENERALIZATION.md',
  'docs/CONTENT_PATTERNS.md',
  'docs/CHECKLIST.md',
  'docs/PRE_PUBLISH_AUDIT.md',
  'publish-plugin.js'
];

const issues = [];
const warnings = [];

console.log('🔍 Running pre-publish validation...\n');

// Check 1: All required files exist
console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    issues.push(`Missing required file: ${file}`);
  } else {
    console.log(`  ✓ ${file}`);
  }
});

// Check 2: File sizes are reasonable
console.log('\n📏 Checking file sizes...');
const mdFiles = requiredFiles.filter(f => f.endsWith('.md'));
mdFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').length;
    const chars = content.length;

    // SKILL.md should be 200-400 lines
    if (file === 'SKILL.md') {
      if (lines < 200) {
        warnings.push(`${file} is too short (${lines} lines, should be 200-400)`);
      } else if (lines > 400) {
        warnings.push(`${file} is too long (${lines} lines, should be 200-400)`);
      } else {
        console.log(`  ✓ ${file}: ${lines} lines (good hub size)`);
      }
    }
    // Other docs should be reasonable
    else if (lines > 1000) {
      warnings.push(`${file} is very large (${lines} lines, consider splitting)`);
      console.log(`  ⚠ ${file}: ${lines} lines (consider splitting)`);
    } else {
      console.log(`  ✓ ${file}: ${lines} lines`);
    }

    // Check character count for escaping issues
    if (chars > 100000) {
      warnings.push(`${file} is very large (${chars} chars, may cause escaping issues)`);
    }
  }
});

// Check 3: Internal links are not broken
console.log('\n🔗 Checking internal links...');
mdFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Find markdown links: [text](file.md)
    const linkRegex = /\[([^\]]+)\]\(([^)]+\.md[^)]*)\)/g;
    let match;
    let linksChecked = 0;

    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkPath = match[2];

      // Skip external links and system paths
      if (linkPath.startsWith('http')) continue;
      if (linkPath.startsWith('~/')) continue;
      if (linkPath.startsWith('/Users/')) continue;

      // Remove anchor (#section)
      const cleanPath = linkPath.split('#')[0];

      // Skip example links (placeholder paths used in documentation)
      const exampleFiles = [
        'GETTING_STARTED.md', 'JOB_CREATION.md', 'COMMON_ISSUES.md', 'PERFORMANCE.md',
        'SCHEDULING.md', 'SECURITY.md', 'OPTIMISTIC_UI.md', 'CRON_AND_TIMEZONE.md',
        'SLACK_INTEGRATION.md', 'TESTING.md', 'DATA_TABLE_ISSUES.md', 'PREVIOUS.md',
        'NEXT.md', 'ALTERNATIVE.md', 'DETAILED.md', 'LINK1.md', 'LINK2.md',
        'FILE1.md', 'FILE2.md', 'FILE3.md', 'ADVANCED.md', 'GUIDE1.md', 'GUIDE2.md',
        'REFERENCE.md'
      ];
      const isExampleLink = exampleFiles.some(example =>
        cleanPath.endsWith(example) || cleanPath.includes('docs/' + example)
      );
      if (isExampleLink) {
        linksChecked++;
        continue;
      }

      // Check if file exists - relative to the file's directory
      const fileDir = path.dirname(filePath);
      const targetPath = path.join(fileDir, cleanPath);
      if (!fs.existsSync(targetPath)) {
        issues.push(`Broken link in ${file}: [${linkText}](${linkPath})`);
      }
      linksChecked++;
    }

    if (linksChecked > 0) {
      console.log(`  ✓ ${file}: ${linksChecked} links checked`);
    }
  }
});

// Check 4: Required sections in SKILL.md
console.log('\n📋 Checking SKILL.md structure...');
const skillPath = path.join(__dirname, 'SKILL.md');
if (fs.existsSync(skillPath)) {
  const content = fs.readFileSync(skillPath, 'utf8');

  const requiredSections = [
    'Quick Navigation',
    'When to Use Each Document',
    'Quick Start'
  ];

  requiredSections.forEach(section => {
    if (!content.includes(`## ${section}`)) {
      issues.push(`SKILL.md missing required section: ## ${section}`);
    } else {
      console.log(`  ✓ Has section: ${section}`);
    }
  });
}

// Check 5: publish-plugin.js has correct slug
console.log('\n⚙️  Checking publish-plugin.js...');
const publishPath = path.join(__dirname, 'publish-plugin.js');
if (fs.existsSync(publishPath)) {
  const content = fs.readFileSync(publishPath, 'utf8');

  if (!content.includes("slug: 'skill-documentation-guide'")) {
    issues.push("publish-plugin.js has incorrect slug (should be 'skill-documentation-guide')");
  } else {
    console.log('  ✓ Correct plugin slug');
  }

  if (!content.includes("display_name: 'Skill Documentation Guide'")) {
    issues.push("publish-plugin.js has incorrect display_name (should be 'Skill Documentation Guide')");
  } else {
    console.log('  ✓ Correct display name');
  }
}

// Check 6: No TODO or FIXME comments
console.log('\n🚧 Checking for TODO/FIXME comments...');
mdFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const todos = (content.match(/TODO:/gi) || []).length;
    const fixmes = (content.match(/FIXME:/gi) || []).length;

    if (todos > 0 || fixmes > 0) {
      warnings.push(`${file} has ${todos} TODO and ${fixmes} FIXME comments`);
      console.log(`  ⚠ ${file}: ${todos} TODO, ${fixmes} FIXME`);
    }
  }
});

// Print summary
console.log('\n' + '='.repeat(50));
console.log('📊 VALIDATION SUMMARY');
console.log('='.repeat(50));

if (issues.length === 0 && warnings.length === 0) {
  console.log('\n✅ All checks passed! Ready to publish.');
  process.exit(0);
}

if (issues.length > 0) {
  console.log('\n❌ CRITICAL ISSUES (must fix before publishing):');
  issues.forEach((issue, i) => {
    console.log(`  ${i + 1}. ${issue}`);
  });
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS (should review):');
  warnings.forEach((warning, i) => {
    console.log(`  ${i + 1}. ${warning}`);
  });
}

if (issues.length > 0) {
  console.log('\n❌ Validation failed. Fix issues before publishing.');
  process.exit(1);
} else {
  console.log('\n⚠️  Validation passed with warnings. Review before publishing.');
  process.exit(0);
}
