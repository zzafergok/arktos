---
name: implementation-plan-generator
description: Produce an evidence-based, phased implementation plan from requirements, designs, or an existing codebase. Use when the user asks for a technical implementation plan before coding; use project-planner-skill when requirements and system design must also be created from an early-stage idea.
---

# Implementation Plan Generator

Create a plan another engineer can execute without rediscovering the system, while avoiding speculative detail that is not supported by the repository or requirements.

## Inspect First

Read the requirements and trace the relevant implementation paths: entry points, data flow, types, APIs, state, UI, persistence, tests, deployment, and observability. Cite concrete files and symbols where they exist. Mark proposed paths as proposed rather than presenting them as existing.

Identify unresolved product or architecture decisions. Ask only when a missing choice would materially change the plan; otherwise record a reasonable assumption.

## Shape the Plan

Define the objective, scope, non-goals, current behavior, target behavior, constraints, and acceptance criteria. Break work into phases that leave the repository in a coherent state.

For each phase include:

- goal and rationale;
- dependencies and whether work can proceed in parallel;
- files or components to create or modify;
- behavior, contracts, states, and migration details;
- tests and observable verification;
- rollout, compatibility, and rollback needs where relevant.

Order phases by dependency, risk reduction, and ability to verify progress. Data or contract changes generally precede their consumers; cross-cutting integration and cleanup generally follow working vertical slices.

## Planning Rules

- Match the project's language, framework, architecture, and testing conventions.
- Preserve user choices and existing behavior unless change is in scope.
- Cover failure, empty, loading, permission, accessibility, localization, and operational states when relevant.
- Separate required work from optional improvements.
- Do not require TDD, frequent commits, a fixed directory, or a specific document template unless the project or user does.
- Do not write implementation code inside the plan unless a small contract or schema example prevents ambiguity.
- Avoid fake line numbers, commands, files, estimates, or dependencies.

## Output

Use one document for a modest change. For a genuinely large program, use an index plus phase documents:

```markdown
# Implementation plan: <outcome>

## Context
## Scope and non-goals
## Decisions and assumptions
## Dependency overview
## Phases
### Phase 1: <verifiable milestone>
- Goal
- Changes
- Verification
- Dependencies and risks
## Rollout and rollback
## Open decisions
```

Finish with end-to-end verification criteria that demonstrate user-visible behavior, not merely task completion.
