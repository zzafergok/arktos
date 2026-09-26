import { PrismaClient } from '@prisma/client';
import { DatabaseHealth } from '../types';
import logger from '../config/logger';

export class DatabaseService {
  private static instance: DatabaseService;
  private prisma: PrismaClient;
  private isConnected: boolean = false;

  private constructor() {
    this.prisma = new PrismaClient({
      log: ['query', 'error', 'info', 'warn'],
    });

    // Set up event listeners
    this.setupEventListeners();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private setupEventListeners(): void {
    // Event listeners can be added here if needed
    // For now, we're using simple logging configuration
  }

  public async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      this.isConnected = true;
      logger.info('✅ Database connected successfully');
    } catch (error) {
      this.isConnected = false;
      logger.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      this.isConnected = false;
      logger.info('✅ Database disconnected successfully');
    } catch (error) {
      logger.error('❌ Database disconnection failed:', error);
      throw error;
    }
  }

  public async healthCheck(): Promise<DatabaseHealth> {
    try {
      const startTime = Date.now();
      await this.prisma.$queryRaw`SELECT 1`;
      const responseTime = Date.now() - startTime;
      
      return {
        connected: true,
        responseTime,
      };
    } catch (error) {
      logger.error('Database health check failed:', error);
      return {
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  public getClient(): PrismaClient {
    return this.prisma;
  }

  public isConnectedToDatabase(): boolean {
    return this.isConnected;
  }

  // Graceful shutdown handler
  public async gracefulShutdown(): Promise<void> {
    logger.info('🔄 Starting graceful database shutdown...');
    
    try {
      await this.disconnect();
      logger.info('✅ Database shutdown completed');
    } catch (error) {
      logger.error('❌ Error during database shutdown:', error);
      throw error;
    }
  }
}

// Setup process handlers for graceful shutdown
const dbService = DatabaseService.getInstance();

process.on('SIGINT', async () => {
  logger.info('📡 Received SIGINT signal');
  try {
    await dbService.gracefulShutdown();
    process.exit(0);
  } catch (error) {
    logger.error('Failed to shutdown gracefully:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  logger.info('📡 Received SIGTERM signal');
  try {
    await dbService.gracefulShutdown();
    process.exit(0);
  } catch (error) {
    logger.error('Failed to shutdown gracefully:', error);
    process.exit(1);
  }
});

export default DatabaseService;