---
name: code-review-excellence
description: Review code changes for correctness, regressions, security, maintainability, performance, tests, and operational impact, or help evaluate review feedback. Use for pull requests, diffs, patches, or review standards; prioritize actionable findings over summaries.
---

# Code Review Excellence

Review the actual change in its repository context and report issues that could materially affect users, operators, security, or future maintenance.

## Establish Scope

Inspect the diff, surrounding code, tests, call sites, configuration, and project guidance needed to understand behavior. Identify the stated goal and avoid redesigning unrelated areas.

## Review Order

1. **Correctness:** logic, invariants, edge cases, state transitions, concurrency, and error handling.
2. **Security and privacy:** authorization, validation, injection, secrets, data exposure, trust boundaries, and unsafe defaults.
3. **Regression risk:** compatibility, migration, callers, persisted data, APIs, and platform behavior.
4. **Reliability and operations:** timeouts, retries, idempotency, cleanup, observability, rollout, and recovery.
5. **Performance:** only when the change creates a plausible or measured impact.
6. **Maintainability:** clarity, duplication, contracts, coupling, and fit with established conventions.
7. **Tests:** whether changed behavior and important failure paths are meaningfully protected.

Do not report speculative issues without a concrete failure mode. Do not bury important findings under style preferences already handled by tooling.

## Finding Format

For each issue include:

- severity proportional to impact and likelihood;
- precise file and location;
- the triggering condition;
- observed or likely consequence;
- why existing safeguards do not prevent it;
- a focused remediation direction.

Keep one issue per finding. If there are no material findings, say so and note meaningful verification gaps rather than inventing concerns.

## Evaluating Feedback

When reviewing comments received from another reviewer, verify each claim against code and tests. Accept sound feedback, challenge incorrect assumptions with evidence, and ask for clarification when the desired behavior is ambiguous. Do not agree performatively or dismiss feedback without investigation.

## Verification

Run proportionate read-only checks when allowed and relevant. Distinguish checks actually performed from recommended checks. A clean build or lint run does not prove behavioral correctness.
