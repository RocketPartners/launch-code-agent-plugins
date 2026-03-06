# Reveal.js Reference

Complete reference for Reveal.js framework configuration, features, and customization options.

---

## Overview

Reveal.js is a powerful HTML presentation framework that enables professional presentations with keyboard navigation, touch support, and extensive customization. This guide covers the framework features used in technical presentations.

**Version:** 4.5.0 (via CDN)
**Official docs:** https://revealjs.com/

---

## Table of Contents

1. [Basic Setup](#basic-setup)
   - HTML structure
   - CDN links
   - Required configuration

2. [Navigation](#navigation)
   - Keyboard shortcuts
   - Slide structure
   - Vertical vs horizontal

3. [Configuration Options](#configuration-options)
   - Core settings
   - Display options
   - Behavior settings

4. [Syntax Highlighting](#syntax-highlighting)
   - Highlight.js integration
   - Language support
   - Theme selection

5. [Advanced Features](#advanced-features)
   - Fragments
   - Speaker notes
   - PDF export
   - Auto-slide

6. [Custom Styling](#custom-styling)
   - Theme customization
   - CSS overrides
   - Responsive design

---

## Basic Setup

### Complete HTML Structure

The minimal working Reveal.js presentation structure.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presentation Title</title>

    <!-- Reveal.js core CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.css">

    <!-- Theme - Black theme for dark background -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/black.css">

    <!-- Syntax highlighting - Monokai theme -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/monokai.css">

    <!-- Custom styles -->
    <style>
        /* Your custom CSS here */
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            <!-- Slides go here -->
            <section>
                <h1>Your Presentation</h1>
            </section>
        </div>
    </div>

    <!-- Reveal.js core JS -->
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.js"></script>

    <!-- Plugins -->
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/notes/notes.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/highlight.js"></script>

    <!-- Initialize Reveal.js -->
    <script>
        Reveal.initialize({
            hash: true,
            plugins: [ RevealHighlight, RevealNotes ]
        });
    </script>
</body>
</html>
```

**Key elements:**
- `<div class="reveal">` - Outer container
- `<div class="slides">` - Inner container for all slides
- `<section>` - Individual slides
- Nested `<section>` - Vertical slides

---

### CDN Links Reference

Complete list of CDN resources used.

```html
<!-- Core Reveal.js -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.css">
<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.js"></script>

<!-- Themes -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/black.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/white.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/league.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/beige.css">

<!-- Syntax Highlighting Themes -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/monokai.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/zenburn.css">

<!-- Plugins -->
<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/highlight.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/notes/notes.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/markdown/markdown.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/zoom/zoom.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/search/search.js"></script>
```

**Recommended for technical presentations:**
- Theme: `black.css` (good contrast, professional)
- Highlighting: `monokai.css` (excellent for code)
- Plugins: `highlight.js` and `notes.js` (minimum required)

---

## Navigation

### Keyboard Shortcuts

Essential keyboard controls for presenting.

| Key | Action |
|-----|--------|
| → or Space | Next slide (horizontal) |
| ← | Previous slide (horizontal) |
| ↓ | Next slide (vertical) |
| ↑ | Previous slide (vertical) |
| Home | First slide |
| End | Last slide |
| Esc or O | Overview mode (see all slides) |
| S | Speaker notes window |
| F | Fullscreen mode |
| B or . | Pause/blackout |
| ? | Help overlay |

**Best practices:**
- Use arrow keys during presentation
- Press `O` to see slide overview
- Press `S` to open speaker notes
- Press `B` to pause when answering questions

---

### Slide Structure

How slides are organized horizontally and vertically.

```html
<!-- Horizontal navigation: main topics -->
<section>
    <h2>Topic 1</h2>
</section>

<section>
    <h2>Topic 2</h2>
</section>

<!-- Vertical navigation: sub-topics -->
<section>
    <!-- Parent slide -->
    <section>
        <h2>Main Topic</h2>
        <p>Overview</p>
    </section>

    <!-- Child slide 1 -->
    <section>
        <h3>Sub-topic 1</h3>
        <p>Details</p>
    </section>

    <!-- Child slide 2 -->
    <section>
        <h3>Sub-topic 2</h3>
        <p>More details</p>
    </section>
</section>

<!-- Back to horizontal -->
<section>
    <h2>Next Main Topic</h2>
</section>
```

**Navigation flow:**
```
Topic 1 → Topic 2 → Main Topic → Next Main Topic
                         ↓
                    Sub-topic 1
                         ↓
                    Sub-topic 2
```

**When to use vertical slides:**
- Breaking down complex topics
- Step-by-step tutorials
- Before/after/result sequences
- Related examples or variations
- Deep dives into specific concepts

---

### Slide Data Attributes

Special attributes for slide behavior.

```html
<!-- Centered content -->
<section data-centered>
    <h1>Title Slide</h1>
</section>

<!-- Auto-animate between slides -->
<section data-auto-animate>
    <h3>Step 1</h3>
    <p>Initial state</p>
</section>

<section data-auto-animate>
    <h3>Step 2</h3>
    <p>Initial state</p>
    <p>Additional content appears smoothly</p>
</section>

<!-- Background color -->
<section data-background-color="#4d7e65">
    <h2>Slide with custom background</h2>
</section>

<!-- Background image -->
<section data-background-image="image.jpg" data-background-size="cover">
    <h2>Slide with image background</h2>
</section>

<!-- Transition style -->
<section data-transition="zoom">
    <h2>Zooms in when entering</h2>
</section>
```

**Commonly used attributes:**
- `data-centered` - Centers content vertically (custom CSS required)
- `data-auto-animate` - Smooth transitions between related slides
- `data-background-color` - Custom background color
- `data-transition` - Override global transition (fade, slide, convex, concave, zoom)

---

## Configuration Options

### Core Configuration

Essential Reveal.js initialization options.

```javascript
Reveal.initialize({
    // Display options
    width: 1920,                    // Presentation width in pixels
    height: 1080,                   // Presentation height in pixels
    margin: 0.04,                   // Space around content (4%)

    // Behavior
    hash: true,                     // Enable URL hash navigation
    history: true,                  // Push state to browser history
    keyboard: true,                 // Enable keyboard shortcuts
    overview: true,                 // Enable overview mode (ESC/O)
    center: true,                   // Vertical centering of slides
    touch: true,                    // Enable touch navigation
    loop: false,                    // Loop presentation (don't use for talks)
    rtl: false,                     // Right-to-left mode
    shuffle: false,                 // Randomize slide order (don't use)

    // Navigation
    controls: true,                 // Show navigation arrows
    controlsLayout: 'bottom-right', // Position of controls
    progress: true,                 // Show progress bar
    slideNumber: false,             // Show slide numbers
    showSlideNumber: 'all',         // When to show numbers

    // Transitions
    transition: 'slide',            // none/fade/slide/convex/concave/zoom
    transitionSpeed: 'default',     // default/fast/slow

    // Plugins
    plugins: [
        RevealHighlight,
        RevealNotes
    ]
});
```

**Recommended settings for technical presentations:**

```javascript
Reveal.initialize({
    hash: true,                     // Allow sharing specific slides
    center: false,                  // Don't auto-center (use data-centered)
    controls: true,                 // Helpful for mouse users
    progress: true,                 // Show progress
    slideNumber: false,             // Cleaner without numbers
    transition: 'slide',            // Professional transition
    plugins: [
        RevealHighlight,            // Required for code
        RevealNotes                 // Required for speaker notes
    ]
});
```

---

### Display Options

Control how presentations appear.

```javascript
Reveal.initialize({
    // Responsive sizing
    width: 1920,
    height: 1080,
    margin: 0.04,
    minScale: 0.2,                  // Min zoom (20%)
    maxScale: 2.0,                  // Max zoom (200%)

    // Display settings
    embedded: false,                // Is embedded in another page
    previewLinks: false,            // Open links in preview iframe
    hideInactiveCursor: true,       // Hide cursor when inactive
    hideCursorTime: 5000,           // Hide after 5 seconds

    // Background
    backgroundTransition: 'fade',   // Background transition style
    parallaxBackgroundImage: '',    // Parallax background image
    parallaxBackgroundSize: '',     // Image size (CSS syntax)

    // View distance
    viewDistance: 3,                // Number of slides away from current to preload
    mobileViewDistance: 2           // On mobile devices
});
```

**Typical settings:**
```javascript
Reveal.initialize({
    width: 1920,
    height: 1080,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 2.0,
    hideInactiveCursor: true,
    hideCursorTime: 5000
});
```

---

### Behavior Settings

Control presentation behavior.

```javascript
Reveal.initialize({
    // Auto-slide (use carefully)
    autoSlide: 0,                   // Milliseconds between slides (0 = off)
    autoSlideStoppable: true,       // Stop on user input
    autoSlideMethod: null,          // Navigation method

    // Mouse/touch
    mouseWheel: false,              // Navigate with mouse wheel
    touch: true,                    // Touch navigation
    touchStartThreshold: 20,        // Pixels before swipe registers

    // Fragments (animated content)
    fragments: true,                // Enable fragments
    fragmentInURL: true,            // Include fragment state in URL

    // Help overlay
    help: true,                     // Show help when ? pressed
    showNotes: false,               // Show notes to all viewers

    // Focus
    focusBodyOnPageVisibilityChange: true
});
```

**Best practices:**
```javascript
Reveal.initialize({
    autoSlide: 0,                   // Don't auto-advance
    mouseWheel: false,              // Prevent accidental scroll
    touch: true,                    // Enable touch on tablets
    fragments: true,                // Allow step-by-step reveals
    help: true                      // Show help overlay
});
```

---

## Syntax Highlighting

### Highlight.js Integration

Reveal.js uses Highlight.js for code syntax highlighting.

**Basic usage:**

```html
<pre><code class="language-java" data-trim>
public class Example {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
</code></pre>
```

**Key attributes:**
- `class="language-XXX"` - Specifies the language
- `data-trim` - Removes leading/trailing whitespace
- `data-line-numbers` - Show line numbers
- `data-ln-start-from` - Start line numbers from specific number

---

### Language Support

Supported languages for syntax highlighting.

**Common languages:**

| Language | Class Name |
|----------|------------|
| Java | `language-java` |
| JavaScript | `language-javascript` or `language-js` |
| Python | `language-python` or `language-py` |
| YAML | `language-yaml` |
| JSON | `language-json` |
| XML | `language-xml` |
| HTML | `language-html` |
| CSS | `language-css` |
| SQL | `language-sql` |
| Bash/Shell | `language-bash` or `language-shell` |
| Dockerfile | `language-dockerfile` |
| Groovy | `language-groovy` |
| Kotlin | `language-kotlin` |
| TypeScript | `language-typescript` or `language-ts` |
| Markdown | `language-markdown` or `language-md` |

**Always specify the language** for proper highlighting.

---

### Line Numbers and Highlighting

Advanced code display features.

```html
<!-- Show line numbers -->
<pre><code class="language-java" data-trim data-line-numbers>
public class Example {
    private String name;

    public Example(String name) {
        this.name = name;
    }
}
</code></pre>

<!-- Highlight specific lines -->
<pre><code class="language-java" data-trim data-line-numbers="4-6">
public class Example {
    private String name;

    public Example(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
</code></pre>

<!-- Start line numbers from specific line -->
<pre><code class="language-java" data-trim data-line-numbers data-ln-start-from="15">
public void processData() {
    // This will show as line 15
}
</code></pre>

<!-- Multiple highlight ranges -->
<pre><code class="language-java" data-trim data-line-numbers="1,3-5,8">
// Line 1 highlighted
// Line 2 normal
// Lines 3-5 highlighted
// Lines 6-7 normal
// Line 8 highlighted
</code></pre>
```

**When to use line numbers:**
- Long code blocks where line references help
- Teaching code review or debugging
- Referencing specific lines in discussion

**When to skip line numbers:**
- Short examples (under 10 lines)
- Conceptual examples
- When line numbers add visual clutter

---

### Highlight Themes

Available syntax highlighting themes.

**Dark themes (recommended for technical presentations):**

```html
<!-- Monokai - excellent contrast, most popular -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/monokai.css">

<!-- Zenburn - softer colors, easy on eyes -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/zenburn.css">
```

**Light themes:**

```html
<!-- GitHub style -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/github.css">

<!-- Base16 Light -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/base16/atelier-dune-light.css">
```

**Recommendation:** Use **Monokai** with Black theme for best visibility on projectors.

---

## Advanced Features

### Fragments

Reveal content step-by-step within a slide.

```html
<section>
    <h3>Progressive Reveal</h3>
    <p class="fragment">First, this appears</p>
    <p class="fragment">Then this</p>
    <p class="fragment">Finally this</p>
</section>

<!-- Fragment styles -->
<section>
    <h3>Fragment Styles</h3>
    <p class="fragment fade-in">Fade in</p>
    <p class="fragment fade-out">Fade out</p>
    <p class="fragment fade-up">Fade up</p>
    <p class="fragment fade-down">Fade down</p>
    <p class="fragment fade-left">Fade left</p>
    <p class="fragment fade-right">Fade right</p>
    <p class="fragment grow">Grow</p>
    <p class="fragment shrink">Shrink</p>
    <p class="fragment highlight-red">Highlight red</p>
    <p class="fragment highlight-blue">Highlight blue</p>
    <p class="fragment highlight-green">Highlight green</p>
</section>

<!-- Fragment order -->
<section>
    <h3>Custom Order</h3>
    <p class="fragment" data-fragment-index="3">Third</p>
    <p class="fragment" data-fragment-index="1">First</p>
    <p class="fragment" data-fragment-index="2">Second</p>
</section>

<!-- Fragment with code -->
<section>
    <h3>Step-by-Step Code</h3>
    <pre><code class="language-java" data-trim>
public class Example {
    <span class="fragment">private String name;</span>

    <span class="fragment">public Example(String name) {
        this.name = name;
    }</span>

    <span class="fragment">public String getName() {
        return name;
    }</span>
}
    </code></pre>
</section>
```

**When to use fragments:**
- Building complex concepts step-by-step
- Revealing code sections progressively
- Interactive demonstrations
- Emphasizing key points

**When to avoid:**
- Simple slides with few elements
- Code that should be read as a whole
- During fast-paced presentations

---

### Speaker Notes

Private notes visible only to presenter.

```html
<section>
    <h2>Slide Content</h2>
    <p>What audience sees</p>

    <aside class="notes">
        <p>These are speaker notes.</p>
        <ul>
            <li>Remember to mention example from last week</li>
            <li>Ask if anyone has questions before proceeding</li>
            <li>Time estimate: 3 minutes</li>
        </ul>
    </aside>
</section>
```

**Using speaker notes:**
1. Add notes inside `<aside class="notes">` tags
2. Press `S` during presentation to open notes window
3. Notes window shows current slide, next slide, timer, and notes

**Speaker notes window shows:**
- Current slide
- Next slide preview
- All speaker notes
- Elapsed time
- Current time
- Slide progress

**Best practices:**
- Include talking points
- Add time estimates
- Note questions to ask audience
- Remind yourself of examples
- Link to related topics

---

### PDF Export

Generate PDF from presentation.

**Method 1: Using browser print (recommended):**

1. Open presentation in Chrome
2. Add `?print-pdf` to URL
   - Example: `file:///path/to/presentation.html?print-pdf`
3. Open print dialog (Ctrl+P or Cmd+P)
4. Choose "Save as PDF"
5. Settings:
   - Destination: Save as PDF
   - Layout: Landscape
   - Margins: None
   - Background graphics: Enabled
6. Save

**Method 2: Using decktape (CLI tool):**

```bash
# Install decktape
npm install -g decktape

# Export to PDF
decktape reveal presentation.html presentation.pdf

# With custom size
decktape reveal --size 1920x1080 presentation.html presentation.pdf
```

**Configuration for print:**

```css
@media print {
    .reveal pre code {
        font-size: 10pt;
        max-height: none;
    }

    .reveal .slides section {
        page-break-after: always;
    }
}
```

---

### Auto-Slide

Automatic slide progression (use carefully).

```javascript
Reveal.initialize({
    autoSlide: 5000,                // Advance every 5 seconds
    autoSlideStoppable: true,       // Stop on user interaction
    autoSlideMethod: Reveal.navigateNext
});
```

**Per-slide auto-slide:**

```html
<!-- Override timing for specific slide -->
<section data-autoslide="2000">
    <h2>Advances after 2 seconds</h2>
</section>

<!-- Disable auto-slide for specific slide -->
<section data-autoslide="0">
    <h2>Stays here until manual advance</h2>
</section>
```

**When to use auto-slide:**
- Kiosk mode presentations
- Trade show displays
- Unattended demonstrations
- Timed competitions

**When NOT to use:**
- Live presentations (too rigid)
- Code-heavy content (needs time to read)
- Interactive sessions
- Q&A sections

---

## Custom Styling

### Theme Customization

Override default theme with custom CSS.

```html
<style>
    /* Override base code font size */
    .reveal pre code {
        font-size: 0.55em;
        line-height: 1.3;
        max-height: none;
    }

    /* Medium code size */
    .reveal .medium-code pre code {
        font-size: 0.58em;
    }

    /* Small code size */
    .reveal .small-code pre code {
        font-size: 0.50em;
    }

    /* Compact slide for overflow */
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

    /* Centered content */
    .reveal section[data-centered] {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 100%;
    }

    /* Remove maximum height on code blocks */
    .reveal pre {
        width: 100%;
        max-height: none;
    }

    /* Better list spacing */
    .reveal ul, .reveal ol {
        margin: 20px 0;
    }

    .reveal li {
        margin: 10px 0;
    }

    /* Improve table styling */
    .reveal table {
        margin: 20px auto;
        border-collapse: collapse;
    }

    .reveal table th,
    .reveal table td {
        padding: 10px 15px;
        border: 1px solid #555;
    }

    .reveal table th {
        background-color: #333;
        font-weight: bold;
    }
</style>
```

---

### Responsive Design

Adjust styles for different screen sizes.

```css
/* Large screens (projectors) */
@media (min-width: 1920px) {
    .reveal pre code {
        font-size: 0.55em;
    }
}

/* Medium screens (laptops) */
@media (min-width: 1280px) and (max-width: 1919px) {
    .reveal pre code {
        font-size: 0.50em;
    }
}

/* Small screens (tablets) */
@media (max-width: 1279px) {
    .reveal pre code {
        font-size: 0.45em;
    }

    .reveal h1 {
        font-size: 2em;
    }

    .reveal h2 {
        font-size: 1.4em;
    }
}

/* Print */
@media print {
    .reveal pre code {
        font-size: 10pt;
    }

    .reveal .slides section {
        page-break-after: always;
        page-break-inside: avoid;
    }

    .reveal pre {
        page-break-inside: avoid;
    }
}
```

---

### Custom Classes Reference

Useful custom classes to include in presentations.

```css
/* Font sizes */
.reveal .medium-code pre code { font-size: 0.58em; }
.reveal .small-code pre code { font-size: 0.50em; }
.reveal .compact-slide { font-size: 0.85em; }
.reveal .compact-slide pre code { font-size: 0.48em; }

/* Visual elements */
.reveal .highlight-box {
    background-color: #3a3a00;
    border-left: 5px solid #f0db4f;
    padding: 15px;
    margin: 20px 0;
}

/* Layout */
.reveal .two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.reveal .three-column {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
}

/* Centering */
.reveal section[data-centered] {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
}

/* Text utilities */
.reveal .text-left { text-align: left; }
.reveal .text-center { text-align: center; }
.reveal .text-right { text-align: right; }

/* Spacing */
.reveal .mt-20 { margin-top: 20px; }
.reveal .mb-20 { margin-bottom: 20px; }
.reveal .pt-20 { padding-top: 20px; }
.reveal .pb-20 { padding-bottom: 20px; }
```

---

## Complete Initialization Example

Production-ready Reveal.js initialization.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Technical Presentation</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/black.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/monokai.css">

    <style>
        .reveal pre code {
            font-size: 0.55em;
            line-height: 1.3;
            max-height: none;
        }

        .reveal .medium-code pre code {
            font-size: 0.58em;
        }

        .reveal .small-code pre code {
            font-size: 0.50em;
        }

        .reveal .compact-slide {
            font-size: 0.85em;
        }

        .reveal .compact-slide pre code {
            font-size: 0.48em;
        }

        .reveal .highlight-box {
            background-color: #3a3a00;
            border-left: 5px solid #f0db4f;
            padding: 15px;
            margin: 20px 0;
        }

        .reveal section[data-centered] {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 100%;
        }

        .reveal pre {
            width: 100%;
            max-height: none;
        }
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            <!-- Your slides here -->
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/notes/notes.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/highlight.js"></script>

    <script>
        Reveal.initialize({
            // Display
            width: 1920,
            height: 1080,
            margin: 0.04,
            minScale: 0.2,
            maxScale: 2.0,

            // Behavior
            hash: true,
            center: false,
            controls: true,
            progress: true,
            slideNumber: false,
            transition: 'slide',
            transitionSpeed: 'default',

            // Interaction
            touch: true,
            mouseWheel: false,
            hideInactiveCursor: true,
            hideCursorTime: 5000,

            // Fragments
            fragments: true,
            fragmentInURL: true,

            // Help
            help: true,

            // Plugins
            plugins: [
                RevealHighlight,
                RevealNotes
            ]
        });
    </script>
</body>
</html>
```

---

## Troubleshooting

### Common Issues

**Code not highlighting:**
- Check language class is specified: `class="language-java"`
- Verify highlight.js plugin loaded: `<script src=".../highlight.js"></script>`
- Ensure plugin initialized: `plugins: [RevealHighlight]`
- Check for HTML escaping: `<` should be `&lt;`

**Content overflowing:**
- Use smaller font class: `medium-code`, `small-code`, `compact-slide`
- Split into vertical slides (preferred)
- Check for hidden scrollbars

**Slides not advancing:**
- Check JavaScript console for errors
- Verify Reveal.js initialized: `Reveal.initialize({ ... })`
- Check slide structure: proper `<section>` tags
- Test keyboard (arrow keys should work)

**Speaker notes not showing:**
- Press `S` to open notes window
- Check notes plugin loaded: `<script src=".../notes.js"></script>`
- Ensure plugin initialized: `plugins: [RevealNotes]`
- Verify `<aside class="notes">` tags

**PDF export issues:**
- Use Chrome browser
- Add `?print-pdf` to URL
- Enable background graphics in print settings
- Check margins set to None

---

## Quick Reference

### Essential Configuration

```javascript
Reveal.initialize({
    hash: true,
    center: false,
    controls: true,
    progress: true,
    transition: 'slide',
    plugins: [RevealHighlight, RevealNotes]
});
```

### Essential CSS

```css
.reveal pre code { font-size: 0.55em; line-height: 1.3; max-height: none; }
.reveal .medium-code pre code { font-size: 0.58em; }
.reveal .small-code pre code { font-size: 0.50em; }
.reveal .compact-slide { font-size: 0.85em; }
.reveal .compact-slide pre code { font-size: 0.48em; }
.reveal .highlight-box { background: #3a3a00; border-left: 5px solid #f0db4f; padding: 15px; }
.reveal section[data-centered] { display: flex; justify-content: center; align-items: center; height: 100%; }
```

### Essential Keyboard Shortcuts

- `→` Next slide (horizontal)
- `↓` Next slide (vertical)
- `O` Overview mode
- `S` Speaker notes
- `F` Fullscreen
- `?` Help

---

## Related Documentation

- [Getting Started Guide](GETTING_STARTED.md) - **Framework setup walkthrough**
- [Slide Templates](SLIDE_TEMPLATES.md) - **Copy-paste slide patterns**
- [Styling Guide](STYLING_GUIDE.md) - **Font sizes and visual rules**
- [Common Patterns](COMMON_PATTERNS.md) - **Docker, Spring Boot examples**
- [SKILL.md](../SKILL.md) - **Main navigation hub**
