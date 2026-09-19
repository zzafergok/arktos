---
name: project-planner-skill
description: Generate comprehensive project planning documents — requirements, system design, and task breakdown plans. Use when starting a new feature or project, defining specifications, creating technical designs, or breaking down complex implementations into traceable tasks.
---

# Project Planner Skill

A guide to turning software projects into structured requirements, design, and implementation plan documents.

## When to use this skill

- When starting a new feature or project
- When technical specification documentation is needed
- When complex implementations need to be broken into tasks
- When clarifying a technical design before a PR

---

## 1. Three Core Documents

| Document     | Purpose                                      | File              |
| ------------ | -------------------------------------------- | ----------------- |
| Requirements | User stories + acceptance criteria           | `requirements.md` |
| Design       | Architecture + components + data flow        | `design.md`       |
| Tasks        | Task breakdown + requirement traceability    | `tasks.md`        |

---

## 2. Requirements Document Template

```markdown
# Requirements — [Feature Name]

## Introduction

[System description in 2–3 sentences. Target user and scope.]

## Glossary

- **Term**: Definition specific to this system

## Requirements

### Requirement 1

**User Story**: As a [user type], I want [capability], so that I can [benefit].

#### Acceptance Criteria

1. WHEN [trigger/condition], [component] MUST [action/behavior]
2. WHILE IN [context/mode], [component] MUST [action]
3. IF [condition], [component] MUST [action]
4. [component] MUST [capability with measurable target]
```

### Acceptance-Criteria Patterns

```
Behavior:
- WHEN [event occurs], the system MUST [respond]
- The system MUST ENFORCE [rule/limit]

Conditional:
- IF [condition], the system MUST [action]
- WHILE [mode is active], the system MUST [behavior]

Performance:
- The system MUST COMPLETE [operation] WITHIN [duration]
- The system MUST SUPPORT [N] concurrent [operations]
```

---

## 3. Design Document Template

```markdown
# Design — [Feature Name]

## Overview

[Architecture summary in 3–4 sentences.]

## System Architecture

### Component Map

| Component ID | Name         | Type    | Responsibility    | Interacts With |
| ------------ | ------------ | ------- | ----------------- | ----------- |
| COMP-1       | Web Frontend | UI      | User interface    | COMP-2         |
| COMP-2       | API Routes   | Service | Request routing   | COMP-3         |

### High-Level Architecture Diagram

[ASCII diagram — all components and their relationships]

## Data Flow

### Flow 1: [Flow Name]
```

1. [Source] → [Component]: [Data description]
2. [Component] → [Component]: [Transformation]
3. [Component] → [Destination]: [Final format]

```

## Integration Points

| Source | Destination | Protocol | Format | Purpose |
|--------|-------|----------|--------|------|
| Frontend | API | HTTPS/REST | JSON | API calls |

## Data Models

[Entity definitions and relationships]

## Error Handling

[Error categories and strategy]

## Test Strategy

- Unit: [What will be tested]
- Integration: [Which flow]
- E2E: [Critical user journey]
```

---

## 4. Task Breakdown Template

```markdown
# Implementation Plan — [Feature Name]

## Project Boundaries

**Must-have**: Core features
**Nice-to-have**: Improvements
**Out of scope**: Explicit exclusions

---

- [ ] 1. Infrastructure Setup
  - [ ] 1.1 Project structure
    - Create directories
    - Type definitions
    - _Requirements: REQ-1.1_
  - [ ] 1.2 Data layer
    - Firestore schema
    - _Requirements: REQ-2.1_
    - _Dependencies: 1.1_

- [ ] 2. Business Logic
  - [ ] 2.1 [Core feature]
    - Implementation steps
    - _Requirements: REQ-3.1, REQ-3.2_
    - _Dependencies: Phase 1_

- [ ] 3. API Layer
  - [ ] 3.1 Route handlers
    - _Requirements: REQ-4.1_

- [ ] 4. Frontend
  - [ ] 4.1 Components
    - _Requirements: REQ-5.1_

- [ ] 5. Test
  - [ ] 5.1 Unit tests
  - [ ] 5.2 Integration tests
```

---

## 5. Feature Planning

Answer these questions when adding a new feature to an existing product:

### Architecture Questions

```
1. Which domain does this feature belong to?
   → Where are the existing module boundary and ownership?

2. What data will be stored?
   → Who owns the data, and what are its schema, lifecycle, and migration needs?

3. Does it use AI or an external service?
   → Provider selection, data boundary, cost, and rate limits?

4. Does it require a subscription?
   → What is the free-tier limit?
   → Will an event be written to monitoring?

5. Is i18n required?
   → Will TR + EN keys be added?
```

### Feature Checklist

- [ ] Files matching the project's existing module structure are identified
- [ ] Data contracts and migration needs are defined
- [ ] API or integration contracts are defined
- [ ] Routes that require auth checks are identified
- [ ] Localization scope is defined for supported languages
- [ ] The project's localization validation passes
- [ ] Monitoring events are defined
- [ ] Subscription checks are added when needed

---

## 6. Common Implementation Phases

```
Phase 1: Infrastructure
  - Project structure, type definitions, Firestore schema

Phase 2: Data Layer
  - Firestore CRUD operations, validation

Phase 3: Business Logic
  - Core algorithms, service classes, AI integration

Phase 4: API Layer
  - Route handlers, auth, rate limiting

Phase 5: Frontend
  - Components, state management, form validation

Phase 6: Testing
  - Unit, integration, E2E

Phase 7: Monitoring
  - Event logging, error tracking
```

---

## 7. Quality Checklist

### Requirements Document

- [ ] Every requirement has a user story
- [ ] All acceptance criteria are measurable and testable
- [ ] Non-functional requirements are specified (performance, security)
- [ ] The glossary covers domain terms
- [ ] Requirements are numbered for traceability

### Design Document

- [ ] Responsibilities of all components are clear
- [ ] Data-flow diagrams are present
- [ ] The error-handling strategy is documented
- [ ] Performance targets are specified

### Task Breakdown

- [ ] Tasks are grouped into logical phases
- [ ] Dependencies are specified
- [ ] Requirement traceability is added to every task
- [ ] Tasks can be completed independently
- [ ] Checkbox format is used
