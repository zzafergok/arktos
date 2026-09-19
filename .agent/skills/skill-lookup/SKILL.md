---
name: skill-lookup
description: Find and evaluate existing agent skills for a requested workflow, then recommend the best fit and installation scope. Use when the user asks whether a skill exists, wants to search a skill library, or wants to avoid creating a duplicate skill.
---

# Skill Lookup

Search available built-in, user, repository, plugin, and user-provided skill sources before recommending a new skill.

## Search

Translate the request into a small set of capability, tool, artifact, and trigger terms. Search skill names and descriptions first; inspect full instructions only for plausible candidates.

Use the host environment's supported skill catalog or filesystem locations. For current Codex projects, repository skills are typically discovered under `.agents/skills/`; user-level and plugin locations depend on the installed environment and should be verified before changing them.

## Evaluate Candidates

Compare:

- trigger precision and scope boundary;
- fit for the requested inputs and outputs;
- required tools, credentials, scripts, or external services;
- portability and project assumptions;
- maintenance status and current product compatibility;
- overlap or conflict with already installed skills;
- security and mutation behavior.

Do not recommend a skill solely because its title matches. Check that its instructions and resources are complete.

## Recommend

Return the best match, why it fits, important dependencies, and the appropriate scope:

- repository scope for team or project-specific workflows;
- user scope for personal workflows used across repositories;
- plugin distribution for reusable packages that bundle skills or connectors.

If no strong match exists, explain the gap and outline the smallest new skill needed. Do not install, copy, or modify skills unless the user asks.
