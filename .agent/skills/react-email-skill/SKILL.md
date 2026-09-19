---
name: react-email-skill
description: Build, integrate, and verify transactional email templates with React Email in a TypeScript application. Use for welcome, verification, password reset, notification, receipt, or lifecycle emails when the project has selected React Email; verify current package and provider documentation before implementation.
---

# React Email

Create reliable transactional email markup while respecting the project's existing mail provider, localization, brand system, and delivery architecture.

## Inspect the Project

Before adding code, identify:

- installed React Email packages and versions;
- the existing email service boundary and provider;
- template location, rendering workflow, and preview command;
- sender identity, domains, reply behavior, and environment handling;
- localization, brand assets, tracking, and compliance requirements.

Do not introduce a new provider or bypass an existing service layer without an explicit request.

## Template Design

- Use React Email primitives supported by the installed version.
- Keep the layout useful on narrow screens and common desktop clients.
- Use conservative email-compatible styling and inline-safe patterns.
- Include a clear subject, preview text, heading, body, primary action, and fallback URL where appropriate.
- Provide meaningful image alt text and do not rely on images for essential information.
- Keep copy concise and make the reason for the email immediately clear.
- Support long localized text and avoid hard-coded user-facing strings when the app localizes email.

## Security and Privacy

- Never expose secrets, internal identifiers, stack traces, or sensitive account data.
- Treat verification and reset tokens as short-lived secrets; do not log them.
- Build action URLs from an approved application origin and validate configuration.
- Avoid open redirects and user-controlled HTML.
- Include only the personal data necessary for the message.
- Confirm legal footer, unsubscribe, and consent requirements for non-transactional mail.

## Integration

Render templates in the server-side mail layer and pass typed template data. Separate template rendering from provider delivery so either can be tested independently. Handle provider errors, idempotency, retry behavior, and duplicate-send risk according to the business event.

Current provider APIs and package exports can change; verify official documentation rather than copying stale examples.

## Verification

Preview representative variants and render the final HTML. Test long names, missing optional fields, multiple locales, dark mode behavior where supported, images disabled, plain-text fallback, and absolute links. Send to real test inboxes across important clients when delivery fidelity matters.

Confirm that provider responses and delivery events are observed without leaking message content or tokens.
