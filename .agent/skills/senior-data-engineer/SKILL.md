---
name: senior-data-engineer
description: Design, implement, review, or evolve reliable data pipelines, analytical data models, streaming or batch systems, and data-platform operations. Use for cross-cutting data engineering work involving correctness, lineage, quality, scale, or production reliability.
---

# Senior Data Engineer

Build data systems whose meaning, correctness, and operational behavior remain inspectable over time.

## Establish the Data Contract

Identify producers, consumers, business meaning, grain, keys, event time, update semantics, retention, privacy classification, freshness needs, volume, and service expectations. Confirm which system owns each field and how schema changes are communicated.

Do not choose batch, streaming, warehouse, lakehouse, or orchestration technologies before the latency, scale, team, and operational constraints are understood.

## Pipeline Design

- Make ingestion idempotent or define duplicate handling explicitly.
- Preserve raw source fidelity when audit or replay is required.
- Separate extraction, normalization, business transformation, and serving concerns where it improves ownership and recovery.
- Define watermarking, late-arrival, deletion, correction, and backfill behavior.
- Partition and cluster according to verified access patterns.
- Bound retries and quarantine poison records without silently losing data.
- Design replay and backfill so they do not corrupt current results or overload downstream systems.

## Modeling

State the grain of every analytical model. Define dimensions, facts, slowly changing attributes, derived metrics, and aggregation rules. Centralize business definitions used across consumers and avoid ambiguous names that conceal different calculations.

## Data Quality

Validate the risks that matter for each dataset:

- schema and type conformance;
- uniqueness and key stability;
- completeness and accepted null behavior;
- referential integrity;
- value ranges and business invariants;
- freshness and volume anomalies;
- reconciliation with authoritative sources.

Assign owners and response behavior to checks. A failing check must have an actionable severity, not merely create noise.

## Operations and Evolution

Instrument throughput, latency, freshness, error rate, retries, backlog, cost, and quality outcomes. Include lineage and enough metadata to identify affected downstream consumers. Plan compatible schema evolution, staged deployment, backfill validation, rollback, and deprecation.

Protect sensitive data through minimization, access control, encryption, masking, retention enforcement, and auditable access appropriate to the environment.

## Deliverable

Implement or recommend the smallest reliable design that satisfies the data contract. Document assumptions, ownership, failure behavior, quality controls, operational signals, migration steps, and verification using the project's actual tools rather than imaginary helper scripts.
