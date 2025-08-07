import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  sessionId: string;
  type: 'access' | 'refresh';
}

export class JwtService {
  private static getAccessSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }
    return secret;
  }

  private static getRefreshSecret(): string {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET environment variable is not defined');
    }
    return secret;
  }

  private static getAccessExpiresIn(): string {
    return process.env.JWT_EXPIRES_IN || '15m';
  }

  private static getRefreshExpiresIn(): string {
    return process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  }

  public static generateAccessToken(
    userId: string,
    email: string,
    role: string,
    sessionId: string
  ): string {
    try {
      const payload: Omit<JwtPayload, 'type'> & { type: 'access' } = {
        userId,
        email,
        role,
        sessionId,
        type: 'access',
      };

      return jwt.sign(payload, this.getAccessSecret(), {
        expiresIn: this.getAccessExpiresIn(),
      } as jwt.SignOptions);
    } catch (error) {
      throw new Error('Failed to generate access token');
    }
  }

  public static generateRefreshToken(
    userId: string,
    email: string,
    role: string,
    sessionId: string
  ): string {
    try {
      const payload: Omit<JwtPayload, 'type'> & { type: 'refresh' } = {
        userId,
        email,
        role,
        sessionId,
        type: 'refresh',
      };

      return jwt.sign(payload, this.getRefreshSecret(), {
        expiresIn: this.getRefreshExpiresIn(),
      } as jwt.SignOptions);
    } catch (error) {
      throw new Error('Failed to generate refresh token');
    }
  }

  public static verifyAccessToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.getAccessSecret());
      return decoded as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Access token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid access token');
      }
      throw new Error('Access token verification failed');
    }
  }

  public static verifyRefreshToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.getRefreshSecret());
      return decoded as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid refresh token');
      }
      throw new Error('Refresh token verification failed');
    }
  }

  public static generatePasswordResetToken(
    userId: string,
    email: string
  ): string {
    try {
      const payload = {
        userId,
        email,
        type: 'password_reset',
        iat: Math.floor(Date.now() / 1000),
      };

      return jwt.sign(payload, this.getAccessSecret(), {
        expiresIn: '1h',
      });
    } catch (error) {
      throw new Error('Failed to generate password reset token');
    }
  }

  public static verifyPasswordResetToken(token: string): {
    userId: string;
    email: string;
    iat: number;
  } {
    try {
      const decoded = jwt.verify(token, this.getAccessSecret()) as any;

      if (decoded.type !== 'password_reset') {
        throw new Error('Invalid token type');
      }

      return {
        userId: decoded.userId,
        email: decoded.email,
        iat: decoded.iat,
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Password reset token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid password reset token');
      }
      throw new Error('Password reset token verification failed');
    }
  }

  public static generateEmailVerifyToken(
    userId: string,
    email: string
  ): string {
    try {
      const payload = {
        userId,
        email,
        type: 'email_verify',
      };

      return jwt.sign(payload, this.getAccessSecret(), {
        expiresIn: '24h',
      });
    } catch (error) {
      throw new Error('Failed to generate email verification token');
    }
  }

  public static verifyEmailVerifyToken(token: string): {
    userId: string;
    email: string;
  } {
    try {
      const decoded = jwt.verify(token, this.getAccessSecret()) as any;

      if (decoded.type !== 'email_verify') {
        throw new Error('Invalid token type');
      }

      return {
        userId: decoded.userId,
        email: decoded.email,
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Email verification token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid email verification token');
      }
      throw new Error('Email verification token verification failed');
    }
  }

  public static getExpiresInSeconds(): number {
    try {
      const expiresIn = this.getAccessExpiresIn();

      if (expiresIn.endsWith('h')) {
        return parseInt(expiresIn.slice(0, -1)) * 3600;
      }
      if (expiresIn.endsWith('m')) {
        return parseInt(expiresIn.slice(0, -1)) * 60;
      }
      if (expiresIn.endsWith('d')) {
        return parseInt(expiresIn.slice(0, -1)) * 24 * 3600;
      }
      if (expiresIn.endsWith('s')) {
        return parseInt(expiresIn.slice(0, -1));
      }

      return parseInt(expiresIn);
    } catch (error) {
      throw new Error('Failed to calculate token expiration time');
    }
  }
}