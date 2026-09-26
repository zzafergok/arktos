import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AuthenticatedRequest } from '../types';
import { createSuccessResponse, createErrorResponse } from '../utils/response';
import { validation } from '../middleware';
import { 
  registerSchema, 
  loginSchema, 
  refreshTokenSchema,
  resendVerificationSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema
} from '../schemas';
import DatabaseService from '../services/database.service';
import logger from '../config/logger';
import { ERROR_CODES } from '../constants/errorCodes';

const dbService = DatabaseService.getInstance();
const prisma = dbService.getClient();

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

const generateTokens = (userId: string): TokenPair => {
  const accessToken = jwt.sign(
    { userId }, 
    process.env.JWT_SECRET as string
  );

  const refreshToken = jwt.sign(
    { userId }, 
    process.env.JWT_REFRESH_SECRET as string
  );

  return { accessToken, refreshToken };
};

const logLoginAttempt = async (
  userId: string | 'unknown', 
  req: Request, 
  isSuccess: boolean, 
  failReason?: string
): Promise<void> => {
  try {
    if (userId === 'unknown') return;

    const clientIP = req.ip || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    
    await prisma.loginLog.create({
      data: {
        userId,
        loginType: 'EMAIL',
        ipAddress: clientIP,
        userAgent,
        isSuccess,
        failReason,
      },
    });
  } catch (error) {
    logger.error('Failed to log login attempt:', error);
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = validation.request(registerSchema, req.body);
    const { email, password, firstName, lastName, username } = validatedData;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      res.status(409).json(createErrorResponse(
        'User already exists with this email',
        ERROR_CODES.AUTH_USER_EXISTS
      ));
      return;
    }

    // Check username if provided
    if (username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username }
      });

      if (existingUsername) {
        res.status(409).json(createErrorResponse(
          'Username already taken',
          ERROR_CODES.AUTH_USERNAME_TAKEN
        ));
        return;
      }
    }

    // Hash password
    const bcrypt = require('bcryptjs');
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName,
        lastName,
        username,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        isEmailVerified: true,
        createdAt: true,
      }
    });

    // Create email verification
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    await prisma.emailVerification.create({
      data: {
        userId: user.id,
        token: verificationToken,
        email: user.email,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    // Send verification email (implement email service)
    // await emailService.sendVerificationEmail(user.email, verificationToken, user.firstName);

    await logLoginAttempt(user.id, req, false, 'REGISTRATION_PENDING_VERIFICATION');

    logger.info(`New user registered: ${user.email}`);

    res.status(201).json(createSuccessResponse(
      { user },
      'Registration successful. Please check your email to verify your account.',
      'REGISTRATION_SUCCESS'
    ));
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json(createErrorResponse(
      'Internal server error',
      ERROR_CODES.INTERNAL_ERROR
    ));
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = validation.request(loginSchema, req.body);
    const { email, password } = validatedData;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      await logLoginAttempt('unknown', req, false, 'USER_NOT_FOUND');
      res.status(401).json(createErrorResponse(
        'Invalid credentials',
        ERROR_CODES.AUTH_INVALID_CREDENTIALS
      ));
      return;
    }

    if (!user.isActive) {
      await logLoginAttempt(user.id, req, false, 'ACCOUNT_DEACTIVATED');
      res.status(403).json(createErrorResponse(
        'Account is deactivated',
        ERROR_CODES.AUTH_ACCOUNT_DEACTIVATED
      ));
      return;
    }

    // Verify password
    const bcrypt = require('bcryptjs');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      await logLoginAttempt(user.id, req, false, 'INVALID_PASSWORD');
      res.status(401).json(createErrorResponse(
        'Invalid credentials',
        ERROR_CODES.AUTH_INVALID_CREDENTIALS
      ));
      return;
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Store refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt,
      },
    });

    await logLoginAttempt(user.id, req, true);

    logger.info(`User logged in: ${user.email}`);

    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      avatar: user.avatar,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      lastLoginAt: user.lastLoginAt,
    };

    res.json(createSuccessResponse(
      {
        user: userResponse,
        tokens: { accessToken, refreshToken }
      },
      'Login successful',
      'LOGIN_SUCCESS'
    ));
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json(createErrorResponse(
      'Internal server error',
      ERROR_CODES.INTERNAL_ERROR
    ));
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = validation.request(refreshTokenSchema, req.body);
    const { refreshToken: token } = validatedData;

    // Verify refresh token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    } catch (error) {
      res.status(401).json(createErrorResponse(
        'Invalid refresh token',
        ERROR_CODES.AUTH_TOKEN_EXPIRED
      ));
      return;
    }
    
    // Check if token exists and is not revoked
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.isRevoked || tokenRecord.expiresAt < new Date()) {
      res.status(401).json(createErrorResponse(
        'Invalid or expired refresh token',
        ERROR_CODES.AUTH_TOKEN_EXPIRED
      ));
      return;
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);

    // Revoke old token
    await prisma.refreshToken.update({
      where: { id: tokenRecord.id },
      data: { isRevoked: true },
    });

    // Create new refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.refreshToken.create({
      data: {
        userId: decoded.userId,
        token: newRefreshToken,
        expiresAt,
      },
    });

    res.json(createSuccessResponse(
      {
        tokens: {
          accessToken,
          refreshToken: newRefreshToken,
        }
      },
      'Tokens refreshed successfully',
      'TOKEN_REFRESH_SUCCESS'
    ));
  } catch (error) {
    logger.error('Token refresh error:', error);
    res.status(500).json(createErrorResponse(
      'Internal server error',
      ERROR_CODES.INTERNAL_ERROR
    ));
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await prisma.refreshToken.updateMany({
        where: { token: refreshToken },
        data: { isRevoked: true },
      });
    }

    logger.info(`User logged out: ${(req as AuthenticatedRequest).user?.email || 'Unknown'}`);

    res.json(createSuccessResponse(
      null,
      'Logged out successfully',
      'LOGOUT_SUCCESS'
    ));
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json(createErrorResponse(
      'Internal server error',
      ERROR_CODES.INTERNAL_ERROR
    ));
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;

    const verification = await prisma.emailVerification.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verification) {
      res.status(400).json(createErrorResponse(
        'Invalid verification token',
        ERROR_CODES.AUTH_INVALID_TOKEN
      ));
      return;
    }

    if (verification.expiresAt < new Date()) {
      res.status(400).json(createErrorResponse(
        'Verification token has expired',
        ERROR_CODES.AUTH_TOKEN_EXPIRED
      ));
      return;
    }

    if (verification.status === 'VERIFIED') {
      res.json(createSuccessResponse(
        null,
        'Email already verified',
        'EMAIL_ALREADY_VERIFIED'
      ));
      return;
    }

    // Update user and verification status
    await prisma.user.update({
      where: { id: verification.userId },
      data: { isEmailVerified: true }
    });
    
    await prisma.emailVerification.update({
      where: { id: verification.id },
      data: { status: 'VERIFIED' },
    });

    logger.info(`Email verified for user: ${verification.user.email}`);

    res.json(createSuccessResponse(
      null,
      'Email verified successfully',
      'EMAIL_VERIFICATION_SUCCESS'
    ));
  } catch (error) {
    logger.error('Email verification error:', error);
    res.status(500).json(createErrorResponse(
      'Internal server error',
      ERROR_CODES.INTERNAL_ERROR
    ));
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    res.json(createSuccessResponse(
      { user: req.user },
      'Profile retrieved successfully',
      'PROFILE_SUCCESS'
    ));
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json(createErrorResponse(
      'Internal server error',
      ERROR_CODES.INTERNAL_ERROR
    ));
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const validatedData = validation.request(updateProfileSchema, req.body);
    const { firstName, lastName, username, avatar } = validatedData;
    
    const updateData: any = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (avatar !== undefined) updateData.avatar = avatar;
    
    if (username !== undefined && username !== req.user!.username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username }
      });

      if (existingUsername && existingUsername.id !== req.user!.id) {
        res.status(409).json(createErrorResponse(
          'Username already taken',
          ERROR_CODES.AUTH_USERNAME_TAKEN
        ));
        return;
      }
      updateData.username = username;
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        avatar: true,
        role: true,
        isEmailVerified: true,
        lastLoginAt: true,
        updatedAt: true,
      }
    });

    logger.info(`Profile updated for user: ${req.user!.email}`);

    res.json(createSuccessResponse(
      { user: updatedUser },
      'Profile updated successfully',
      'PROFILE_UPDATE_SUCCESS'
    ));
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json(createErrorResponse(
      'Internal server error',
      ERROR_CODES.INTERNAL_ERROR
    ));
  }
};

export const changePassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const validatedData = validation.request(changePasswordSchema, req.body);
    const { currentPassword, newPassword } = validatedData;

    const user = await prisma.user.findUnique({
      where: { id: req.user!.id }
    });

    if (!user) {
      res.status(404).json(createErrorResponse(
        'User not found',
        ERROR_CODES.AUTH_USER_NOT_FOUND
      ));
      return;
    }
    
    const bcrypt = require('bcryptjs');
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isCurrentPasswordValid) {
      res.status(400).json(createErrorResponse(
        'Current password is incorrect',
        ERROR_CODES.AUTH_INVALID_PASSWORD
      ));
      return;
    }

    // Hash new password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await prisma.user.update({
      where: { id: req.user!.id },
      data: { password: hashedNewPassword }
    });

    // Revoke all refresh tokens
    await prisma.refreshToken.updateMany({
      where: { userId: req.user!.id },
      data: { isRevoked: true },
    });

    logger.info(`Password changed for user: ${req.user!.email}`);

    res.json(createSuccessResponse(
      null,
      'Password changed successfully. Please log in again.',
      'PASSWORD_CHANGE_SUCCESS'
    ));
  } catch (error) {
    logger.error('Change password error:', error);
    res.status(500).json(createErrorResponse(
      'Internal server error',
      ERROR_CODES.INTERNAL_ERROR
    ));
  }
};