# 🏛️ Arktos

> **A modern Node.js backend boilerplate generator with TypeScript, Express, JWT authentication, Prisma ORM, PostgreSQL, and Resend email service.**

[![npm version](https://badge.fury.io/js/arktos.svg)](https://www.npmjs.com/package/arktos)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)

## ⚡ Quick Start

Create a new backend project instantly:

```bash
# Create a new project
npx create-arktos my-awesome-api

# Navigate to project
cd my-awesome-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and API keys

# Set up database
npx prisma migrate dev

# Start development server
npm run dev
```

Your backend API is now running at `http://localhost:3001` 🚀

## 🌟 What's Included

### 🔐 **Complete Authentication System**
- JWT-based authentication with access & refresh tokens
- User registration with email verification
- Password reset functionality
- Profile management
- Login attempt logging and security monitoring

### 🛡️ **Security First**
- Rate limiting (general, auth, and API-specific)
- CORS protection with configurable origins
- Helmet.js security headers
- Input sanitization and validation with Zod
- Password hashing with bcrypt
- Request logging and monitoring

### 🗄️ **Database & ORM**
- Prisma ORM with PostgreSQL
- Pre-configured models (User, LoginLog, EmailVerification, etc.)
- Database health monitoring
- Migration system
- Neon serverless PostgreSQL ready

### 📧 **Email Service**
- Resend integration for transactional emails
- Pre-built email templates (welcome, verification, password reset)
- HTML email templates included

### 🏗️ **Modern Architecture**
- TypeScript with strict type checking
- Modular middleware system
- Singleton database service
- Centralized error handling
- Winston logging system
- Clean project structure

### 🚀 **Deployment Ready**
- Vercel configuration included
- Environment variable validation
- Production build scripts
- Health check endpoints

## 📦 Generated Project Structure

```
my-awesome-api/
├── src/
│   ├── app.ts                 # Express application setup
│   ├── config/
│   │   ├── env.validation.ts  # Environment validation
│   │   └── logger.ts          # Winston logger config
│   ├── constants/
│   │   ├── errorCodes.ts      # Error code definitions
│   │   └── messages.ts        # Response messages
│   ├── controllers/
│   │   └── auth.controller.ts # Authentication endpoints
│   ├── middleware/
│   │   └── index.ts           # Security & validation middleware
│   ├── routes/
│   │   ├── auth.routes.ts     # Auth route definitions
│   │   └── index.ts           # Route aggregation
│   ├── schemas/
│   │   └── index.ts           # Zod validation schemas
│   ├── services/
│   │   ├── database.service.ts # Singleton database service
│   │   ├── email.service.ts   # Email service with Resend
│   │   └── jwt.service.ts     # JWT utilities
│   ├── types/
│   │   ├── express.d.ts       # Express type extensions
│   │   └── index.ts           # Type definitions
│   ├── utils/
│   │   └── response.ts        # API response utilities
│   └── views/
│       └── emails/            # HTML email templates
├── prisma/
│   └── schema.prisma          # Database schema
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── .prettierrc                # Prettier configuration
├── eslint.config.js           # ESLint configuration
├── package.json               # Dependencies and scripts
├── README.md                  # Project documentation
├── tsconfig.json              # TypeScript configuration
└── vercel.json                # Vercel deployment config
```

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/verify-email/:token` | Verify email address |
| POST | `/api/auth/resend-verification` | Resend verification email |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update user profile |
| POST | `/api/auth/change-password` | Change password |

### Health & Status
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Basic health check |
| GET | `/api/health` | Detailed health with database status |

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Run database seeding
npm run db:reset         # Reset database with seed

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run format           # Format with Prettier
npm run type-check       # TypeScript type checking

# Health Check
npm run health           # Check API health
```

## 📋 Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **PostgreSQL database** (recommend [Neon](https://neon.tech) for serverless)
- **Resend account** for email service (optional but recommended)

## 🔧 Environment Setup

After creating your project, you'll need to set up these services:

### 1. **Database Setup** (Neon PostgreSQL)
```bash
# 1. Sign up at neon.tech
# 2. Create a new database project
# 3. Copy connection strings from dashboard
# 4. Add to your .env file

DATABASE_URL="postgresql://user:password@host:port/db?sslmode=require"
DIRECT_URL="postgresql://user:password@host:port/db?sslmode=require"
```

### 2. **Email Service** (Resend)
```bash
# 1. Sign up at resend.com
# 2. Create API key in dashboard
# 3. Add to your .env file

RESEND_API_KEY="re_your_api_key_here"
FROM_EMAIL="noreply@yourdomain.com"
```

### 3. **JWT Secrets**
```bash
# Generate secure random strings
openssl rand -base64 32

JWT_SECRET="your-super-secure-jwt-secret"
JWT_REFRESH_SECRET="your-super-secure-refresh-secret"
```

### 4. **Complete .env Example**
Your `.env` file should look like this:
```bash
# Application
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001

# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
DIRECT_URL="postgresql://user:password@host:port/database?sslmode=require"

# JWT Configuration
JWT_SECRET="your-super-secure-jwt-secret-128-bits-minimum"
JWT_REFRESH_SECRET="your-super-secure-refresh-secret-128-bits-minimum"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Email Service (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxx"
FROM_EMAIL="noreply@yourdomain.com"
FROM_NAME="Your App Name"

# Security Settings
BCRYPT_SALT_ROUNDS=12
CORS_ORIGIN="http://localhost:3000,https://yourdomain.com"
```

## 📊 Database Models

The generated project includes these pre-configured models:

### **Core Authentication**
- **Users** - Complete user management with roles (USER, ADMIN, MODERATOR)
- **LoginLog** - Comprehensive audit trail for all authentication attempts
- **EmailVerification** - Secure email verification with token expiration
- **PasswordReset** - Secure password reset workflow
- **RefreshToken** - JWT refresh token management with revocation

### **Business Models** (Ready to extend)
- **Booking** - For appointment/reservation systems
- **Product** - For e-commerce applications
- **Blog** - For content management systems  
- **Payment** - For payment processing integration

All models include proper relationships, indexes, and cascade deletes for data integrity.

## 🔐 Security Features

### **Authentication & Authorization**
- JWT-based authentication with access & refresh tokens
- Role-based access control (RBAC)
- Email verification workflow
- Secure password reset flow
- Session management with token revocation

### **Security Middleware**
- **Rate Limiting** - Multi-tier limits (general, auth, API)
- **CORS Protection** - Configurable origins and credentials
- **Helmet.js** - Comprehensive security headers
- **Input Sanitization** - XSS protection and data cleaning
- **Request Validation** - Zod-based schema validation

### **Monitoring & Auditing**
- Login attempt logging with IP and user agent tracking
- Failed login attempt monitoring
- Request logging with Winston
- Database connection health monitoring

### **Password Security**
- Bcrypt hashing with configurable salt rounds
- Password strength requirements
- Secure password reset tokens
- Account lockout protection

## 🚀 Deployment

### **Vercel Deployment** (Recommended)

The generated project includes Vercel configuration for seamless deployment:

```bash
# 1. Push your code to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Connect to Vercel
# - Go to vercel.com
# - Import your GitHub repository
# - Vercel will automatically detect the configuration

# 3. Set environment variables in Vercel dashboard
# All the variables from your .env file
```

### **Production Environment Variables**

Set these in your Vercel dashboard (or hosting provider):

```bash
NODE_ENV=production
DATABASE_URL=your_neon_production_database_url
DIRECT_URL=your_neon_production_direct_url
JWT_SECRET=your_production_jwt_secret_128_bits
JWT_REFRESH_SECRET=your_production_refresh_secret_128_bits
RESEND_API_KEY=your_production_resend_api_key
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://your-api.vercel.app
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

### **Other Deployment Options**

<details>
<summary>🐳 <strong>Docker Deployment</strong></summary>

```dockerfile
# Dockerfile will be generated in future versions
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```
</details>

<details>
<summary>☁️ <strong>Railway/Render Deployment</strong></summary>

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push
</details>

## 🧪 Testing Your API

### **Health Check**
```bash
# Test basic health
curl http://localhost:3001/health

# Test database health
curl http://localhost:3001/api/health
```

### **Authentication Flow**
```bash
# Register a new user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get profile (requires Bearer token)
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 📚 Usage Examples

### **Basic Express Server**
The generated `src/app.ts` provides a production-ready Express server:

```typescript
import express from 'express';
import DatabaseService from './services/database.service';
import { middleware } from './middleware';
import routes from './routes';

const app = express();
const dbService = DatabaseService.getInstance();

// Apply security middleware
app.use(middleware.security);
app.use(middleware.cors);
app.use(middleware.rateLimit.general);

// API routes
app.use('/api', routes);

export default app;
```

### **Adding Custom Routes**
```typescript
// src/routes/custom.routes.ts
import { Router } from 'express';
import { middleware } from '../middleware';

const router = Router();

// Protected route example
router.get('/protected', 
  middleware.auth.required,
  (req, res) => {
    res.json({ message: 'Hello authenticated user!' });
  }
);

// Public route example  
router.get('/public', (req, res) => {
  res.json({ message: 'Hello world!' });
});

export default router;
```

### **Database Queries**
```typescript
// Using the database service
import DatabaseService from '../services/database.service';

const dbService = DatabaseService.getInstance();
const prisma = dbService.getClient();

// Example: Get all users
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
  }
});

// Example: Create a booking
const booking = await prisma.booking.create({
  data: {
    userId: user.id,
    title: 'Meeting',
    startDate: new Date(),
    endDate: new Date(Date.now() + 3600000), // 1 hour later
  }
});
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Reporting Issues**
- Use GitHub Issues for bug reports
- Include steps to reproduce
- Provide environment details

### **Feature Requests**  
- Open a GitHub Issue with the "enhancement" label
- Describe the use case and expected behavior

### **Pull Requests**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`  
3. Make your changes
4. Add tests if applicable
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Express.js** team for the excellent web framework
- **Prisma** team for the amazing ORM and type safety  
- **Resend** team for the modern email API
- **Neon** team for serverless PostgreSQL
- **Vercel** team for seamless deployment platform
- All the **open-source contributors** who made this possible

## ❓ FAQ

<details>
<summary><strong>Can I use this with a different database?</strong></summary>

Yes! While optimized for PostgreSQL, you can modify the Prisma schema to use MySQL, SQLite, or MongoDB. Update the `datasource` in `prisma/schema.prisma`.
</details>

<details>
<summary><strong>Can I use a different email provider?</strong></summary>

Absolutely! The email service is modular. You can replace Resend with SendGrid, AWS SES, or any other provider by modifying `src/services/email.service.ts`.
</details>

<details>
<summary><strong>How do I add more authentication providers?</strong></summary>

The architecture supports multiple auth providers. You can extend the `LoginType` enum in the Prisma schema and add OAuth routes in the auth controller.
</details>

<details>
<summary><strong>Is this production-ready?</strong></summary>

Yes! The boilerplate includes production-ready features like security middleware, error handling, logging, health checks, and deployment configurations.
</details>

---

<div align="center">

**Built with ❤️ by [Zafer Gök](https://github.com/zzafergok)**

If this project helped you, please give it a ⭐️ on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/zzafergok/arktos?style=social)](https://github.com/zzafergok/arktos)

</div>