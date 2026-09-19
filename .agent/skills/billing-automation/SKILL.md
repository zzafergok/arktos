---
name: billing-automation
description: Design, implement, or review recurring billing, invoicing, subscription lifecycle, usage charging, proration, tax handoff, payment recovery, and reconciliation. Use for production billing systems where correctness, idempotency, auditability, and provider integration matter.
---

# Billing Automation

Treat billing as a financial state machine whose external provider events, internal entitlements, invoices, and ledger evidence must remain reconcilable.

## Establish the Model

Define products, prices, currencies, billing intervals, trials, discounts, usage units, proration policy, invoice timing, payment terms, tax responsibility, refunds, credits, cancellation, and entitlement behavior. Confirm which system is authoritative for catalog, subscription, payment, invoice, and access state.

Do not invent tax, accounting, or consumer-protection rules. Route jurisdiction-specific decisions to the appropriate owner or current authoritative guidance.

## Core Invariants

- Monetary values use explicit currency and integer minor units or an appropriate decimal type.
- External requests and event handlers are idempotent.
- Webhook authenticity is verified before processing.
- Events may be duplicated, delayed, or delivered out of order.
- Provider state does not silently overwrite a newer internal transition.
- Entitlement changes have explicit timing and failure behavior.
- Every financial adjustment has a traceable reason and actor or event.

## Lifecycle Design

Model creation, trial, activation, renewal, plan change, pause, cancellation, expiry, failed payment, recovery, refund, dispute, and manual adjustment. Define effective dates and customer communication for each transition.

For usage billing, define meter source, unit, aggregation window, late data, correction, deduplication, cutoff, and reconciliation. For proration, specify the exact policy and preview customer-facing impact before applying changes.

## Reliability and Security

Keep provider secrets in trusted infrastructure. Use durable event storage, bounded retries, dead-letter handling, replay tools, and correlation identifiers. Minimize payment and personal data, respect provider compliance boundaries, and restrict privileged adjustments.

Never grant access solely because a client reports payment success. Derive entitlements from trusted server-side state with a documented grace policy.

## Reconciliation and Operations

Reconcile provider transactions, invoices, internal subscription state, entitlements, refunds, and accounting exports. Monitor renewal success, involuntary churn, aging retries, webhook lag, processing errors, mismatches, and manual interventions.

## Verification

Use provider test environments and deterministic clocks where available. Test duplicate and out-of-order webhooks, failed renewals, delayed usage, plan changes near boundaries, refunds, disputes, currency rounding, tax failures, cancellation timing, replay, and provider outage. Verify current provider APIs and policy before implementation.
