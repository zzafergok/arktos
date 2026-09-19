---
name: documents
description: Read, create, edit, convert, or validate office documents and PDFs when file structure, formatting, tables, pagination, or rendering fidelity matters. Use for DOCX, PDF, PPTX, and XLSX work; prefer the host environment's dedicated document tools when available.
---

# Documents

Produce or inspect the requested document while preserving content, structure, and layout appropriate to its format.

## Choose the Workflow

- **DOCX:** use a document library for structured editing and render the result for visual inspection when layout matters.
- **PDF:** extract text for analysis, but render pages when visual placement, forms, diagrams, or pagination matter.
- **PPTX:** preserve slide geometry, theme, speaker notes, and visual hierarchy; render slides to verify output.
- **XLSX:** preserve types, formulas, number formats, merged cells, validation, and workbook relationships; recalculate with an available spreadsheet engine when formula results matter.
- **Conversion:** inspect both source and output because format conversion can lose layout, embedded objects, comments, formulas, or accessibility metadata.

Use the host environment's installed skills, libraries, and rendering tools. Do not assume vendor-specific paths or bundled scripts exist.

## Preserve Intent

Before editing, identify the requested change, authoritative content, template or brand constraints, and whether tracked changes, comments, formulas, macros, forms, or signatures must survive. Avoid rebuilding a document from plain text when targeted edits can preserve more structure.

## Verification

Check the resulting file opens successfully and contains the expected content. When relevant, verify:

- page or slide count and order;
- headings, tables, images, links, headers, and footers;
- clipping, overlap, wrapping, font fallback, and pagination;
- formulas, references, filters, and displayed values;
- accessibility properties and reading order;
- metadata or sensitive content the user asked to remove.

Visual inspection is required for layout-sensitive output. Text extraction alone does not prove rendering fidelity.

## Completion

Provide the finished file and summarize material changes and validation performed. Report any unsupported feature or fidelity loss explicitly.
