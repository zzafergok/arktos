---
name: ui-ux-audit-specialist
description: Audit UI components and pages for accessibility, design system compliance, responsive design, UX writing quality, and performance. Use when asked to review, audit, or check any UI file, component, or page against platform standards.
---

# UI/UX Audit Specialist Skill

Audit UI components and pages in modern web applications against professional standards, accessibility rules, and design system compliance.

## When to use this skill

- When asked to "review this component"
- When performing a UI audit before a PR review
- When an accessibility audit is requested
- When checking design system compliance
- When evaluating UX copy quality
- When testing responsive behavior

## How to use it

- Always reason internally in English
- Always respond to the user in Turkish
- Do not add comment lines to code or configuration files
- Report findings in `file:line` format

---

## Audit Process

Audit the specified file(s) in this order:

1. **Design Token Compliance** — Are there any hardcoded values?
2. **Accessibility** — Are WCAG AA requirements met?
3. **Dark Mode Parity** — Has every token been tested in dark mode?
4. **Responsive** — Are all breakpoints covered?
5. **UX Writing** — Does the microcopy meet quality standards?
6. **Component Pattern** — Are CVA, compound components, and `asChild` used correctly?
7. **Performance** — Are there unnecessary re-renders or animation issues?
8. **TypeScript** — Are there `any` types or missing type annotations?

---

## Output Format

Report each finding in this format:

```
[R-RULE-NO] path/to/file:line_number
  ISSUE: Brief description
  CURRENT: Problematic code snippet
  EXPECTED: Corrected version
  PRIORITY: Critical | High | Medium | Low
```

**Priority Definitions**:

- **Critical**: Broken accessibility, completely broken dark mode, console error
- **High**: WCAG AA noncompliance, hardcoded color, generic error message
- **Medium**: Responsive gaps, UX copy quality, missing loading state
- **Low**: Minor token inconsistency, style improvement
