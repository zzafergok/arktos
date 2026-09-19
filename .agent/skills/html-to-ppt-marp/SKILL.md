---
name: html-to-ppt-marp
description: Convert Markdown to PowerPoint, PDF, or HTML presentations using Marp. Use when creating slide decks from Markdown, building tech talks or product presentations, generating PPTX from structured content, or automating presentation creation. Supports themes, animations, speaker notes, two-column layouts, and Python/Node.js integration.
---

# Markdown → Presentation (Marp)

A guide to creating professional PPTX, PDF, and HTML presentations from Markdown with Marp.

---

## 1. Installation

```bash
npm install -g @marp-team/marp-cli   # Global CLI
# or
brew install marp-cli                 # macOS
```

---

## 2. Basic Structure

```markdown
---
marp: true
theme: default
paginate: true
---

# First Slide

Content goes here

---

# Second Slide

- Item 1
- Item 2
```

`---` separates slides. Frontmatter options:

```yaml
---
marp: true
theme: default # default | gaia | uncover
size: 16:9 # 4:3 | 16:9
paginate: true
header: 'Company Name'
footer: 'Confidential'
backgroundColor: '#fff'
---
```

---

## 3. CLI Usage

```bash
# PPTX
marp slides.md -o presentation.pptx

# PDF
marp slides.md -o presentation.pdf

# HTML
marp slides.md -o presentation.html

# With a specified theme
marp slides.md --theme gaia -o presentation.pptx

# Watch mode (development)
marp --watch slides.md
```

---

## 4. Theme Options

**Built-in themes:** `default` (clean, minimal), `gaia` (colorful, modern), `uncover` (bold, presentation-focused).

```markdown
<!-- Custom slide style with class -->
<!-- _class: lead -->        ← Centered title slide
<!-- _class: invert -->      ← Inverted colors
```

---

## 5. Animations (Fragments)

```html
<section>
  <p class="fragment">Appears first</p>
  <p class="fragment fade-up">Then this slides upward</p>
  <p class="fragment highlight-red">Highlighted</p>
</section>
```

Other styles: `fade-in`, `fade-out`, `fade-left`, `fade-right`, `strike`.

---

## 6. Two-Column Layout

```markdown
---
marp: true
style: |
  .cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
---

# Two Columns

<div class="cols">
<div>

## Left

- Item A
- Item B

</div>
<div>

## Right

- Item C
- Item D

</div>
</div>
```

---

## 7. Speaker Notes

```markdown
# Title

Content

<!-- Speaker note here. Press 'S' to view it. -->
```

---

## 8. Auto-Animate

Elements with the same `data-id` value are animated automatically between slides:

```html
<!-- Slide 1 -->
<div data-id="box" style="background: blue; padding: 20px;">Small</div>

<!-- Slide 2 -->
<div data-id="box" style="background: green; padding: 60px; width: 400px;">Large</div>
```

---

## 9. Python Integration

```python
import subprocess
import tempfile
import os
from pathlib import Path

def markdown_to_pptx(
    md_content: str,
    output_path: str,
    theme: str = 'gaia'
) -> str:
    if '---\nmarp: true' not in md_content:
        md_content = f"---\nmarp: true\ntheme: {theme}\npaginate: true\n---\n\n" + md_content

    with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False, encoding='utf-8') as f:
        f.write(md_content)
        temp_path = f.name

    try:
        subprocess.run(['marp', temp_path, '-o', output_path], check=True)
        return output_path
    finally:
        os.unlink(temp_path)


def create_presentation(title: str, slides: list[dict], output_path: str) -> str:
    md = f"""---
marp: true
theme: gaia
paginate: true
---

<!-- _class: lead -->

# {title}

---

"""
    for slide in slides:
        md += f"# {slide['title']}\n\n"
        for point in slide.get('points', []):
            md += f"- {point}\n"
        md += "\n---\n\n"

    md += "<!-- _class: lead -->\n\n# Thank You\n"
    return markdown_to_pptx(md, output_path)


# Usage
slides_data = [
    {'title': 'Problem', 'points': ['Manual process', 'High error rate', 'Time loss']},
    {'title': 'Solution', 'points': ['Automated analysis', '99% accuracy', 'Instant results']},
]

create_presentation('Product Launch', slides_data, 'presentation.pptx')
```

---

## 10. Technical Presentation Template

```markdown
---
marp: true
theme: night
paginate: true
---

<!-- _class: lead -->

# API Design Principles

Engineering Team — 2024

---

# Agenda

1. RESTful Design
2. Versioning
3. Error Handling
4. Examples

---

# Endpoint Design

| Method | URL     | Description |
| ------ | ------- | -------- |
| GET    | /cv     | List        |
| POST   | /cv     | Create      |
| GET    | /cv/:id | Details     |
| DELETE | /cv/:id | Delete      |

---

# Error Response

\`\`\`json
{
"error": "CV_NOT_FOUND",
"message": "The requested CV was not found",
"statusCode": 404
}
\`\`\`

---

<!-- _class: lead -->

# Questions?

api-support@example.com
```

---

## 11. Limitations

Marp does not support some PowerPoint features: complex transition animations, embedded video, audience interaction (polls, etc.), and tracked changes. If these features are required, use Google Slides or native PowerPoint.
