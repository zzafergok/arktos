---
name: playwright-skill
description: Browser automation and E2E testing with Playwright. Use when testing web applications, automating browser interactions, validating user flows, checking responsive design, or performing browser-based testing. Auto-detects dev servers and writes clean test scripts.
---

# Playwright Skill — Browser Automation

A guide to web application E2E testing and browser automation with Playwright.

## When to use this skill

- When functionally testing a web application
- When automating user flows
- When checking responsive design
- When testing login flows and form submission
- When taking screenshots for visual verification

---

## 1. Installation

```bash
npm install playwright
npx playwright install chromium
```

---

## 2. Basic Workflow

**Step 1 — Detect the development server:**

```bash
# Check running ports
npx detect-port 3000 3001 3002 4000 8080 | grep -v "available"
```

**Step 2 — Write the test script to `/tmp`:**
Write test files to `/tmp/playwright-test-*.js`, not to the project directory.

**Step 3 — Run:**

```bash
node /tmp/playwright-test-example.js
```

---

## 3. Basic Patterns

### Page Loading and Screenshot

```javascript
const { chromium } = require('playwright')

const TARGET_URL = 'http://localhost:3000'

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 10000 })
    console.log('Title:', await page.title())
    await page.screenshot({ path: '/tmp/screenshot.png', fullPage: true })
    console.log('📸 Screenshot: /tmp/screenshot.png')
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await browser.close()
  }
})()
```

### Form Filling and Submission

```javascript
const { chromium } = require('playwright')

const TARGET_URL = 'http://localhost:3000'

;(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 })
  const page = await browser.newPage()
  await page.goto(`${TARGET_URL}/contact`)

  await page.fill('input[name="name"]', 'Test User')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('textarea[name="message"]', 'Test message')
  await page.click('button[type="submit"]')

  await page.waitForSelector('.success-message')
  console.log('✅ Form submitted successfully')

  await browser.close()
})()
```

### Login Flow Test

```javascript
const { chromium } = require('playwright')

const TARGET_URL = 'http://localhost:3000'

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(`${TARGET_URL}/login`)
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password123')
  await page.click('button[type="submit"]')

  await page.waitForURL('**/dashboard', { timeout: 5000 })
  console.log('✅ Login successful; redirected to dashboard')

  await browser.close()
})()
```

### Responsive Design Test

```javascript
const { chromium } = require('playwright')

const TARGET_URL = 'http://localhost:3000'

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  const viewports = [
    { name: 'Desktop', width: 1440, height: 900 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 },
  ]

  for (const viewport of viewports) {
    console.log(`Testing ${viewport.name} (${viewport.width}x${viewport.height})...`)
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto(TARGET_URL)
    await page.waitForTimeout(500)
    await page.screenshot({
      path: `/tmp/${viewport.name.toLowerCase()}.png`,
      fullPage: true,
    })
    console.log(`  📸 /tmp/${viewport.name.toLowerCase()}.png`)
  }

  await browser.close()
})()
```

### Broken Link Check

```javascript
const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000')

  const links = await page.locator('a[href^="http"]').all()
  const results = { working: 0, broken: [] }

  for (const link of links) {
    const href = await link.getAttribute('href')
    try {
      const response = await page.request.head(href)
      if (response.ok()) {
        results.working++
      } else {
        results.broken.push({ url: href, status: response.status() })
      }
    } catch (e) {
      results.broken.push({ url: href, error: e.message })
    }
  }

  console.log(`✅ Working links: ${results.working}`)
  if (results.broken.length > 0) {
    console.log(`❌ Broken links:`, results.broken)
  }

  await browser.close()
})()
```

### Console Error Monitoring

```javascript
const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })

  await page.goto('http://localhost:3000')
  await page.waitForTimeout(2000)

  if (consoleErrors.length > 0) {
    console.log('🚨 Console errors found:')
    consoleErrors.forEach((err) => console.log(`  - ${err}`))
  } else {
    console.log('✅ No console errors')
  }

  await browser.close()
})()
```

---

## 4. Waiting Strategies

```javascript
// ✅ Good — wait for a state
await page.waitForURL('**/dashboard')
await page.waitForSelector('.success-message')
await page.waitForLoadState('networkidle')
await page.waitForResponse((response) => response.url().includes('/api/'))

// ❌ Bad — fixed timeout (very fragile)
await page.waitForTimeout(3000) // Only when necessary
```

---

## 5. Useful Selectors

```javascript
// Most robust — with test ID
await page.locator('[data-testid="submit-button"]').click()

// With ARIA role
await page.getByRole('button', { name: 'Save' }).click()
await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com')

// With label
await page.getByLabel('Email address').fill('test@example.com')

// With text
await page.getByText('Saved successfully').waitFor()

// CSS selector (more fragile)
await page.locator('button[type="submit"]').click()
```

---

## 6. Application Flow Examples

### File Upload Test

```javascript
const { chromium } = require('playwright')
const path = require('path')

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('http://localhost:3000/upload')

  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.getByRole('button', { name: /upload/i }).click()
  const fileChooser = await fileChooserPromise
  await fileChooser.setFiles(path.join(__dirname, 'fixture.pdf'))

  await page.waitForSelector('[data-testid="upload-success"]', { timeout: 30000 })
  console.log('✅ File upload successful')

  await browser.close()
})()
```

### Long-Running Operation Test

```javascript
;(async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('http://localhost:3000/analyze')
  await page.getByLabel('Input').fill('Example input')
  await page.getByRole('button', { name: /analyze/i }).click()

  await page.getByTestId('analysis-result').waitFor({ timeout: 60000 })
  console.log('✅ Operation completed')

  await browser.close()
})()
```

---

## 7. Tips

- **DEFAULT**: `headless: false` — for visual debugging
- **Test files**: `/tmp/playwright-test-*.js` — do not clutter the project
- **Parameterize the URL**: Use `const TARGET_URL = '...'` in every script
- **Try-catch is required**: For robust automation
- **Use slow motion**: `slowMo: 100` — makes actions easier to observe
- **Do not use fixed timeouts**: Prefer `waitForSelector` and `waitForURL`
