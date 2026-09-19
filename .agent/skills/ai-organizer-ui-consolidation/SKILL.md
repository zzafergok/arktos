---
name: ai-organizer-ui-consolidation
description: Consolidate fragmented AI or file-organization commands into a coherent graphical workflow with safe previews, progress, history, rollback, search, and accessibility. Use when replacing or complementing a multi-command organizer CLI with a product UI; do not assume a specific framework or command set.
---

# AI Organizer UI Consolidation

Design a usable interface over existing organizer capabilities without weakening their safety, transparency, or power-user access.

## Discover the Existing System

Inventory commands, flags, inputs, outputs, side effects, dependencies, error modes, long-running operations, and existing logs. Group capabilities by user goal rather than mirroring the CLI command list.

Identify which operations are read-only, reversible, destructive, networked, costly, or privacy-sensitive. Preserve existing domain logic behind a stable service boundary instead of reimplementing it in UI components.

## Experience Model

Organize the product around a small set of workflows such as:

- import or select sources;
- inspect and search;
- preview a proposed organization plan;
- approve, run, pause, or cancel work;
- review results, conflicts, skipped items, and errors;
- inspect history and roll back supported changes;
- manage rules, providers, and privacy settings.

Progressive disclosure should keep the default path calm while making advanced options discoverable. Preserve a CLI or batch path when it remains valuable to expert users.

## Safety Invariants

- Never mutate files before showing the intended operation when preview is feasible.
- Distinguish copy, move, rename, overwrite, archive, and delete actions clearly.
- Require confirmation proportional to impact and scope.
- Use stable job identifiers, idempotency where possible, and resumable state for long-running operations.
- Record enough metadata to explain results and support rollback without logging sensitive content unnecessarily.
- Contain failures to individual items where safe and present actionable recovery information.

## Interface Requirements

Design loading, empty, permission, conflict, offline, partial-success, and failure states. Support keyboard navigation, focus management, text scaling, reduced motion, adequate contrast, and screen-reader status updates. Large file sets require virtualization or pagination and must not block the main interface.

## Architecture

Define explicit contracts between UI, job orchestration, domain operations, storage, and AI providers. Validate paths and permissions server-side or in the trusted local process. Keep secrets out of the client. Stream progress through an appropriate mechanism and reconnect safely after interruption.

## Verification

Test representative happy paths and high-risk cases: duplicate names, locked files, unavailable volumes, partial provider failure, cancellation, restart, rollback, large batches, and concurrent jobs. Compare UI results with the underlying command behavior before declaring parity.
