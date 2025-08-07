import logger from './logger';
import { envSchema } from '../schemas';

export function validateEnv() {
  try {
    const env = envSchema.parse(process.env);
    logger.info('Environment validation successful');
    return env;
  } catch (error) {
    logger.error('Environment validation failed:', error);
    process.exit(1);
  }
}

export const config = validateEnv();