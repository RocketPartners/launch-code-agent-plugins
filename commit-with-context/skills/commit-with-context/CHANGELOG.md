# Changelog

All notable changes to the commit-with-context skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-22

### Added

#### Core Functionality
- Structured commit message generation with Problem/Approach/Status/Next/Note fields
- Support for 10 commit types (Fix, Feature, Refactor, Docs, Test, Perf, WIP, Blocked, Hotfix, Security)
- Interactive prompts for gathering commit context
- Git workflow integration (analyze staged changes, create commit)
- Cross-timezone handoff support
- Error handling for common issues (no staged changes, not a git repo)
- Co-Authored-By attribution

#### AI-Powered Intelligence
- **Smart Context Pre-filling**: Analyzes git diff and automatically suggests problem/approach/impact
- **Repository Learning**: Learns team conventions from commit history (type format, tickets, style)
- **Intelligent Type Detection**: Suggests commit type based on file changes and patterns
- **Branch Name Parsing**: Auto-extracts ticket numbers and commit type from branch names

#### Metrics & Quality
- **Automatic Metrics Calculation**: Lines changed, files modified, test coverage
- **Impact Assessment**: Quantifies user impact, performance implications
- **Commit Quality Scoring**: Rates commits 0-10 with actionable suggestions
- **Real-time Validation**: Checks format, length, completeness, style matching

#### Context & Relationships
- **Related Commit Detection**: Finds and links commits touching same files or topics
- **Multi-Part Series Tracking**: Tracks feature series (part 1/3, 2/3, 3/3)
- **Visual Status Indicators**: Optional emoji mode for quick status scanning
- **Template Recommendations**: Suggests best template based on detected patterns

#### Utility Commands
- `/commit-context generate-pr`: Generate PR description from commits in branch
- `/commit-context search [term]`: Search commits by structured fields
- `/commit-context history`: Interactive visual commit history tree
- `/commit-context analytics [timeframe]`: Team commit quality analytics and trends
- `/commit-context quality`: Analyze commit message quality score

#### Documentation
- 7 focused documentation guides (200-700 lines each):
  - Main SKILL.md navigation hub (143 lines)
  - Getting Started guide (287 lines)
  - Usage guide with complete workflow (468 lines)
  - Templates for different commit scenarios (575 lines)
  - Real-world examples (507 lines)
  - Troubleshooting guide (642 lines)
  - Workflow integration guide (664 lines)
  - Advanced usage and customization guide (863 lines)
- Navigation-based documentation structure
- Scenario-based document mapping
- 50+ real-world examples across different scenarios
- Troubleshooting guide with 10+ common issues
- Workflow integration examples for solo, small team, and large org
- Advanced automation scripts and CI/CD integration examples

### Technical Implementation
- Phase 0 intelligence gathering before user questions
- Git diff analysis for function/class detection
- Pattern matching for team convention detection
- Metrics calculation pipeline
- Quality scoring algorithm
- Related commit graph analysis
- Enhanced user prompts with intelligent defaults and suggestions
- Improved commit message structure with optional visual indicators
- Better error handling with smart recovery suggestions

---

## Future Roadmap

### [1.1.0] - Planned
- Commit template library with team-specific templates
- Git hook auto-setup and management
- Offline mode with cached templates
- Multi-language support for commit messages

### [1.2.0] - Planned
- Team synchronization (Slack/Teams notifications)
- Advanced analytics dashboard with trends
- Commit graph visualization
- Team performance insights
- Automated commit style suggestions

### [2.0.0] - Future
- Integration with more issue trackers (Linear, Asana, etc.)
- AI-powered code review integration
- Automated testing suggestions based on changes
- Smart conflict resolution assistance
- Voice-to-commit (voice input for commit messages)

---

## Version History

| Version | Date | Summary |
|---------|------|---------|
| 1.0.0 | 2026-02-22 | Initial release with AI intelligence, structured commits, comprehensive documentation |

---

## Upgrade Guide

### Upgrading to 1.0.0
This is the initial release. No upgrade steps needed.

Simply install and start using:
```bash
claude-code plugins install launchcode:commit-with-context
```

---

## Breaking Changes

None yet.

---

## Deprecations

None yet.

---

## Known Issues

None at this time.

Report issues via:
- GitHub Issues (if open-sourced)
- LaunchCode support
- Team Slack channel

---

## Contributors

- Kerr Cruz (@kerrcruz) - Original implementation and documentation
- Claude Sonnet 4.5 - Co-development and documentation assistance

---

**Note:** This changelog is maintained manually. Each release should update this file with changes, following the Keep a Changelog format.
