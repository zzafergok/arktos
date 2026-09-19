---
name: nextjs-design-patterns
description: Design, refactor, or standardize scalable and maintainable Next.js App Router applications. Use for project structure, server and client boundaries, data fetching, routing, state, performance, and shared frontend conventions; verify current Next.js behavior before version-sensitive changes.
---

# Next.js Design Patterns Skill

This skill defines proven architectural approaches, design patterns, and team-level standards for modern Next.js (App Router) applications. The goal is to produce applications that are readable, easy to maintain, high-performing, and scalable over the long term.

The skill provides guidance on project structure, component architecture, data fetching strategies, routing, API design, state management, and performance optimization.

## When to use this skill

- When designing the architecture of a new Next.js project
- When refactoring an existing Next.js codebase
- When establishing enterprise-level frontend standards
- When defining shared folder structures and coding conventions within a team
- When analyzing performance, bundle size, or data-fetching issues
- When clarifying Server Component / Client Component boundaries
- When building dashboards, admin panels, or feature-heavy applications

## How to use this skill

### 1. Project Structure Decisions

- Prefer a feature-based (domain-driven) folder structure
- Keep routes, layouts, and page components under the `app/` directory
- Group business logic, UI components, and types within feature modules
- Place shared components and utilities under a `shared/` directory

### 2. Component Architecture

- Treat Server Components as the default
- Mark only interactive components with `use client`
- Keep Client Components as deep in the component tree as possible
- Allow Server Components to wrap Client Components as children

### 3. Data Fetching Strategy

- Perform data fetching in Server Components using async functions
- Use `Promise.all` to run multiple requests in parallel
- Add `Suspense` boundaries for slower data sources
- Apply ISR (revalidation) for static but updatable content
- Use dynamic rendering where real-time data is required

### 4. Routing and Layout Patterns

- Define the application shell using a root layout
- Clarify route hierarchy with nested layouts
- Use layouts for UI that must preserve state, templates for UI that must reset
- Apply parallel routes for dashboards and modal scenarios
- Use route groups for logical organization without affecting the URL

### 5. API Route Design

- Build APIs under `app/api` using the route handler pattern
- Define HTTP methods as named exports
- Use middleware composition for authentication, validation, and logging
- Separate error types with custom error classes and return proper status codes

### 6. State Management

- Clearly separate server state and client state
- Resolve server state primarily in Server Components
- Use client state only for UI interaction
- Minimize global state usage

### 7. Performance Optimization

- Avoid unnecessary client-side JavaScript
- Actively use streaming and partial rendering
- Split large features with route-level code splitting
- Pay attention to memoization and reference stability in shared components

---
