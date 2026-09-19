---
name: memory-management
description: Design or maintain a lightweight project memory system for durable terminology, decisions, conventions, and recurring context. Use when the user explicitly asks to create, organize, audit, or update persistent project knowledge; do not save inferred personal data or silently modify memory.
---

# Memory Management

Keep durable context small, auditable, and useful across sessions without turning transient conversation into permanent truth.

## What Belongs in Memory

Store information that is both reusable and costly to rediscover:

- stable terminology and acronyms;
- confirmed project architecture and conventions;
- explicit user or team preferences;
- important decisions with rationale and date;
- recurring commands or troubleshooting evidence;
- active constraints and ownership boundaries.

Do not store secrets, credentials, unnecessary personal data, speculation, temporary task state, or information the user did not authorize for persistence.

## Layers

Use a small always-visible index only for the highest-frequency facts. Place detailed domain knowledge in focused files that can be searched or loaded when relevant. Avoid duplicating the same fact across layers; the index should point to the authoritative detail.

The host agent may use `AGENTS.md`, a memory directory, project documentation, or another supported mechanism. Follow the environment's documented discovery rules rather than assuming a vendor-specific filename.

## Record Format

Each durable entry should make its status clear:

- fact or decision;
- scope and affected project or module;
- source or evidence;
- recorded or last-verified date;
- owner when relevant;
- review or expiry condition for drift-prone information.

Distinguish confirmed facts from hypotheses and historical notes.

## Maintenance

- Add memory only with explicit authorization.
- Update the authoritative entry instead of appending contradictions.
- Preserve decision history when rationale still matters.
- Remove or archive entries that are obsolete, duplicated, unverifiable, or no longer useful.
- Verify drift-prone facts before relying on them for consequential work.
- Keep wording concise enough for fast retrieval.

## Completion

Report what was added, changed, moved, or removed and where it now lives. If the environment controls memory through a dedicated API or policy, follow that mechanism rather than writing arbitrary files.
