# Arktos - Modern Node.js Backend Boilerplate

A production-ready Node.js backend boilerplate with Express.js, JWT authentication, Prisma ORM, PostgreSQL, and Resend email service.

## 🚀 Features

- **Modern Node.js** - Built with the latest Node.js best practices
- **Express.js** - Fast, unopinionated web framework
- **JWT Authentication** - Secure authentication with access & refresh tokens
- **Prisma ORM** - Type-safe database access with PostgreSQL
- **Neon Database** - Serverless PostgreSQL database
- **Resend Email** - Modern email API for transactional emails
- **Security First** - Rate limiting, CORS, helmet, input validation
- **Login Logging** - Comprehensive audit trail for authentication
- **Error Handling** - Robust error handling and logging
- **Code Quality** - ESLint, Prettier, and modern code standards
- **Deployment Ready** - Vercel deployment configuration included

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (we recommend [Neon](https://neon.tech))
- Resend account for emails (optional but recommended)

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

## 🔧 Environment Setup

### Required Environment Variables

1. **Database** (Neon PostgreSQL)
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new database
   - Copy the connection string to `DATABASE_URL`

2. **Email Service** (Resend)
   - Sign up at [resend.com](https://resend.com)
   - Get your API key
   - Add to `RESEND_API_KEY`

3. **JWT Secrets**
   - Generate secure random strings:
   ```bash
   openssl rand -base64 32
   ```

### Example .env Configuration

```bash
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://user:password@host:port/db?sslmode=require"
JWT_SECRET="your-secure-jwt-secret"
RESEND_API_KEY="re_your_resend_api_key"
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify-email/:token` - Verify email address
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### User Profile
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

## 📊 Database Schema

The boilerplate includes comprehensive user management with:

- **Users** - User accounts with roles and verification
- **Login Logs** - Audit trail for all login attempts
- **Email Verification** - Email verification tokens
- **Password Resets** - Secure password reset tokens
- **Refresh Tokens** - JWT refresh token management

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with configurable rounds
- **Rate Limiting** - Protect against brute force attacks
- **Input Validation** - Comprehensive request validation
- **CORS Protection** - Configurable cross-origin requests
- **Security Headers** - Helmet.js security headers
- **Login Monitoring** - Track and log all auth attempts

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

The `vercel.json` configuration is already included.

### Environment Variables for Production

Set these in your Vercel dashboard:

```bash
NODE_ENV=production
DATABASE_URL=your_neon_database_url
DIRECT_URL=your_neon_direct_url
JWT_SECRET=your_production_jwt_secret
JWT_REFRESH_SECRET=your_production_refresh_secret
RESEND_API_KEY=your_resend_api_key
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://your-api.vercel.app
```

## 🧪 Development

```bash
# Start development server with auto-reload
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Open Prisma Studio (database GUI)
npm run db:studio

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Push schema changes to database
npm run db:push
```

## 📁 Project Structure

```
backend/
├── config/           # Configuration files
│   ├── db.config.js     # Database connection
│   └── env.config.js    # Environment variables
├── controllers/      # Request handlers
│   └── auth.controller.js
├── middleware/       # Express middleware
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/          # Database models
│   └── user.model.js
├── routes/          # API routes
│   └── auth.routes.js
├── services/        # Business logic services
│   └── email.service.js
├── utils/           # Utility functions
│   ├── logger.js
│   └── email.utils.js
├── views/           # Email templates
│   └── emails/
├── prisma/          # Database schema
│   └── schema.prisma
├── app.js           # Express application
├── server.js        # Server entry point
└── vercel.json      # Vercel deployment config
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- Prisma team for the amazing ORM
- Resend team for the modern email API
- Neon team for serverless PostgreSQL
- All the open-source contributors who made this possible

---

Built with ❤️ by [Zafer Gök](https://github.com/zafergok)