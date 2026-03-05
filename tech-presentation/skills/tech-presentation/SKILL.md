---
name: tech-presentation
description: Creates professional HTML presentations using Reveal.js for technical topics, optimized for big screen display. Specializes in Java, Spring Boot, testing, Docker, and cloud technologies with real-world code examples.
---

# Technical Presentation Builder


**When to use:** User asks to create an HTML presentation for a technical topic, wants to present about software engineering concepts, or requests a Reveal.js presentation.

**What this skill does:** Creates professional HTML presentations using Reveal.js optimized for big screen display with real-world code examples.

---

## Quick Navigation

### Getting Started
- [Getting Started Guide](docs/GETTING_STARTED.md) - Framework setup, page structure, file organization
- [Styling Guide](docs/STYLING_GUIDE.md) - Font sizes, visual elements, critical styling rules

### Creating Content
- [Content Creation Guide](docs/CONTENT_CREATION.md) - Code examples, progression strategy, technology focus
- [Slide Templates](docs/SLIDE_TEMPLATES.md) - Common slide patterns with copy-paste examples

### Advanced Topics
- [Common Patterns](docs/COMMON_PATTERNS.md) - Docker, Spring Boot, AWS, testing patterns
- [Reveal.js Reference](docs/REVEALJS_REFERENCE.md) - Complete framework configuration and features

---

## When to Use Each Document

| Scenario | Document |
|----------|----------|
| First time creating a presentation | [GETTING_STARTED.md](docs/GETTING_STARTED.md) |
| Content doesn't fit on slides | [STYLING_GUIDE.md](docs/STYLING_GUIDE.md) |
| Need code examples and structure | [CONTENT_CREATION.md](docs/CONTENT_CREATION.md) |
| Looking for slide layouts | [SLIDE_TEMPLATES.md](docs/SLIDE_TEMPLATES.md) |
| Creating Docker/test content | [COMMON_PATTERNS.md](docs/COMMON_PATTERNS.md) |
| Deep Reveal.js customization | [REVEALJS_REFERENCE.md](docs/REVEALJS_REFERENCE.md) |

---

## Critical Success Factors

Based on production presentation experience, these are the most critical rules:

### 1. Big Screen Optimization
❌ **Wrong:** Default font sizes (too small for audience)
✅ **Correct:** Base code at 0.55em, medium at 0.58em

Text must be visible from far away in large rooms.

### 2. No Scrolling Ever
❌ **Wrong:** Adding `overflow-y: auto` to slides
✅ **Correct:** Split into vertical slides or use `compact-slide` class

Scrolling breaks presentation flow and looks unprofessional.

### 3. Valid HTML/XML Escaping
❌ **Wrong:** `List<String>` and `&` in code
✅ **Correct:** `List&lt;String&gt;` and `&amp;`

Invalid HTML breaks syntax highlighting and rendering.

### 4. Real Code Over Generic Examples
❌ **Wrong:** Placeholder code like `// TODO: implement`
✅ **Correct:** Complete examples from actual projects

Real code is more engaging and educational.

### 5. Progressive Complexity
❌ **Wrong:** Starting with advanced concepts
✅ **Correct:** Simple concepts first, building to complex

Entry-level to mid-level engineers need learning progression.

### 6. Complete Code Examples
❌ **Wrong:** Code snippets without imports or context
✅ **Correct:** Full test classes with all annotations

Incomplete examples confuse and frustrate learners.

### 7. Gradle Not Maven
❌ **Wrong:** Maven plugins and pom.xml examples
✅ **Correct:** Gradle syntax or tool-agnostic approach

User preference based on project standards.

### 8. Proper Syntax Highlighting
❌ **Wrong:** Generic `<code>` tags without language
✅ **Correct:** `<code class="language-java">` with proper language tag

Syntax highlighting improves readability dramatically.

### 9. Vertical Navigation for Related Topics
❌ **Wrong:** All slides at same horizontal level
✅ **Correct:** Use vertical slides (nested sections) for sub-topics

Improves organization and navigation flow.

### 10. No Emojis Unless Requested
❌ **Wrong:** Adding 🚀 ✨ 🎉 to content
✅ **Correct:** Professional technical content only

Keep presentations professional by default.

---

## Critical Pitfalls & Solutions

Based on converting multiple presentations to v2.0.0 standards, these are the 8 most common issues and their solutions:

### Pitfall 1: Content Overflow (Most Common)

**Symptoms:** Content extends below the visible slide area, text gets cut off

**Common Causes:**
- Multiple separate boxes (info-box, success-box) taking too much vertical space
- Long intro paragraphs before diagrams or code
- Code examples with default font sizes
- Benefits sections with too many bullet points

**Solutions:**
```css
/* Apply aggressive compact styling */
.reveal .compact-slide {
    font-size: 0.75em;  /* Not 0.8em - go smaller */
}

/* Use small-code for longer examples */
.reveal .small-code pre code {
    font-size: 0.70em;  /* Instead of 0.80em base */
}
```

**Content strategies:**
- **Consolidate boxes:** Convert 3-4 separate boxes into ONE box with bulleted list
- **Remove intro text:** Delete paragraphs before diagrams/SVGs
- **Shorten descriptions:** "Least privilege IAM policies" instead of "Implement least privilege with IAM policies"
- **Convert boxes to paragraphs:** Use `<p>` instead of boxes when content is 1-2 lines
- **Split dense slides:** Create 2 slides instead of cramming everything

**Example fix:**
```html
<!-- BEFORE: Overflow -->
<div class="info-box">
    <strong>1. Business Intelligence:</strong>
    <p>Power dashboards with fast queries.</p>
</div>
<div class="info-box">
    <strong>2. Data Lake:</strong>
    <p>Query S3 with Spectrum.</p>
</div>

<!-- AFTER: Fits perfectly -->
<div class="success-box">
    <ul>
        <li><strong>Business Intelligence:</strong> Power dashboards</li>
        <li><strong>Data Lake:</strong> Query S3 with Spectrum</li>
    </ul>
</div>
```

### Pitfall 2: Diagram/SVG Overflow

**Symptoms:** SVG diagrams extend below visible area

**Solutions:**
```css
/* Add max-height constraints */
.diagram-container svg {
    max-height: 350px;  /* For compact slides */
}

/* Reduce container padding */
.reveal .compact-slide .diagram-container {
    padding: 8px;
    margin: 8px 0;
}
```

**Content strategies:**
- Remove intro paragraphs above diagrams
- Convert info boxes below diagrams to simple `<p>` tags
- Use smaller font for diagram labels if possible

### Pitfall 3: Centering Doesn't Work

**Symptoms:** Content sticks to top of slide despite `data-centered` attribute

**Root Cause:** Custom flex/div wrappers interfere with Reveal.js's built-in centering

**Solutions:**
```javascript
// Enable Reveal.js centering
Reveal.initialize({
    center: true,  // NOT false!
});

// Apply selective positioning
Reveal.on('ready', () => {
    document.querySelectorAll('section:not([data-centered])').forEach(section => {
        section.style.justifyContent = 'flex-start';
    });
});
```

```html
<!-- WRONG: Custom wrapper interferes -->
<section data-centered>
    <div style="display: flex; flex-direction: column;">
        <h1>Title</h1>
    </div>
</section>

<!-- CORRECT: Simple structure -->
<section data-centered>
    <h1>Title</h1>
    <p>Content</p>
</section>
```

**Visual balance tip:** Consider left-aligning grids/badges while keeping text centered:
```html
<div class="solid-grid" style="margin-left: 0; max-width: 100%;">
    <!-- Badges left-aligned look better than centered -->
</div>
```

### Pitfall 4: Code Boxes for Non-Code Content

**Symptoms:** Flow diagrams, architectural visualizations, or text-based diagrams look weird in code boxes with poor contrast

**Common mistake:**
Using code boxes (`<pre><code>`) for flow diagrams or architectural representations just because they contain arrows or structured text.

**Why it fails:**
- Poor visual contrast (dark background, monospace font)
- Arrows (→ ←) hard to read in code styling
- Not actual code, confuses the purpose
- Doesn't match presentation visual style

**Solution:**
```html
<!-- WRONG: Flow diagram in code box -->
<div class="medium-code">
<pre><code class="language-plaintext">
// Flow Example
Client Request → Controller → Service → Repository → Database
              ← Response ← Result ← Data ← Query Result
</code></pre>
</div>

<!-- CORRECT: Use colored box with centered text -->
<div class="info-box">
    <p style="text-align: center; margin: 0;">
        <strong>Request Flow:</strong><br>
        Client → Controller → Service → Repository → Database<br>
        Client ← Controller ← Service ← Repository ← Database
    </p>
</div>
```

**Best practice:**
- **Code boxes:** Only for actual code (Java, YAML, SQL, Bash, etc.)
- **Flow diagrams:** Use info-box or success-box with centered text
- **Architecture visualizations:** Use colored boxes with proper formatting
- **Text-based diagrams:** Standard boxes, not code boxes

### Pitfall 5: Wrong Code Font Sizes

**Symptoms:** Code too small to read OR code overflows slide

**Lessons learned:**
- **0.80em base** - Good default for most code examples
- **0.85em medium** - Short snippets (3-10 lines)
- **0.70em small** - Longer examples (15-30 lines)
- **0.60em compact** - Dense code in compact slides only

**Wrong approach:**
```html
<!-- All code same size regardless of length -->
<pre><code class="language-java">
// 40 lines of code at 0.80em = OVERFLOW
</code></pre>
```

**Correct approach:**
```html
<!-- Adjust size based on code length -->
<div class="small-code">
<pre><code class="language-java">
// 25 lines of code at 0.70em = FITS
</code></pre>
</div>
```

### Pitfall 6: Not Following v2.0.0 Standards

**Common violations encountered:**

1. **Emojis everywhere** ❌
   - Original: "🚀 Key Features", "✨ Benefits", "⚠️ Problems"
   - Fixed: "Key Features", "Benefits", "Problems"

2. **Custom box formats**
   - Original: Custom gradients, shadows, animations
   - Fixed: Standard info-box, success-box, danger-box, highlight-box only

3. **Wrong text colors in boxes**
   - Original: Yellow text on yellow background (unreadable)
   - Fixed: `color: #000 !important` for ALL box content

4. **Missing HTML escaping**
   - Original: `&&` in code, `<T>` in generics
   - Fixed: `&amp;&amp;`, `&lt;T&gt;`

### Pitfall 7: Benefits/Problems Sections Too Long

**Symptoms:** Lists with 6-8 bullet points cause overflow

**Solutions:**
- **Limit to 4-5 bullets maximum**
- **Shorten each bullet to one line**
- **Remove explanatory text** - just the key point

**Example fix:**
```html
<!-- BEFORE: Too verbose -->
<ul>
    <li><strong>Maintainability:</strong> Makes code easier to understand and modify over time</li>
    <li><strong>Testability:</strong> Allows components to be tested independently</li>
    <li><strong>Flexibility:</strong> Makes it easy to extend functionality</li>
    <li><strong>Scalability:</strong> Provides better architecture for application growth</li>
</ul>

<!-- AFTER: Concise -->
<ul>
    <li><strong>Maintainability:</strong> Easier to understand</li>
    <li><strong>Testability:</strong> Test independently</li>
    <li><strong>Flexibility:</strong> Easy to extend</li>
    <li><strong>Scalability:</strong> Better architecture</li>
</ul>
```

### Pitfall 8: Tables in Compact Slides

**Symptoms:** Comparison tables with 5+ rows overflow

**Solutions:**
```css
/* Make tables more compact */
.reveal .compact-slide .comparison-table {
    font-size: 0.75em;  /* Smaller text */
}

.reveal .compact-slide .comparison-table th {
    padding: 8px;  /* Reduce padding */
}

.reveal .compact-slide .comparison-table td {
    padding: 6px;
}
```

**Content strategies:**
- Limit tables to 5 rows maximum in compact slides
- Use abbreviations in table cells
- Consider splitting into 2 slides if >5 rows

### Quick Diagnosis Guide

**If content overflows:**
1. ✅ Apply `compact-slide` class (font-size: 0.75em)
2. ✅ Consolidate multiple boxes into one bulleted list
3. ✅ Change code to `small-code` class (0.70em)
4. ✅ Remove intro paragraphs
5. ✅ Shorten all bullet point text
6. ✅ Convert boxes to simple paragraphs when <3 lines
7. ✅ As last resort: Split into 2 slides

**If centering doesn't work:**
1. ✅ Remove custom div wrappers
2. ✅ Set Reveal.js `center: true`
3. ✅ Use simple HTML structure
4. ✅ Apply selective positioning to non-centered slides

**If code is wrong size:**
1. ✅ Count lines: <15 = medium (0.85em), 15-25 = small (0.70em), >25 = split slide
2. ✅ Apply appropriate class wrapper
3. ✅ Test on actual presentation screen

---

## Quick Start Checklist

Before creating a presentation, gather:

- [ ] **Topic and scope** - What technical concept to cover
- [ ] **Target audience** - Entry-level, mid-level, or senior engineers
- [ ] **Technologies** - Java, Spring Boot, Docker, AWS, testing frameworks, etc.
- [ ] **Code examples** - Paths to real project files for examples
- [ ] **Presentation length** - How many sections/slides needed

During creation, verify:

- [ ] Valid HTML5 DOCTYPE and structure
- [ ] Reveal.js 4.5.0 CDN links included
- [ ] Monokai theme for syntax highlighting
- [ ] Font sizes appropriate for big screens
- [ ] All special characters escaped (`&amp;`, `&lt;`, `&gt;`)
- [ ] Code blocks have proper language tags
- [ ] No content overflow (split or use compact-slide)
- [ ] Title slide with `data-centered`
- [ ] Table of contents included
- [ ] Section title slides with `data-centered`
- [ ] Vertical slides for related sub-topics
- [ ] Summary section with key takeaways
- [ ] Questions slide at end
- [ ] All code examples are complete and runnable
- [ ] Progression from simple to complex
- [ ] Real-world code examples when available

---

## Technology Focus Areas

### Primary Technologies
- **Java & Spring Boot** - Core focus for enterprise applications
- **Testing Frameworks** - JUnit 5, Mockito, Spring Boot Test
- **Containers** - Docker, Docker Compose, Testcontainers
- **Build Tools** - Gradle (preferred over Maven)

### Testing & Mocking
- **AWS Mocking** - LocalStack for S3, SQS, SNS
- **HTTP Mocking** - WireMock with Testcontainers
- **Message Queues** - RabbitMQ with SSL/TLS configuration
- **Database Testing** - Test slices and test containers

### Best Practices
- Complete test class examples with imports
- Configuration file examples (docker-compose.yml, application.yml)
- Integration test patterns (@SpringBootTest, @DynamicPropertySource)
- Real project references when paths provided

---

## Content Preferences

### Target Audience
Entry-level to mid-level software engineers who benefit from:
- Simple concept introduction
- Progressive learning path
- Real-world practical examples
- Complete code with explanations

### Progression Strategy
1. Start with foundational concepts
2. Show simple examples first
3. Build complexity gradually
4. End with real-world scenarios
5. Include practical takeaways

### Code Example Philosophy
- **Real over generic** - Use actual project code when available
- **Complete over snippet** - Full classes, not fragments
- **Commented over bare** - Explain what's happening
- **Practical over theoretical** - Show real use cases

---

## File Organization

### Recommended Project Structure
```
presentation-project/
├── presentation.html          # Main presentation file (all-in-one)
├── images/                    # Optional: diagrams, screenshots
└── examples/                  # Optional: external code files
```

### Single-File Approach
All content in one HTML file for easy sharing:
- No dependencies on local files
- CDN links for all libraries
- Embedded CSS styles
- Copy and open in browser

---

## Workflow Summary

### 1. Understand Requirements
- Ask about topic, audience, technologies
- Request paths to real code examples
- Clarify any specific company practices

### 2. Gather Real Examples
- Read configuration files (docker-compose, application.yml)
- Read test classes and setup code
- Review integration test patterns
- Check CI/CD configurations

### 3. Create Structure
- Build table of contents
- Plan section organization
- Design learning progression

### 4. Generate Content
- Follow slide templates
- Use real code examples
- Apply proper styling
- Escape special characters

### 5. Validate
- Check HTML validity
- Verify font sizes
- Test for content overflow
- Confirm syntax highlighting
- Review code completeness

### 6. Iterate
- Adjust based on feedback
- Fix any overflow issues
- Add missing examples
- Refine organization

---

## Integration with User's Work

When user provides project context:
- **Read real files** - Use actual code instead of generic examples
- **Follow patterns** - Match user's coding standards
- **Include configs** - Show real docker-compose.yml, application.yml
- **Reference docs** - Integrate Confluence documentation when provided
- **Maintain consistency** - Use project's naming conventions

Example projects to reference:
- LiftCheck inventory processor
- Spring Boot microservices
- AWS LocalStack setups
- RabbitMQ SSL/TLS configurations
- Integration test patterns

---

## Common Presentation Topics

### Well-Suited Topics
- Unit and Integration Testing in Spring Boot
- Docker and Containerization for Testing
- Microservices Architecture Patterns
- CI/CD Pipeline Design
- Cloud Technologies (AWS, LocalStack)
- Testing Best Practices
- Spring Framework Deep Dives
- Database Integration Testing
- Message Queue Integration
- API Mocking Strategies

### Topic Development
Each topic should include:
- Clear learning objectives
- Progressive examples
- Real-world applications
- Common pitfalls
- Best practices
- Key takeaways

---

## Error Prevention

### Most Common Issues

1. **Unescaped characters**
   - `&` → `&amp;` in headings and content
   - `<T>` → `&lt;T&gt;` in generic types
   - `->` → `-&gt;` in lambda expressions

2. **Content overflow**
   - Split into multiple vertical slides (preferred)
   - Use `compact-slide` class as fallback
   - Never add custom scrolling

3. **Incomplete code examples**
   - Always include imports
   - Show all annotations
   - Include class structure
   - Add explanatory comments

4. **Wrong build tool**
   - Use Gradle syntax
   - Avoid Maven-specific content
   - Be tool-agnostic when possible

5. **Missing syntax highlighting**
   - Always specify language: `language-java`, `language-yaml`, etc.
   - Include highlight.js CDN and Monokai theme
   - Test that highlighting renders correctly

---

## Related Documentation

- [Getting Started Guide](docs/GETTING_STARTED.md) - **Start here for your first presentation**
- [Styling Guide](docs/STYLING_GUIDE.md) - **Critical rules for big screen visibility**
- [Content Creation Guide](docs/CONTENT_CREATION.md) - **How to structure and write content**
- [Slide Templates](docs/SLIDE_TEMPLATES.md) - **Copy-paste patterns for common slides**
- [Common Patterns](docs/COMMON_PATTERNS.md) - **Docker, Spring Boot, AWS examples**

---

**Target audience:** Entry-level to mid-level software engineers
**Specializes in:** Java, Spring Boot, testing, Docker, AWS, cloud technologies
**Output format:** Single HTML file with Reveal.js for maximum portability
