---
name: nanobanana-skill
description: Generate or edit images with a locally installed Nano Banana-compatible tool or Google Gemini image API. Use only when the user explicitly requests this tool or provider; inspect the available command or SDK first and verify current model names and supported edit operations.
---

# Nano Banana Image Generation

Create or edit an image through the Nano Banana or Gemini image workflow actually available in the environment. Do not assume a `nanobanana.py` script, command-line flags, or model alias exists.

## Discover the Tool

Check for a project script, installed command, documented package, or existing provider integration. Read its help or current official documentation before constructing a command. Confirm required credentials without printing them.

If no compatible tool is installed, report the missing dependency or use another image workflow only when the user accepts that substitution.

## Prepare the Request

Capture:

- generation versus edit;
- target subject, composition, style, lighting, and mood;
- aspect ratio, resolution, file format, and transparency;
- text that must appear exactly;
- source images and which details must remain unchanged;
- output path and number of variants;
- brand, rights, privacy, and safety constraints.

For edits, inspect the source image before writing the edit prompt. Preserve identity, product geometry, logos, and other invariant details the user specifies.

## Execute Safely

Use the discovered interface exactly as documented. Avoid overwriting the source unless explicitly requested; write a new output by default. Do not expose API keys in commands, logs, or generated metadata. Record the chosen model and material parameters when reproducibility matters.

## Verify

Open the output and check dimensions, format, composition, requested edits, text rendering, artifacts, and preservation constraints. Regenerate or refine only based on observed differences. Clearly report if the tool cannot perform an exact edit or deterministic reproduction.
