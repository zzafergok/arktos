---
name: figma-implement-skill
description: Translate Figma designs into production-ready code with 1:1 visual fidelity using the Figma MCP workflow. Use when given Figma URLs or node IDs, or asked to implement designs that must match Figma specs. Requires a working Figma MCP server connection.
---

# Figma Implement Skill

A guide to converting Figma designs into pixel-perfect code using the Figma MCP Server.

## When to use this skill

- When a Figma URL or node ID is provided
- When asked to "implement this Figma design"
- When a design-to-code fidelity check is needed

**Requirement**: The Figma MCP Server connection must be active.

---

## 1. Extracting a Node ID from a URL

```
https://figma.com/design/ :fileKey/:fileName?node-id=1-2

fileKey: The segment after /design/ in the URL
nodeId:  The value of the node-id parameter (1-2)
```

**Example:**

```
https://figma.com/design/kL9xQn2VwM8pYrTb4ZcHjF/DesignSystem?node-id=42-15
→ fileKey: kL9xQn2VwM8pYrTb4ZcHjF
→ nodeId:  42-15
```

---

## 2. Required Steps (Order Must Not Change)

### Step 1 — Get Design Context

```
get_design_context(fileKey=":fileKey", nodeId="1-2")
```

Layout, typography, color, spacing, and component structure come from this context.

**If the response is too large:**

```
get_metadata(fileKey=":fileKey", nodeId="1-2")
→ Identify child nodes
→ Make a separate get_design_context call for each major section
```

### Step 2 — Get a Screenshot

```
get_screenshot(fileKey=":fileKey", nodeId="1-2")
```

Use this screenshot as the visual reference throughout implementation.

### Step 3 — Download Assets

- Use the assets with `localhost` URLs returned by Figma MCP directly
- Do not add a new icon package — assets come from the Figma payload
- Do not use placeholders — use the `localhost` source when available

### Step 4 — Adapt to Project Conventions

Figma output (usually React + Tailwind) represents the design, not the final code style.

```
Do:
✅ Use project tokens (semantic colors, spacing)
✅ Reuse existing components
✅ Apply the project's routing and state patterns

Do not:
❌ Copy Tailwind classes directly (the project may use a different system)
❌ Hardcode colors — use design tokens
❌ Rebuild buttons, inputs, or cards when existing components are available
```

### Step 5 — Achieve 1:1 Visual Parity

Pre-delivery checklist:

- [ ] Layout matches (spacing, alignment, sizing)
- [ ] Typography matches (font, size, weight, line-height)
- [ ] Colors match exactly
- [ ] Interactive states work (hover, active, disabled)
- [ ] Responsive behavior follows Figma constraints
- [ ] Assets render correctly
- [ ] Accessibility standards are met

---

## 3. Common Issues

### Figma output is truncated

```
→ Inspect the node structure with get_metadata
→ Call get_design_context separately for each major section
```

### Design does not match

```
→ Compare it with the screenshot from Step 2
→ Check the spacing, color, and typography values in the design context
```

### Asset does not load

```
→ Check whether the Figma MCP assets endpoint is accessible
→ Use localhost URLs directly; do not modify them
```

### Design token mismatch

```
→ Prefer project tokens over Figma values
→ Make only minimal spacing and sizing adjustments for visual fidelity
```

---

## 4. Using the Desktop App (figma-desktop MCP)

If the Figma desktop app is open and a node is selected, no URL is required:

```
get_design_context(nodeId="selected-node-id")
```

This works only with the `figma-desktop` MCP. Remote MCP requires a URL.

---

## 5. Principle Summary

```
Figma output = Representation of the design
Project code = Reality of the application

Design system first:
→ Extend existing components; do not rewrite them
→ The project's token system takes precedence over Figma values
→ Figma determines how each page should look
→ Project conventions determine how it should be coded
```
