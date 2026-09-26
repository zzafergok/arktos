import chalk from 'chalk'
import prompts from 'prompts'
import { validateProjectName } from './project-name.js'

export function printBanner(version) {
  console.log(`
  ${chalk.blue.bold('❄️  ARKTOS')} ${chalk.dim(`v${version}`)}
  ${chalk.gray('Production-ready Node.js & TypeScript Backend Generator')}
  ${chalk.dim('Express • JWT • Prisma ORM • PostgreSQL • Resend')}
`)
}

export async function promptProjectName(defaultName = 'my-arktos-api') {
  const response = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'What is your backend project named?',
    initial: defaultName,
    validate: (val) => {
      const res = validateProjectName(val)
      return res.isValid ? true : res.message
    },
  })

  return response.projectName
}

export async function promptOverwrite(targetDir) {
  const response = await prompts({
    type: 'confirm',
    name: 'overwrite',
    message: `Directory "${chalk.yellow(targetDir)}" already exists. Overwrite?`,
    initial: false,
  })

  return Boolean(response.overwrite)
}

export function printSuccess({ projectName, targetDir, packageManager, commands }) {
  console.log(`
  ${chalk.green.bold('✔ Success!')} Created ${chalk.cyan.bold(projectName)} at ${chalk.dim(targetDir)}

  ${chalk.bold('Next steps to get started:')}

    ${chalk.cyan(`1. cd ${projectName}`)}
    ${chalk.cyan(`2. cp .env.example .env`)}   ${chalk.dim('# Configure DATABASE_URL, JWT_SECRET, etc.')}
    ${chalk.cyan(`3. ${commands.install}`)}
    ${chalk.cyan(`4. ${commands.migrate}`)}  ${chalk.dim('# Run database migrations')}
    ${chalk.cyan(`5. ${commands.seed}`)}     ${chalk.dim('# (Optional) Seed demo data')}
    ${chalk.cyan(`6. ${commands.dev}`)}      ${chalk.dim('# Start dev server at http://localhost:3001')}

  ${chalk.dim('Repository & issues:')} ${chalk.blue('https://github.com/zzafergok/arktos')}
`)
}
