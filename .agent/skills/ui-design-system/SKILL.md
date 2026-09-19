---
name: ui-design-system
description: Create, evolve, or document a product design system with semantic tokens, accessible components, variants, governance, and developer handoff. Use when multiple interfaces need shared visual and interaction rules; do not trigger for a single isolated component unless it exposes a system-level gap.
---

# UI Design System

Build a design system that reduces repeated decisions and keeps product behavior coherent across teams and surfaces.

## Assess Before Expanding

Inventory existing tokens, components, duplicated patterns, accessibility behavior, and adoption constraints. Identify whether the real need is a new primitive, a variant, composition guidance, documentation, or cleanup of inconsistent usage.

Do not replace a working system solely to introduce a preferred naming scheme or library.

## Token Architecture

Use layers when they provide a real distinction:

1. primitive values such as palette steps, font families, and base spacing;
2. semantic roles such as `surface`, `text-muted`, `border-danger`, and `focus-ring`;
3. component tokens only for stable component-specific decisions.

Support themes by remapping semantic roles rather than duplicating component styles. Define units, naming, fallback behavior, and contrast requirements. Generate scales only when the inputs and algorithm are explicit; do not claim to have run a generator that is not available.

## Component Contracts

For each shared component, define:

- purpose and appropriate use;
- anatomy and content constraints;
- variants, sizes, and supported composition;
- interactive and validation states;
- keyboard and assistive-technology behavior;
- responsive and localization behavior;
- API, defaults, escape hatches, and deprecated patterns.

Prefer composable primitives over large components with many unrelated boolean props. Avoid exposing visual details that bypass tokens without a justified escape hatch.

## Governance and Migration

- Treat changes to shared tokens and component APIs as compatibility-sensitive.
- Document breaking changes and provide an incremental migration path.
- Validate components visually, behaviorally, and with accessibility checks.
- Measure adoption and remove obsolete paths only after consumers migrate.
- Keep design and code sources aligned; identify which one is authoritative for each artifact.

## Deliverable

Produce the requested tokens, components, documentation, or migration guidance. Include examples only where they clarify a contract or edge case. Verify representative consumers rather than considering an isolated story or screenshot sufficient.
