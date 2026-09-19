---
name: office-to-markdown
description: Convert Word, Excel, PowerPoint, PDF, and related files to Markdown with Microsoft's MarkItDown library. Use for text extraction, version control, archiving, or RAG preparation when layout fidelity is not the primary output; verify the installed MarkItDown version and conversion options.
---

# Office → Markdown (markitdown)

A guide to converting Office files to Markdown with Microsoft's open-source `markitdown` library.

---

## 1. Installation

```bash
pip install markitdown          # Basic
pip install markitdown[all]     # Includes image OCR and audio transcription
```

---

## 2. Supported Formats

| Format     | Extension  | Notes                             |
| ---------- | ---------- | --------------------------------- |
| Word       | .docx      | Text, tables, basic formatting    |
| Excel      | .xlsx      | Sheets → Markdown tables          |
| PowerPoint | .pptx      | Slides → Sections                 |
| PDF        | .pdf       | Text extraction                   |
| HTML       | .html      | Clean Markdown                    |
| Image      | .jpg, .png | OCR with an LLM (optional)        |
| ZIP        | .zip       | Processes contained files         |

---

## 3. Basic Usage

```python
from markitdown import MarkItDown
from pathlib import Path

md = MarkItDown()

# Convert a single file
result = md.convert("report.docx")
print(result.text_content)

# Save to a file
Path("report.md").write_text(result.text_content, encoding='utf-8')
```

### With the CLI

```bash
markitdown report.docx > report.md
markitdown report.docx -o report.md
```

---

## 4. Format Examples

### Word Output

```markdown
# Annual Report 2024

## Executive Summary

This report summarizes the key achievements...

### Key Metrics

| Metric  | 2023 | 2024 | Change |
| ------- | ---- | ---- | ------ |
| Revenue | ₺10M | ₺12M | +20%   |
```

### PowerPoint Output

Each slide becomes a section, and speaker notes are included.

```markdown
# Slide 1: Company Overview

Our mission is...

## Key Points

- Innovation comes first
- Customer focus

---

# Slide 2: Market Analysis
```

---

## 5. AI Integration for Images

If the installed MarkItDown version supports it, image descriptions can be added by configuring the multimodal provider approved by the project. The provider client and model name vary by version; check the official API for the installed version. Before sending visual content to an external provider, verify privacy, data residency, and cost requirements.

---

## 6. Batch Conversion

```python
from markitdown import MarkItDown
from pathlib import Path

def batch_convert(input_dir: str, output_dir: str) -> None:
    md = MarkItDown()
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)

    extensions = ['.docx', '.xlsx', '.pptx', '.pdf']
    errors = []

    for ext in extensions:
        for file in input_path.glob(f'*{ext}'):
            try:
                result = md.convert(str(file))
                out_file = output_path / f"{file.stem}.md"
                out_file.write_text(result.text_content, encoding='utf-8')
                print(f"✓ {file.name}")
            except Exception as e:
                errors.append((file.name, str(e)))
                print(f"✗ {file.name}: {e}")

    if errors:
        print(f"\n{len(errors)} errors occurred:")
        for name, err in errors:
            print(f"  - {name}: {err}")


batch_convert('./documents', './markdown')
```

---

## 7. Archiving with Metadata

```python
from datetime import datetime
from markitdown import MarkItDown
from pathlib import Path

def archive_with_metadata(doc_path: str, archive_dir: str) -> str:
    md = MarkItDown()
    result = md.convert(doc_path)

    filename = Path(doc_path).name
    output = f"""---
converted: {datetime.now().strftime('%Y-%m-%d')}
---

{result.text_content}
"""

    out_path = Path(archive_dir) / Path(doc_path).stem
    out_path = out_path.with_suffix('.md')
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(output, encoding='utf-8')

    return str(out_path)
```

---

## 8. Creating a RAG / AI Corpus

```python
import json
from markitdown import MarkItDown
from pathlib import Path

def create_ai_corpus(doc_folder: str, output_file: str) -> list[dict]:
    md = MarkItDown()
    corpus = []

    for doc in Path(doc_folder).rglob('*'):
        if doc.suffix.lower() not in ['.docx', '.pdf', '.pptx', '.xlsx']:
            continue
        try:
            result = md.convert(str(doc))
            corpus.append({
                'source': str(doc),
                'filename': doc.name,
                'type': doc.suffix[1:],
                'content': result.text_content,
            })
        except Exception as e:
            print(f"Skipped {doc.name}: {e}")

    Path(output_file).write_text(
        json.dumps(corpus, ensure_ascii=False, indent=2),
        encoding='utf-8'
    )
    print(f"{len(corpus)} documents added to the corpus.")
    return corpus


create_ai_corpus('./company-documents', './corpus.json')
```

---

## 9. Limitations

Complex formatting may be simplified. Images are not embedded in Markdown (descriptions can be obtained with an LLM). Some table structures may not convert perfectly. Tracked changes and comments in Word are not preserved.

---

## 10. Best Practices

Perform quality control by comparing the converted Markdown with the source document. Enable LLM integration for important images. Add error tolerance with try-except for large batch operations. Add source and date metadata to archived documents. Put converted content under Git version control.
