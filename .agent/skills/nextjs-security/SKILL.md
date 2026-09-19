---
name: nextjs-security
description: Design, implement, or audit security and privacy controls in Next.js applications, including authentication, authorization, route handlers, input, uploads, secrets, and personal data. Use for Next.js security work, while verifying current framework behavior and applicable legal requirements rather than treating this skill as compliance certification.
---

# Next.js Security & Privacy Skill

This skill defines best practices and security patterns for building secure, privacy-compliant, and production-ready Next.js applications.

The goal is to minimize vulnerabilities, protect user data, and ensure compliance with modern security standards (OWASP, GDPR, etc.).

This includes application security, API protection, authentication flows, input validation, data privacy, and cryptographic verification.

## When to use this skill

- When building or modifying API routes
- When implementing authentication or authorization systems
- When handling user input or file uploads
- When managing secrets or environment variables
- When building payment or sensitive features
- When processing personal data (especially EU users / GDPR)
- When integrating external services or third-party APIs
- When performing a security audit or pre-deployment review
- When integrating blockchain or wallet-based authentication

## How to use this skill

### 1. Secrets Management

- Never hardcode API keys, tokens, or passwords
- Always use environment variables (`process.env`)
- Ensure `.env` files are ignored in git
- Store production secrets in infrastructure (Vercel, AWS, Railway)
- Validate required env variables at runtime

### 2. Input Validation

- Treat all user input as untrusted
- Validate input using schemas (Zod recommended)
- Prefer whitelist validation over blacklist
- Never rely only on frontend validation
- Return generic validation errors (do not leak internals)

#### File Upload Rules

- Restrict file size (e.g. max 5MB)
- Validate MIME type
- Validate file extension
- Never trust file name alone

### 3. Database & SQL Security

- Never construct SQL queries via string concatenation
- Always use parameterized queries or ORM
- Escape all dynamic inputs
- Apply least privilege access to database users
- Use Row-Level Security where possible (e.g. Supabase)

### 4. Authentication Patterns

- Store tokens in httpOnly cookies (never localStorage)
- Use secure cookie flags (Secure, SameSite=Strict)
- Implement session expiration and rotation
- Protect all sensitive routes with authentication checks
- Never trust client-provided identity data

### 5. Authorization Patterns

- Always enforce authorization on the server
- Implement role-based access control (RBAC)
- Validate ownership of resources (user can only access own data)
- Never rely on frontend checks for authorization
- Deny access by default

### 6. XSS Prevention

- Never render raw user HTML without sanitization
- Use libraries like DOMPurify when needed
- Avoid unnecessary use of `dangerouslySetInnerHTML`
- Escape all dynamic content by default (React already does this)
- Apply Content Security Policy (CSP) headers

### 7. CSRF Protection

- Protect all state-changing requests (POST, PUT, DELETE)
- Use CSRF tokens or built-in protections
- Set cookies with SameSite=Strict or Lax
- Avoid cookie-based auth without CSRF protection

### 8. Rate Limiting & Abuse Prevention

- Apply rate limiting to all public endpoints
- Use stricter limits for:
  - authentication endpoints
  - search endpoints
  - AI or expensive operations
- Implement both IP-based and user-based limiting
- Prevent brute-force attacks

### 9. Error Handling & Logging

- Never expose stack traces to clients
- Return generic error messages
- Log detailed errors only on the server
- Never log sensitive data (passwords, tokens, PII)
- Use structured logging in production

### 10. API Security Design

- Validate input on every request
- Authenticate before processing logic
- Authorize before accessing resources
- Return correct HTTP status codes
- Separate validation, auth, and business logic
- Use middleware for reusable security layers

### 11. GDPR & Privacy Compliance

- Collect only necessary data (data minimization)
- Define a legal basis for processing data
- Store user consent with timestamp and version
- Provide data export (Right of Access)
- Provide data deletion (Right to Erasure)
- Define retention periods and automatic deletion
- Document all data processing activities

#### Required Capabilities

- User data export endpoint
- User data deletion endpoint
- Consent tracking system
- Privacy policy availability

### 12. Data Retention & Minimization

- Store only required fields
- Avoid storing unnecessary metadata (IP, device, etc.)
- Define retention periods for each data type
- Automatically purge expired data
- Preserve only legally required records

### 13. Cryptographic & Blockchain Security

- Verify signatures server-side
- Never trust client-only verification
- Validate transaction details before execution
- Limit transaction amounts
- Check balances before processing
- Never store private keys insecurely
- Avoid single point of failure in key management

### 14. Dependency Security

- Regularly run `npm audit`
- Fix vulnerabilities promptly
- Use lock files for reproducible builds
- Review dependency updates before merging
- Avoid unnecessary dependencies

### 15. Security Testing

- Test unauthenticated access (should fail)
- Test unauthorized roles (should fail)
- Test invalid input (should fail)
- Test rate limiting (should trigger)
- Test edge cases and abuse scenarios

### 16. Pre-Deployment Security Checklist

Before releasing to production, verify:

#### Application Security

- Secrets are secure (no hardcoded values)
- All inputs are validated
- SQL injection is prevented
- XSS protections are in place
- CSRF protection is enabled
- Authentication is enforced
- Authorization is correctly implemented
- Rate limiting is active
- Error handling is safe
- Logs do not contain sensitive data
- File uploads are restricted
- HTTPS is enforced
- Security headers are configured

#### Privacy & GDPR

- Consent is collected and stored
- Data minimization is applied
- Data export works
- Data deletion works
- Retention policies are enforced
- Privacy policy is available

#### Cryptographic Security

- Signatures are verified server-side
- Transactions are validated
- Keys are securely managed

---
