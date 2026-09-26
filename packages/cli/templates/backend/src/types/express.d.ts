import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
      sessionId?: string;
      rateLimitInfo?: {
        limit: number;
        remaining: number;
        resetTime: Date;
      };
    }
  }
}

export {};