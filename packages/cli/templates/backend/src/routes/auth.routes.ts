import { Router } from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
  getProfile,
  updateProfile,
  changePassword,
} from '../controllers/auth.controller';
import { auth, rateLimiter } from '../middleware';

const router = Router();

// Public routes (with auth rate limiting)
router.post('/register', rateLimiter.auth, register);
router.post('/login', rateLimiter.auth, login);
router.post('/refresh-token', rateLimiter.auth, refreshToken);
router.post('/logout', logout);
router.get('/verify-email/:token', verifyEmail);

// Protected routes
router.use(auth.required); // Apply auth middleware to all routes below
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

export default router;