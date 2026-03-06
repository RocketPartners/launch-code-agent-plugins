# Getting Started Guide

This guide covers the foundational setup for creating Reveal.js presentations optimized for technical content and big screen display.

---

## Overview

Reveal.js presentations are single HTML files that can be opened directly in a browser. They include:
- CDN-hosted libraries (no local dependencies)
- Embedded CSS styles
- Responsive layout for various screen sizes
- Keyboard and touch navigation

**Target:** Entry-level to mid-level software engineers
**Focus:** Java, Spring Boot, testing, Docker, AWS

---

## Framework Setup

### Required CDN Links

Include these in your HTML `<head>`:

```html
<!-- Reveal.js Core CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/black.min.css">

<!-- Monokai Syntax Highlighting -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/monokai.css">
```

Include these before closing `</body>`:

```html
<!-- Reveal.js Core JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/highlight.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/notes/notes.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/zoom/zoom.min.js"></script>

<!-- Initialize Reveal.js -->
<script>
    Reveal.initialize({
        hash: true,
        slideNumber: true,
        transition: 'slide',
        plugins: [ RevealHighlight, RevealNotes, RevealZoom ]
    });
</script>
```

### Why These Versions?

- **Reveal.js 4.5.0** - Stable, well-tested, widely supported
- **Monokai theme** - Excellent contrast for code on dark backgrounds
- **Black theme** - Professional appearance for technical presentations

---

## HTML5 Page Structure

### Complete Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Presentation Title</title>

    <!-- Reveal.js CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/black.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/monokai.css">

    <style>
        /* Custom styles here - see Styling Guide */
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            <!-- Title slide -->
            <section data-centered>
                <h1>Presentation Title</h1>
                <p>Subtitle or description</p>
            </section>

            <!-- Table of contents -->
            <section>
                <h2>Agenda</h2>
                <ol>
                    <li>First Section</li>
                    <li>Second Section</li>
                    <li>Third Section</li>
                </ol>
            </section>

            <!-- Content sections here -->

            <!-- Summary -->
            <section data-centered>
                <h2>Summary</h2>
                <ul>
                    <li>Key takeaway 1</li>
                    <li>Key takeaway 2</li>
                    <li>Key takeaway 3</li>
                </ul>
            </section>

            <!-- Questions slide -->
            <section data-centered>
                <h1>Questions?</h1>
            </section>
        </div>
    </div>

    <!-- Reveal.js scripts -->
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/highlight.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/notes/notes.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/zoom/zoom.min.js"></script>

    <script>
        Reveal.initialize({
            hash: true,
            slideNumber: true,
            transition: 'slide',
            plugins: [ RevealHighlight, RevealNotes, RevealZoom ]
        });
    </script>
</body>
</html>
```

### Key Structure Elements

1. **DOCTYPE and HTML5** - Ensures modern browser compatibility
2. **Meta tags** - Character set and viewport for responsive design
3. **Title tag** - Shows in browser tab
4. **CDN links** - No local file dependencies
5. **Custom styles** - Embedded in `<style>` tag
6. **Reveal containers** - `<div class="reveal">` and `<div class="slides">`
7. **Sections** - Each `<section>` is a slide
8. **Initialization script** - Configures Reveal.js behavior

---

## Content Organization

### Standard Slide Sequence

1. **Title Slide**
   - Main topic
   - Optional subtitle
   - Use `data-centered` attribute
   - First impression - keep it clean

2. **Table of Contents**
   - Numbered list of sections
   - Shows presentation structure
   - Helps audience follow along
   - Reference point for navigation

3. **Section Structure**
   - Section title slide (with `data-centered`)
   - Content slides (can be vertical)
   - Each section covers one major topic

4. **Summary Section**
   - Key takeaways
   - Bullet list format
   - Reinforces learning
   - Action items if applicable

5. **Questions Slide**
   - Final slide
   - Simple and clean
   - Use `data-centered`
   - Optional contact info

### Horizontal vs Vertical Navigation

**Horizontal (left/right arrows):**
- Major sections
- Different topics
- Linear progression

**Vertical (up/down arrows):**
- Related sub-topics
- Detailed exploration
- Alternative examples
- Progressive depth

```html
<!-- Horizontal section -->
<section>
    <!-- Main topic slide -->
    <section>
        <h2>Main Topic</h2>
        <p>Overview of this topic area</p>
    </section>

    <!-- Vertical sub-topic 1 -->
    <section>
        <h3>Sub-topic 1</h3>
        <p>Details about first aspect</p>
    </section>

    <!-- Vertical sub-topic 2 -->
    <section>
        <h3>Sub-topic 2</h3>
        <p>Details about second aspect</p>
    </section>
</section>

<!-- Next horizontal section -->
<section>
    <h2>Next Major Topic</h2>
</section>
```

---

## File Organization

### Single-File Approach (Recommended)

```
presentation-project/
└── presentation.html          # Everything in one file
```

**Advantages:**
- Easy to share (just one file)
- No dependency management
- Open directly in browser
- Email or upload anywhere

**When to use:** Most presentations, especially for sharing with others

### Multi-File Approach (Advanced)

```
presentation-project/
├── presentation.html          # Main HTML
├── css/
│   └── custom.css            # Custom styles
├── images/
│   ├── diagram1.png
│   └── screenshot.jpg
└── examples/
    └── complete-example.java
```

**Advantages:**
- Organized assets
- Reusable styles
- Better version control
- Team collaboration

**When to use:** Complex presentations with many images or when collaborating

**Note:** Single-file is preferred for portability. Only use multi-file if you have specific asset management needs.

---

## Essential Custom Styles

### Minimum Required Styles

Add these to your `<style>` tag:

```css
/* Base code font size for big screens */
.reveal pre code {
    font-size: 0.55em;
    line-height: 1.3;
    max-height: none;
}

/* Medium code - most common use case */
.reveal .medium-code pre code {
    font-size: 0.58em;
}

/* Small code - for longer examples */
.reveal .small-code pre code {
    font-size: 0.50em;
}

/* Compact slide - for content overflow */
.reveal .compact-slide {
    font-size: 0.85em;
}

.reveal .compact-slide pre code {
    font-size: 0.48em;
}

/* Highlight box for callouts */
.reveal .highlight-box {
    background-color: #3a3a00;
    border-left: 5px solid #f0db4f;
    padding: 15px;
    margin: 20px 0;
}

/* Centered content attribute */
.reveal section[data-centered] {
    text-align: center;
}
```

### Why These Sizes?

Based on real presentation experience:
- **0.55em base** - Visible from back of large room
- **0.58em medium** - Optimal for most code examples
- **0.50em small** - Fits longer examples without scrolling
- **0.48em compact** - Last resort for overflow content

**Critical:** Always test on big screen before presenting!

---

## Validation Checklist

Before considering a presentation complete:

### Structure Validation
- [ ] Valid HTML5 DOCTYPE
- [ ] All required CDN links present
- [ ] Reveal.js initialization script included
- [ ] `<div class="reveal">` and `<div class="slides">` containers
- [ ] Title slide with `data-centered`
- [ ] Table of contents included
- [ ] Summary section present
- [ ] Questions slide at end

### Content Validation
- [ ] All special characters escaped (`&amp;`, `&lt;`, `&gt;`)
- [ ] Code blocks have language tags (`language-java`, etc.)
- [ ] No content overflow (split or use compact-slide)
- [ ] Font sizes appropriate for big screens
- [ ] Syntax highlighting theme included (Monokai)

### Navigation Validation
- [ ] Sections organized logically
- [ ] Vertical slides used for related topics
- [ ] Clear progression from simple to complex
- [ ] Each section has title slide

---

## Testing Your Presentation

### Local Testing

1. **Save HTML file** - e.g., `presentation.html`
2. **Open in browser** - Double-click or drag to browser
3. **Test navigation**:
   - Right arrow: next slide
   - Left arrow: previous slide
   - Down arrow: vertical sub-slide
   - Up arrow: back to main slide
   - ESC: overview mode
4. **Check readability** - Stand back from screen
5. **Verify code highlighting** - All syntax colored correctly

### Big Screen Testing

Before the actual presentation:
- Test on projector or large monitor
- View from back of room
- Check font sizes are readable
- Verify no content overflow
- Test all navigation paths

### Common Issues

**Code not highlighting:**
- Check language tag is correct
- Verify Monokai CSS is loaded
- Ensure highlight.js plugin initialized

**Content overflows slide:**
- Split into vertical slides (preferred)
- Apply `compact-slide` class
- Reduce font size for that slide only

**Navigation not working:**
- Check Reveal.js script loaded
- Verify initialization code present
- Test in different browser

---

## Quick Reference

### Slide Types

```html
<!-- Title slide -->
<section data-centered>
    <h1>Title</h1>
</section>

<!-- Content slide -->
<section>
    <h3>Title</h3>
    <p>Content</p>
</section>

<!-- Code slide -->
<section>
    <h3>Code Example</h3>
    <pre><code class="language-java" data-trim>
// Code here
    </code></pre>
</section>

<!-- Vertical slides -->
<section>
    <section><h2>Main</h2></section>
    <section><h3>Sub 1</h3></section>
    <section><h3>Sub 2</h3></section>
</section>
```

### Navigation Shortcuts

- **→** Next slide (horizontal)
- **←** Previous slide (horizontal)
- **↓** Sub-slide (vertical)
- **↑** Parent slide (vertical)
- **ESC** Overview mode
- **S** Speaker notes
- **F** Fullscreen
- **B** or **.** Pause (blackout)

---

## Next Steps

Now that you understand the basic setup:

- **[Styling Guide](STYLING_GUIDE.md)** - Learn critical styling rules for big screens
- **[Content Creation Guide](CONTENT_CREATION.md)** - How to structure and write technical content
- **[Slide Templates](SLIDE_TEMPLATES.md)** - Copy-paste patterns for common slides
- **[Common Patterns](COMMON_PATTERNS.md)** - Docker, Spring Boot, AWS examples
- **[Reveal.js Reference](REVEALJS_REFERENCE.md)** - Deep dive into framework features

---

## Related Documentation

- [SKILL.md](../SKILL.md) - **Main navigation hub and overview**
- [Styling Guide](STYLING_GUIDE.md) - **Critical rules for visibility**
- [Slide Templates](SLIDE_TEMPLATES.md) - **Ready-to-use slide patterns**
- [Content Creation Guide](CONTENT_CREATION.md) - **Writing effective content**
