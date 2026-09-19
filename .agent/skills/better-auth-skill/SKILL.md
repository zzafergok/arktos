---
name: better-auth-skill
description: "Integrate Better Auth in TypeScript applications, including email and password, OAuth, two-factor authentication, passkeys, organizations, sessions, adapters, and migrations. Use only for projects that have selected or are evaluating Better Auth."
---

# Better Auth Skill

A guide to integrating the TypeScript-first, framework-agnostic authentication framework. First verify that the current project actually uses or is evaluating Better Auth; do not replace a different authentication solution on your own.

Official documentation: https://better-auth.com/docs

---

## 1. Quick Start

### Installation

```bash
npm install better-auth
```

### Environment Variables

```bash
BETTER_AUTH_SECRET=min-32-character-secret  # openssl rand -base64 32
BETTER_AUTH_URL=https://example.com
```

Define `baseURL` and `secret` in the configuration only when the environment variables are not set.

### CLI Commands

```bash
npx @better-auth/cli@latest generate      # Generate a schema for Prisma/Drizzle
npx @better-auth/cli@latest migrate       # Apply the schema (built-in adapter)
```

**Run the CLI again after adding a plugin.**

---

## 2. Basic Configuration

```typescript
// lib/auth.ts
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({ to: user.email, subject: 'Password Reset', body: url })
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Refresh once a day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },

  plugins: [],
})
```

---

## 3. Feature Selection Matrix

| Feature                | Plugin Required  | Usage                  |
| ---------------------- | ---------------- | ---------------------- |
| Email/Password         | No (built-in)    | Basic auth             |
| OAuth (GitHub, Google) | No (built-in)    | Social login           |
| Email Verification     | No (built-in)    | Email verification     |
| Password Reset         | No (built-in)    | Password reset         |
| Two-Factor Auth (TOTP) | `twoFactor`      | Advanced security      |
| Passkeys/WebAuthn      | `passkey`        | Passwordless           |
| Magic Link             | `magicLink`      | Email-based login      |
| Username Auth          | `username`       | Username login         |
| Organizations          | `organization`   | Multi-tenant           |
| Rate Limiting          | No (built-in)    | Abuse prevention       |

---

## 4. Route Handler (Next.js)

```typescript
// app/api/auth/[...all]/route.ts
import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

export const { GET, POST } = toNextJsHandler(auth)
```

---

## 5. Client Usage

```typescript
// lib/auth-client.ts
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
})

export const { signIn, signUp, signOut, useSession } = authClient
```

```typescript
// components/LoginButton.tsx
'use client'
import { authClient } from '@/lib/auth-client'

export function LoginButton() {
  const { data: session } = authClient.useSession()

  if (session) {
    return (
      <div>
        <span>{session.user.name}</span>
        <button onClick={() => authClient.signOut()}>Sign Out</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => authClient.signIn.social({ provider: 'google' })}>
        Sign In with Google
      </button>
      <button onClick={() => authClient.signIn.social({ provider: 'github' })}>
        Sign In with GitHub
      </button>
    </div>
  )
}
```

---

## 6. Session Management

### Storage Priority

1. If `secondaryStorage` is defined → the session goes there (not to the database)
2. `session.storeSessionInDatabase: true` → also save it to the database
3. No database + `cookieCache` → completely stateless

### Cookie Cache Strategies

| Strategy               | Description      | Size         |
| ---------------------- | ---------------- | ------------ |
| `compact` (default)    | Base64url + HMAC | Smallest     |
| `jwt`                  | Standard JWT     | Readable     |
| `jwe`                  | Encrypted        | Maximum security |

---

## 7. Plugin Examples

```typescript
// ✅ Use the plugin-name path for tree shaking
import { twoFactor } from 'better-auth/plugins/two-factor'
import { organization } from 'better-auth/plugins/organization'
import { admin } from 'better-auth/plugins/admin'
import { passkey } from 'better-auth/plugins/passkey'

export const auth = betterAuth({
  plugins: [twoFactor(), organization(), admin(), passkey()],
})
```

---

## 8. Database Hooks

```typescript
export const auth = betterAuth({
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return { data: { ...user, role: 'user' } }
        },
        after: async (user) => {
          await sendWelcomeEmail(user.email)
        },
      },
    },
  },
})
```

---

## 9. Middleware Protection (Next.js)

```typescript
// middleware.ts
import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
}
```

---

## 10. Type Safety

```typescript
// Server-side session type
type Session = typeof auth.$Infer.Session
type User = typeof auth.$Infer.Session.user

// If the project has separate client and server applications
import { createAuthClient } from 'better-auth/react'
import type { auth } from './server/auth'

const authClient = createAuthClient<typeof auth>()
```

---

## 11. Implementation Checklist

- [ ] The `better-auth` package is installed
- [ ] The `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` environment variables are set
- [ ] The auth server instance is created (with database configuration)
- [ ] The schema migration is run (`npx @better-auth/cli generate`)
- [ ] The API handler is mounted
- [ ] The client instance is created
- [ ] The sign-up/sign-in UI is implemented
- [ ] Session management is added to components
- [ ] Protected routes / middleware are configured
- [ ] Plugins are added (regenerate the schema after adding them)
- [ ] Email delivery is configured (verification/reset)
- [ ] Rate limiting is enabled for production

---

## 12. Common Errors

1. **Model vs. table name**: The configuration uses the ORM model name, not the database table name
2. **Plugin schema**: Run the CLI again after adding a plugin
3. **Secondary storage**: The session goes there by default, not to the database
4. **Cookie cache**: Custom session fields are not cached and are always fetched again
5. **Email verification**: It does not work unless `sendVerificationEmail` is defined
6. **Import path**: Use `better-auth/plugins/plugin-name`, not `better-auth/plugins`

---

## 13. Resources

- Official Docs: https://better-auth.com/docs
- Options Reference: https://better-auth.com/docs/reference/options
- Plugins: https://better-auth.com/docs/plugins
- GitHub: https://github.com/better-auth/better-auth
