# Styling Guide

Critical styling rules and visual elements for creating presentations optimized for big screen display.

---

## Overview

Presentations must be visible from the back of large rooms. This guide covers font sizes, visual elements, and the critical rules that prevent common visibility and rendering issues.

**Golden Rule:** If you can't read it from 20 feet away, it's too small.

---

## Font Sizes for Big Screens

### Code Font Sizes

```css
/* Base code font size - default for all code blocks */
.reveal pre code {
    font-size: 0.55em;          /* Visible from back of room */
    line-height: 1.3;            /* Breathing room between lines */
    max-height: none;            /* No artificial height limits */
}

/* Medium code - most common, use for typical examples */
.reveal .medium-code pre code {
    font-size: 0.58em;           /* Slightly larger, still fits well */
}

/* Small code - for longer examples that need to fit */
.reveal .small-code pre code {
    font-size: 0.50em;           /* Smaller but still readable */
}

/* Compact slide - for content overflow situations */
.reveal .compact-slide {
    font-size: 0.85em;           /* Reduces all text on slide */
}

.reveal .compact-slide pre code {
    font-size: 0.48em;           /* Proportionally smaller code */
}
```

### When to Use Each Size

**Base (0.55em) - Default:**
- Most code examples
- 10-20 lines of code
- Standard complexity
- Use when in doubt

**Medium (0.58em) - Enhanced visibility:**
- Simple examples (5-10 lines)
- Important code to emphasize
- When extra clarity helps
- Demo code during live coding

**Small (0.50em) - Longer examples:**
- 20-30 lines of code
- Complete method implementations
- Configuration files
- Still readable, fits more

**Compact (0.48em) - Last resort:**
- 30+ lines that must stay together
- Already split once, still doesn't fit
- Complex examples that lose meaning if split
- Use sparingly, test visibility carefully

### Text Font Sizes (Default Reveal.js)

```css
/* Default Reveal.js sizes - generally good */
h1 { font-size: 2.5em; }        /* Title slides */
h2 { font-size: 1.6em; }        /* Section titles */
h3 { font-size: 1.3em; }        /* Content slide titles */
p, li { font-size: 1em; }       /* Body text */
```

**Don't modify these unless necessary.** Reveal.js defaults are well-tested for visibility.

---

## Visual Elements

### Highlight Boxes

Use for callouts, tips, warnings, and important information:

```css
.reveal .highlight-box {
    background-color: #3a3a00;        /* Dark yellow background */
    border-left: 5px solid #f0db4f;   /* Bright yellow accent */
    padding: 15px;                     /* Internal spacing */
    margin: 20px 0;                    /* Separation from other content */
}
```

**Usage example:**

```html
<section>
    <h3>Important Concept</h3>
    <div class="highlight-box">
        <p><strong>Key Point:</strong> Always escape special characters in XML/HTML.</p>
    </div>
    <ul>
        <li>Use &amp;amp; for &</li>
        <li>Use &amp;lt; for <</li>
        <li>Use &amp;gt; for ></li>
    </ul>
</section>
```

**When to use:**
- Critical information users might miss
- Common pitfalls and warnings
- Key takeaways on a slide
- Tips and best practices
- Security considerations

### Grid Layouts

For side-by-side comparisons or multi-column content:

```css
/* Two-column layout */
.reveal .two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

/* Three-column layout */
.reveal .three-column {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
}
```

**Usage example:**

```html
<section>
    <h3>Before vs After</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
            <p><strong>❌ Before</strong></p>
            <pre><code class="language-java" data-trim>
public void oldWay() {
    // Problematic code
}
            </code></pre>
        </div>
        <div>
            <p><strong>✅ After</strong></p>
            <pre><code class="language-java" data-trim>
public void newWay() {
    // Improved code
}
            </code></pre>
        </div>
    </div>
</section>
```

**When to use:**
- Before/after comparisons
- Multiple related examples
- Alternative approaches
- Test vs implementation code
- Different configuration options

### Color Scheme

Based on Reveal.js Black theme with Monokai highlighting:

```css
/* Standard colors - already provided by theme */
--background: #2b2b2b;           /* Dark background */
--text: #fff;                    /* Light text */
--heading: #fff;                 /* White headings */
--link: #42affa;                 /* Blue links */
--selection: #d33682;            /* Pink selection */
```

**Syntax highlighting (Monokai):**
- Keywords: `#f92672` (pink)
- Strings: `#e6db74` (yellow)
- Comments: `#75715e` (gray)
- Functions: `#a6e22e` (green)
- Numbers: `#ae81ff` (purple)

**Don't override these colors.** They provide excellent contrast and are professionally tested.

---

## Critical Rules

### Rule 1: No Scrolling - Ever

❌ **Wrong:**
```css
.reveal pre code {
    max-height: 500px;
    overflow-y: auto;
}
```

✅ **Correct:**
```html
<!-- Option 1: Split into vertical slides (preferred) -->
<section>
    <section>
        <h3>Complete Example - Part 1</h3>
        <pre><code class="language-java" data-trim>
// First half of code
        </code></pre>
    </section>

    <section>
        <h3>Complete Example - Part 2</h3>
        <pre><code class="language-java" data-trim>
// Second half of code
        </code></pre>
    </section>
</section>

<!-- Option 2: Use compact-slide class -->
<section class="compact-slide">
    <h3>Complete Example</h3>
    <pre><code class="language-java" data-trim>
// Full code with smaller font
    </code></pre>
</section>
```

**Why:** Scrolling breaks presentation flow, looks unprofessional, and confuses audiences who can't see scroll indicators.

### Rule 2: Valid HTML/XML Escaping

❌ **Wrong:**
```html
<h3>Working with List<String> & Arrays</h3>
<pre><code class="language-java" data-trim>
List<String> items = new ArrayList<>();
String name = "A & B Company";
boolean result = x > 5 && y < 10;
</code></pre>
```

✅ **Correct:**
```html
<h3>Working with List&lt;String&gt; &amp; Arrays</h3>
<pre><code class="language-java" data-trim>
List&lt;String&gt; items = new ArrayList&lt;&gt;();
String name = "A &amp; B Company";
boolean result = x &gt; 5 &amp;&amp; y &lt; 10;
</code></pre>
```

**Escape these characters:**
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;` (in attributes)
- `'` → `&#39;` (in attributes)

**Where to escape:**
- ✅ Inside `<h1>`, `<h2>`, `<h3>`, `<p>` tags
- ✅ Inside `<code>` blocks
- ✅ In list items `<li>`
- ✅ Anywhere in HTML content

**Why:** Invalid HTML breaks syntax highlighting and can cause rendering failures.

### Rule 3: Proper Syntax Highlighting

❌ **Wrong:**
```html
<pre><code>
public class Example {
    // No language specified
}
</code></pre>
```

✅ **Correct:**
```html
<pre><code class="language-java" data-trim>
public class Example {
    // Language specified, highlighting works
}
</code></pre>
```

**Common language tags:**
- `language-java` - Java code
- `language-yaml` - YAML configuration
- `language-bash` - Shell commands
- `language-json` - JSON data
- `language-xml` - XML documents
- `language-javascript` - JavaScript code
- `language-sql` - SQL queries
- `language-dockerfile` - Dockerfile
- `language-groovy` - Gradle build files

**data-trim attribute:**
- Removes leading/trailing whitespace
- Normalizes indentation
- Keeps code clean in HTML
- Always include it

### Rule 4: Centered Content Attribute

❌ **Wrong:**
```html
<section>
    <div style="text-align: center;">
        <h1>Title Slide</h1>
    </div>
</section>
```

✅ **Correct:**
```html
<section data-centered>
    <h1>Title Slide</h1>
</section>
```

**When to use:**
- Title slides
- Section title slides
- Questions slide
- Summary slide (optional)
- Any slide with minimal content

**Why:** More semantic, easier to maintain, consistent styling.

### Rule 5: Content Density

**Too sparse:**
```html
<section>
    <h3>Topic</h3>
    <p>One sentence.</p>
</section>
```

**Too dense:**
```html
<section>
    <h3>Topic</h3>
    <p>Paragraph 1 with lots of text...</p>
    <p>Paragraph 2 with even more text...</p>
    <ul>
        <li>Point 1 with long explanation...</li>
        <li>Point 2 with long explanation...</li>
        <li>Point 3 with long explanation...</li>
        <li>Point 4 with long explanation...</li>
        <li>Point 5 with long explanation...</li>
    </ul>
    <pre><code>...</code></pre>
</section>
```

**Just right:**
```html
<section>
    <h3>Topic</h3>
    <ul>
        <li>3-5 bullet points</li>
        <li>Each point concise</li>
        <li>Focus on key information</li>
    </ul>
    <div class="highlight-box">
        <p><strong>Key Takeaway:</strong> One sentence summary.</p>
    </div>
</section>
```

**Guidelines:**
- 3-5 bullet points per slide
- Each bullet one line or less
- One code example per slide
- Use vertical slides for more detail

---

## Slide Classes Reference

### Apply Size Classes

```html
<!-- Default size -->
<section>
    <pre><code class="language-java" data-trim>
    // Uses base 0.55em
    </code></pre>
</section>

<!-- Medium code -->
<section>
    <div class="medium-code">
    <pre><code class="language-java" data-trim>
    // Uses 0.58em
    </code></pre>
    </div>
</section>

<!-- Small code -->
<section>
    <div class="small-code">
    <pre><code class="language-java" data-trim>
    // Uses 0.50em
    </code></pre>
    </div>
</section>

<!-- Compact entire slide -->
<section class="compact-slide">
    <h3>Title is smaller too</h3>
    <p>All content on this slide is 0.85em</p>
    <pre><code class="language-java" data-trim>
    // Code is 0.48em
    </code></pre>
</section>
```

### Combining Classes

```html
<!-- Compact slide with small code -->
<section class="compact-slide">
    <h3>Dense Content</h3>
    <div class="small-code">
    <pre><code class="language-java" data-trim>
    // Even smaller for maximum fit
    </code></pre>
    </div>
</section>
```

**Note:** Usually not necessary. Use `compact-slide` alone first.

---

## Responsive Considerations

### Default Reveal.js Responsive Behavior

Reveal.js automatically handles:
- Scaling to different screen sizes
- Aspect ratio adjustments
- Mobile vs desktop layouts
- Print styling

**You don't need to add media queries for basic responsive behavior.**

### When to Add Custom Responsive Styles

Only if you have specific requirements:

```css
@media (max-width: 768px) {
    .reveal pre code {
        font-size: 0.45em;  /* Smaller on mobile */
    }
}

@media print {
    .reveal pre code {
        font-size: 10pt;    /* Fixed size for print */
    }
}
```

**Most presentations don't need this.** Focus on big screen visibility.

---

## Testing Visibility

### Big Screen Test Checklist

Before presenting:

- [ ] Test on actual projector or large monitor
- [ ] View from back of room (20+ feet away)
- [ ] Check smallest code font is readable
- [ ] Verify syntax highlighting visible
- [ ] Test in dim lighting conditions
- [ ] Check highlight boxes stand out
- [ ] Verify headings are prominent
- [ ] Test navigation is clear

### Common Visibility Issues

**Issue:** Code too small
**Fix:** Use larger font class or split into multiple slides

**Issue:** Low contrast
**Fix:** Use Monokai theme, don't override colors

**Issue:** Too much content
**Fix:** Split into vertical slides or use compact-slide

**Issue:** Poor lighting
**Fix:** Test in actual room conditions, adjust contrast if needed

---

## Quick Reference

### Font Size Decision Tree

```
Is it a code example?
├─ Yes: How many lines?
│  ├─ < 15 lines: Base (0.55em) or Medium (0.58em)
│  ├─ 15-25 lines: Base (0.55em) or Small (0.50em)
│  ├─ 25-35 lines: Small (0.50em) or split into vertical slides
│  └─ > 35 lines: Split into vertical slides (preferred) or Compact (0.48em)
└─ No: Use default Reveal.js sizes
```

### Content Overflow Decision Tree

```
Content doesn't fit on slide?
├─ Code example?
│  ├─ Can it be split logically?
│  │  └─ Yes: Split into vertical slides ✅ BEST
│  │  └─ No: Continue to next check
│  ├─ Already split once?
│  │  └─ Try small-code class (0.50em)
│  └─ Still doesn't fit?
│     └─ Use compact-slide (0.48em) ⚠️ LAST RESORT
└─ Text content?
   ├─ Remove unnecessary details
   ├─ Use bullet points instead of paragraphs
   └─ Split into multiple slides if needed
```

### Style Classes Quick Reference

```html
<!-- Font sizes -->
<div class="medium-code">      <!-- 0.58em -->
<div class="small-code">       <!-- 0.50em -->
<section class="compact-slide"> <!-- 0.85em text, 0.48em code -->

<!-- Visual elements -->
<div class="highlight-box">    <!-- Yellow callout box -->
<section data-centered>        <!-- Centered content -->

<!-- Layout -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
```

---

## Related Documentation

- [Getting Started Guide](GETTING_STARTED.md) - **Framework setup and structure**
- [Content Creation Guide](CONTENT_CREATION.md) - **What to write in your slides**
- [Slide Templates](SLIDE_TEMPLATES.md) - **Copy-paste patterns**
- [Common Patterns](COMMON_PATTERNS.md) - **Docker, Spring Boot examples**
- [SKILL.md](../SKILL.md) - **Main navigation hub**
