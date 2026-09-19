---
name: database-seed-skill
description: Generate realistic test data and database seed scripts using Faker libraries. Use when populating development databases, creating test fixtures, generating demo data with relational integrity, or setting up automated database seeding workflows.
---

# Database Seed Skill

A guide to creating realistic test data and database seed scripts with Faker libraries.

## When to use this skill

- To populate a development database with realistic data
- To create automated test fixtures
- To prepare sample data for a demo application
- To automate database setup in a CI/CD pipeline

---

## 1. JavaScript/TypeScript — @faker-js/faker

### Installation

```bash
npm install --save-dev @faker-js/faker
```

### Basic Usage

```typescript
import { faker } from '@faker-js/faker'

// Generate a single record
const user = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  createdAt: faker.date.past({ years: 2 }),
}

// Multiple records (50 users)
const users = Array.from({ length: 50 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(['admin', 'user', 'guest']),
  isActive: faker.datatype.boolean({ probability: 0.8 }),
  createdAt: faker.date.past({ years: 2 }),
}))
```

### Turkish Data

```typescript
import { faker, fakerTR } from '@faker-js/faker'

const turkishUser = {
  name: fakerTR.person.fullName(),
  city: fakerTR.location.city(),
  phone: fakerTR.phone.number('+90 5## ### ## ##'),
}
```

---

## 2. Relational Integrity

```typescript
import { faker } from '@faker-js/faker'

// Create parent records first
const users = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
}))

// Then link child records to parents
const departments = ['Engineering', 'Design', 'Marketing', 'Sales']
const employees = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  userId: faker.helpers.arrayElement(users).id, // Link to an existing user
  department: faker.helpers.arrayElement(departments),
  salary: faker.number.int({ min: 50000, max: 200000 }),
  startDate: faker.date.past({ years: 5 }),
}))

// Orders → Users + Products relationship
const orders = Array.from({ length: 200 }, () => {
  const user = faker.helpers.arrayElement(users)
  const itemCount = faker.number.int({ min: 1, max: 5 })
  return {
    id: faker.string.uuid(),
    userId: user.id,
    status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered']),
    total: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
    createdAt: faker.date.past({ years: 1 }),
    items: Array.from({ length: itemCount }, () => ({
      productId: faker.string.uuid(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: faker.number.float({ min: 5, max: 100, fractionDigits: 2 }),
    })),
  }
})
```

---

## 3. SQL Seed Script

```typescript
import { faker } from '@faker-js/faker'
import { writeFileSync } from 'fs'

function escapeStr(str: string): string {
  return str.replace(/'/g, "''")
}

const users = Array.from({ length: 50 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  createdAt: faker.date.past({ years: 2 }).toISOString(),
}))

const sql = `
-- Seed data generated ${new Date().toISOString()}
BEGIN;

TRUNCATE TABLE users RESTART IDENTITY CASCADE;

INSERT INTO users (id, name, email, created_at) VALUES
${users.map((u) => `  ('${u.id}', '${escapeStr(u.name)}', '${u.email}', '${u.createdAt}')`).join(',\n')};

COMMIT;
`

writeFileSync('seed.sql', sql)
console.log(`Generated ${users.length} users → seed.sql`)
```

---

## 4. Prisma Seed

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear and recreate users
  await prisma.user.deleteMany()

  const users = await Promise.all(
    Array.from({ length: 30 }, () =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          role: faker.helpers.arrayElement(['ADMIN', 'USER']),
        },
      }),
    ),
  )

  // Create 1–5 posts for each user
  for (const user of users) {
    const postCount = faker.number.int({ min: 1, max: 5 })
    await Promise.all(
      Array.from({ length: postCount }, () =>
        prisma.post.create({
          data: {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(3),
            published: faker.datatype.boolean({ probability: 0.7 }),
            authorId: user.id,
          },
        }),
      ),
    )
  }

  console.log(`✅ Seeded ${users.length} users with posts`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

```json
// package.json
{
  "prisma": {
    "seed": "ts-node --transpile-only prisma/seed.ts"
  }
}
```

```bash
npx prisma db seed
```

---

## 5. Firestore Seed Example

```typescript
// Example location: scripts/seed-firestore.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, writeBatch, doc } from 'firebase/firestore'
import { faker } from '@faker-js/faker'

const app = initializeApp({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // other configuration...
})
const db = getFirestore(app)

async function seedCvs(userId: string, count: number = 5) {
  const batch = writeBatch(db)

  for (let i = 0; i < count; i++) {
    const cvRef = doc(collection(db, 'cvs'))
    batch.set(cvRef, {
      userId,
      title: `${faker.person.jobTitle()} CV`,
      summary: faker.lorem.paragraph(),
      skills: faker.helpers.arrayElements(['TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Docker', 'AWS'], {
        min: 3,
        max: 6,
      }),
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: new Date(),
    })
  }

  await batch.commit()
  console.log(`✅ Seeded ${count} CVs for user ${userId}`)
}

// Run
seedCvs('test-user-id', 10)
```

---

## 6. Best Practices

```typescript
// 1. Make seed data deterministic (same seed = same data)
faker.seed(12345)
const user = { name: faker.person.fullName() } // Same on every run

// 2. Idempotent seed — can be run multiple times
await prisma.user.upsert({
  where: { email: 'admin@example.com' },
  update: {},
  create: { email: 'admin@example.com', name: 'Admin' },
})

// 3. Environment check
if (process.env.NODE_ENV === 'production') {
  throw new Error('The seed script cannot run in production!')
}

// 4. Batch processing (for large datasets)
const BATCH_SIZE = 100
for (let i = 0; i < 1000; i += BATCH_SIZE) {
  const batch = Array.from({ length: BATCH_SIZE }, () => createUser())
  await db.users.createMany({ data: batch })
  console.log(`Progress: ${i + BATCH_SIZE}/1000`)
}
```

---

## 7. Common Faker Categories

| Category     | Examples                                         |
| ------------ | ------------------------------------------------ |
| **person**   | `fullName()`, `firstName()`, `jobTitle()`        |
| **internet** | `email()`, `url()`, `password()`, `userAgent()`  |
| **phone**    | `number()`                                       |
| **location** | `city()`, `country()`, `zipCode()`, `latitude()` |
| **lorem**    | `sentence()`, `paragraph()`, `words()`           |
| **date**     | `past()`, `future()`, `between()`, `recent()`    |
| **number**   | `int()`, `float()`, `binary()`                   |
| **string**   | `uuid()`, `alphanumeric()`, `nanoid()`           |
| **helpers**  | `arrayElement()`, `arrayElements()`, `shuffle()` |
| **datatype** | `boolean()`                                      |
| **image**    | `url()`, `avatar()`                              |
