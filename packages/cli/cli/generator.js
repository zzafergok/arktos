import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'node:child_process';

const GITIGNORE_CONTENT = `# Dependencies
node_modules/
.pnp
.pnp.js

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.database

# Production build
dist/
build/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Testing & Coverage
coverage/
.nyc_output/
*.lcov

# TypeScript cache
*.tsbuildinfo

# OS & Editor
.DS_Store
Thumbs.db
.vscode/
.idea/

# Prisma
# Keep prisma schema and migrations in version control

# Temporary files
tmp/
temp/
*.tgz
`;

/**
 * Filter out development, lock, and cache files from template copying.
 */
function shouldCopyFile(src, sourceDir) {
  const relativePath = path.relative(sourceDir, src);
  const fileName = path.basename(src);
  const segments = relativePath.split(path.sep);

  if (
    segments.includes('node_modules') ||
    segments.includes('dist') ||
    segments.includes('build') ||
    segments.includes('.turbo') ||
    segments.includes('coverage')
  ) {
    return false;
  }

  const excludedFiles = [
    '.DS_Store',
    'Thumbs.db',
    'ehthumbs.db',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    'bun.lockb',
    'bun.lock',
  ];

  if (excludedFiles.includes(fileName)) {
    return false;
  }

  if (relativePath.endsWith('.tgz') || relativePath.endsWith('.tsbuildinfo')) {
    return false;
  }

  return true;
}

/**
 * Copies the backend template into the target directory.
 */
export async function copyTemplateFiles(templatesDir, targetDir) {
  const templateSourceDir = path.join(templatesDir, 'backend');

  if (!(await fs.pathExists(templateSourceDir))) {
    throw new Error(`Template not found at: ${templateSourceDir}`);
  }

  // Copy template files with filtering
  await fs.copy(templateSourceDir, targetDir, {
    filter: src => shouldCopyFile(src, templateSourceDir),
  });

  // Ensure clean .gitignore
  await fs.writeFile(path.join(targetDir, '.gitignore'), GITIGNORE_CONTENT);

  return true;
}

/**
 * Normalizes and configures the generated project's package.json.
 */
export async function customizePackageJson(targetDir, projectName) {
  const packageJsonPath = path.join(targetDir, 'package.json');
  if (!(await fs.pathExists(packageJsonPath))) {
    throw new Error(`package.json not found in target directory: ${targetDir}`);
  }

  const packageJson = await fs.readJson(packageJsonPath);

  packageJson.name = projectName;
  packageJson.version = '0.1.0';
  packageJson.private = true;
  packageJson.description = `${projectName} - Production backend API built with Arktos`;

  // Remove monorepo/cli internal fields if present
  delete packageJson.bin;
  delete packageJson.files;
  delete packageJson.publishConfig;
  delete packageJson.bugs;

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  return true;
}

/**
 * Initializes a clean git repository with initial commit.
 */
export function initializeGit(targetDir) {
  try {
    execSync('git init', { cwd: targetDir, stdio: 'ignore', timeout: 8000 });
    execSync('git add -A', { cwd: targetDir, stdio: 'ignore', timeout: 8000 });
    execSync('git commit -m "feat: initial commit with Arktos"', {
      cwd: targetDir,
      stdio: 'ignore',
      timeout: 8000,
    });
    return true;
  } catch {
    // Git might not be installed or configured, non-critical
    return false;
  }
}

/**
 * Checks for updates on npm registry using native fetch with strict timeout.
 */
export async function checkForUpdates(currentVersion) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const response = await fetch('https://registry.npmjs.org/create-arktos/latest', {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.version && data.version !== currentVersion) {
        return data.version;
      }
    }
  } catch {
    // Offline or slow network, silently ignore
  }

  return null;
}
