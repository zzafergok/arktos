---
name: claude-code-analyzer
description: Audit a Claude Code setup, including CLAUDE.md files, commands, hooks, agents, skills, MCP configuration, and recurring workflows. Use only when the user explicitly works with Claude Code or asks to migrate or compare its configuration; do not trigger for ordinary Codex configuration.
---

# Claude Code Analyzer

Review Claude Code configuration as a tool-specific system. Current product behavior may change, so verify authoritative documentation when a recommendation depends on present syntax or availability.

## Inventory

Inspect only configuration files and directories that are in scope. Typical areas include:

- project and user `CLAUDE.md` instructions;
- commands, agents, skills, hooks, and settings;
- MCP server declarations and required credentials;
- duplicated or conflicting instructions across scopes;
- recurring manual workflows that may justify automation.

Do not assume helper scripts are installed. Use available read-only inspection tools and report inaccessible scopes.

## Review Criteria

- **Scope:** project-specific rules live with the project; personal preferences do not leak into shared configuration.
- **Clarity:** instructions are concrete, non-conflicting, and tied to observable outcomes.
- **Context cost:** large documents use progressive disclosure rather than loading unrelated guidance every turn.
- **Portability:** paths, commands, dependencies, and environment requirements are explicit.
- **Safety:** hooks and commands do not silently perform destructive or external actions.
- **Maintainability:** duplicated rules have one source of truth and obsolete entries are removed.
- **Evidence:** recommendations refer to actual files, behavior, or documented product capabilities.

## Migration or Comparison

When translating configuration to Codex or another agent, preserve intent rather than copying filenames mechanically. Map project instructions, reusable skills, tool integrations, invocation rules, and permission boundaries to the destination's supported concepts. Flag features without an equivalent.

## Deliverable

Report findings by impact, with file paths and concrete remediation. Separate confirmed problems from optional improvements and product-version uncertainty. Do not edit configuration unless the user requests changes.
