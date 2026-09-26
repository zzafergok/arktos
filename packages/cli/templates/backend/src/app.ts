import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandling, securityMiddleware, rateLimiter } from './middleware';
import DatabaseService from './services/database.service';
import logger from './config/logger';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware stack
app.use(securityMiddleware);

// Rate limiting
app.use('/api', rateLimiter.general);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Trust proxy (for accurate IP addresses)
app.set('trust proxy', 1);

// API routes
app.use('/api', routes);

// Health check route (outside of rate limiting)
app.get('/health', async (req, res) => {
  try {
    const dbService = DatabaseService.getInstance();
    const dbHealth = await dbService.healthCheck();
    
    res.json({
      status: dbHealth.connected ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbHealth,
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Health check failed',
    });
  }
});

// 404 handler
app.use(errorHandling.notFound);

// Global error handler
app.use(errorHandling.handler);

// Initialize database connection
const initializeApp = async () => {
  try {
    const dbService = DatabaseService.getInstance();
    await dbService.connect();
    
    logger.info('✅ Database connected successfully');
    
    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}`);
      logger.info(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`📚 API Documentation: http://localhost:${PORT}/api`);
      logger.info(`❤️ Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('❌ Failed to initialize application:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  logger.info(`📡 Received ${signal}, starting graceful shutdown...`);
  
  try {
    const dbService = DatabaseService.getInstance();
    await dbService.disconnect();
    logger.info('✅ Database disconnected');
    
    process.exit(0);
  } catch (error) {
    logger.error('❌ Error during graceful shutdown:', error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start the application
if (require.main === module) {
  initializeApp();
}

export default app;