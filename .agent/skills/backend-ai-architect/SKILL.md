---
name: backend-ai-architect
description: Design backend architecture for AI-powered features, including provider abstraction, prompt and schema versioning, retrieval, tool execution, streaming, rate limits, cost, privacy, observability, and failure handling. Use for production AI service boundaries rather than prompt wording alone.
---

# Backend AI Architect

Design AI capabilities as unreliable, probabilistic external dependencies behind stable application contracts.

## Establish the Contract

Define the user-visible capability, accepted inputs, structured outputs, latency budget, quality threshold, data classification, authorization, cost envelope, and fallback behavior. Separate product requirements from a particular model or provider.

## Service Boundaries

- Keep provider SDKs behind an adapter owned by the trusted backend.
- Validate and normalize all model output before returning it to clients or downstream code.
- Version prompts, schemas, evaluation sets, and material model configuration.
- Keep secrets, retrieval credentials, and tool authorization out of the client.
- Use typed domain errors instead of leaking provider responses.
- Preserve request identifiers and safe operational metadata for debugging.

## Reliability

Set bounded timeouts, retries, concurrency, and rate limits. Retry only errors that are safe and likely transient, with idempotency for operations that can duplicate effects. Define behavior for timeout, malformed output, refusal, safety block, quota exhaustion, provider outage, and partial streaming failure.

Use queues or durable jobs when work exceeds interactive latency or must survive restarts. Support cancellation and result expiry where relevant.

## Retrieval and Tools

Treat retrieved content as untrusted data, preserve citations or provenance, and evaluate retrieval independently. Tool calls require typed inputs, server-side authorization, impact-aware confirmation, execution limits, and output sanitization. The model never grants itself permission.

## Privacy, Safety, and Cost

Minimize data sent to providers, document retention and regional behavior, redact sensitive fields where possible, and verify contractual requirements. Track usage and cost by feature without logging raw sensitive prompts. Apply content and domain safeguards proportionate to user harm.

## Evaluation and Operations

Build representative offline evaluations before changing models or prompts. Observe task success, schema validity, groundedness, tool correctness, latency, errors, and cost. Roll out material changes gradually when regressions would affect users.

## Deliverable

Provide the requested design or implementation with contracts, sequence, failure behavior, security boundary, evaluation plan, observability, rollout, and rollback. Verify current provider APIs and model capabilities rather than relying on remembered names.
