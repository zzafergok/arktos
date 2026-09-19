---
name: system-monitoring-expert
description: Design, implement, and evolve professional monitoring dashboards. Covers KPI selection, telemetry schema, admin dashboard layout, alert design, and observability best practices. Use when working on monitoring dashboards, API routes, telemetry events, or platform health visualization.
---

# System Monitoring Expert Skill

Design and develop monitoring infrastructure and admin dashboards for modern software platforms.

## When to use this skill

- When working on admin monitoring pages
- When developing monitoring infrastructure
- When adding or changing monitoring API routes
- When defining a new telemetry event type
- When reviewing a monitoring dashboard layout
- When determining platform health KPIs

## How to use it

- Always reason internally in English
- Always respond to the user in Turkish
- Do not add comment lines to code or configuration files

---

## 1. KPI Hierarchy

### Core KPIs

#### Platform Health (Operational — Real-time)

```yaml
Availability:
  - Route success rate (%)
  - Active incident count
  - Error count in the last hour

Performance:
  - Median response time (ms)
  - P95 response time (ms)
  - Slow routes (>2s)

AI Services:
  - AI completion success rate (%)
  - Average AI response time (ms)
  - Rate-limit hits (hourly)
```

#### User Metrics (Tactical — Daily/Weekly)

```yaml
Usage:
  - Daily active users (DAU)
  - Usage rates per feature
  - Average number of actions per session

Conversion:
  - Free → Paid conversion rate
  - Feature adoption rate

Quality:
  - User satisfaction scores
  - Workflow completion rates
  - Session success rates
```

---

## 2. Best Practices

### Dashboard Design

- Keep at most 5–7 KPIs on one screen — attention is limited
- A single value without a trend is meaningless — add a time comparison
- Do not hide the methodology — place the calculation explanation beside each metric
- The dashboard must be responsive
- Do not use 3D charts — they distort perception
- Avoid non-actionable vanity metrics

### Data Security

- Admin routes must be protected with authorization
- Monitoring events must not contain PII (Personally Identifiable Information); redaction is mandatory
- A TTL field must be written to every event for automatic cleanup
- Rate limiting must be applied to monitoring intake endpoints
