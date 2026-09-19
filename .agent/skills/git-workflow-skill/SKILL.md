---
name: git-workflow-skill
description: Use Git safely for commits, branches, rebases, cherry-picks, bisect, worktrees, conflict resolution, and recovery. Use when history or repository state must be changed or diagnosed; inspect the worktree and preserve unrelated user changes before mutating anything.
---

# Git Workflow

Choose the least disruptive Git operation that achieves the user's requested history or collaboration outcome.

## Inspect First

Check repository root, status, current branch, remotes, relevant log, upstream, and worktrees before changing state. Treat modified and untracked files as user work unless proven otherwise. Do not use destructive recovery commands against a broad or ambiguous target.

## Commits

Stage only intended changes and review the staged diff. Follow the repository's commit convention; if none exists, use a concise imperative subject that describes one coherent change. Do not amend, sign, commit, or push unless the user asked for that workflow.

## Branch and History Operations

- **Rebase:** use for intentional local history cleanup or updating onto a base when collaboration constraints allow it.
- **Cherry-pick:** use for a known commit whose change belongs on the target branch; inspect dependencies and resolve conflicts semantically.
- **Revert:** prefer for undoing a shared commit while preserving history.
- **Bisect:** use a reproducible good/bad test to identify the first failing commit.
- **Worktree:** use for parallel branches without disturbing the current checkout.
- **Reflog:** use to locate previously reachable local commits before assuming work is lost.

Never force-push a shared branch without explicit authorization and a clear lease-aware plan. Avoid rewriting public history when revert or a follow-up commit satisfies the goal.

## Conflicts

Understand both sides and the intended final behavior. Do not resolve by blindly choosing ours or theirs. After resolution, inspect the diff and run the most relevant checks. Preserve generated files according to repository policy.

## Recovery

Resolve the exact target before reset, clean, deletion, or branch removal. Prefer recoverable actions and create a safety reference when a complex rewrite could lose work. Explain what will become unreachable before taking a destructive action.

## Completion

Report the resulting branch or commit state, commands or operations performed, checks run, and any remaining divergence, conflict, or push requirement. Never claim remote state changed unless it was verified.
