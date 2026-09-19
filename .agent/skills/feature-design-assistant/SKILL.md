---
name: feature-design-assistant
description: Turn a product feature idea into a decision-ready specification through focused discovery, alternatives, user flows, requirements, edge cases, and validation criteria. Use before implementation when the problem or solution still needs shaping; use implementation-plan-generator after the feature is sufficiently defined.
---

# Feature Design Assistant

Shape a feature collaboratively without prematurely converting an idea into a fixed implementation.

## Understand the Problem

Clarify the target user, triggering situation, current behavior or workaround, desired outcome, evidence, business relevance, constraints, and reason for acting now. Distinguish the user problem from the proposed feature.

Ask one focused question at a time only when the answer changes the design. Otherwise, state assumptions and move forward.

## Explore Alternatives

Generate a small set of meaningfully different approaches, including a minimal or no-build option when credible. Compare user value, complexity, time to learn, risk, reversibility, dependencies, and fit with the existing product. Recommend one with a concrete rationale.

## Define the Experience

Describe:

- entry points and eligibility;
- primary user flow and decision points;
- information and actions at each step;
- loading, empty, error, success, permission, offline, and partial states;
- cancellation, undo, destructive actions, and recovery;
- accessibility, localization, privacy, and notification behavior;
- admin, support, analytics, or operational needs where relevant.

Use a flow or wireframe only when it clarifies sequence or layout.

## Specify Behavior

Write requirements as observable behavior. Include scope, non-goals, business rules, data and integration needs, dependencies, compatibility, rollout, and acceptance criteria. Do not invent repository paths, APIs, metrics, or architecture before inspecting the implementation context.

## Validate the Feature

Identify the riskiest assumptions and the lowest-cost way to test them. Define success, guardrail, and failure signals with baselines or data sources when known. Separate launch criteria from longer-term outcome measurement.

## Deliverable

Produce a concise feature specification with problem, users, evidence, selected approach, alternatives, flows, requirements, edge cases, non-goals, metrics, rollout considerations, risks, and open decisions. Stop before implementation planning unless the user requests both.
