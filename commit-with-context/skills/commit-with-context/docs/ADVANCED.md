# Advanced Usage

**When to use this guide:** You want to customize the skill, automate parts of the workflow, or integrate with advanced tooling.

## Overview

This guide covers advanced topics including customization, automation, team-specific conventions, and integration with external tools.

---

## Customizing Commit Templates

### Team-Specific Commit Types

Your team might need custom commit types beyond the defaults.

**Example: Add Custom Types**

**Custom Types for DevOps Team:**
```
Deploy: Deployment-related changes
Infra: Infrastructure changes
Monitor: Monitoring/alerting changes
Rollback: Rollback to previous version
Config: Configuration updates
```

**Example Commit:**
```
Deploy: Production deployment with blue-green strategy

Problem: Need zero-downtime deployment for Black Friday traffic
Approach: Implemented blue-green deployment using Kubernetes with traffic shifting
Status: Complete - Successfully deployed to production
Next: Monitor error rates and performance for 24 hours
Note: Blue environment on cluster-a, green on cluster-b, DNS switch took 30 seconds
Metrics:
  - Deployment time: 15 minutes
  - Downtime: 0 seconds
  - Traffic shift: Gradual over 30 minutes
  - Rollback ready: Yes (one DNS switch)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Custom Field Names

Some teams prefer different field names.

**Default:**
```
Problem: ...
Approach: ...
Status: ...
Next: ...
Note: ...
```

**Alternative:**
```
Why: ...
How: ...
State: ...
Todo: ...
Context: ...
```

**Alternative for Agile Teams:**
```
User Story: ...
Implementation: ...
Done/WIP/Blocked: ...
Acceptance Criteria: ...
Notes: ...
```

### Ticket Integration

**Add Ticket References:**
```
Fix: User authentication timeout after 1 hour

Problem: Users logged out after 1 hour despite "remember me" checkbox
Approach: Increased JWT token TTL from 1h to 30 days for "remember me" users
Status: Complete - Deployed and monitoring
Next: Add refresh token rotation for enhanced security
Note: Token stored in httpOnly cookie to prevent XSS
Ticket: JIRA-1234
Epic: AUTH-001
Sprint: Sprint 23

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Compliance Fields

**Add Compliance Information:**
```
Security: Implement rate limiting on login endpoint

Problem: Brute force attacks detected on /api/login endpoint
Approach: Implemented rate limiting (5 attempts per IP per minute) using Redis
Status: Complete - Rate limiting active
Next: Add CAPTCHA after 3 failed attempts
Note: Rate limit bypassed for whitelisted IPs (internal tools)
Compliance: SOC2 requirement AC-2.1
Security Review: Approved by security@company.com
Audit Trail: SEC-2024-042
CVSS: 5.3 (Medium)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## Automation Strategies

### Semi-Automated Commit Message Generation

**Approach 1: Pre-fill from Git Diff**

Create a script that analyzes your diff and suggests content:

**generate-commit-context.sh:**
```bash
#!/bin/bash
# Analyze staged changes and suggest commit context

echo "Analyzing staged changes..."
echo ""

# Count changes
FILES_CHANGED=$(git diff --staged --numstat | wc -l)
LINES_ADDED=$(git diff --staged --numstat | awk '{sum+=$1} END {print sum}')
LINES_REMOVED=$(git diff --staged --numstat | awk '{sum+=$2} END {print sum}')

echo "📊 Changes Summary:"
echo "  Files changed: $FILES_CHANGED"
echo "  Lines added: $LINES_ADDED"
echo "  Lines removed: $LINES_REMOVED"
echo ""

# Detect commit type based on file patterns
echo "🎯 Suggested Commit Type:"
if git diff --staged --name-only | grep -q "test"; then
  echo "  Test: (test files modified)"
elif git diff --staged --name-only | grep -q ".md$"; then
  echo "  Docs: (documentation files modified)"
elif git diff --staged --diff-filter=A --name-only | grep -q "." ; then
  echo "  Feature: (new files added)"
else
  echo "  Fix or Refactor: (existing files modified)"
fi
echo ""

# List affected files
echo "📁 Files Changed:"
git diff --staged --name-only | sed 's/^/  - /'
echo ""

# Extract function/class names from diff
echo "🔧 Functions/Classes Modified:"
git diff --staged | grep -E "^[+-]\s*(function|class|const|let|def|public|private)" | \
  sed 's/^[+-]//' | sed 's/^/  - /' | head -10
echo ""

echo "💡 Now use /commit-with-context to create the commit"
```

Usage:
```bash
# Stage changes
git add .

# Analyze and get suggestions
./scripts/generate-commit-context.sh

# Use suggestions to answer prompts
/commit-with-context
```

**Approach 2: Git Commit Template**

Create a commit message template that prompts you:

**.git/commit-template.txt:**
```
# Type: [Fix|Feature|Refactor|Docs|Test|Perf|WIP|Blocked|Hotfix|Security]
# Brief summary (under 50 chars)

Problem:
# What issue are you solving? What was the impact?

Approach:
# How did you solve it? What code changed?

Status:
# [Complete - |WIP - |Blocked - ] [description]

Next:
# What should happen next? What remains?

Note:
# Any gotchas, debugging insights, or non-obvious information?

# Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>


# ===== GUIDELINES =====
# - Keep summary under 50 characters
# - Focus on "why" not just "what"
# - Be specific with technical details
# - Document debugging insights
# - Think about future you reading this
# ======================
```

Configure Git to use it:
```bash
git config commit.template .git/commit-template.txt
```

Now `git commit` opens the template automatically.

### Automated Field Extraction

**Extract Information from Branch Names:**

**parse-branch-name.sh:**
```bash
#!/bin/bash
# Extract ticket number and type from branch name

BRANCH=$(git branch --show-current)

# Pattern: type/TICKET-123-brief-description
if [[ $BRANCH =~ ^([^/]+)/([A-Z]+-[0-9]+)-(.+)$ ]]; then
  TYPE=${BASH_REMATCH[1]}
  TICKET=${BASH_REMATCH[2]}
  DESC=${BASH_REMATCH[3]}

  echo "Branch: $BRANCH"
  echo "Type: $TYPE"
  echo "Ticket: $TICKET"
  echo "Description: $DESC"
  echo ""
  echo "Suggested commit type: ${TYPE^}"  # Capitalize first letter
  echo "Include in commit: Ticket: $TICKET"
else
  echo "Branch name doesn't match expected pattern"
  echo "Expected: type/TICKET-123-brief-description"
fi
```

Usage:
```bash
# Create branch following convention
git checkout -b feature/JIRA-1234-add-dark-mode

# Parse branch to get context
./scripts/parse-branch-name.sh

# Use output in commit message
```

---

## IDE and Editor Integration

### VS Code Integration

**Create Task for Contextual Commits:**

**.vscode/tasks.json:**
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Contextual Commit",
      "type": "shell",
      "command": "claude-code",
      "args": ["-c", "/commit-with-context"],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Analyze Changes",
      "type": "shell",
      "command": "${workspaceFolder}/scripts/generate-commit-context.sh",
      "presentation": {
        "reveal": "always"
      }
    }
  ]
}
```

**Usage in VS Code:**
1. `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Tasks: Run Task"
3. Select "Contextual Commit"

### Vim Integration

**Add to .vimrc:**
```vim
" Quick commit with context
nnoremap <leader>cc :!claude-code -c "/commit-with-context"<CR>

" Analyze changes before commit
nnoremap <leader>ca :!./scripts/generate-commit-context.sh<CR>
```

### JetBrains IDEs (IntelliJ, PyCharm, etc.)

**External Tool Configuration:**

1. Go to: Settings → Tools → External Tools
2. Click "+" to add new tool
3. Configure:
   - Name: Contextual Commit
   - Program: claude-code
   - Arguments: -c "/commit-with-context"
   - Working directory: $ProjectFileDir$

**Usage:**
- Tools → External Tools → Contextual Commit
- Or assign keyboard shortcut in Settings → Keymap

---

## Git Hooks Advanced Usage

### Enforce Contextual Commit Structure

**strict-commit-msg.sh:**
```bash
#!/bin/bash
# Strict validation of commit message structure

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat $COMMIT_MSG_FILE)

# Required fields
REQUIRED_FIELDS=("Problem:" "Approach:" "Status:" "Next:")

# Check each required field
for field in "${REQUIRED_FIELDS[@]}"; do
  if ! echo "$COMMIT_MSG" | grep -q "$field"; then
    echo "❌ Commit message missing required field: $field"
    echo ""
    echo "Required commit structure:"
    echo "  Type: Brief summary"
    echo "  "
    echo "  Problem: What issue are you solving?"
    echo "  Approach: How did you solve it?"
    echo "  Status: [Complete|WIP|Blocked]"
    echo "  Next: What's the next step?"
    echo "  Note: Any gotchas or insights (optional)"
    echo ""
    echo "Use /commit-with-context to create properly structured commits"
    exit 1
  fi
done

# Validate commit type
if ! echo "$COMMIT_MSG" | head -1 | grep -qE "^(Fix|Feature|Refactor|Docs|Test|Perf|WIP|Blocked|Hotfix|Security|Chore|Build|CI):"; then
  echo "❌ Commit must start with valid type:"
  echo "  Fix, Feature, Refactor, Docs, Test, Perf, WIP, Blocked, Hotfix, Security, Chore, Build, CI"
  exit 1
fi

# Validate summary length
SUMMARY=$(echo "$COMMIT_MSG" | head -1)
SUMMARY_LENGTH=${#SUMMARY}
if [ $SUMMARY_LENGTH -gt 72 ]; then
  echo "⚠️  Warning: Commit summary is $SUMMARY_LENGTH characters (recommended max: 72)"
fi

# Check for Co-Authored-By
if ! echo "$COMMIT_MSG" | grep -q "Co-Authored-By:"; then
  echo "⚠️  Warning: Missing Co-Authored-By line"
fi

echo "✅ Commit message structure valid"
exit 0
```

**Install:**
```bash
cp scripts/strict-commit-msg.sh .git/hooks/commit-msg
chmod +x .git/hooks/commit-msg
```

### Shared Hooks with Husky

For team-wide git hooks:

**Install Husky:**
```bash
npm install --save-dev husky
npx husky install
```

**Add Commit Message Hook:**
```bash
npx husky add .husky/commit-msg 'scripts/strict-commit-msg.sh $1'
```

**Commit to Repo:**
```bash
git add .husky/
git commit -m "Add husky hooks for contextual commits"
```

Now all team members get the same hooks!

---

## CI/CD Integration

### GitHub Actions Workflow

**Validate Commits in PR:**

**.github/workflows/validate-commits.yml:**
```yaml
name: Validate Contextual Commits

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Validate commit messages
        run: |
          echo "Validating commits in PR..."

          # Get commits in this PR
          COMMITS=$(git log origin/${{ github.base_ref }}..HEAD --pretty=format:"%H")

          INVALID=0
          for commit in $COMMITS; do
            MSG=$(git log -1 --pretty=format:"%B" $commit)
            SUMMARY=$(git log -1 --pretty=format:"%s" $commit)

            echo ""
            echo "Checking commit: $commit"
            echo "Summary: $SUMMARY"

            # Check for required fields
            if ! echo "$MSG" | grep -q "Problem:"; then
              echo "❌ Missing 'Problem:' field"
              INVALID=1
            fi

            if ! echo "$MSG" | grep -q "Approach:"; then
              echo "❌ Missing 'Approach:' field"
              INVALID=1
            fi

            if ! echo "$MSG" | grep -q "Status:"; then
              echo "❌ Missing 'Status:' field"
              INVALID=1
            fi

            if ! echo "$MSG" | grep -q "Next:"; then
              echo "❌ Missing 'Next:' field"
              INVALID=1
            fi

            # Check commit type
            if ! echo "$SUMMARY" | grep -qE "^(Fix|Feature|Refactor|Docs|Test|Perf|WIP|Blocked|Hotfix|Security):"; then
              echo "❌ Invalid commit type in summary"
              INVALID=1
            fi

            if [ $INVALID -eq 0 ]; then
              echo "✅ Commit structure valid"
            fi
          done

          if [ $INVALID -ne 0 ]; then
            echo ""
            echo "Some commits don't follow the contextual commit structure."
            echo "Use /commit-with-context to create properly structured commits."
            exit 1
          fi

          echo ""
          echo "All commits validated successfully! ✅"

      - name: Generate PR Summary
        run: |
          echo "## Commit Summary" > pr-summary.md
          echo "" >> pr-summary.md

          git log origin/${{ github.base_ref }}..HEAD \
            --pretty=format:"### %s%n%n%b%n---" >> pr-summary.md

          # Post as PR comment (requires additional action)
          cat pr-summary.md

      - name: Check for WIP commits
        run: |
          if git log origin/${{ github.base_ref }}..HEAD --grep="Status: WIP" --quiet; then
            echo "⚠️  Warning: PR contains WIP commits"
            git log origin/${{ github.base_ref }}..HEAD --grep="Status: WIP" --pretty=format:"  - %s"
            echo ""
            echo "Consider completing WIP work before merging."
          fi

      - name: Check for blocked commits
        run: |
          if git log origin/${{ github.base_ref }}..HEAD --grep="Status: Blocked" --quiet; then
            echo "❌ Error: PR contains blocked commits"
            git log origin/${{ github.base_ref }}..HEAD --grep="Status: Blocked" --pretty=format:"  - %s"
            echo ""
            echo "Resolve blockers before merging."
            exit 1
          fi
```

### GitLab CI Integration

**.gitlab-ci.yml:**
```yaml
validate-commits:
  stage: test
  script:
    - |
      echo "Validating commit messages..."
      COMMITS=$(git log origin/main..HEAD --pretty=format:"%H")

      for commit in $COMMITS; do
        MSG=$(git log -1 --pretty=format:"%B" $commit)

        if ! echo "$MSG" | grep -q "Problem:"; then
          echo "Commit $commit missing 'Problem:' field"
          exit 1
        fi

        if ! echo "$MSG" | grep -q "Approach:"; then
          echo "Commit $commit missing 'Approach:' field"
          exit 1
        fi
      done

      echo "All commits valid ✅"
  only:
    - merge_requests
```

---

## Analytics and Insights

### Commit Quality Metrics

**analyze-commits.sh:**
```bash
#!/bin/bash
# Analyze commit quality over time

echo "📊 Commit Quality Analysis"
echo "=========================="
echo ""

# Time range
SINCE="${1:-1 month ago}"

# Total commits
TOTAL=$(git log --since="$SINCE" --oneline | wc -l)
echo "Total commits since $SINCE: $TOTAL"
echo ""

# Commits by type
echo "Commits by Type:"
echo "  Features: $(git log --since="$SINCE" --grep="^Feature:" --oneline | wc -l)"
echo "  Fixes: $(git log --since="$SINCE" --grep="^Fix:" --oneline | wc -l)"
echo "  Refactors: $(git log --since="$SINCE" --grep="^Refactor:" --oneline | wc -l)"
echo "  Docs: $(git log --since="$SINCE" --grep="^Docs:" --oneline | wc -l)"
echo "  Tests: $(git log --since="$SINCE" --grep="^Test:" --oneline | wc -l)"
echo ""

# Contextual commits percentage
CONTEXTUAL=$(git log --since="$SINCE" --grep="Problem:" --oneline | wc -l)
PERCENTAGE=$((CONTEXTUAL * 100 / TOTAL))
echo "Contextual commits: $CONTEXTUAL / $TOTAL ($PERCENTAGE%)"
echo ""

# WIP commits
WIP=$(git log --since="$SINCE" --grep="Status: WIP" --oneline | wc -l)
echo "WIP commits: $WIP"
echo ""

# Blocked commits
BLOCKED=$(git log --since="$SINCE" --grep="Status: Blocked" --oneline | wc -l)
echo "Blocked commits: $BLOCKED"
echo ""

# Average commit message length
AVG_LENGTH=$(git log --since="$SINCE" --pretty=format:"%B" | wc -c)
AVG_LENGTH=$((AVG_LENGTH / TOTAL))
echo "Average commit message length: $AVG_LENGTH characters"
echo ""

# Top contributors
echo "Top Contributors:"
git log --since="$SINCE" --pretty=format:"%an" | sort | uniq -c | sort -rn | head -5 | \
  sed 's/^/  /'
```

Usage:
```bash
# Analyze last month
./scripts/analyze-commits.sh

# Analyze last week
./scripts/analyze-commits.sh "1 week ago"

# Analyze last 3 months
./scripts/analyze-commits.sh "3 months ago"
```

### Team Dashboard

**Generate HTML Dashboard:**

**dashboard.sh:**
```bash
#!/bin/bash
# Generate commit dashboard HTML

cat > commit-dashboard.html <<EOF
<!DOCTYPE html>
<html>
<head>
  <title>Commit Quality Dashboard</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .metric { display: inline-block; margin: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
    .metric h3 { margin-top: 0; }
    .metric .value { font-size: 36px; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Commit Quality Dashboard</h1>
  <p>Generated: $(date)</p>

  <div class="metric">
    <h3>Total Commits (30 days)</h3>
    <div class="value">$(git log --since="30 days ago" --oneline | wc -l)</div>
  </div>

  <div class="metric">
    <h3>Contextual Commits</h3>
    <div class="value">$(git log --since="30 days ago" --grep="Problem:" --oneline | wc -l)</div>
  </div>

  <div class="metric">
    <h3>Features</h3>
    <div class="value">$(git log --since="30 days ago" --grep="^Feature:" --oneline | wc -l)</div>
  </div>

  <div class="metric">
    <h3>Bug Fixes</h3>
    <div class="value">$(git log --since="30 days ago" --grep="^Fix:" --oneline | wc -l)</div>
  </div>

  <h2>Recent Commits</h2>
  <pre>
$(git log --since="7 days ago" --pretty=format:"%h - %s (%an, %ar)" | head -20)
  </pre>
</body>
</html>
EOF

echo "Dashboard generated: commit-dashboard.html"
```

---

## Integration with External Tools

### JIRA Integration

**Extract JIRA Tickets from Commits:**

**jira-sync.sh:**
```bash
#!/bin/bash
# Extract JIRA tickets from commits and post updates

SINCE="1 day ago"
COMMITS=$(git log --since="$SINCE" --pretty=format:"%H|%s|%b")

while IFS='|' read -r hash summary body; do
  # Extract JIRA ticket (e.g., PROJ-123)
  if [[ $body =~ (PROJ-[0-9]+) ]]; then
    TICKET=${BASH_REMATCH[1]}

    echo "Commit $hash mentions $TICKET"

    # Update JIRA via API (requires jira CLI or curl)
    # jira issue comment $TICKET "Commit: $hash - $summary"
  fi
done <<< "$COMMITS"
```

### Slack Integration

**Post Daily Summary to Slack:**

**slack-daily-summary.sh:**
```bash
#!/bin/bash
# Post daily commit summary to Slack

WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

# Generate summary
SUMMARY=$(cat <<EOF
*Daily Commit Summary* - $(date +%Y-%m-%d)

*Team Activity:*
$(git log --since="1 day ago" --all --pretty=format:"  • %s (by %an)" | head -10)

*Stats:*
  • Total commits: $(git log --since="1 day ago" --all --oneline | wc -l)
  • Contributors: $(git log --since="1 day ago" --all --pretty=format:"%an" | sort -u | wc -l)
  • Features: $(git log --since="1 day ago" --all --grep="^Feature:" --oneline | wc -l)
  • Fixes: $(git log --since="1 day ago" --all --grep="^Fix:" --oneline | wc -l)

*Blocked Work:*
$(git log --since="1 day ago" --all --grep="Status: Blocked" --pretty=format:"  • %s" || echo "  None")
EOF
)

# Post to Slack
curl -X POST $WEBHOOK_URL \
  -H 'Content-Type: application/json' \
  -d "{\"text\": \"$SUMMARY\"}"
```

### Notion Integration

**Export Commits to Notion:**

**notion-export.sh:**
```bash
#!/bin/bash
# Export commits to Notion database

NOTION_TOKEN="your-integration-token"
DATABASE_ID="your-database-id"

# Get commits from last day
COMMITS=$(git log --since="1 day ago" --pretty=format:"%H|%s|%an|%ad|%b" --date=iso)

while IFS='|' read -r hash summary author date body; do
  # Extract fields from body
  PROBLEM=$(echo "$body" | grep "Problem:" | sed 's/Problem: //')
  APPROACH=$(echo "$body" | grep "Approach:" | sed 's/Approach: //')
  STATUS=$(echo "$body" | grep "Status:" | sed 's/Status: //')

  # Create Notion page via API
  curl -X POST https://api.notion.com/v1/pages \
    -H "Authorization: Bearer $NOTION_TOKEN" \
    -H "Content-Type: application/json" \
    -H "Notion-Version: 2022-06-28" \
    -d "{
      \"parent\": { \"database_id\": \"$DATABASE_ID\" },
      \"properties\": {
        \"Title\": { \"title\": [{ \"text\": { \"content\": \"$summary\" }}] },
        \"Commit\": { \"rich_text\": [{ \"text\": { \"content\": \"$hash\" }}] },
        \"Author\": { \"rich_text\": [{ \"text\": { \"content\": \"$author\" }}] },
        \"Date\": { \"date\": { \"start\": \"$date\" }},
        \"Problem\": { \"rich_text\": [{ \"text\": { \"content\": \"$PROBLEM\" }}] },
        \"Status\": { \"select\": { \"name\": \"$STATUS\" }}
      }
    }"
done <<< "$COMMITS"
```

---

## Team Conventions

### Creating Team-Specific Guidelines

**Example: Team Commit Convention Document**

**COMMIT_CONVENTIONS.md:**
```markdown
# Team Commit Conventions

## Required Structure

All commits must follow this structure:

\`\`\`
[Type]: Brief summary (max 50 chars)

Problem: What issue are you solving?
Approach: How did you solve it?
Status: [Complete|WIP|Blocked] - description
Next: What's the next step?
Note: Any gotchas or insights
Ticket: JIRA-XXX (if applicable)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
\`\`\`

## Commit Types

- **Feature**: New functionality
- **Fix**: Bug fixes
- **Refactor**: Code restructuring
- **Deploy**: Deployment changes (DevOps only)
- **Config**: Configuration updates
- **Docs**: Documentation
- **Test**: Test additions/changes

## Team-Specific Rules

1. **Always include ticket number** for feature work
2. **Hotfixes must include** "Urgency" and "Downtime" fields
3. **Security commits require** security team review before push
4. **WIP commits** only allowed in feature branches, never in main
5. **Blocked commits must** tag the blocker owner in Slack

## Examples

See [examples/good-commits.md](examples/good-commits.md)

## Enforcement

- Pre-commit hooks validate structure
- CI fails if commits don't follow convention
- Code review checklist includes commit quality
```

---

## Related Documentation

- **[Usage Guide](USAGE.md)** - Basic usage workflow
- **[Templates](TEMPLATES.md)** - Commit message templates
- **[Examples](EXAMPLES.md)** - Real-world examples
- **[Workflows](WORKFLOWS.md)** - Daily workflow integration
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues
