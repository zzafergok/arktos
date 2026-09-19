---
name: html-slides-skill
description: Create interactive HTML presentations using reveal.js. Use when building slide decks, tech talks, product launch presentations, or any interactive HTML presentation. Generates self-contained HTML files with animations, code highlighting, speaker notes, and responsive layouts.
---

# HTML Slides Skill (reveal.js)

A guide to creating interactive, web-based presentations with reveal.js.

## When to use this skill

- When preparing slides for a technical presentation, conference talk, or product launch
- When a presentation with a code walkthrough is needed
- When speaker notes and a timed presentation are requested
- When creating a self-contained HTML presentation file

---

## 1. Basic Structure

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.css " />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/theme/black.css " />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/plugin/highlight/monokai.css " />
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <section>Slide 1</section>
        <section>Slide 2</section>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.js "></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/plugin/highlight/highlight.js "></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/plugin/notes/notes.js "></script>
    <script>
      Reveal.initialize({
        hash: true,
        plugins: [RevealHighlight, RevealNotes],
      })
    </script>
  </body>
</html>
```

---

## 2. Slide Structures

### Horizontal and Vertical Slides

```html
<!-- Horizontal slides -->
<section>Slide 1</section>
<section>Slide 2</section>

<!-- Vertical slides (nested) -->
<section>
  <section>Vertical 1</section>
  <section>Vertical 2</section>
</section>

<!-- Markdown slide -->
<section data-markdown>
  <textarea data-template>
    ## Title
    - Item 1
    - Item 2
  </textarea>
</section>
```

### Theme Options

`black`, `white`, `league`, `beige`, `sky`, `night`, `serif`, `simple`, `solarized`, `blood`, `moon`

```html
<link rel="stylesheet" href="reveal.js/dist/theme/moon.css" />
```

---

## 3. Animations (Fragments)

```html
<section>
  <p class="fragment">Appears first</p>
  <p class="fragment fade-in">Then this</p>
  <p class="fragment fade-up">Then this</p>
  <p class="fragment highlight-red">Highlighted</p>
</section>
```

Fragment styles: `fade-in`, `fade-out`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `highlight-red`, `highlight-blue`, `highlight-green`, `strike`

---

## 4. Code Block

```html
<section>
  <pre><code data-trim data-line-numbers="1|3-4">
const user = {
  name: 'Zafer',
  occupation: 'Developer'
};
console.log(user.name);
  </code></pre>
</section>
```

---

## 5. Speaker Notes

```html
<section>
  <h2>Title</h2>
  <p>Content</p>
  <aside class="notes">Speaker notes. Press 'S' to view them.</aside>
</section>
```

---

## 6. Background Options

```html
<!-- Color background -->
<section data-background-color="#4d7e65">
  <!-- Gradient background -->
  <section data-background-gradient="linear-gradient(to bottom, #283b95, #17b2c3)">
    <!-- Image background -->
    <section data-background-image="image.jpg" data-background-size="cover">
      <!-- Video background -->
      <section data-background-video="video.mp4"></section>
    </section>
  </section>
</section>
```

---

## 7. Configuration

```javascript
Reveal.initialize({
  controls: true,
  progress: true,
  slideNumber: true,
  hash: true,
  history: true,
  keyboard: true,
  overview: true,
  center: true,
  touch: true,
  transition: 'slide', // none, fade, slide, convex, concave, zoom
  transitionSpeed: 'default', // default, fast, slow
  autoSlide: 0, // 0 = disabled
  width: 960,
  height: 700,
  margin: 0.04,
  plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
})
```

---

## 8. Ready-to-Use Example — Technical Presentation

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>API Design</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.css " />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/theme/night.css " />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/plugin/highlight/monokai.css " />
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <section data-background-gradient="linear-gradient(to bottom right, #1a1a2e, #16213e)">
          <h1>API Design</h1>
          <h3>2025 Best Practices</h3>
          <p><small>Development Team</small></p>
        </section>

        <section>
          <h2>Agenda</h2>
          <ol>
            <li class="fragment">RESTful Principles</li>
            <li class="fragment">Authentication</li>
            <li class="fragment">Error Handling</li>
            <li class="fragment">Documentation</li>
          </ol>
        </section>

        <section>
          <section>
            <h2>RESTful Principles</h2>
          </section>
          <section>
            <h3>Resource Naming</h3>
            <pre><code data-trim class="language-http">
GET    /users           # Collection
GET    /users/123       # Single resource
POST   /users           # Create
PUT    /users/123       # Update
DELETE /users/123       # Delete
          </code></pre>
          </section>
        </section>

        <section>
          <h2>Questions?</h2>
          <p>api-team@company.com</p>
          <aside class="notes">Ten minutes are reserved for questions.</aside>
        </section>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.js "></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/plugin/highlight/highlight.js "></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/plugin/notes/notes.js "></script>
    <script>
      Reveal.initialize({ hash: true, plugins: [RevealHighlight, RevealNotes] })
    </script>
  </body>
</html>
```

---

## 9. Auto-Animate

```html
<section data-auto-animate>
  <h2>Our Solution</h2>
  <div data-id="box" style="background: #3182ce; padding: 20px;">AI-Powered Automation</div>
</section>

<section data-auto-animate>
  <h2>Our Solution</h2>
  <div data-id="box" style="background: #38a169; padding: 40px; width: 400px;">
    <p>AI-Powered Automation</p>
    <p>90% faster</p>
  </div>
</section>
```

---

## 10. Resources

- Official Documentation: https://revealjs.com/
- Demo: https://revealjs.com/demo/
- GitHub: https://github.com/hakimel/reveal.js
