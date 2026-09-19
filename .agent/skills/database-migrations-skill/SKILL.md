---
name: database-migrations-skill
description: SQL database migration strategies with zero-downtime deployment, rollback plans, and data integrity validation for PostgreSQL, MySQL, and SQL Server. Use when designing schema changes, adding columns/indexes, renaming tables, or planning production migrations with minimal downtime.
---

# Database Migrations Skill

Zero-downtime SQL database migration strategies for PostgreSQL, MySQL, and SQL Server.

---

## 1. Core Principles

Answer these four questions for every production migration:

1. **Is it backward compatible?** — Can the old code work with the new schema?
2. **Is there a rollback plan?** — Can it be reverted if a problem occurs?
3. **Is it a large table?** — How many seconds will the lock last?
4. **Is there a risk of data loss?** — What data validation should be performed?

---

## 2. Expand-Contract Pattern (Zero Downtime)

The standard approach for large schema changes consists of three phases.

### Phase 1 — Expand

Add the new structure and preserve the old one:

```sql
-- Add the new column as NULL (minimal lock)
ALTER TABLE users ADD COLUMN display_name VARCHAR(255);

-- Backfill existing data in batches
UPDATE users
SET display_name = full_name
WHERE display_name IS NULL
  AND id BETWEEN :start AND :end;
```

### Phase 2 — Migrate (Application Transition)

Update the application code to read and write the new column while continuing to write the old column.

### Phase 3 — Contract

Remove the old column:

```sql
-- Add the constraint first
ALTER TABLE users ALTER COLUMN display_name SET NOT NULL;

-- Then remove the old column
ALTER TABLE users DROP COLUMN full_name;
```

---

## 3. Common Migration Patterns

### Adding a DEFAULT to a Column (PostgreSQL)

```sql
-- ❌ Locks the entire table (dangerous on large tables)
ALTER TABLE orders ADD COLUMN status VARCHAR(50) DEFAULT 'pending' NOT NULL;

-- ✅ Safe: add it as nullable, then backfill, then add the constraint
ALTER TABLE orders ADD COLUMN status VARCHAR(50);
UPDATE orders SET status = 'pending' WHERE status IS NULL;
ALTER TABLE orders ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE orders ALTER COLUMN status SET NOT NULL;
```

### Creating an Index (Without Locking)

```sql
-- ❌ Locks the table
CREATE INDEX idx_users_email ON users(email);

-- ✅ CONCURRENTLY — without locking (slower but safe)
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

### Renaming a Table

```sql
-- Phase 1: Create the new table
CREATE TABLE user_profiles AS SELECT * FROM users WHERE 1=0;

-- Phase 2: Keep it synchronized with a trigger
CREATE OR REPLACE FUNCTION sync_user_profiles()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles VALUES (NEW.*) ON CONFLICT DO UPDATE SET ...;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_on_user_change
AFTER INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION sync_user_profiles();

-- Phase 3: Backfill
INSERT INTO user_profiles SELECT * FROM users;

-- Phase 4: Transition the application, remove the trigger, and delete the old table
```

### Adding a Foreign Key

```sql
-- ❌ Validation creates a lock
ALTER TABLE orders ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);

-- ✅ Add with NOT VALID, then validate
ALTER TABLE orders
  ADD CONSTRAINT fk_user
  FOREIGN KEY (user_id) REFERENCES users(id)
  NOT VALID;

-- Validate in a separate transaction (AccessShareLock — lighter)
ALTER TABLE orders VALIDATE CONSTRAINT fk_user;
```

---

## 4. Rollback Strategies

### Add `down` to Every Migration File

```sql
-- V1__add_display_name.sql (up)
ALTER TABLE users ADD COLUMN display_name VARCHAR(255);
CREATE INDEX CONCURRENTLY idx_users_display_name ON users(display_name);

-- V1__add_display_name.down.sql (rollback)
DROP INDEX CONCURRENTLY IF EXISTS idx_users_display_name;
ALTER TABLE users DROP COLUMN IF EXISTS display_name;
```

### Back Up Migrations That Risk Data Loss

```sql
-- Create a snapshot table before the migration
CREATE TABLE users_backup_20240315 AS SELECT * FROM users;

-- Validate after the migration
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM users_backup_20240315;
-- The counts must match

-- Delete the backup after approval (after a defined period)
DROP TABLE users_backup_20240315;
```

---

## 5. Large-Table Migrations

```sql
-- Batch update — minimize lock duration
DO $$
DECLARE
  batch_size INT := 1000;
  last_id BIGINT := 0;
  max_id BIGINT;
BEGIN
  SELECT MAX(id) INTO max_id FROM users;

  WHILE last_id < max_id LOOP
    UPDATE users
    SET display_name = full_name
    WHERE id > last_id
      AND id <= last_id + batch_size
      AND display_name IS NULL;

    last_id := last_id + batch_size;
    PERFORM pg_sleep(0.1);  -- Prevent replication lag
  END LOOP;
END $$;
```

---

## 6. Pre/Post Migration Validation

```sql
-- Pre-migration: Record the current state
SELECT
  COUNT(*) AS total_rows,
  COUNT(email) AS email_count,
  COUNT(DISTINCT user_id) AS unique_users
FROM orders
INTO migration_baseline;

-- Post-migration: Compare
SELECT
  (SELECT COUNT(*) FROM orders) = baseline.total_rows AS row_count_ok,
  (SELECT COUNT(DISTINCT user_id) FROM orders) = baseline.unique_users AS users_ok
FROM migration_baseline baseline;
```

---

## 7. Migration Tools

| Tool              | Stack              | Feature                             |
| ----------------- | ------------------ | ----------------------------------- |
| Flyway            | Java/Kotlin/Node   | Versioned migrations, SQL-first     |
| Liquibase         | Java               | XML/YAML/JSON/SQL, rollback support |
| Prisma Migrate    | Node.js/TypeScript | ORM integration                     |
| Drizzle Kit       | Node.js/TypeScript | TypeScript-first                    |
| `node-pg-migrate` | Node.js            | Minimal, PostgreSQL-focused         |

---

## 8. Production Deployment Checklist

Checklist before production deployment:

- [ ] A migration dry run was performed in the staging environment
- [ ] Estimated lock time was calculated (CONCURRENTLY was used for large tables)
- [ ] The rollback script is ready and tested
- [ ] A pre-migration backup or snapshot was created
- [ ] A maintenance window was planned, if needed
- [ ] Post-migration validation queries are ready
- [ ] Monitoring and alerting are active
- [ ] The application is backward compatible with the new and old schemas

---

## 9. Cautions

**Never:**

- Run `DROP TABLE` or `DROP COLUMN` directly in production (use expand-contract first)
- Backfill data in a large table without a `NOT NULL` constraint plan
- Keep a long-running transaction open during a migration
- Run DDL without configuring a lock timeout

**PostgreSQL-specific:**

```sql
-- Set a lock timeout — fail instead of waiting a long time
SET lock_timeout = '5s';

-- Statement timeout — stop long-running queries
SET statement_timeout = '30s';
```
