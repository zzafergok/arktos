#!/usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import fs from 'fs-extra';
import { program } from 'commander';
import ora from 'ora';
import chalk from 'chalk';

import { normalizeProjectName, validateProjectName } from './cli/project-name.js';
import { detectPackageManager, getPackageManagerCommands } from './cli/package-manager.js';
import {
  copyTemplateFiles,
  customizePackageJson,
  initializeGit,
  checkForUpdates,
} from './cli/generator.js';
import { printBanner, promptProjectName, promptOverwrite, printSuccess } from './cli/ui.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const { version: PACKAGE_VERSION } = require('./package.json');
const templatesDir = path.join(__dirname, 'templates');

program
  .name('create-arktos')
  .description('❄️  Arktos: Production-ready Node.js & TypeScript Backend Boilerplate Generator')
  .version(PACKAGE_VERSION, '-v, --version')
  .argument('[project-directory]', 'Target directory for the generated backend project')
  .option('--skip-git', 'Skip git repository initialization')
  .option('--skip-update-check', 'Skip checking for a newer version')
  .option('--package-manager <pm>', 'Specify package manager (pnpm, bun, yarn, npm)')
  .option('--verbose', 'Show detailed debug output')
  .action(async (projectDirArg, options) => {
    let updatePromise = null;
    if (!options.skipUpdateCheck) {
      updatePromise = checkForUpdates(PACKAGE_VERSION).catch(() => null);
    }

    try {
      // 1. Resolve Project Name and Destination Directory
      let projectName = null;
      let targetDir = null;

      if (projectDirArg) {
        targetDir = path.resolve(process.cwd(), projectDirArg);
        projectName = path.basename(targetDir);

        const validation = validateProjectName(projectName);
        if (!validation.isValid) {
          console.error(
            chalk.red(`\n✖ Invalid project name "${projectName}": ${validation.message}\n`)
          );
          process.exit(1);
        }
        if (validation.normalizedName && validation.normalizedName !== projectName) {
          projectName = validation.normalizedName;
          targetDir = path.join(path.dirname(targetDir), projectName);
        }
      } else {
        printBanner(PACKAGE_VERSION);
        const promptedName = await promptProjectName();
        if (!promptedName) {
          console.log(chalk.gray('\nOperation cancelled.\n'));
          process.exit(0);
        }
        projectName = normalizeProjectName(promptedName);
        targetDir = path.resolve(process.cwd(), projectName);
      }

      // 2. Check Directory Overwrite
      if (await fs.pathExists(targetDir)) {
        const existingFiles = await fs.readdir(targetDir);
        if (existingFiles.length > 0) {
          const shouldOverwrite = await promptOverwrite(projectName);
          if (!shouldOverwrite) {
            console.log(chalk.gray('\nOperation cancelled.\n'));
            process.exit(0);
          }
          await fs.emptyDir(targetDir);
        }
      } else {
        await fs.ensureDir(targetDir);
      }

      // 3. Scaffolding Pipeline
      const spinner = ora({
        text: `Creating ${chalk.cyan(projectName)}...`,
      }).start();

      // Copy template files
      spinner.text = 'Scaffolding Arktos backend template...';
      await copyTemplateFiles(templatesDir, targetDir);

      // Normalize package.json
      spinner.text = 'Configuring backend package.json...';
      await customizePackageJson(targetDir, projectName);

      // Initialize git repository
      if (!options.skipGit) {
        spinner.text = 'Initializing git repository...';
        initializeGit(targetDir);
      }

      spinner.succeed(
        chalk.green(`Arktos backend project "${chalk.bold(projectName)}" successfully created!`)
      );

      // 4. Detect Package Manager & Command Guidance
      const packageManager = options.packageManager || (await detectPackageManager());
      const commands = getPackageManagerCommands(packageManager);

      printSuccess({
        projectName,
        targetDir,
        packageManager,
        commands,
      });

      // 5. Print Update Notification (if available)
      if (updatePromise) {
        const latestVersion = await updatePromise;
        if (latestVersion) {
          console.log(
            chalk.yellow(
              `  💡 A new version (v${latestVersion}) is available! Upgrade with: npm install -g create-arktos@latest\n`
            )
          );
        }
      }
    } catch (error) {
      console.error(chalk.red(`\n✖ Project creation failed: ${error.message}\n`));
      if (options.verbose && error.stack) {
        console.error(chalk.dim(error.stack));
      }
      process.exit(1);
    }
  });

// Custom help layout
program.on('--help', () => {
  console.log(`
${chalk.bold('Examples:')}
  $ npx create-arktos my-api
  $ pnpm create arktos my-api
  $ npm create arktos my-api --skip-git
  $ npx create-arktos my-api --package-manager bun
`);
});

program.parse(process.argv);
