---
name: auth-patterns-nextjs
description: Implement or review authentication and authorization in a Next.js App Router project using Auth.js. Use only when the project has selected Auth.js for OAuth, credentials, sessions, or route protection; verify the installed Auth.js and Next.js versions and current official guidance.
---

# Auth.js Patterns for Next.js

Integrate Auth.js through the project's existing server boundaries without treating session presence as sufficient authorization.

## Inspect First

Identify installed versions, adapter, session strategy, providers, route structure, runtime, deployment platform, database, existing user model, and authorization rules. Do not replace another authentication system unless migration is explicitly in scope.

Auth.js and Next.js APIs change. Use examples from current official documentation that match the installed versions rather than remembered configuration.

## Security Boundaries

- Keep provider secrets and privileged operations on the server.
- Validate redirect targets and avoid open redirects.
- Link accounts using verified provider guarantees; do not merge identities by unverified email alone.
- Rate-limit credentials, verification, reset, and account-linking flows.
- Store passwords only with an appropriate current password-hashing configuration when credentials auth is required.
- Rotate and invalidate sessions according to the product's risk model.
- Protect state-changing cookie-authenticated requests against CSRF as required by the chosen flow.

## Authentication vs Authorization

Use authentication to establish identity. Enforce authorization at every protected server entry point and data operation using roles, permissions, ownership, organization membership, or policy appropriate to the domain. Client-side guards improve UX but are not a security boundary.

Centralize authorization decisions where practical and deny by default. Avoid embedding mutable entitlements in long-lived session state without a refresh or revocation strategy.

## App Router Integration

Define where session lookup is safe and cacheable, how server components and route handlers access identity, how middleware is used, and which checks must still occur in the trusted handler or service. Avoid protecting only page navigation while leaving APIs exposed.

Model loading, unauthenticated, forbidden, expired, provider error, account collision, and partial onboarding states explicitly.

## Verification

Test sign-in, sign-out, expiration, refresh, protected routes, server actions or handlers, ownership, roles, revoked access, provider denial, callback tampering, redirect validation, CSRF-sensitive actions, and concurrent sessions. Confirm cookie flags and production origins in the deployed environment.

Document the chosen session and authorization model, current version assumptions, and unverified provider behavior.
