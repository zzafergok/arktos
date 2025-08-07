#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TEMPLATE_DIR = path.join(__dirname, '../src');
const ROOT_DIR = path.join(__dirname, '..');

function createProject(projectName) {
  console.log(`🚀 Creating Arktos project: ${projectName}`);
  console.log();

  // Validate project name
  if (!projectName || !/^[a-zA-Z0-9-_]+$/.test(projectName)) {
    console.error('❌ Invalid project name. Use only letters, numbers, hyphens, and underscores.');
    process.exit(1);
  }

  // Check if directory already exists
  if (fs.existsSync(projectName)) {
    console.error(`❌ Directory '${projectName}' already exists.`);
    process.exit(1);
  }

  try {
    // Create project directory
    console.log('📁 Creating project directory...');
    fs.mkdirSync(projectName);

    // Copy template files
    console.log('📋 Copying template files...');
    copyDir(TEMPLATE_DIR, projectName);

    // Copy template config files
    console.log('📝 Copying configuration files...');
    copyTemplateFiles(projectName);

    // Copy and update package.json
    console.log('🔧 Updating project configuration...');
    const templatePackageJsonPath = path.join(ROOT_DIR, 'template.package.json');
    const targetPackageJsonPath = path.join(projectName, 'package.json');
    
    if (fs.existsSync(templatePackageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(templatePackageJsonPath, 'utf8'));
      
      // Update project name
      packageJson.name = projectName;
      
      fs.writeFileSync(targetPackageJsonPath, JSON.stringify(packageJson, null, 2));
    }

    console.log('✅ Project created successfully!');
    console.log();
    console.log('🎯 Next steps:');
    console.log(`   cd ${projectName}`);
    console.log('   npm install');
    console.log('   cp .env.example .env');
    console.log('   # Edit .env with your database and API keys');
    console.log('   npx prisma migrate dev');
    console.log('   npm run dev');
    console.log();
    console.log('📚 Documentation:');
    console.log('   • Backend API: http://localhost:3001');
    console.log('   • Setup your Neon database: https://neon.tech');
    console.log('   • Setup Resend for emails: https://resend.com');
    console.log('   • Deploy on Vercel: https://vercel.com');
    console.log();
    console.log('🔧 Available commands:');
    console.log('   npm run dev      - Start development server');
    console.log('   npm run build    - Build for production');
    console.log('   npm run start    - Start production server');
    console.log('   npm run db:studio - Open Prisma Studio');
    console.log();
    console.log('Happy coding! 🎉');

  } catch (error) {
    console.error('❌ Error creating project:', error.message);
    
    // Cleanup on error
    try {
      if (fs.existsSync(projectName)) {
        fs.rmSync(projectName, { recursive: true, force: true });
      }
    } catch (cleanupError) {
      console.error('❌ Error during cleanup:', cleanupError.message);
    }
    
    process.exit(1);
  }
}

function copyDir(src, dest) {
  // Create destination directory
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyDir(srcPath, destPath);
    } else {
      // Copy files
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyTemplateFiles(dest) {
  // Create common config files
  const configFiles = {
    '.gitignore': `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# Logs
logs/
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Prisma
prisma/migrations/dev.db*

# Temporary files
*.tmp
*.temp
.cache/

# Vercel
.vercel

# TypeScript
*.tsbuildinfo`,
    '.prettierrc': `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}`,
    'README.md': `# ${path.basename(dest)} API

A modern Node.js backend API built with Arktos boilerplate.

## 🚀 Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Express.js**: Fast, unopinionated web framework
- **Authentication**: Complete JWT-based authentication system
- **Database**: Prisma ORM with PostgreSQL (Neon serverless)
- **Email Service**: Resend integration for transactional emails
- **Security**: Helmet, CORS, rate limiting, and security middleware
- **Validation**: Zod-based request validation
- **Logging**: Winston logger with file rotation
- **Error Handling**: Comprehensive error handling and responses
- **API Documentation**: Structured API responses
- **Deployment Ready**: Vercel configuration included

## 📋 Prerequisites

- Node.js 18+ and npm 8+
- PostgreSQL database (recommend [Neon](https://neon.tech/) for serverless)
- Resend account for email service

## 🛠️ Installation

1. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment Setup**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Fill in your environment variables in \`.env\`

3. **Database Setup**
   \`\`\`bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   \`\`\`

4. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔧 Available Scripts

- \`npm run dev\` - Start development server with hot reload
- \`npm run build\` - Build for production
- \`npm start\` - Start production server
- \`npm run type-check\` - Run TypeScript type checking
- \`npm run lint\` - Run ESLint
- \`npm run db:studio\` - Open Prisma Studio

Happy coding! 🎉`
  };

  // Write config files
  for (const [fileName, content] of Object.entries(configFiles)) {
    fs.writeFileSync(path.join(dest, fileName), content);
  }

  // Copy template files from root
  const templateFiles = ['.env.example', 'vercel.json', 'tsconfig.json', 'eslint.config.js'];
  
  for (const templateFile of templateFiles) {
    const srcPath = path.join(ROOT_DIR, templateFile);
    const destPath = path.join(dest, templateFile);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function showHelp() {
  console.log();
  console.log('🏛️  Arktos - Modern Node.js Backend Boilerplate');
  console.log();
  console.log('Usage:');
  console.log('  npx create-arktos <project-name>');
  console.log();
  console.log('Example:');
  console.log('  npx create-arktos my-awesome-api');
  console.log();
  console.log('Features:');
  console.log('  ✅ Express.js server with modern middleware');
  console.log('  ✅ JWT authentication with refresh tokens');
  console.log('  ✅ Prisma ORM with PostgreSQL (Neon)');
  console.log('  ✅ Email service with Resend');
  console.log('  ✅ User authentication and management');
  console.log('  ✅ Login logging and security features');
  console.log('  ✅ Rate limiting and security headers');
  console.log('  ✅ Comprehensive error handling');
  console.log('  ✅ Winston logging');
  console.log('  ✅ ESLint and Prettier configuration');
  console.log('  ✅ Vercel deployment ready');
  console.log();
  console.log('Options:');
  console.log('  -h, --help     Show this help message');
  console.log('  -v, --version  Show version');
  console.log();
}

function showVersion() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
  console.log(packageJson.version);
}

// Main CLI logic
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
  showHelp();
  process.exit(0);
}

if (args[0] === '-v' || args[0] === '--version') {
  showVersion();
  process.exit(0);
}

const projectName = args[0];
createProject(projectName);