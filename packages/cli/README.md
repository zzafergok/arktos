# ❄️ create-arktos

> **Production-ready Node.js & TypeScript backend boilerplate generator with Express 5, JWT authentication, Prisma 6 ORM, PostgreSQL (Neon), and Resend.**

[![npm version](https://img.shields.io/npm/v/create-arktos.svg)](https://www.npmjs.com/package/create-arktos)
[![License: BSL 1.1](https://img.shields.io/badge/License-BSL%201.1-blue.svg)](./LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)

---

## ⚡ Quick Start

Create a production-grade backend API in seconds:

### Using pnpm (Recommended)

```bash
pnpm create arktos my-api
```

### Using npx

```bash
npx create-arktos my-api
```

### Using bun

```bash
bun create arktos my-api
```

---

## 🚀 Getting Started with Your New Project

```bash
# 1. Navigate to your project
cd my-api

# 2. Configure environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL (Neon / PostgreSQL), JWT_SECRET, and RESEND_API_KEY

# 3. Install dependencies
pnpm install

# 4. Run database migrations
pnpm dlx prisma migrate dev

# 5. (Optional) Seed initial data
pnpm db:seed

# 6. Start development server
pnpm dev
```

Your API is live and hot-reloading at **`http://localhost:3001`** 🚀

---

## 🌟 What's Inside

- **⚡ Express 5 & TypeScript 5**: Type-safe REST APIs with clean layered architecture.
- **🔐 Enterprise Authentication**: Access & refresh tokens, password hashing (bcrypt), email verification, and password reset flows.
- **🗄️ Prisma ORM & PostgreSQL**: Neon serverless ready, migration pipelines, and type-safe database clients.
- **📧 Resend Integration**: Transactional emails with responsive HTML templates.
- **🛡️ Production Security**: Helmet HTTP headers, CORS whitelisting, IP rate limiting, and Zod input validation.
- **📝 Structured Logging**: Winston logger with log levels and formatted outputs.

---

## 🛠️ CLI Options

```bash
create-arktos [project-directory] [options]

Options:
  -v, --version           Display create-arktos version
  --skip-git              Skip automatic git repository initialization
  --skip-update-check     Skip checking for npm updates
  --package-manager <pm>  Specify package manager (pnpm, bun, yarn, npm)
  --verbose               Show detailed debug logs
  -h, --help              Display help
```

---

## 📄 License

This project is licensed under the **Business Source License 1.1 (BSL 1.1)**.

- Free for evaluation, personal, educational, internal development, and non-commercial use.
- Commercial or production deployments require a commercial license agreement with the author.
- On **January 1, 2030**, the license automatically converts to **Apache 2.0 / MIT**.

For commercial inquiries: [gok.zaferr@gmail.com](mailto:gok.zaferr@gmail.com) | [GitHub @zzafergok](https://github.com/zzafergok)
