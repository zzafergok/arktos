import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import { createSuccessResponse } from '../utils/response';
import DatabaseService from '../services/database.service';

const router = Router();

// Health check endpoint
router.get('/health', async (req: Request, res: Response) => {
  try {
    const dbService = DatabaseService.getInstance();
    const dbHealth = await dbService.healthCheck();
    
    if (!dbHealth.connected) {
      res.status(503).json({
        status: 'error',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: dbHealth,
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || '1.0.0',
      });
      return;
    }

    const healthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbHealth,
      memory: process.memoryUsage(),
      version: process.env.npm_package_version || '1.0.0',
    };

    res.json(healthStatus);
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Health check failed',
      timestamp: new Date().toISOString(),
    });
  }
});

// API routes
router.use('/auth', authRoutes);

// Root endpoint
router.get('/', (req: Request, res: Response) => {
  res.json(createSuccessResponse(
    {
      name: 'Arktos Backend API',
      version: process.env.npm_package_version || '1.0.0',
      description: 'Modern Node.js backend boilerplate with TypeScript, Express, JWT, Prisma, PostgreSQL, and Resend',
      documentation: '/api/docs',
      health: '/api/health',
    },
    'Welcome to Arktos Backend API',
    'API_INFO'
  ));
});

export default router;