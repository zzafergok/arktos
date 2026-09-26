/**
 * ===================================
 * ARKTOS BACKEND MIDDLEWARE INDEX
 * ===================================
 * Tüm middleware'lerin merkezi yönetimi
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ZodSchema, ZodError } from 'zod';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import { PrismaClientKnownRequestError, PrismaClientInitializationError } from '@prisma/client/runtime/library';

import { AuthenticatedRequest } from '../types';
import { createErrorResponse, createSuccessResponse } from '../utils/response';
import { ERROR_CODES } from '../constants/errorCodes';
import DatabaseService from '../services/database.service';
import logger from '../config/logger';

const dbService = DatabaseService.getInstance();
const prisma = dbService.getClient();
const isProduction = process.env.NODE_ENV === 'production';

// ===================================
// 🔐 AUTHENTICATION MIDDLEWARE
// ===================================

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json(createErrorResponse(
        'Access token required',
        ERROR_CODES.AUTH_TOKEN_REQUIRED
      ));
      return;
    }

    const token = authHeader.substring(7);

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json(createErrorResponse(
          'Access token expired',
          ERROR_CODES.AUTH_TOKEN_EXPIRED
        ));
        return;
      }
      
      res.status(401).json(createErrorResponse(
        'Invalid access token',
        ERROR_CODES.AUTH_TOKEN_INVALID
      ));
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        avatar: true,
        role: true,
        isEmailVerified: true,
        isActive: true,
        emailVerifiedAt: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(401).json(createErrorResponse(
        'User not found',
        ERROR_CODES.AUTH_USER_NOT_FOUND
      ));
      return;
    }

    if (!user.isActive) {
      res.status(403).json(createErrorResponse(
        'Account is deactivated',
        ERROR_CODES.AUTH_ACCOUNT_DEACTIVATED
      ));
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    res.status(500).json(createErrorResponse(
      'Authentication error',
      ERROR_CODES.INTERNAL_ERROR
    ));
  }
};

export const optionalAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.substring(7);

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      next();
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        avatar: true,
        role: true,
        isEmailVerified: true,
        isActive: true,
        emailVerifiedAt: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user && user.isActive) {
      req.user = user;
    }

    next();
  } catch (error) {
    logger.error('Optional auth middleware error:', error);
    next();
  }
};

// Role-based access control
export const requireRole = (allowedRoles: string | string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json(createErrorResponse(
        'Authentication required',
        ERROR_CODES.AUTH_TOKEN_REQUIRED
      ));
      return;
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    if (!roles.includes(req.user.role)) {
      res.status(403).json(createErrorResponse(
        'Insufficient permissions',
        ERROR_CODES.AUTH_INSUFFICIENT_PERMISSIONS
      ));
      return;
    }

    next();
  };
};

// Email verification requirement
export const requireEmailVerification = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json(createErrorResponse(
      'Authentication required',
      ERROR_CODES.AUTH_TOKEN_REQUIRED
    ));
    return;
  }

  if (!req.user.isEmailVerified) {
    res.status(403).json(createErrorResponse(
      'Email verification required',
      ERROR_CODES.AUTH_EMAIL_NOT_VERIFIED
    ));
    return;
  }

  next();
};

// ===================================
// ✅ VALIDATION MIDDLEWARE
// ===================================

export const validateRequest = (schema: ZodSchema, data: any): any => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.issues.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
        value: err.input,
      }));
      throw { validationErrors, isZodError: true };
    }
    throw error;
  }
};

export const validationMiddleware = (schema: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }
      
      if (schema.query) {
        req.query = schema.query.parse(req.query) as any;
      }
      
      if (schema.params) {
        req.params = schema.params.parse(req.params) as any;
      }
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.issues.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        res.status(400).json(
          createErrorResponse(
            'Validation failed',
            ERROR_CODES.VALIDATION_ERROR,
            { errors: validationErrors }
          )
        );
        return;
      }
      
      next(error);
    }
  };
};

export const validateBody = (schema: ZodSchema) => validationMiddleware({ body: schema });
export const validateQuery = (schema: ZodSchema) => validationMiddleware({ query: schema });
export const validateParams = (schema: ZodSchema) => validationMiddleware({ params: schema });

// ===================================
// 🛡️ SECURITY MIDDLEWARE
// ===================================

// Helmet configuration
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      fontSrc: ["'self'", 'https:', 'data:'],
      connectSrc: ["'self'"],
      mediaSrc: ["'self'"],
      objectSrc: ["'none'"],
      childSrc: ["'self'"],
      frameSrc: ["'self'"],
      workerSrc: ["'self'"],
      frameAncestors: ["'none'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: 'same-origin' },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: false,
  referrerPolicy: { policy: 'no-referrer' },
  xssFilter: true,
});

// Additional security headers
export const securityHeaders = (req: Request, res: Response, next: NextFunction): void => {
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');
  
  res.setHeader('X-API-Version', '1.0.0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  
  if (req.path.includes('/auth/') || req.path.includes('/profile/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }
  
  next();
};

// Request sanitization
export const sanitizeRequest = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }
  
  next();
};

function sanitizeObject(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj === 'string') {
    return obj
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  if (typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }
  
  return obj;
}

// ===================================
// 🌐 CORS MIDDLEWARE
// ===================================

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://yourdomain.com',
];

const corsOptions: cors.CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);

// ===================================
// 🚦 RATE LIMITING MIDDLEWARE
// ===================================

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: isProduction ? undefined : () => 'development-key',
  skip: () => !isProduction,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    error: 'Too many authentication attempts, please try again later.',
  },
  skipSuccessfulRequests: true,
  keyGenerator: isProduction ? undefined : () => 'development-auth-key',
  skip: () => !isProduction,
});

export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    error: 'Too many file uploads, please try again later.',
  },
  keyGenerator: isProduction ? undefined : () => 'development-upload-key',
  skip: () => !isProduction,
});

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
  message: {
    error: 'Too many API requests, please try again later.',
  },
  keyGenerator: isProduction ? undefined : () => 'development-api-key',
  skip: () => !isProduction,
});

// ===================================
// ❌ ERROR HANDLING MIDDLEWARE
// ===================================

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  isOperational?: boolean;
}

export const createError = (message: string, statusCode: number = 500, code?: string): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  error.isOperational = true;
  return error;
};

export const errorHandler = (
  error: Error | AppError | ZodError | PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Zod validation errors
  if (error instanceof ZodError) {
    const validationErrors = error.issues.map((err: any) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    res.status(400).json(createErrorResponse(
      'Validation failed',
      ERROR_CODES.VALIDATION_ERROR,
      { errors: validationErrors }
    ));
    return;
  }

  // Prisma errors
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        res.status(409).json(createErrorResponse(
          'A record with this value already exists',
          ERROR_CODES.DATABASE_CONFLICT
        ));
        return;
      case 'P2025':
        res.status(404).json(createErrorResponse(
          'Record not found',
          ERROR_CODES.DATABASE_NOT_FOUND
        ));
        return;
      case 'P2003':
        res.status(400).json(createErrorResponse(
          'Foreign key constraint failed',
          ERROR_CODES.DATABASE_CONSTRAINT
        ));
        return;
      default:
        res.status(500).json(createErrorResponse(
          'Database error',
          ERROR_CODES.DATABASE_ERROR
        ));
        return;
    }
  }

  // Prisma connection errors
  if (error instanceof PrismaClientInitializationError) {
    res.status(503).json(createErrorResponse(
      'Database connection failed',
      ERROR_CODES.DATABASE_CONNECTION
    ));
    return;
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    res.status(401).json(createErrorResponse(
      'Invalid token',
      ERROR_CODES.AUTH_INVALID_TOKEN
    ));
    return;
  }

  if (error.name === 'TokenExpiredError') {
    res.status(401).json(createErrorResponse(
      'Token expired',
      ERROR_CODES.AUTH_TOKEN_EXPIRED
    ));
    return;
  }

  // App-specific errors
  const appError = error as AppError;
  if (appError.statusCode && appError.isOperational) {
    res.status(appError.statusCode).json(createErrorResponse(
      appError.message,
      appError.code || ERROR_CODES.GENERIC_ERROR
    ));
    return;
  }

  // Default server error
  res.status(500).json(createErrorResponse(
    process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : error.message,
    ERROR_CODES.INTERNAL_ERROR
  ));
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json(createErrorResponse(
    `Route ${req.originalUrl} not found`,
    ERROR_CODES.ROUTE_NOT_FOUND
  ));
};

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ===================================
// 📦 COMBINED MIDDLEWARE EXPORTS
// ===================================

// Comprehensive security stack
export const securityMiddleware = [
  helmetConfig,
  corsMiddleware,
  securityHeaders,
  sanitizeRequest,
];

// Rate limiting stack
export const rateLimiter = {
  general: generalLimiter,
  auth: authLimiter,
  upload: uploadLimiter,
  api: apiLimiter,
};

// Auth stack
export const auth = {
  required: authMiddleware,
  optional: optionalAuthMiddleware,
  requireRole,
  requireEmailVerification,
  requireAdmin: requireRole(['ADMIN']),
  requireModerator: requireRole(['ADMIN', 'MODERATOR']),
};

// Validation stack
export const validation = {
  middleware: validationMiddleware,
  body: validateBody,
  query: validateQuery,
  params: validateParams,
  request: validateRequest,
};

// Error handling stack
export const errorHandling = {
  handler: errorHandler,
  notFound: notFoundHandler,
  asyncHandler,
  createError,
};