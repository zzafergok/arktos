import path from 'path';
import os from 'os';
import fs from 'fs-extra';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cliEntry = path.resolve(__dirname, '../index.js');

const testDir = path.join(os.tmpdir(), `arktos-smoke-${Date.now()}`);

console.log(`[smoke-test] Target dir: ${testDir}`);

try {
  const result = spawnSync('node', [cliEntry, testDir, '--skip-git', '--skip-update-check'], {
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.status !== 0) {
    console.error('[smoke-test] CLI execution failed:');
    console.error(result.stderr || result.stdout);
    process.exit(1);
  }

  // Verification
  const requiredFiles = [
    'package.json',
    'src/app.ts',
    'src/config/logger.ts',
    'src/config/env.validation.ts',
    'src/routes/index.ts',
    'prisma/schema.prisma',
    '.env.example',
    '.gitignore',
    'tsconfig.json',
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(testDir, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Expected file not found in generated project: ${file}`);
    }
  }

  const pkgJson = fs.readJsonSync(path.join(testDir, 'package.json'));
  if (!pkgJson.dependencies?.express) {
    throw new Error('Generated package.json missing express dependency');
  }
  if (!pkgJson.dependencies?.['@prisma/client']) {
    throw new Error('Generated package.json missing @prisma/client dependency');
  }

  console.log('✔ All required template files and dependencies verified!');
} finally {
  if (fs.existsSync(testDir)) {
    fs.removeSync(testDir);
    console.log('[smoke-test] Cleaned up temporary test directory.');
  }
}
