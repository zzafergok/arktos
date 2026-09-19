---
name: api-design-skill
description: Design, review, or evolve REST, GraphQL, RPC, event, or webhook contracts that are consistent, secure, observable, and compatible with their consumers. Use for new endpoints, API standards, contract migrations, or integration boundaries.
---

# API Design

Design the public contract from consumer needs and domain behavior before choosing route names or framework code.

## Establish Context

Identify consumers, trust boundaries, operations, data ownership, consistency needs, latency and availability targets, expected scale, compatibility horizon, and whether synchronous request-response is appropriate.

Inspect existing conventions for naming, authentication, errors, pagination, idempotency, versioning, observability, and documentation. Consistency with a sound existing API is usually more valuable than introducing a second style.

## Contract Principles

- Model domain resources and operations clearly; avoid leaking database tables or framework internals.
- Use stable identifiers and explicit types, nullability, units, timestamps, and enums.
- Separate authentication from authorization and enforce both on the server.
- Validate all external input and bound payload size, complexity, and execution cost.
- Return errors with stable machine codes, safe user-facing messages, and correlation identifiers.
- Do not expose stack traces, queries, secrets, or provider internals.

## Collection and Mutation Behavior

Define filtering, sorting, pagination, maximum page size, and consistency semantics. Prefer cursor pagination when collections change during traversal or offsets become costly.

For mutations, specify idempotency, concurrency control, duplicate handling, validation, partial success, and retry safety. Use idempotency keys for externally retried operations where duplicate effects are harmful.

## Compatibility

Prefer additive change when it preserves meaning. For breaking changes, inventory consumers, provide a migration path, run old and new contracts in parallel when justified, observe adoption, and define removal criteria. Version only when the compatibility problem requires it.

## Protocol-Specific Concerns

- **REST:** HTTP semantics, caching, conditional requests, content negotiation, and resource boundaries.
- **GraphQL:** schema ownership, nullability, resolver authorization, depth and cost limits, batching, and deprecation.
- **Events/webhooks:** schema evolution, ordering, replay, signatures, delivery attempts, deduplication, and consumer lag.
- **Streaming/RPC:** cancellation, deadlines, flow control, compatibility, and partial failure.

## Verification

Provide or update an inspectable contract such as OpenAPI, GraphQL schema, protobuf, or event schema when appropriate. Test authorization, validation, compatibility, rate limits, pagination boundaries, duplicate requests, timeouts, and malformed consumers. Include examples that match the real contract rather than illustrative fields that cannot be executed.
