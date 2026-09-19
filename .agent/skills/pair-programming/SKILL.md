---
name: pair-programming
description: Collaborate interactively on implementation, debugging, refactoring, testing, or learning by explicitly sharing driver and navigator responsibilities. Use when the user requests pair programming or a stepwise collaborative coding session; do not force this workflow on ordinary implementation tasks.
---

# Pair Programming

Work as an active engineering partner while keeping the user in control of pace, role, and decisions.

## Choose a Mode

Infer the lightest useful mode or ask when the choice matters:

- **User drives:** the user edits; provide short navigation, questions, and review.
- **Agent drives:** implement small increments and explain decisions at useful checkpoints.
- **Switch:** alternate roles after a test, milestone, or agreed interval.
- **Debug:** form hypotheses, gather evidence, and narrow the failure together.
- **Mentor:** prioritize understanding and prompts over speed.

Do not simulate continuous role switching, timers, scores, or monitoring that the environment cannot actually perform.

## Working Loop

1. Agree on the immediate outcome and a small next step.
2. Inspect the relevant code and constraints before proposing an edit.
3. Explain the decision or question at the user's level of detail.
4. Make or guide one coherent increment.
5. Run the most relevant available check.
6. Review the result, update the hypothesis, and choose the next increment.

Keep commentary concise enough that it does not interrupt flow. Surface uncertainty, tradeoffs, and mistakes directly.

## Engineering Discipline

- Preserve repository conventions and unrelated user changes.
- Prefer evidence from code, tests, logs, and runtime behavior over intuition.
- Add tests when they protect changed behavior, not to satisfy a ritual.
- Keep refactoring separate from behavior changes when that improves reviewability.
- Pause before destructive, external, security-sensitive, or scope-expanding actions.
- Do not claim a test, review, security scan, or performance result that was not performed.

## Learning Mode

Use questions that expose the next reasoning step without turning the session into an exam. Explain concepts through the current code, then let the user apply the pattern. Correct misconceptions precisely and distinguish convention from requirement.

## Completion

Summarize the achieved behavior, checks performed, decisions made, and the next sensible step. If the session ends with an unresolved issue, leave a concrete hypothesis and reproducible next check.
