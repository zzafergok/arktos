---
name: nodejs-backend-skill
description: Build, debug, refactor, or review production Node.js backend services outside the Next.js App Router. Use for HTTP APIs, workers, persistence, caching, authentication, observability, and graceful operation; inspect the installed runtime and framework versions before choosing APIs.
---

# Node.js Backend

Implement backend behavior that follows the project's framework, module system, architecture, and operational environment.

## Inspect First

Read package metadata, runtime configuration, lockfile, framework setup, entry points, validation, error handling, persistence, tests, deployment, and observability. Do not migrate frameworks, module systems, or build tools unless requested.

Node.js and framework behavior changes. Verify current official documentation for version-sensitive APIs and runtime flags.

## Service Boundaries

- Keep transport parsing separate from domain logic and persistence.
- Validate all external input and normalize errors into a stable contract.
- Enforce authentication and authorization in trusted server paths.
- Bound request bodies, query complexity, concurrency, timeouts, retries, and resource use.
- Use idempotency for retried operations with side effects.
- Avoid blocking the event loop with CPU-heavy or synchronous work; use workers or jobs when appropriate.

## Data and Integrations

Use parameterized database access, explicit transactions, and safe connection pooling. Treat caches as derived state unless the design explicitly makes them authoritative. For external services, define timeout, retry eligibility, circuit or containment behavior, and safe logging.

## Operations

Handle startup validation, readiness, liveness, graceful shutdown, connection draining, background job cancellation, and signal behavior. Emit structured logs and useful metrics with correlation identifiers while redacting secrets and personal data.

Define behavior for uncaught failures and rejected promises according to the deployment model; do not leave the process in an unknown state.

## Security

Use least privilege, safe headers, dependency review, secret management, rate limiting, abuse controls, and explicit CORS or origin policy. Never trust proxy headers, uploaded files, deserialized objects, or client-provided identity without the corresponding trusted configuration and validation.

## Verification

Run the repository's format, lint, type, test, and build checks as relevant. Exercise validation, authorization, duplicate requests, concurrency, timeout, dependency failure, graceful shutdown, and production configuration. Measure performance before claiming optimization.
