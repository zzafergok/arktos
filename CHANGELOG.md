# Changelog

## [2.0.1] - 2026-09-26

### 🐛 Bug Fixes & Template Refinements

- **TypeScript Compilation:** Fixed Express 5 `req.params.token` array/string union type conflict in `auth.controller.ts` and missing user relation property inference.
- **Express 5 Portability:** Explicitly typed `Express` application and `Router` instances in `src/app.ts` and `src/routes/`, fixing `TS2742` declaration errors.
- **Backend Application tsconfig:** Disabled declaration generation (`declaration: false`) in template `tsconfig.json` suited for application builds.
- **pnpm v12 Build Compatibility:** Added template `pnpm-workspace.yaml` with pre-approved Prisma build scripts (`allowBuilds`) to prevent `ERR_PNPM_IGNORED_BUILDS`.
- **ESLint v9 Configuration:** Added `files: ['src/**/*.ts', 'src/**/*.js']` to `eslint.config.js` to ensure TypeScript files are properly linted.

## [2.0.0] - 2026-09-26

### ⚖️ Licensing & Commercial Protection

- Transitioned Arktos to **Business Source License 1.1 (BSL 1.1)**.
- Free for evaluation, non-commercial, personal projects, education, and internal development.
- Commercial deployments, production use, and client projects require a commercial license from the author. Converts to Apache 2.0 / MIT on 2030-01-01.

### 🏗️ Turborepo Monorepo Architecture

- Restructured Arktos into a high-performance Turborepo & pnpm monorepo with dedicated `packages/cli` publishing root.
- Isolated backend template into `packages/cli/templates/backend`, completely resolving previous TypeScript root compilation conflicts.
- Added strict bundle size checking (`pack:check`) and multi-stage smoke testing (`test:smoke`).

### 🚀 CLI & Scaffolding Modernization

- Modernized `create-arktos` CLI to modern ESM architecture with `commander`, `ora`, and `chalk`.
- Fixed critical template copying bug where `src/` directory structure was flattened into root.
- Added native package manager detection preferring `pnpm`, with support for `bun`, `yarn`, and `npm`.
- Interactive prompts, colorful status output, and ready-to-run onboarding instructions.

### 🛡️ Backend Template Enhancements

- Verified and hardened TypeScript, Express.js, Prisma ORM (Neon PostgreSQL), and JWT authentication flow.
- Added structured request validation with Zod and Winston logging.
- Production-ready security headers with Helmet and DDoS protection with Express Rate Limit.
- Integrated Resend email service templates.

---

## [1.5.1] - 2025-09-15

- Legacy release with initial CLI scaffolding.
