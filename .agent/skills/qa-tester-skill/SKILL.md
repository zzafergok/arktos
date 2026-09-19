---
name: qa-tester-skill
description: Systematically test web applications for functionality, security, and usability issues using browser automation. Reports findings by severity (CRITICAL/HIGH/MEDIUM/LOW) with immediate alerts for critical failures. Use when testing web apps, validating user flows, conducting security checks, or performing pre-deployment audits.
---

# QA Tester Skill — Browser Automation

A guide to systematically testing web applications and reporting findings by severity.

## When to use this skill

- When functionally testing web applications
- When performing a pre-deployment security audit
- When validating user flows
- When checking accessibility or responsive design

---

## 1. CRITICAL ERROR PROTOCOL

**If you find any of the following, STOP THE ENTIRE TEST IMMEDIATELY:**

- The server crashed or failed completely
- Database connection errors
- An API key, token, or password is visible in HTML/JS
- Authentication bypass — access to protected areas without signing in
- Data corruption or loss

**Critical error format:**

```
🚨 CRITICAL ERROR FOUND — TEST STOPPED

Title: [Brief description]
Severity: CRITICAL
Component: [Which section]

WHAT HAPPENED:
[Explain the error]

STEPS TO REPRODUCE:
1. [Step 1]
2. [Step 2]
3. [Error occurs]

CONSOLE LOGS:
[Paste all console errors]

HYPOTHESIS AND ANALYSIS:
- Possible cause: [Theory 1]
- Where to look: [Specific file/area]
- Suggested quick fix: [If any]

NEXT STEPS:
- Testing cannot continue until this issue is fixed
```

---

## 2. Test Phases

| Phase     | Stage               | Duration | Focus                          |
| --------- | ------------------- | -------- | ------------------------------ |
| **Phase 1** | MVP / New app     | 30–60 min | Does the core work?          |
| **Phase 2** | Beta / Pre-launch | 2–4 hours | Comprehensive functionality + security |
| **Phase 3** | Production-ready  | 4–8 hours | Edge cases, stress, final audit |

---

## 3. Phase 1 — Early-Stage Test Checklist (30–60 min)

### A. Initial Load (5 min)

```typescript
await page.goto(url)
// Check console errors
page.on('console', (msg) => {
  if (msg.type() === 'error') console.log('ERROR:', msg.text())
})
```

Check:

- [ ] Does the page load?
- [ ] Are there red errors in the console? (STOP if critical)
- [ ] Is the text visible and readable?

### B. Navigation (10 min)

```typescript
const buttons = await stagehand.observe('find all navigation buttons and links')
for (const button of buttons) {
  await stagehand.act(button)
}
```

- [ ] All navigation buttons and links work
- [ ] Every link performs an action (red error → CRITICAL)

### C. Core Function (20 min)

```typescript
await stagehand.act('use the main feature')
```

- [ ] The primary user action works
- [ ] All visible buttons perform an action
- [ ] Form inputs are validated

### D. Quick Security Check (10 min)

```typescript
const html = await page.content()
const secretPatterns = [
  /AKIA[0-9A-Z]{16}/g,          // AWS Key
  /sk_live_[a-zA-Z0-9]{24,}/g,  // Stripe Secret
  /api[_-]?key['"]?\s*[:=]/gi,  // Generic API key
  /eyJ[a-zA-Z0-9_-]*\.eyJ/g,    // JWT token
]
for (const pattern of secretPatterns) {
  const matches = html.match(pattern)
  if (matches) {
    console.log('🚨 CRITICAL: Secret found in HTML!', matches)
  }
}
```

- [ ] No secrets in HTML (API key, token, password)
- [ ] No sensitive data in localStorage
- [ ] Cookies are secure

### E. Responsive Check (5 min)

```typescript
await page.setViewportSize({ width: 375, height: 667 })
await page.screenshot({ path: '/tmp/mobile.png' })
```

- [ ] Content is visible in the mobile view
- [ ] No horizontal scrolling

---

## 4. Phase 2 — Additional Comprehensive Test Checklist

### Authentication and Authorization

```typescript
// Attempt to access a protected page without signing in
await page.goto(`${url}/dashboard`)
const redirected = page.url().includes('/login')
if (!redirected) console.log('⚠️ Auth bypass: /dashboard is accessible without signing in!')
```

- [ ] Access to protected pages without signing in is blocked
- [ ] Admin pages are inaccessible to regular users
- [ ] The session is cleared on logout

### XSS Testi

```typescript
const xssPayloads = ['<script>alert("XSS")</script>', '<img src=x onerror=alert("XSS")>', 'javascript:alert("XSS")']
for (const payload of xssPayloads) {
  await stagehand.act(`enter '${payload}' into the input field`)
}
```

- [ ] The script is not executed (HIGH → CRITICAL if user-facing)

### SQL Injection Testi

```typescript
const sqlPayloads = ["' OR '1'='1", "'; DROP TABLE users--", "1' UNION SELECT NULL--"]
```

- [ ] SQL injection does not work (CRITICAL)

### Performans

```typescript
const start = Date.now()
await page.goto(url, { waitUntil: 'networkidle' })
const loadTime = Date.now() - start
if (loadTime > 3000) console.log(`⚡ MEDIUM: Load time ${loadTime}ms (>3s)`)
if (loadTime > 10000) console.log(`⚠️ HIGH: Load time ${loadTime}ms (>10s)`)
```

### Security Headers

```typescript
const response = await page.goto(url)
const headers = response.headers()
const required = ['content-security-policy', 'x-frame-options', 'strict-transport-security']
for (const header of required) {
  if (!headers[header]) console.log(`⚡ MEDIUM: Missing header: ${header}`)
}
```

### Accessibility

```typescript
// Check alt text
const images = await page.evaluate(() => Array.from(document.images).map((img) => ({ src: img.src, alt: img.alt })))
const missingAlt = images.filter((img) => !img.alt)
if (missingAlt.length) console.log('ℹ️ LOW: Images missing alt text:', missingAlt)
```

---

## 5. Severity Guide

### 🚨 CRITICAL — Stop Testing Immediately

- Server crashed / does not start
- Database connection error
- Authentication bypass
- API key/secret visible in HTML
- SQL injection vulnerability
- Data loss or corruption

### ⚠️ HIGH — Report Urgently, Continue Testing

- Core feature does not work at all
- XSS or CSRF vulnerability
- Login is broken for some users
- Admin area is accessible without authorization
- HTTPS is not enforced

### ⚡ MEDIUM — Document and Continue

- Non-critical feature is broken
- Poor error messages
- Performance over 3 seconds
- Major UI alignment issue
- Missing input validation

### ℹ️ LOW — Note in the Report

- Typos
- Minor color contrast issues
- Missing tooltip
- Minor responsive issue
- Non-blocking console warnings

---

## 6. Report Template

### Individual Finding Format

```markdown
## Finding #[N]: [Short Title]

**Severity**: [CRITICAL/HIGH/MEDIUM/LOW]
**Component**: [Login, Checkout, Navigation...]
**Category**: [Security/Functionality/UX/Performance/Accessibility]

### Description

[Clear description]

### Reproduction

1. [Step 1]
2. [Step 2]
3. [Issue occurs]

### Expected Behavior

[What should have happened]

### Actual Behavior

[What happened]

### Analysis and Hypothesis

- Possible cause: [Theory]
- Where to look: [File/component]

### Recommendation

[How to fix it — be specific]
```

### Final Report Format

```markdown
# QA Test Report — [Application Name]

**Date**: [Date]
**Phase**: [1/2/3]
**URL**: [Test URL]

## Summary

- Total Findings: [N]
- Critical: [N] 🚨
- High: [N] ⚠️
- Medium: [N] ⚡
- Low: [N] ℹ️

**Recommendation**: [GO / NO-GO / CONDITIONAL GO]

## Critical Findings 🚨

[List if any]

## High-Priority Findings ⚠️

[List if any]

## Medium-Priority Findings ⚡

[List if any]

## Low-Priority Findings ℹ️

[List if any]

## Test Scope

### ✅ Tested Areas

- [Area 1]

### ❌ Untested Areas

- [Area 1]

## Recommendations

### Immediate (Before Launch)

1. ...

### Short-Term (1 month)

1. ...
```

---

## 7. Quick Reference

```
Decision tree:
- Application crashed?       → CRITICAL, STOP
- Secret exposed?            → CRITICAL, STOP
- Core feature broken?       → HIGH
- Security vulnerability?    → HIGH
- Feature partially working? → MEDIUM
- UI issue?                  → LOW/MEDIUM
- Typo?                      → LOW

CRITICAL ERROR = ALL TESTING STOPS
```
