---
name: git-merge-resolver
description: Resolve Git merge conflicts while preserving a feature branch's architecture. Use this skill whenever the user asks to merge main/master into a feature branch, resolve merge conflicts, rebase with conflict resolution, or reconcile divergent branches. Also trigger when the user mentions "merge conflicts", "resolve conflicts", "merge main into my branch", "rebase onto main", "branch is behind main", "conflicting changes", or any scenario where two branches have diverged and need to be reconciled with one branch's patterns taking precedence. Works with any language, framework, or build system.
---

# Git Merge Resolver

Resolve Git merge conflicts between a feature branch (Branch A) and an upstream branch (typically main) while preserving Branch A's architectural intent. This skill is language-agnostic and works with any build system.

## Core Principle

Branch A's architecture, patterns, and control flows are the source of truth. Main contributes *new data and features only*. Your job is to extract main's delta and adapt it into Branch A's world — never the reverse.

## Workflow

### Phase 1: Understand Both Sides

Before touching any code, build a mental model of each branch.

**Branch A (the feature branch):**
- Read the commit history and changed files to understand the architectural goals.
- Identify the new patterns, abstractions, data flows, and structural conventions it introduces.
- Note naming conventions, file organization, error handling style, and API design.

**Main (the upstream):**
- Identify what changed on main *since Branch A diverged* (use the merge base).
- Categorize each change: new feature, bugfix, refactor, data addition, config change, dependency update.
- For each change, determine whether it's a *pure addition* (new file, new field, new endpoint) or a *structural change* (reorganized module, renamed pattern, altered flow).

```bash
# Find the merge base
MERGE_BASE=$(git merge-base HEAD main)

# See what main introduced since the branch diverged
git diff $MERGE_BASE main --stat
git log $MERGE_BASE..main --oneline

# See what the feature branch introduced
git diff $MERGE_BASE HEAD --stat
git log $MERGE_BASE..HEAD --oneline
```

### Phase 2: Perform the Merge

```bash
git merge main
```

If conflicts arise, proceed to Phase 3. If the merge is clean, skip directly to Phase 4 — semantic conflicts can still exist in auto-merged code.

### Phase 3: Resolve Explicit Conflicts

For every file with conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), apply these rules in order:

1. **Preserve the Paradigm.** Branch A's architecture wins. If main restructured something that Branch A also restructured differently, keep Branch A's structure entirely. Do not revert to main's older design even partially.

2. **Extract the Delta.** Look at what main's side of the conflict actually *adds* — new fields, new enum values, new function parameters, new imports, new config entries. Isolate these additions from the structural wrapper they arrived in.

3. **Adapt and Integrate.** Take those extracted additions and rewrite them to fit Branch A's conventions:
   - Match naming conventions (casing, prefixes, suffixes).
   - Place new items where Branch A's structure expects them (e.g., if Branch A groups by domain and main groups alphabetically, move the new item to the correct domain group).
   - Wire new features through Branch A's control flow (e.g., if Branch A uses a strategy pattern and main used a switch statement, add the new case as a new strategy).
   - Ensure new data flows through Branch A's validation, error handling, and logging patterns.

4. **Clean the markers.** Remove all `<<<<<<<`, `=======`, and `>>>>>>>` lines. Verify the resulting syntax is valid.

### Phase 4: Resolve Semantic Conflicts

This is the step most people miss. Auto-merged code can still violate Branch A's patterns even without conflict markers.

Review every file that was auto-merged from main:

- Does any auto-merged code use an older pattern that Branch A replaced? Refactor it to use Branch A's new pattern.
- Does any auto-merged code reference a symbol, path, or API that Branch A renamed or restructured? Update the references.
- Does any auto-merged code duplicate functionality that Branch A implements differently? Remove the duplicate and wire it through Branch A's implementation.
- Are there new imports, dependencies, or config entries that need to be adjusted for Branch A's module structure?

### Phase 5: Verify

Run the project's build and test suite. Infer the correct commands from the project structure:

- `pom.xml` or `build.gradle` → `./mvnw verify` or `./gradlew build`
- `package.json` → `npm run build && npm test` (or `yarn`/`pnpm` equivalents)
- `Cargo.toml` → `cargo build && cargo test`
- `Makefile` → `make` or `make test`
- `pyproject.toml` / `setup.py` → `pip install -e . && pytest`
- `.sln` / `.csproj` → `dotnet build && dotnet test`
- `go.mod` → `go build ./... && go test ./...`

If the build or tests fail, diagnose whether the failure is from an integration issue introduced by the merge and fix it. If the failure is a pre-existing issue on either branch, note it but don't attempt to fix unrelated problems.

### Phase 6: Review and Approve

After the build and tests pass, present a detailed recap of every merge resolution before committing. Group changes by file and explain the reasoning for each decision.

**For each modified file, report:**

1. **File path**
2. **Conflict type** — explicit (had conflict markers) or semantic (auto-merged but refactored)
3. **What main introduced** — the new data, feature, or fix from main's side
4. **What Branch A established** — the pattern or structure that took precedence
5. **Resolution** — exactly what was done and why. Be specific: "Added the new `rewardsTier` field to Branch A's `PlayerProfile` record, wired it through the existing validation pipeline" — not just "merged both sides."
6. **Risk level** — low (pure data addition), medium (new logic wired through existing flow), or high (structural adaptation that changed control flow)

Also call out:
- Any auto-merged files that were left as-is and why they didn't need adjustment.
- Any pre-existing test failures that are unrelated to the merge.
- Any judgment calls where the resolution could reasonably have gone a different way.

Present this recap and ask for explicit approval before committing. If changes are requested, apply them, re-run the build/test suite, and present an updated recap.

Only after approval:
```bash
git add -A
git commit
```

## Decision Framework for Ambiguous Conflicts

When it's unclear how to resolve a conflict, use this priority order:

1. **Branch A's explicit changes** — anything Branch A intentionally modified takes highest priority.
2. **Main's new additions** — new data, features, and fixes from main should be preserved, adapted into Branch A's patterns.
3. **Main's structural changes** — if main refactored something that Branch A *did not touch*, accept main's refactor. If Branch A also refactored it differently, Branch A wins.
4. **Behavioral correctness** — if preserving Branch A's pattern would break a bugfix from main, incorporate the fix logic using Branch A's style.

## Common Pitfalls

- **Blind "accept ours"**: Don't discard main's changes entirely. The goal is to *integrate* the delta, not ignore it.
- **Blind "accept theirs"**: Never accept main's version wholesale — it will destroy Branch A's architecture.
- **Forgetting auto-merged files**: Conflicts are obvious. Semantic mismatches in cleanly merged files are not. Always review them.
- **Not running tests**: A syntactically valid merge can still be semantically broken. The build and test step is mandatory.
