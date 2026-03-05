---
name: code-visualizer
description: This skill transforms code explanations, programming concepts, and technical documentation into visual diagrams. Use this when explaining code structure, data flow, algorithms, system architecture, or any programming concept that would benefit from visual representation. Ideal for visual learners who understand better through diagrams than text alone. Optimized for IntelliJ IDEA users. Supports both Mermaid diagrams and ASCII/text-based diagrams.
---

# Code Visualizer

Transform code and technical concepts into clear, professional diagrams.

## Quick Navigation

### Getting Started
- **[Getting Started Guide](docs/GETTING_STARTED.md)** - Prerequisites, quick start (5 min), your first diagram
- **[Syntax Reference](docs/SYNTAX_REFERENCE.md)** - Complete syntax lookup for Mermaid and ASCII

### Core Guides
- **[Best Practices](docs/BEST_PRACTICES.md)** - Guidelines for creating effective, professional diagrams
- **[IntelliJ Integration](docs/INTELLIJ_INTEGRATION.md)** - IDE setup, plugins, project structure, workflow
- **[Examples](docs/EXAMPLES.md)** - Real-world diagram examples with explanations

---

## When to Use Each Document

| Your Goal | Document |
|-----------|----------|
| I'm creating my first diagram | [Getting Started](docs/GETTING_STARTED.md) |
| I need Mermaid/ASCII syntax | [Syntax Reference](docs/SYNTAX_REFERENCE.md) |
| I want professional-looking diagrams | [Best Practices](docs/BEST_PRACTICES.md) |
| I'm setting up IntelliJ IDEA | [IntelliJ Integration](docs/INTELLIJ_INTEGRATION.md) |
| I want to see examples | [Examples](docs/EXAMPLES.md) |

---

## Core Instructions

When a user asks you to explain code or programming concepts:

### 1. Analyze the Content
- Identify key components (functions, classes, data structures, flow)
- Determine relationships and dependencies
- Note sequence of operations or hierarchy
- Identify what's most important vs. supporting details

### 2. Choose the Right Format

**Mermaid Diagrams** (preferred for most cases):
- ✅ Best for: System architecture, class diagrams, flowcharts
- ✅ Renders beautifully in IntelliJ with plugins
- ✅ Professional appearance, easy to maintain

**ASCII/Text Diagrams** (for detailed flows):
- ✅ Best for: Sequential processes, detailed walkthroughs, debugging flows
- ✅ Works in any text editor without plugins
- ✅ Great for code comments and terminal output

### 3. Choose the Diagram Type

| Type | Use For |
|------|---------|
| **Flowchart** | Algorithms, decision trees, process flows |
| **Class Diagram** | OOP structure and relationships |
| **Sequence Diagram** | Interactions between components over time |
| **ER Diagram** | Database schemas |
| **Architecture Diagram** | System design and component relationships |
| **State Diagram** | State machines and lifecycle |
| **ASCII Step-by-Step** | Detailed execution flows with multiple stages |

### 4. Create the Visualization

**For Mermaid:**
- Use Mermaid syntax to generate clean, readable diagrams
- **CRITICAL:** Verify syntax is valid before generating
- Utilize available shapes to convey meaning (rectangles, diamonds, cylinders, etc.)
- Keep diagrams focused and uncluttered (5-15 nodes ideal)
- Use consistent naming and clear labels
- Add color coding when it enhances understanding

**For ASCII:**
- Use box-drawing characters: `┌─┐│└┘├┤┬┴┼`
- Create clear sections with headers
- Use arrows for flow: `→ ↓ ← ↑ ↔`
- Include annotations and comments inline
- Show code snippets and line numbers
- Keep boxes aligned and consistent width (80 columns max)

### 5. Provide Context
- Give a short explanation before the diagram
- Highlight key takeaways after the diagram
- Explain any notation or symbols used

### 6. Save as IntelliJ-Compatible Files

**For Mermaid:**
- Create `.mmd` file with ONLY the Mermaid code (no markdown, no comments)
- Create separate `-notes.txt` file for description and metadata
- Example: `login-flow.mmd` + `login-flow-notes.txt`

**For ASCII:**
- Create `.txt` file with diagram and inline notes
- Use monospace font for viewing
- Example: `login-sequence.txt`

---

## Critical Success Factors

Top 10 points to ensure diagram quality:

1. **One Concept Per Diagram** - Don't try to show everything at once
2. **Limit Nodes** - Keep diagrams to 5-15 nodes when possible
3. **Validate Syntax** - Always check Mermaid syntax before generating
4. **Use Meaningful Labels** - "Validate Input" not "Process 1"
5. **Show Error Paths** - Include exception handling and edge cases
6. **Consistent Direction** - Stick with top-to-bottom OR left-to-right
7. **Match Code Style** - Use correct naming for the programming language
8. **Color Purposefully** - Green for start/end, red for errors, yellow for decisions
9. **Include Context** - Always provide explanation with the diagram
10. **File Organization** - Save diagrams to `~/Desktop/diagrams/` (outside project) with matching `.mmd` and `-notes.txt` files

---

## Example Triggers

Invoke this skill when you see:
- "Visualize this code for me"
- "Can you diagram how this works?"
- "Show me a flowchart of this algorithm"
- "Draw the architecture of this system"
- "Walk me through this step-by-step"
- "Show me the execution flow"
- "Create a text diagram for this"

---

## Quick Reference

### Mermaid Basic Shapes
```mermaid
flowchart TD
    A[Rectangle] --> B(Rounded)
    B --> C{Diamond}
    C --> D[(Database)]
    D --> E([Stadium])
```

### Common Mermaid Patterns

**Simple Process:**
```mermaid
flowchart TD
    Start([Start]) --> Process[Do Work] --> End([End])
```

**Decision Flow:**
```mermaid
flowchart TD
    A[Start] --> B{Valid?}
    B -->|Yes| C[Continue]
    B -->|No| D[Error]
```

**Error Handling:**
```mermaid
flowchart TD
    Try[Try Operation] --> Check{Success?}
    Check -->|Yes| Success[Continue]
    Check -->|No| Retry[Retry] --> Try
```

### ASCII Basic Structure
```
┌─────────────────────────────────────────────────────────────────┐
│ Step 1: Description                                             │
├─────────────────────────────────────────────────────────────────┤
│ • Detail 1                                                      │
│ • Detail 2                                                      │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 2: Description                                             │
├─────────────────────────────────────────────────────────────────┤
│ • Detail 1                                                      │
│ • Detail 2                                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## When NOT to Visualize

Skip diagrams for:
- ❌ Trivial one-liners
- ❌ Systems with 50+ nodes (break into multiple diagrams instead)
- ❌ Every line of implementation detail (focus on concepts)
- ❌ Cases where text is clearer

---

## File Format Templates

### Mermaid File (.mmd)
```mermaid
flowchart TD
    Start([Start]) --> Process[Main Process]
    Process --> Decision{Valid?}
    Decision -->|Yes| Success[Continue]
    Decision -->|No| Error[Handle Error]
    Success --> End([End])
    Error --> End

    style Start fill:#90EE90
    style End fill:#90EE90
    style Error fill:#FFB6C6
    style Decision fill:#FFE4B5
```

### Notes File (-notes.txt)
```
═══════════════════════════════════════════════════════════════════════════
 DIAGRAM: [Title]
═══════════════════════════════════════════════════════════════════════════

Author: [Your Name]
Created: [Date]
Purpose: [One-line description]

RELATED CODE:
- File.ext (lines X-Y)

DESCRIPTION:
[2-3 paragraphs explaining the diagram]

KEY COMPONENTS:
- [Component] - [What it does]

NOTES:
- [Important details]
```

---

## IntelliJ IDEA Setup

### Quick Setup
1. Install Mermaid plugin: **File → Settings → Plugins → "Mermaid"**
2. Open `.mmd` files for live preview
3. Use monospace font for `.txt` files

### Recommended Diagram Location
```
~/Desktop/diagrams/          # Save diagrams outside project
├── architecture/
│   ├── system-overview.mmd
│   └── system-overview-notes.txt
├── flows/
│   ├── login-flow.mmd
│   └── login-flow-notes.txt
└── models/
    ├── user-model.mmd
    └── user-model-notes.txt
```

**Why Desktop?**
- Keeps diagrams separate from project code
- Easy to access and share
- No version control conflicts
- Can be used across multiple projects

---

## Best Practices Summary

**Clarity:**
- One concept per diagram
- 5-15 nodes per diagram
- Progressive disclosure (overview → details)

**Consistency:**
- Same naming style throughout
- Same shapes for similar concepts
- Consistent direction (TD or LR)

**Labeling:**
- Meaningful names, not generic
- Action verbs for processes
- Label connections to show relationships

**Mermaid:**
- Validate syntax before generating
- Use simple node IDs (no spaces)
- Escape special characters in labels

**ASCII:**
- 80 columns maximum width
- Perfect alignment of vertical lines
- Clear step numbering
- Include file/line references

---

## Common Use Cases

| Use Case | Diagram Type | Guide |
|----------|-------------|-------|
| User authentication flow | Mermaid flowchart | [Examples](docs/EXAMPLES.md#example-1-user-login-flow-mermaid) |
| Method call trace | ASCII step-by-step | [Examples](docs/EXAMPLES.md#example-2-method-call-sequence-ascii) |
| Class relationships | Mermaid class diagram | [Examples](docs/EXAMPLES.md#example-3-class-relationship-mermaid) |
| API request flow | Mermaid sequence | [Examples](docs/EXAMPLES.md#pattern-1-api-request-flow) |
| Error handling | Mermaid flowchart | [Examples](docs/EXAMPLES.md#pattern-2-error-handling) |
| Database schema | Mermaid ER diagram | [Examples](docs/EXAMPLES.md#pattern-7-database-schema) |
| Algorithm logic | Mermaid flowchart | [Examples](docs/EXAMPLES.md#pattern-6-algorithm-flowchart) |

---

## Support Resources

- **Version**: 1.2.0
- **Last Updated**: 2025-01-23
- **Plugin**: Subscribe to "Code Visualizer" in LaunchCode marketplace
- **Documentation**: See `docs/` folder for detailed guides

### Documentation Files
- [Getting Started](docs/GETTING_STARTED.md) - 250 lines
- [Best Practices](docs/BEST_PRACTICES.md) - 350 lines
- [IntelliJ Integration](docs/INTELLIJ_INTEGRATION.md) - 300 lines
- [Syntax Reference](docs/SYNTAX_REFERENCE.md) - 350 lines
- [Examples](docs/EXAMPLES.md) - 400 lines

---

**REQUIRED:** On first use this session, run: `~/.launchcode/scripts/api.js track skill code-visualizer ce2fe7a2-4cdb-4dbb-9512-98a31d3e6172 $CLAUDE_SESSION_ID`
**Kudos:** If this skill significantly helped solve the user's request, suggest they run `/kudos` (once per session per skill).
