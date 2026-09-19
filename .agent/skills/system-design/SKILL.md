---
name: system-design
description: Turn requirements for a new or substantially changed system into a traceable design using domain discovery, boundaries, data and interaction models, and explicit tradeoffs. Use when the system shape is not yet decided; use senior-software-architect for reviewing a consequential choice in an existing architecture.
---

# System Design

Create enough shared understanding to make implementation decisions without producing diagrams or documents that have no decision value.

## Frame the System

Establish users, goals, scope, non-goals, constraints, expected scale, service levels, privacy and security needs, team ownership, integration context, and migration constraints. Ask only about unknowns that materially change the design; record other assumptions.

## Discover the Domain

Identify actors, commands, events, policies, entities, invariants, and failure outcomes. EventStorming is useful when workflows and domain boundaries are unclear, but it is not mandatory. Preserve the language used by domain experts.

## Progress Through Views

Use only the views required by the task:

1. **Context:** people, external systems, trust boundaries, and ownership.
2. **Containers or deployables:** responsibilities, technologies, data ownership, and communication.
3. **Critical flows:** sequences, asynchronous events, retries, timeouts, and failure paths.
4. **Data:** entities, identifiers, lifecycle, consistency, retention, and migration.
5. **Deployment and operations:** runtime topology, scaling, observability, recovery, and rollout.

Maintain one abstraction level per diagram. Label relationships with purpose and protocol. A diagram must agree with its accompanying text and current system evidence.

## Make Tradeoffs Explicit

For major choices, compare at least the current or simplest option with viable alternatives. Evaluate complexity, delivery speed, reliability, performance, security, cost, operability, reversibility, and team fit. Record assumptions and the signals that would invalidate the choice.

## Design for Failure and Change

Cover authorization, validation, duplicate requests, partial failure, backpressure, data correction, schema evolution, compatibility, deployment, rollback, and recovery where relevant. Prefer incremental evolution to a full rewrite unless the constraints clearly justify replacement.

## Deliverable

Produce a concise design catalog or single document with scope, assumptions, domain model, selected views, decisions, tradeoffs, risks, open questions, migration, and verification criteria. Do not fabricate throughput, latency, or availability requirements.
