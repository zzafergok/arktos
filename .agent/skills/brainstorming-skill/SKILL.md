---
name: brainstorming-skill
description: Explore an idea through structured collaborative dialogue, alternatives, tradeoffs, and decision framing. Use when the user explicitly asks to brainstorm, compare approaches, shape a concept, or reduce uncertainty before design or implementation; do not delay a clear execution request with mandatory ideation.
---

# Brainstorming Skill

A methodology for turning ideas into fully developed designs and specifications through natural dialogue. It should be used before any implementation.

## When to use this skill

- Before developing a new feature or component
- When evaluating alternatives for an architectural decision
- When designing a user flow or UX
- Before solving a complex problem without first exploring the solution space
- When the scope needs clarification

---

## 1. Process

### Phase 1 — Understand the Idea

```
1. Check the current project state (files, recent changes)
2. Ask questions — ONE question at a time
3. Prefer multiple-choice questions over open-ended questions
4. Focus on the goal, constraints, and success criteria
```

**Questions to ask:**

- What is this for? Who will use it?
- How will success be measured?
- Are there hard constraints? (technical, time, budget)
- How will it integrate with the existing system?

### Phase 2 — Explore Alternatives

```
Propose 2–3 different approaches:
- Explain the tradeoffs of each
- State the recommendation and why
- Present the recommended approach first
```

### Phase 3 — Present the Design (in Sections)

```
Once understood, present the design:
- In sections of 200–300 words
- Check after each section: "Is this correct?"
- Revisit and clarify — stay flexible
```

**Areas to cover:**

- Architecture / Data flow
- Components and responsibilities
- Error cases
- Test strategy

---

## 2. Core Principles

### One Question at a Time

```
❌ Bad:
"Who will use it? On which platform? API or local?
What is the performance target? Is there a budget?"

✅ Good:
"Who will use this feature — job seekers or employers?"
[Wait for the answer]
"Which platform should it support first — web or mobile?"
```

### YAGNI — No Unnecessary Features

For every design decision, ask: "Is this truly necessary right now?"

Remove from the design:

- "It may be needed later" assumptions
- Flexibility the user did not request
- Over-engineering

### Propose 2–3 Alternatives

```
Approach A — Simplest
  Description, advantages, disadvantages

Approach B — Balanced
  Description, advantages, disadvantages

Approach C — Most Powerful
  Description, advantages, disadvantages

→ Recommendation: Approach B, because [concrete reason]
```

---

## 3. Project Context

Answer these questions while brainstorming:

```
1. Which user problem and domain are affected?
   → Where is the existing module or boundary?

2. What is the user journey?
   → How will it integrate with the existing UI flow?

3. Does it use an external service or AI?
   → How will the provider and data flow be selected?
   → What will the privacy, cost, and error behavior be?

4. Does it require authorization or plan restrictions?
   → What are the access rules and limits?

5. Is localization required?
   → What are the supported languages and long-text behavior?

6. Monitoring?
   → Which events will be logged?
```

---

## 4. After the Design

### Documentation

```bash
# Save the design
docs/plans/YYYY-MM-DD-{topic}-design.md

# Content:
# - Selected approach and rationale
# - Component list
# - Data flow
# - Open questions
```

### Implementation Preparation

```
After the design is approved:
1. Create requirements.md with project-planner-skill
2. Create Design.md
3. Create Tasks.md (implementation plan)
4. Keep the first PR small — MVP first
```

---

## 5. Question Bank

### Functional Questions

- "What does the user do now without this feature?"
- "What would the minimum viable version be?"
- "What are the edge cases? (empty state, error, slow network)"

### Technical Questions

- "Is there an existing pattern similar to this?"
- "Is there a performance constraint?"
- "Will it need to scale?"

### User Experience Questions

- "Where might the user get stuck in this flow?"
- "What will the loading, empty, and error states look like?"
- "How will it work on mobile?"

---

## 6. Anti-Patterns

```
❌ Presenting a list of questions (overwhelming)
❌ Going into implementation detail during the design phase
❌ Proposing only one solution (show alternatives)
❌ Adding features the user did not request
❌ Expanding scope with "it may be needed later"
❌ Presenting the entire design at once (present it in sections)
```
