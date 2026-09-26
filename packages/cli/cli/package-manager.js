import { execSync } from 'node:child_process'

/**
 * Modern package manager detection with pnpm-first priority,
 * environment user-agent detection, and bun support.
 */
export async function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent
  if (userAgent) {
    if (userAgent.startsWith('pnpm')) return 'pnpm'
    if (userAgent.startsWith('bun')) return 'bun'
    if (userAgent.startsWith('yarn')) return 'yarn'
    if (userAgent.startsWith('npm')) return 'npm'
  }

  const managers = ['pnpm', 'bun', 'yarn', 'npm']
  for (const pm of managers) {
    try {
      execSync(`${pm} --version`, { stdio: 'ignore' })
      return pm
    } catch {
      // Not installed, try next
    }
  }

  return 'pnpm'
}

export function getPackageManagerCommands(packageManager = 'pnpm') {
  const commands = {
    pnpm: {
      install: 'pnpm install',
      dev: 'pnpm dev',
      build: 'pnpm build',
      start: 'pnpm start',
      migrate: 'pnpm dlx prisma migrate dev',
      seed: 'pnpm db:seed',
    },
    bun: {
      install: 'bun install',
      dev: 'bun dev',
      build: 'bun build',
      start: 'bun start',
      migrate: 'bunx prisma migrate dev',
      seed: 'bun db:seed',
    },
    yarn: {
      install: 'yarn',
      dev: 'yarn dev',
      build: 'yarn build',
      start: 'yarn start',
      migrate: 'yarn prisma migrate dev',
      seed: 'yarn db:seed',
    },
    npm: {
      install: 'npm install',
      dev: 'npm run dev',
      build: 'npm run build',
      start: 'npm start',
      migrate: 'npx prisma migrate dev',
      seed: 'npm run db:seed',
    },
  }

  return commands[packageManager] || commands.pnpm
}
