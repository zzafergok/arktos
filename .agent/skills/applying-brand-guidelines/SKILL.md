---
name: applying-brand-guidelines
description: Apply an existing brand system consistently to product UI, marketing pages, campaigns, documents, and other deliverables. Use when brand guidelines already exist and the task is adaptation, implementation, or compliance review; use brand-guidelines when the brand system itself must be created.
---

# Applying Brand Guidelines

Translate an existing brand system into a concrete deliverable without inventing unsupported rules or flattening the needs of the target medium.

## Workflow

1. Locate the current sources of truth: brand guide, design tokens, component library, approved assets, voice guide, and recent canonical examples.
2. Identify the deliverable, audience, channel, locale, technical constraints, and accessibility requirements.
3. Extract only the rules that affect the task. Separate explicit requirements from patterns inferred from examples.
4. Map brand rules to the target surface before editing:
   - identity: logo, marks, clear space, minimum size;
   - visual system: color roles, typography, spacing, imagery, iconography, motion;
   - verbal system: voice, tone, terminology, capitalization, calls to action;
   - implementation: tokens, components, breakpoints, file formats, platform constraints.
5. Reuse approved tokens, components, and assets where available. Preserve the host project's conventions unless the brand source explicitly supersedes them.
6. Adapt the expression to the channel while keeping the recognizable brand attributes. A mobile screen, email, slide, and social post need different compositions.
7. Verify the result against the source material and report unresolved conflicts or missing assets.

## Decision Rules

- Do not create a new brand direction when the request is to apply an existing one.
- Do not sample approximate colors, redraw logos, or substitute fonts when canonical assets or tokens are available.
- Treat accessibility as a delivery constraint. If an approved combination fails contrast or legibility, preserve brand intent and flag the conflict with an accessible alternative.
- Prefer semantic tokens such as `brand-primary` and `text-muted` over repeated literal values.
- Preserve required legal marks, attribution, trademark usage, and safe-area rules.
- Distinguish noncompliance from an intentional, documented channel adaptation.

## Verification

Check the final artifact at its real output size and relevant breakpoints. Confirm:

- approved assets and current variants are used;
- color and type roles match the brand system;
- spacing, imagery, icons, and motion feel consistent;
- copy matches the intended voice and locale;
- contrast, focus, text scaling, and reduced-motion behavior remain usable;
- no unsupported brand claims or invented rules were introduced.

Summarize what was applied, any justified deviations, and any missing source material that still needs a decision.
