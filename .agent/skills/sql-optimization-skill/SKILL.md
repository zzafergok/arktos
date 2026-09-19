---
name: sql-optimization-skill
description: Master SQL query optimization, indexing strategies, and EXPLAIN analysis to dramatically improve database performance. Use when debugging slow queries, designing database schemas, optimizing application response times, or working with large datasets. Also applicable to Firestore query optimization patterns.
---

# SQL Optimization Skill

A guide to turning slow queries into fast operations through systematic optimization, correct indexing, and query plan analysis.

## When to use this skill

- When debugging slow queries
- When designing a database schema
- When optimizing application response time
- When solving an N+1 query problem

---

## 1. Query Plan Analysis with EXPLAIN (PostgreSQL)

```sql
-- Basic explain
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';

-- With actual statistics
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'user@example.com';

-- Detailed output
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT u.*, o.order_total
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.created_at > NOW() - INTERVAL '30 days';
```

### Metrics to Monitor

| Metric            | Description             | Status                |
| ----------------- | ----------------------- | --------------------- |
| `Seq Scan`        | Scans the entire table  | Bad on large tables   |
| `Index Scan`      | Uses an index           | Good                  |
| `Index Only Scan` | Index only, no table    | Best                  |
| `Hash Join`       | Joins large datasets    | Good                  |
| `Nested Loop`     | Joins small datasets    | Good; bad at scale    |
| Cost              | Estimated cost          | Lower is better       |

---

## 2. Index Strategies

```sql
-- Standart B-Tree index
CREATE INDEX idx_users_email ON users(email);

-- Composite index (column order matters!)
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Partial index (indexes a subset — highly efficient)
CREATE INDEX idx_active_users ON users(email)
WHERE status = 'active';

-- Expression index
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- Covering index (includes additional columns)
CREATE INDEX idx_users_email_covering ON users(email)
INCLUDE (name, created_at);

-- Full-text search
CREATE INDEX idx_posts_search ON posts
USING GIN(to_tsvector('english', title || ' ' || body));

-- JSONB index
CREATE INDEX idx_metadata ON events USING GIN(metadata);
```

---

## 3. N+1 Query Problem

```python
# ❌ N+1 — a separate query for each user
users = db.query("SELECT * FROM users LIMIT 10")
for user in users:
    orders = db.query("SELECT * FROM orders WHERE user_id = ?", user.id)

# ✅ One query with JOIN
SELECT u.id, u.name, o.id as order_id, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.id IN (1, 2, 3, 4, 5);

# ✅ Batch loading
user_ids = [u.id for u in users]
orders = db.query("SELECT * FROM orders WHERE user_id IN (?)", user_ids)
orders_by_user = {}
for order in orders:
    orders_by_user.setdefault(order.user_id, []).append(order)
```

---

## 4. Cursor-Based Pagination

```sql
-- ❌ OFFSET is slow on large tables
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 20 OFFSET 100000;  -- VERY SLOW!

-- ✅ Cursor-based — always fast
SELECT * FROM users
WHERE created_at < '2024-01-15 10:30:00'  -- Last cursor
ORDER BY created_at DESC
LIMIT 20;

-- For composite sorting
SELECT * FROM users
WHERE (created_at, id) < ('2024-01-15 10:30:00', 12345)
ORDER BY created_at DESC, id DESC
LIMIT 20;

-- Required index
CREATE INDEX idx_users_cursor ON users(created_at DESC, id DESC);
```

---

## 5. Core Optimization Rules

### Do Not Use SELECT \*

```sql
-- ❌ Fetches unnecessary columns
SELECT * FROM users WHERE id = 123;

-- ✅ Only the required columns
SELECT id, email, name FROM users WHERE id = 123;
```

### WHERE Clause Optimization

```sql
-- ❌ The function prevents index usage
SELECT * FROM users WHERE LOWER(email) = 'user@example.com';

-- ✅ Expression index + the same query
CREATE INDEX idx_users_email_lower ON users(LOWER(email));
SELECT * FROM users WHERE LOWER(email) = 'user@example.com';

-- ✅ Direct lookup with normalized data
SELECT * FROM users WHERE email = 'user@example.com';
```

### JOIN Optimization

```sql
-- ❌ Filter after joining
SELECT u.name, o.total
FROM users u, orders o
WHERE u.id = o.user_id AND u.created_at > '2024-01-01';

-- ✅ Filter first, then join
SELECT u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01';
```

---

## 6. Aggregate Optimization

```sql
-- ❌ Slow on large tables
SELECT COUNT(*) FROM orders;

-- ✅ Estimated value (statistics)
SELECT reltuples::bigint AS estimate
FROM pg_class
WHERE relname = 'orders';

-- ✅ Filtered count + index
CREATE INDEX idx_orders_created ON orders(created_at);
SELECT COUNT(*) FROM orders
WHERE created_at > NOW() - INTERVAL '7 days';
```

---

## 7. Batch Operations

```sql
-- ❌ Individual inserts
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');

-- ✅ Bulk insert
INSERT INTO users (name, email) VALUES
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com'),
  ('Carol', 'carol@example.com');

-- ✅ COPY for very large datasets (PostgreSQL)
COPY users (name, email) FROM '/tmp/users.csv' CSV HEADER;

-- ✅ Bulk update
UPDATE users
SET status = 'active'
WHERE id IN (1, 2, 3, 4, 5);
```

---

## 8. Materialized View

```sql
-- Precompute the expensive query
CREATE MATERIALIZED VIEW user_order_summary AS
SELECT
  u.id,
  u.name,
  COUNT(o.id) as total_orders,
  SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Add an index
CREATE INDEX idx_user_summary ON user_order_summary(total_spent DESC);

-- Refresh
REFRESH MATERIALIZED VIEW CONCURRENTLY user_order_summary;

-- Query very quickly
SELECT * FROM user_order_summary WHERE total_spent > 1000;
```

---

## 9. Find Slow Queries

```sql
-- Slowest queries (requires pg_stat_statements)
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Tables with sequential scans (missing an index?)
SELECT tablename, seq_scan, seq_tup_read, idx_scan
FROM pg_stat_user_tables
WHERE seq_scan > 0
ORDER BY seq_tup_read DESC
LIMIT 10;

-- Unused indexes (remove them!)
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;
```

---

## 10. Firestore Optimization Notes

Firestore is not a SQL database, but similar principles apply:

```typescript
// ❌ Fetch all documents and filter on the client
const all = await db.collection('cvs').get()
const filtered = all.docs.filter((d) => d.data().userId === userId)

// ✅ Filter server-side
const filtered = await db.collection('cvs').where('userId', '==', userId).orderBy('createdAt', 'desc').limit(20).get()
```

```typescript
// Queries that require a composite index
// Create the index in the Firestore Console
await db
  .collection('cvs')
  .where('userId', '==', userId)
  .where('status', '==', 'active') // Composite index required
  .orderBy('createdAt', 'desc')
  .get()
```

**Cursor-based pagination in Firestore:**

```typescript
const first = await db.collection('cvs').where('userId', '==', userId).orderBy('createdAt', 'desc').limit(10).get()

const lastDoc = first.docs[first.docs.length - 1]

const next = await db
  .collection('cvs')
  .where('userId', '==', userId)
  .orderBy('createdAt', 'desc')
  .startAfter(lastDoc) // Cursor
  .limit(10)
  .get()
```

---

## 11. Common Mistakes

- **Over-indexing**: Every index slows INSERT/UPDATE/DELETE operations
- **Index not used**: This happens when a function is called on the column (LOWER, UPPER)
- **OR conditions**: They make index usage harder — use UNION
- **Leading wildcard LIKE**: `LIKE '%abc'` cannot use an index
- **Implicit type conversion**: `WHERE id = '123'` (string vs. integer) bypasses the index
