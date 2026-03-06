# Workflow Integration

**When to use this guide:** You want to integrate contextual commits into your daily development workflow, team practices, or CI/CD pipeline.

## Overview

This guide shows how to make contextual commits a natural part of your development workflow, whether you work solo, with a small team, or in a large organization.

---

## Solo Developer Workflow

### Daily Development Rhythm

**Morning: Start Work**
```bash
# Check what you committed yesterday
git log -3 --pretty=format:"%h - %s%n%b" | head -50

# Read the "Next:" fields to know where to continue
```

**During Development: Frequent Small Commits**
```bash
# Make some changes
# Stage the logical unit
git add src/feature.js src/feature.test.js

# Create contextual commit
/commit-with-context

# Continue working
```

**End of Day: Handoff to Future You**
```bash
# Even if work is incomplete, commit as WIP
git add .

# Create WIP commit with clear next steps
/commit-with-context

# Answer prompts with emphasis on "Next:"
# Tomorrow you'll thank yourself
```

**Before Switching Tasks**
```bash
# Commit current work before context switching
git add .
/commit-with-context

# Now safe to switch to different feature
git checkout other-branch
```

### Solo Developer Schedule

| Time | Activity | Commit Practice |
|------|----------|-----------------|
| 9:00 AM | Review yesterday's commits | Read "Next:" fields |
| 9:15 AM | Start coding | Make first contextual commit after setup |
| 10:30 AM | Feature checkpoint | Commit completed sub-feature |
| 12:00 PM | Lunch break | Commit if mid-feature (WIP) |
| 1:00 PM | Resume work | Read last commit to remember context |
| 3:00 PM | Another checkpoint | Commit progress |
| 5:00 PM | End of day | WIP commit with detailed "Next:" |

---

## Small Team Workflow (2-10 people)

### Cross-Timezone Handoffs

**Scenario:** Team in PST and CEST timezones, need smooth handoffs.

**PST Engineer (Morning):**
```bash
# Check what CEST teammate left for you
git pull
git log origin/feature-branch -3 --pretty=format:"%h - %s%n%b" | head -100

# Look for:
# - Status: WIP or Blocked
# - Next: What to do
# - Note: Gotchas to be aware of
```

**PST Engineer (Evening - Handoff):**
```bash
# Before logging off
git add .

# Create detailed WIP commit
/commit-with-context

# In commit, include:
# - Clear "Next:" with specific tasks
# - "Note:" with gotchas for next person
# - Estimated completion percentage

# Push for CEST teammate
git push origin feature-branch

# Optional: Slack message
# "Pushed commit abc123, see commit message for details. Next step is implementing error handling."
```

**CEST Engineer (Morning):**
```bash
# Pull latest work
git pull origin feature-branch

# Read commit for context
git log -1 --pretty=format:"%h - %s%n%b"

# Continue where PST teammate left off (guided by "Next:")
```

### Daily Standup Integration

**Traditional Standup:**
- "What did you do yesterday?"
- "What will you do today?"
- "Any blockers?"

**With Contextual Commits:**
```bash
# Generate standup notes from commits
git log --author="$(git config user.name)" --since="yesterday" --pretty=format:"%s"

# Your commits already answer standup questions:
# - Yesterday: Look at commit summaries
# - Today: Look at "Next:" fields
# - Blockers: Look at "Status: Blocked" commits
```

**Example Standup Answer:**
```
Yesterday:
  - Fixed cart calculation bug (see commit a3f2b1c)
  - Started OAuth integration (WIP commit f5e8d2a)

Today:
  - Complete OAuth integration (next step: token refresh logic)
  - Add tests for cart fix

Blockers:
  - Waiting for API key from vendor (noted in commit f5e8d2a)
```

### Code Review Workflow

**Before Creating PR:**
```bash
# Review your commits
git log origin/main..HEAD --pretty=format:"%h - %s%n%b"

# Make sure commits tell a story
# Each commit should have clear context
```

**Creating PR:**
```markdown
# PR Description Template (Auto-generated from commits)

## Summary
[First commit subject line]

## Changes
[List commit summaries]

## Testing
[Extract "Next:" fields about testing from commits]

## Reviewer Notes
[Extract "Note:" fields with gotchas]

## Remaining Work
[Extract any "Next:" items that should be future work]
```

**Reviewer Experience:**
```bash
# Reviewer checks out PR
git checkout pr/123

# Reviews commit by commit
git log origin/main..HEAD --pretty=format:"%h - %s%n%b" | less

# Each commit explains:
# - Why change was made (Problem)
# - How it was implemented (Approach)
# - What's the state (Status)
# - Gotchas (Note)

# Faster review because context is clear!
```

### Team Adoption Strategy

**Week 1: Introduction**
- Team meeting: Introduce concept
- Share this documentation
- Demo creating a contextual commit
- Ask team to try for their next 5 commits

**Week 2: Practice**
- In code reviews, praise good contextual commits
- Gently suggest improvements to unclear commits
- Share examples of particularly good commits

**Week 3: Refinement**
- Team retrospective on commit practice
- Adjust templates to fit team needs
- Document team-specific conventions

**Week 4: Habit Formation**
- Most commits should now be contextual
- Continue reinforcing in code reviews
- Add to onboarding checklist for new hires

---

## Large Organization Workflow

### Multi-Team Dependencies

**Scenario:** Your feature depends on another team's API changes.

**Your Team's Commit:**
```
Blocked: Implement real-time notifications

Problem: Users need instant alerts for order updates
Approach: Started WebSocket implementation, prepared event handlers
Status: Blocked - Waiting for Platform team's EventBus API (ETA: next sprint)
Next: Complete integration once EventBus is available
Note: Code ready in feature flag, just needs API endpoint
Blocker: Platform team ticket #PLT-4521 (owner: jane@company.com)
Dependency: EventBus v2.0 release
Impact: Delayed 2 weeks, affects Q1 OKR
Workaround: Can use polling as MVP, migrate to EventBus later

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Benefits:**
- Other teams see your dependency
- Clear owner of blocker
- Documented workaround
- Impact on objectives noted

### Compliance and Auditing

**Scenario:** Financial services company needs audit trail.

**Security Fix Commit:**
```
Security: Fix IDOR vulnerability in account access

Problem: Users could access other accounts by manipulating URL parameters
Approach: Added authorization check in AccountController to verify user owns account
Status: Complete - Patched and verified by security team
Next: Audit all other controllers for similar vulnerabilities
Note: Discovered in security audit, no evidence of exploitation
Severity: High (CVSS 7.5)
Audit Trail:
  - Discovered: 2024-01-15 by Security Team
  - Verified: 2024-01-16
  - Fixed: 2024-01-17
  - Deployed: 2024-01-17 23:00 UTC
  - Verified Fix: 2024-01-18
Compliance: SOC2, ISO 27001
Reviewer: security@company.com (signed off)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Compliance Benefits:**
- Clear timeline
- Reviewer sign-off
- Severity rating
- No exploitation evidence
- Standards referenced

### Release Management

**Release Manager Workflow:**
```bash
# Generate release notes from commits
git log v1.2.0..v1.3.0 --pretty=format:"%s%n%b" | \
  grep -E "^(Fix:|Feature:|Security:)" | \
  sed 's/Co-Authored.*$//' > release-notes.md

# Commits with "Status: Complete" are in release
# Commits with "Status: WIP" need follow-up
# Commits with "Security:" get special attention
```

**Release Notes Auto-Generated:**
```markdown
# Release v1.3.0

## New Features
- Feature: Add real-time order notifications (see commit a3f2b1c)
- Feature: Customer portal with order history (see commit f5e8d2a)

## Bug Fixes
- Fix: Cart calculation with multiple promos (see commit b2c4e6f)
- Fix: Profile image upload failures (see commit d7f9a2b)

## Security
- Security: Fix IDOR in account access (see commit c8e1f4a)

## Known Issues
- Edge case: Promo priority null handling (tracked in commit a3f2b1c "Next:" field)
```

---

## Continuous Integration Workflow

### Pre-Commit Hooks

**Setup Pre-Commit Hook:**

Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
# Remind to use contextual commits

echo "🔍 Pre-commit checks running..."

# Run tests
npm test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Fix tests before committing."
  exit 1
fi

# Run linter
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed. Run 'npm run lint --fix' to fix."
  exit 1
fi

echo "✅ Pre-commit checks passed!"
echo "💡 Tip: Use /commit-with-context for better commit messages"
exit 0
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

### Commit Message Validation

**Setup Commit-Msg Hook:**

Create `.git/hooks/commit-msg`:
```bash
#!/bin/bash
# Validate commit message structure

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat $COMMIT_MSG_FILE)

# Check if commit has required fields
if ! echo "$COMMIT_MSG" | grep -q "Problem:"; then
  echo "❌ Commit missing 'Problem:' field"
  echo "💡 Use /commit-with-context to create properly structured commits"
  exit 1
fi

if ! echo "$COMMIT_MSG" | grep -q "Approach:"; then
  echo "❌ Commit missing 'Approach:' field"
  exit 1
fi

if ! echo "$COMMIT_MSG" | grep -q "Status:"; then
  echo "❌ Commit missing 'Status:' field"
  exit 1
fi

echo "✅ Commit message structure valid"
exit 0
```

Make it executable:
```bash
chmod +x .git/hooks/commit-msg
```

### CI Pipeline Integration

**GitHub Actions Example:**

`.github/workflows/commit-validation.yml`:
```yaml
name: Commit Message Validation

on: [pull_request]

jobs:
  validate-commits:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Validate commit messages
        run: |
          # Get commits in this PR
          COMMITS=$(git log origin/main..HEAD --pretty=format:"%H")

          for commit in $COMMITS; do
            MSG=$(git log -1 --pretty=format:"%B" $commit)

            # Check for required fields
            if ! echo "$MSG" | grep -q "Problem:"; then
              echo "Commit $commit missing 'Problem:' field"
              exit 1
            fi

            if ! echo "$MSG" | grep -q "Approach:"; then
              echo "Commit $commit missing 'Approach:' field"
              exit 1
            fi
          done

          echo "All commits have proper structure ✅"
```

---

## Pull Request Workflow

### Creating PR from Contextual Commits

**Step 1: Review Commits**
```bash
git log origin/main..HEAD --pretty=format:"%h - %s%n%b%n"
```

**Step 2: Generate PR Description**
```bash
# Extract information from commits
./scripts/generate-pr-description.sh
```

**generate-pr-description.sh:**
```bash
#!/bin/bash
# Generate PR description from contextual commits

echo "## Summary"
echo ""
git log origin/main..HEAD --pretty=format:"- %s" | head -1
echo ""

echo "## Changes"
echo ""
git log origin/main..HEAD --pretty=format:"- %s"
echo ""

echo "## Implementation Details"
echo ""
git log origin/main..HEAD --pretty=format:"%B" | grep "Approach:" | sed 's/Approach: /- /'
echo ""

echo "## Testing"
echo ""
git log origin/main..HEAD --pretty=format:"%B" | grep "Next:" | sed 's/Next: /- /' | grep -i test
echo ""

echo "## Known Issues / Future Work"
echo ""
git log origin/main..HEAD --pretty=format:"%B" | grep "Next:" | sed 's/Next: /- /' | grep -v test
echo ""

echo "## Notes for Reviewers"
echo ""
git log origin/main..HEAD --pretty=format:"%B" | grep "Note:" | sed 's/Note: /- /'
```

**Step 3: Create PR**
```bash
gh pr create --title "Feature: User notification system" \
  --body "$(./scripts/generate-pr-description.sh)"
```

### Reviewing PRs with Contextual Commits

**Reviewer Checklist:**

1. **Read Commit Messages First**
   ```bash
   gh pr checkout 123
   git log origin/main..HEAD --pretty=format:"%h - %s%n%b%n" | less
   ```

2. **Verify Problem/Solution Match**
   - Does the code solve the stated problem?
   - Is the approach explained in commits reflected in code?

3. **Check Status Claims**
   - Commits say "Complete" - are tests included?
   - Commits say "WIP" - is this PR ready?

4. **Review Next Steps**
   - Are "Next:" items tracked somewhere?
   - Should any "Next:" items be done before merging?

5. **Validate Notes**
   - Do gotchas mentioned in commits need documentation?
   - Are there security concerns mentioned?

---

## Workflow Automation Scripts

### Daily Standup Generator

**standup-notes.sh:**
```bash
#!/bin/bash
# Generate standup notes from yesterday's commits

echo "📊 Standup Notes"
echo "==============="
echo ""

echo "✅ Completed Yesterday:"
git log --author="$(git config user.name)" --since="yesterday 9am" --until="today 9am" \
  --pretty=format:"%s" | sed 's/^/  - /'
echo ""

echo "🚀 Today's Plan (from 'Next:' fields):"
git log --author="$(git config user.name)" --since="yesterday 9am" --until="today 9am" \
  --pretty=format:"%B" | grep "Next:" | sed 's/Next: /  - /'
echo ""

echo "🚧 Blockers:"
git log --author="$(git config user.name)" --since="yesterday 9am" --until="today 9am" \
  --pretty=format:"%B" | grep "Status: Blocked" -A 1 | grep -v "^--$" | sed 's/^/  - /'
echo ""
```

Usage:
```bash
./scripts/standup-notes.sh
```

### Weekly Summary Generator

**weekly-summary.sh:**
```bash
#!/bin/bash
# Generate weekly work summary

echo "📈 Weekly Summary ($(date -d '7 days ago' +%Y-%m-%d) to $(date +%Y-%m-%d))"
echo "=========================================="
echo ""

echo "Commits This Week:"
git log --author="$(git config user.name)" --since="1 week ago" --oneline | wc -l
echo ""

echo "Breakdown by Type:"
echo "  Features: $(git log --author="$(git config user.name)" --since="1 week ago" --pretty=format:"%s" | grep -c "^Feature:")"
echo "  Fixes: $(git log --author="$(git config user.name)" --since="1 week ago" --pretty=format:"%s" | grep -c "^Fix:")"
echo "  Refactors: $(git log --author="$(git config user.name)" --since="1 week ago" --pretty=format:"%s" | grep -c "^Refactor:")"
echo ""

echo "Major Work Items:"
git log --author="$(git config user.name)" --since="1 week ago" --pretty=format:"  - %s" | head -10
echo ""

echo "Current Blockers:"
git log --author="$(git config user.name)" --since="1 week ago" --pretty=format:"%B" | \
  grep "Status: Blocked" -A 1 | grep "Blocker:" | sed 's/Blocker:/  -/' | sort -u
```

Usage:
```bash
./scripts/weekly-summary.sh
```

### Find WIP and Blocked Work

**find-incomplete.sh:**
```bash
#!/bin/bash
# Find all WIP and Blocked commits across branches

echo "🔍 Incomplete Work"
echo "=================="
echo ""

echo "Work In Progress:"
git log --all --grep="Status: WIP" --pretty=format:"%h - %s (by %an on %cd)" --date=short
echo ""

echo "Blocked Work:"
git log --all --grep="Status: Blocked" --pretty=format:"%h - %s (by %an on %cd)" --date=short | \
  while read line; do
    echo "$line"
    commit=$(echo "$line" | cut -d' ' -f1)
    git log -1 $commit --pretty=format:"%B" | grep "Blocker:" | sed 's/^/  /'
  done
```

Usage:
```bash
./scripts/find-incomplete.sh
```

---

## Team Communication Integration

### Slack Integration

**Post Commit Notifications:**

`.git/hooks/post-commit`:
```bash
#!/bin/bash
# Post commit summary to Slack

COMMIT_MSG=$(git log -1 --pretty=format:"%s%n%b")
COMMIT_HASH=$(git log -1 --pretty=format:"%h")
AUTHOR=$(git config user.name)

# Only post certain types to Slack
if echo "$COMMIT_MSG" | grep -qE "^(Fix|Feature|Security|Hotfix):"; then
  SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

  curl -X POST $SLACK_WEBHOOK \
    -H 'Content-Type: application/json' \
    -d "{
      \"text\": \"New commit by $AUTHOR\",
      \"attachments\": [{
        \"title\": \"Commit $COMMIT_HASH\",
        \"text\": \"$COMMIT_MSG\",
        \"color\": \"good\"
      }]
    }"
fi
```

---

## Related Documentation

- **[Usage Guide](USAGE.md)** - Complete usage workflow
- **[Templates](TEMPLATES.md)** - Commit message templates
- **[Examples](EXAMPLES.md)** - Real-world examples
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues
- **[Advanced Usage](ADVANCED.md)** - Customization and automation
