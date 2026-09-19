---
name: stitch-ui-design-skill
description: Create effective prompts and iteration workflows for Google Stitch UI design. Use when generating or refining web and mobile interface concepts in Stitch; verify current Stitch capabilities before relying on a specific export or integration.
---

# Google Stitch UI Design Skill

A guide to generating high-quality UI designs by writing effective prompts in Google Stitch.

## What is Google Stitch?

An AI-powered UI design tool from Google Labs, powered by Gemini 2.5 Flash. It supports:

- Text prompt → UI design
- Image (sketch, wireframe, screenshot) → UI
- Multi-screen application flows
- HTML/CSS, Figma, and code export
- Iterative editing with annotations

---

## 1. Core Prompt Principles

### Be Specific and Detailed

```
❌ Weak: "Create a dashboard"

✅ Strong: "Member dashboard — grid of course modules, progress tracker,
and community feed sidebar. Purple theme with a card-based layout."
```

**Why**: Specify the components (modules, progress, feed), layout (grid, sidebar), visual style (purple, cards), and context (member dashboard).

### Always Define the Visual Style

- Color palette (primary, accent)
- Design style (minimalist, modern, glassmorphic, playful)
- Density (compact, spacious, balanced)

### List Multi-Screen Flows with Bullets

```
Fitness tracking application:
- Onboarding screen with goal selection
- Home dashboard with daily statistics and activity rings
- Exercise library with category filters
- Profile screen with achievements and settings
```

---

## 2. Prompt Template

```
[Screen/Component Type] — [User/Context]

Core Features:
- [Feature 1 — detailed]
- [Feature 2 — detailed]
- [Feature 3 — detailed]

Visual Style:
- [Color scheme]
- [Design aesthetic]
- [Layout approach]

Platform: [Mobile / Web / Responsive]
```

**Example**:

```
Admin dashboard for a SaaS analytics platform

Core Features:
- Top metric cards showing MRR, active users, and churn rate
- Line chart for revenue trends over the last 30 days
- Recent activity feed with user actions
- Quick-action buttons for reports and export

Visual Style:
- Dark mode with blue/purple gradient accents
- Modern glassmorphic cards with subtle shadows
- Clean data visualization with accessible colors

Platform: Desktop web (1440px priority)
```

---

## 3. Common Use Cases

### Landing Page

```
[Product name] SaaS landing page

Sections:
- Hero with title, subtitle, CTA, and product screen
- Social proof with customer logos
- Three-column feature grid with icons
- Testimonials carousel
- Three-tier pricing table
- FAQ accordion
- Footer with newsletter signup

Style: Modern, professional, trust-building
Colors: Navy blue primary, light blue accent
```

### Mobile Application

```
Food delivery application home screen

Components:
- Search bar with location selector
- Category chips (Pizza, Burger, Sushi, etc.)
- Restaurant cards with image, name, rating, delivery time, and price range
- Bottom navigation (Home, Search, Orders, Profile)

Style: Vibrant, appetizing, easy to scan
Platform: iOS mobile (375px)
```

### Form / Checkout

```
B2B platform multi-step registration form

Steps:
1. Account information (company name, email, password)
2. Company information (industry, size, role)
3. Team setup (invite members)
4. Verification with a confirmation message

Features:
- Progress indicator at the top
- Field validation with inline errors
- Next/Back navigation
- Skip option for step 3

Style: Minimal, focused, low-friction
```

---

## 4. Iteration Strategies

### Editing with Annotations

```
1. Create the initial design from a prompt
2. Annotate the elements that need to change
3. Describe the change in natural language
4. Stitch updates only the annotated area
```

### Creating Variants

```
Create three variants of this hero section:
1. Visual-focused with minimal text
2. Text-heavy with supporting graphics
3. Video background with overlay content
```

### Incremental Refinement

```
Initial: "E-commerce home page"
→ "Add a four-column product section with hover effects"
→ "Update with earth tones (terracotta, sage, cream) and a promotional banner at the top"
```

---

## 5. Design-to-Code Workflow

### Stitch → Figma → Code

1. Create the UI in Stitch with a detailed prompt
2. Export to Figma (design system integration)
3. Hand off to the developer with design specifications
4. Implement with production-ready code

### Stitch → HTML → Framework

1. Create and refine in Stitch
2. Export the HTML/CSS code
3. Convert it to React/Vue components
4. Integrate it into the application codebase

---

## 6. What to Avoid

```
❌ Weak: "Make a beautiful website"
✅ Strong: Specific sections, colors, and target audience

❌ Weak: "Create a login page"
✅ Strong: "Healthcare portal login — email/password, 'remember me',
'forgot password', and SSO options (Google, Microsoft).
Blue medical theme, professional and reassuring."

❌ No visual direction: "Design a task management application"
✅ Clear direction: "Kanban board, drag-and-drop, priority labels,
and due-date indicators. Purple/teal gradient with dark mode support."
```

---

## 7. Effective Usage Tips

1. **Use reference images** — Add a sketch, wireframe, or screenshot
2. **Use design terminology** — "hero section," "card layout," "glassmorphic," "bento grid"
3. **Specify interactions** — Hover states, click actions, transitions
4. **Think in components** — Break the design into header, card, and form parts
5. **Iterate in small steps** — Make focused changes instead of replacing the entire design
6. **Test responsiveness** — Check mobile, tablet, and desktop breakpoints
7. **Specify accessibility** — Contrast, font size, touch targets

---

## 8. Post-Export Tasks

Stitch is a starting point, not the final product:

- [ ] Correct semantic HTML tags
- [ ] Add ARIA labels and alt text
- [ ] Optimize images
- [ ] Add animations and micro-interactions
- [ ] Refactor to production code standards
- [ ] Verify responsive breakpoints
- [ ] Complete the accessibility checklist
