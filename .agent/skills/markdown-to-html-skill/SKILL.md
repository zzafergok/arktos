---
name: markdown-to-html-skill
description: Convert Markdown files to HTML using marked.js, pandoc, gomarkdown, or static site generators (Jekyll, Hugo). Use when converting .md files to HTML, building static sites from Markdown, or implementing template systems that process Markdown content.
---

# Markdown to HTML Skill

A comprehensive guide to converting Markdown documents to HTML with marked.js, pandoc, gomarkdown, Jekyll, and Hugo.

## When to use this skill

- To convert a `.md` file to HTML
- To set up a static site (Jekyll, Hugo) or develop a template
- When creating a blog, documentation site, or content site
- When writing a custom Markdown-to-HTML conversion script

---

## 1. Basic Conversion Reference

```markdown
# Heading 1 → <h1>Heading 1</h1>

## Heading 2 → <h2>Heading 2</h2>

[link](https://x.com) → <a href="https://x.com ">link</a>
`code` → <code>code</code>
**bold** → <strong>bold</strong>
_italic_ → <em>italic</em>

- item 1 → <ul><li>item 1</li></ul>

1. item 1 → <ol><li>item 1</li></ol>
```

### Table

```markdown
| Name | Value |
| --- | ----- |
| A   | 1     |
```

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
```

### Code Block

````markdown
```js
console.log('hello')
```
````

````

```html
<pre><code class="language-js">
console.log("hello");
</code></pre>
````

---

## 2. marked.js (Node.js)

### Installation

```bash
npm install -g marked      # CLI
npm install marked         # Programmatic
```

### CLI Usage

```bash
# Convert a file
marked -i input.md -o output.html

# Standalone HTML (includes head/body)
marked -i input.md -o output.html --gfm

# With a configuration file
marked -i input.md -o output.html -c config.json
```

### CLI Options

| Option     | Description              |
| ---------- | ------------------------ |
| `-i`       | Input file               |
| `-o`       | Output file              |
| `--gfm`    | GitHub Flavored Markdown |
| `--breaks` | Newline → `<br>`         |

### Programmatic Usage

```javascript
const { marked } = require('marked')

const markdown = '# Hello\nThis is **markdown**.'
const html = marked.parse(markdown)
console.log(html)
// <h1>Hello</h1><p>This is <strong>markdown</strong>.</p>
```

### Security (Important)

marked.js does **not** sanitize HTML. For untrusted input:

```javascript
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const unsafeHtml = marked.parse(untrustedMarkdown)
const safeHtml = DOMPurify.sanitize(unsafeHtml)
```

---

## 3. Pandoc

### Installation

https://pandoc.org/installing.html — download for your operating system

### Basic Usage

```bash
# Markdown → HTML
pandoc input.md -o output.html

# Standalone (includes head/body)
pandoc input.md -s -o output.html

# With an explicit format
pandoc input.md -f markdown -t html -s -o output.html

# HTML → Markdown
pandoc -f html -t markdown input.html -o output.md

# Markdown → PDF (requires LaTeX)
pandoc input.md -s -o output.pdf

# Markdown → Word
pandoc input.md -s -o output.docx
```

### Pandoc Options

| Option      | Description                         |
| ----------- | ----------------------------------- |
| `-f`        | Input format                        |
| `-t`        | Output format                       |
| `-s`        | Standalone (head/body)              |
| `--mathml`  | Math → MathML                       |
| `--toc`     | Table of contents                   |
| `--sandbox` | Safe mode (no external file access) |

---

## 4. Jekyll (Ruby Static Site)

### Installation

```bash
gem install jekyll bundler
jekyll new myblog
cd myblog
bundle exec jekyll serve
# http://localhost:4000
```

### Markdown Structure

```
_posts/
  2025-03-22-title.md      ← YYYY-MM-DD-slug.md format

_layouts/
  default.html             ← Main layout

_includes/
  header.html

index.md                   ← Home page
```

### Post Structure

```markdown
---
layout: default
title: 'Post Title'
date: 2025-03-22
tags: [react, nextjs]
---

# Content goes here
```

### Build and Deploy

```bash
bundle exec jekyll build              # Creates the _site/ directory
JEKYLL_ENV=production bundle exec jekyll build
bundle exec jekyll serve --livereload # Development with live reload
```

### Config (\_config.yml)

```yaml
markdown: kramdown
kramdown:
  input: GFM
  syntax_highlighter: rouge

exclude:
  - Gemfile
  - Gemfile.lock
```

---

## 5. Hugo (Go Static Site)

### Installation

https://gohugo.io/installation/

```bash
hugo new site mysite
cd mysite
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke  themes/ananke
echo "theme = 'ananke'" >> hugo.toml

hugo new content posts/first-post.md
hugo server -D   # Includes drafts
```

### Content Structure

```
content/
  posts/
    first-post.md

layouts/
  _default/
    single.html
    list.html
```

### Post Structure

```markdown
---
title: 'My First Post'
date: 2025-03-22T10:00:00+03:00
draft: false
tags: ['react', 'nextjs']
---

Content goes here.
```

### Build Commands

```bash
hugo                  # Creates the public/ directory
hugo --minify         # Minified output
hugo server -D        # Development server including drafts
```

### Hugo Config (hugo.toml)

```toml
[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = false  # Set to true for raw HTML
    [markup.goldmark.extensions]
      table = true
      strikethrough = true
      taskList = true
```

---

## 6. Comparison

| Tool       | Language | Speed     | Ease of Use        |
| ---------- | ------ | --------- | ------------------ |
| marked.js  | JS     | Fast      | ⭐⭐⭐⭐⭐         |
| pandoc     | Binary | Medium    | ⭐⭐⭐⭐           |
| Jekyll     | Ruby   | Medium    | ⭐⭐⭐             |
| Hugo       | Go     | Very fast | ⭐⭐⭐⭐           |
| gomarkdown | Go     | Very fast | ⭐⭐⭐             |

**Recommendation:**

- Fast conversion script → marked.js
- Broad format support → pandoc
- Blog/content site → Hugo (speed) or Jekyll (ecosystem)

---

## 7. Troubleshooting

| Problem                 | Solution                                       |
| ----------------------- | ---------------------------------------------- |
| Table does not render   | Enable `gfm: true` / the `table` extension     |
| No line breaks          | Add the `breaks: true` option                  |
| Raw HTML does not render | Hugo: `unsafe = true`; marked: enabled by default |
| XSS risk                | Sanitize with DOMPurify                        |
| Non-ASCII character issue | UTF-8 encoding, `chcp 65001` (Windows)       |
