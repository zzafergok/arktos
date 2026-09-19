---
name: kaizen-engineering-principles
description: Engineering excellence through continuous improvement, error-proofing by design, standardized work, and just-in-time development. Use when refactoring code, making architecture decisions, reviewing code quality, or discussing process improvements. Covers YAGNI, Poka-Yoke, incremental development, and anti-patterns to avoid.
---

# Kaizen Engineering Principles

Small, continuous improvements are more effective than large changes. Prevent errors in the design first, follow proven patterns, and build only what is needed now.

---

## 1. Continuous Improvement (Kaizen)

### Core Principle

Make small, frequent improvements instead of large changes. Test and approve each step before moving to the next.

```
Iteration 1: Make it work
Iteration 2: Make it clear
Iteration 3: Make it efficient
← Do not try to do all three at once
```

### In Practice

```typescript
// Iteration 1: A simple working version
const calculateTotal = (items: Item[]) => {
  let total = 0
  for (const item of items) {
    total += item.price * item.quantity
  }
  return total
}

// Iteration 2: Make it clear
const calculateTotal = (items: Item[]): number => items.reduce((total, item) => total + item.price * item.quantity, 0)

// Iteration 3: Make it robust (when needed)
const calculateTotal = (items: Item[]): number => {
  if (!items.length) return 0
  return items.reduce((total, item) => {
    if (item.price < 0 || item.quantity < 0) {
      throw new Error('Price and quantity cannot be negative')
    }
    return total + item.price * item.quantity
  }, 0)
}
```

### During Code Review

Start each review with the highest-impact changes. Accept changes that are "good enough for now" — they can be improved in later PRs.

Priority order: Critical → Important → Nice to have

---

## 2. Poka-Yoke (Error-Proof Design)

### Core Principle

Make errors impossible at compile time or during design instead of catching them at runtime.

### Error Prevention with the Type System

```typescript
// ❌ String status — every value is valid
type OrderBad = { status: string }

// ✅ Only valid states are possible
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered'
type Order = { status: OrderStatus }

// ✅ Best: Data associated with the state
type Order =
  | { status: 'pending'; createdAt: Date }
  | { status: 'shipped'; trackingNumber: string; shippedAt: Date }
  | { status: 'delivered'; deliveredAt: Date }
// The shipped state is now impossible without a trackingNumber
```

### Early Validation (Validate at the Boundary)

```typescript
// ❌ Validate after use — too late
const processPayment = (amount: number) => {
  const fee = amount * 0.03 // Not validated yet!
  if (amount <= 0) throw new Error('Invalid amount')
}

// ✅ Validate at the boundary and use safely everywhere
type PositiveNumber = number & { readonly __brand: 'PositiveNumber' }

const validatePositive = (n: number): PositiveNumber => {
  if (n <= 0) throw new Error('Must be positive')
  return n as PositiveNumber
}

const processPayment = (amount: PositiveNumber) => {
  const fee = amount * 0.03 // Safe — guaranteed by the type
}

// Validate once at the API boundary
const handleRequest = (req: Request) => {
  const amount = validatePositive(req.body.amount)
  processPayment(amount) // Use safely everywhere
}
```

### Early Return with Guard Clauses

```typescript
// ❌ Deeply nested conditions — hard to read
const processUser = (user: User | null) => {
  if (user) {
    if (user.email) {
      if (user.isActive) {
        sendEmail(user.email, 'Welcome!')
      }
    }
  }
}

// ✅ Guard clauses — return early and keep the main logic clean
const processUser = (user: User | null) => {
  if (!user) return
  if (!user.email) return
  if (!user.isActive) return
  sendEmail(user.email, 'Welcome!')
}
```

### Validate Configuration at Startup

```typescript
// ❌ Missing configuration is discovered during a request
const handler = async () => {
  const key = process.env.API_KEY // Fails here if missing
}

// ✅ Validate at application startup — fail early
const loadConfig = () => {
  const apiKey = process.env.API_KEY
  if (!apiKey) throw new Error('API_KEY is a required environment variable')
  return { apiKey }
}

const config = loadConfig() // Failure during deployment → cannot reach production
```

---

## 3. Standardized Work

### Core Principle

Follow the existing codebase patterns. Adopt a new pattern only when it provides a meaningful improvement and has team approval.

### Follow Existing Patterns

```typescript
// Existing pattern in the codebase
class UserAPIClient {
  async getUser(id: string): Promise<User> {
    return this.fetch(`/users/${id}`)
  }
}

// ✅ New code follows the same pattern
class OrderAPIClient {
  async getOrder(id: string): Promise<Order> {
    return this.fetch(`/orders/${id}`)
  }
}

// ❌ A different pattern because "I prefer functions"
const getOrder = async (id: string): Promise<Order> => { ... }
// → Inconsistency creates confusion
```

### Error-Handling Standard

```typescript
// Project standard: Result type — all services use it
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }

const fetchCv = async (id: string): Promise<Result<CvDocument>> => {
  try {
    const cv = await db.cvs.findById(id)
    if (!cv) return { ok: false, error: new Error('CV not found') }
    return { ok: true, value: cv }
  } catch (err) {
    return { ok: false, error: err as Error }
  }
}

// The caller uses the consistent pattern
const result = await fetchCv('123')
if (!result.ok) {
  logger.error('Could not retrieve CV', result.error)
  return
}
const cv = result.value // Type-safe!
```

### Import Organization (Standard)

```typescript
// Order: external → internal → relative
import { z } from 'zod' // external
import { NextResponse } from 'next/server' // external framework
import { requireAuth } from '@/lib/server/auth' // internal absolute
import { CvDocument } from '../types' // relative
import type { Metadata } from 'next' // type-only
```

### Enforce the Standard with Automation

```bash
# Style — apply automatically
prettier --write .

# Type checking — required in CI
tsc --noEmit

# Lint — catch standard violations
eslint src --ext .ts,.tsx
```

---

## 4. Just-In-Time (JIT) — Only What Is Needed

### YAGNI Principle

"You Aren't Gonna Need It" — do not write code beyond current requirements. Additions justified by "we may need it later" create technical debt.

```typescript
// ❌ Speculative complexity
class Logger {
  private transports: LogTransport[] = []
  private queue: LogEntry[] = []
  private rateLimiter: RateLimiter
  // 200 lines for "we may need a different transport later"
}

// ✅ Meet the current need
const logError = (error: Error) => {
  console.error(error.message)
}
// Extend when the need arises
```

### Rule of Three — When to Abstract

```typescript
// 1st use — write it directly
const filterActiveCvs = (cvs: CvDocument[]) => cvs.filter((cv) => cv.status === 'active')

// 2nd use — repeat it (not yet time to abstract)
const filterActiveJobs = (jobs: Job[]) => jobs.filter((job) => job.status === 'active')

// 3rd use — the pattern is proven; abstract it
const filterActive = <T extends { status: string }>(items: T[]) => items.filter((item) => item.status === 'active')
```

### Measure, Then Optimize

```typescript
// First: Simple and readable
const getMatchingCvs = (cvs: CvDocument[], query: string) =>
  cvs.filter((cv) => cv.title.toLowerCase().includes(query.toLowerCase()))

// Benchmark: 12 ms for 10,000 CVs — acceptable
// → Ship it; do not optimize

// Later: After profiling proves a bottleneck
const cvSearchIndex = new Map(cvs.map((cv) => [cv.id, cv.title.toLowerCase()]))
const getMatchingCvs = (query: string) => {
  const q = query.toLowerCase()
  return [...cvSearchIndex.entries()].filter(([, title]) => title.includes(q)).map(([id]) => cvMap.get(id)!)
}
```

### Avoid Premature Abstraction

```typescript
// ❌ A generic framework for a single use
abstract class BaseCRUDService<T> {
  abstract getAll(): Promise<T[]>
  abstract getById(id: string): Promise<T>
  // 300 lines for one table
}

// ✅ Specific functions — abstract when a pattern emerges
const getCvs = async (userId: string): Promise<CvDocument[]> => db.collection('cvs').where('userId', '==', userId).get()
```

---

## Red Flags

### Continuous Improvement Violations

"I will fix it later" (which usually does not happen), leaving code worse than you found it, or preferring a large rewrite over incremental changes.

### Poka-Yoke Violations

The "users should be careful" approach, validation after use, or configuration that is not validated at startup.

### Standardized Work Violations

Departing from existing patterns because "I prefer to do it this way," or ignoring project conventions.

### JIT Violations

"We may need it later," optimization without measurement, or abstraction before three or more uses prove the pattern.

---

## Summary

**Kaizen says**: Excellence is not a one-time event; it comes through continuous small steps. Good enough today, better tomorrow.

**In practice**: In every PR, leave the code a little better than you found it. Make errors impossible before they need to be caught. Follow proven patterns. Build only what is truly needed.
