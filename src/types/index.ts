import { Request } from 'express';
import type { User, Role } from '@prisma/client';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  code?: string;
  timestamp?: string;
  path?: string;
  method?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

// Express Request Extensions  
export interface AuthenticatedRequest extends Omit<Request, 'user'> {
  user?: {
    id: string;
    email: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
    role: Role;
    isActive: boolean;
    isEmailVerified: boolean;
    emailVerifiedAt: Date | null;
    lastLoginAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

// Database Types
export interface DatabaseHealth {
  connected: boolean;
  responseTime?: number;
  error?: string;
}

// File Upload Types
export interface FileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  destination?: string;
  filename?: string;
}

export interface UploadedFile {
  originalname: string;
  filename: string;
  mimetype: string;
  size: number;
  path: string;
  url?: string;
}

// Error Types
export interface AppError extends Error {
  statusCode: number;
  code?: string;
  isOperational: boolean;
}

// Email Types
export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

export interface EmailContext {
  [key: string]: any;
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// Service Types
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

// Cache Types
export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  prefix?: string;
}

// Rate Limiting Types
export interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
  standardHeaders?: boolean;
  legacyHeaders?: boolean;
}

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface LoggerConfig {
  level: LogLevel;
  format: string;
  transports: string[];
  meta?: boolean;
}