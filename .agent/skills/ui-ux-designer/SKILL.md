---
name: ui-ux-designer
description: Design or improve responsive, accessible product interfaces and translate UX requirements into coherent layouts, components, states, and implementation guidance. Use for ordinary web or app UI design work; use ux-researcher-designer for research and ui-ux-audit-specialist for audit-only requests.
---

# UI/UX Designer

Create interfaces that help users complete their tasks clearly, efficiently, and accessibly while fitting the product's existing visual language.

## Start with Context

Inspect the product, design system, existing components, routes, content, and target platforms before proposing a direction. Establish:

- primary users and tasks;
- page or flow purpose;
- required content and actions;
- existing tokens and reusable components;
- responsive, localization, accessibility, and technical constraints;
- loading, empty, error, success, disabled, and permission states.

Ask only for missing information that would materially change the design. Otherwise, state reasonable assumptions and proceed.

## Design the Experience

1. Define the information hierarchy and primary action.
2. Arrange content in the order users need it, not the order the data model exposes it.
3. Choose familiar interaction patterns unless a novel pattern provides a clear benefit.
4. Make system status and consequences visible, especially for destructive or irreversible actions.
5. Reduce unnecessary choices and visual competition without hiding essential controls.
6. Design keyboard, touch, pointer, and assistive-technology behavior together.
7. Specify meaningful responsive changes rather than merely shrinking the desktop layout.

## Visual System

- Reuse existing tokens and components before introducing new variants.
- Use spacing, typography, color, and elevation to communicate hierarchy consistently.
- Preserve readable line lengths, sufficient contrast, and predictable alignment.
- Use motion to explain state or continuity; respect reduced-motion preferences.
- Keep decoration subordinate to comprehension and interaction.
- Ensure touch targets, focus states, labels, and error messages remain perceivable.

## Implementation Guidance

When code changes are requested, follow the repository's framework and conventions. Build reusable abstractions only when repetition or shared behavior justifies them. Preserve semantic HTML, progressive enhancement, and native control behavior where practical.

Avoid mock data or polished happy paths that conceal missing states. Validate with realistic content, long labels, narrow screens, zoom or text scaling, keyboard navigation, and failure conditions.

## Completion

Deliver the implemented interface or a design specification appropriate to the request. Explain important decisions, affected states, reuse of existing patterns, and any unresolved product choices. Do not present untested assumptions as research findings.
