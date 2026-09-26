import { ERROR_CODES } from './errorCodes';

export const SERVICE_MESSAGES = {
  // Application messages
  APP: {
    API_RUNNING: {
      code: 'APP_001',
      message: 'API is running successfully',
      statusCode: 200,
    },
    HEALTH_CHECK_FAILED: {
      code: 'APP_002',
      message: 'Health check failed',
      statusCode: 503,
    },
    ENDPOINT_NOT_FOUND: {
      code: 'APP_003',
      message: 'Endpoint not found',
      statusCode: 404,
    },
  },

  // Authentication messages
  AUTH: {
    LOGIN_SUCCESS: {
      code: 'AUTH_S001',
      message: 'Login successful',
      statusCode: 200,
    },
    REGISTER_SUCCESS: {
      code: 'AUTH_S002',
      message: 'Registration successful',
      statusCode: 201,
    },
    LOGOUT_SUCCESS: {
      code: 'AUTH_S003',
      message: 'Logout successful',
      statusCode: 200,
    },
    EMAIL_VERIFICATION_SUCCESS: {
      code: 'AUTH_S004',
      message: 'Email verified successfully',
      statusCode: 200,
    },
    PASSWORD_RESET_SUCCESS: {
      code: 'AUTH_S005',
      message: 'Password reset successful',
      statusCode: 200,
    },
    INVALID_CREDENTIALS: {
      code: ERROR_CODES.AUTH_INVALID_CREDENTIALS,
      message: 'Invalid email or password',
      statusCode: 401,
    },
    TOKEN_EXPIRED: {
      code: ERROR_CODES.AUTH_TOKEN_EXPIRED,
      message: 'Token has expired',
      statusCode: 401,
    },
    INVALID_TOKEN: {
      code: ERROR_CODES.AUTH_TOKEN_INVALID,
      message: 'Invalid token provided',
      statusCode: 401,
    },
    USER_NOT_FOUND: {
      code: ERROR_CODES.AUTH_USER_NOT_FOUND,
      message: 'User not found',
      statusCode: 404,
    },
    EMAIL_NOT_VERIFIED: {
      code: ERROR_CODES.AUTH_EMAIL_NOT_VERIFIED,
      message: 'Please verify your email address',
      statusCode: 403,
    },
    ACCOUNT_DISABLED: {
      code: ERROR_CODES.AUTH_ACCOUNT_DISABLED,
      message: 'Account has been disabled',
      statusCode: 403,
    },
    INSUFFICIENT_PERMISSIONS: {
      code: ERROR_CODES.AUTH_INSUFFICIENT_PERMISSIONS,
      message: 'Insufficient permissions',
      statusCode: 403,
    },
  },

  // Validation messages
  VALIDATION: {
    REQUIRED_FIELD: {
      code: ERROR_CODES.VALIDATION_REQUIRED_FIELD,
      message: 'Required field is missing',
      statusCode: 400,
    },
    INVALID_FORMAT: {
      code: ERROR_CODES.VALIDATION_INVALID_FORMAT,
      message: 'Invalid format provided',
      statusCode: 400,
    },
    INVALID_EMAIL: {
      code: ERROR_CODES.VALIDATION_INVALID_FORMAT,
      message: 'Invalid email format',
      statusCode: 400,
    },
    PASSWORD_TOO_SHORT: {
      code: ERROR_CODES.VALIDATION_INVALID_LENGTH,
      message: 'Password must be at least 8 characters long',
      statusCode: 400,
    },
  },

  // Database messages
  DATABASE: {
    CONNECTION_ERROR: {
      code: ERROR_CODES.DB_CONNECTION_ERROR,
      message: 'Database connection failed',
      statusCode: 503,
    },
    RECORD_NOT_FOUND: {
      code: ERROR_CODES.DB_RECORD_NOT_FOUND,
      message: 'Record not found',
      statusCode: 404,
    },
    DUPLICATE_ENTRY: {
      code: ERROR_CODES.DB_DUPLICATE_ENTRY,
      message: 'Record already exists',
      statusCode: 409,
    },
  },

  // File/Upload messages
  FILE: {
    UPLOAD_SUCCESS: {
      code: 'FILE_S001',
      message: 'File uploaded successfully',
      statusCode: 200,
    },
    TOO_LARGE: {
      code: ERROR_CODES.FILE_TOO_LARGE,
      message: 'File size exceeds maximum limit',
      statusCode: 413,
    },
    INVALID_TYPE: {
      code: ERROR_CODES.FILE_INVALID_TYPE,
      message: 'Invalid file type',
      statusCode: 400,
    },
    NOT_FOUND: {
      code: ERROR_CODES.FILE_NOT_FOUND,
      message: 'File not found',
      statusCode: 404,
    },
  },

  // Rate limiting messages
  RATE_LIMIT: {
    EXCEEDED: {
      code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
      message: 'Too many requests, please try again later',
      statusCode: 429,
    },
  },

  // Email messages
  EMAIL: {
    SEND_SUCCESS: {
      code: 'EMAIL_S001',
      message: 'Email sent successfully',
      statusCode: 200,
    },
    SEND_FAILED: {
      code: ERROR_CODES.EMAIL_SEND_FAILED,
      message: 'Failed to send email',
      statusCode: 503,
    },
  },

  // Server messages
  SERVER: {
    INTERNAL_ERROR: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      statusCode: 500,
    },
    SERVICE_UNAVAILABLE: {
      code: ERROR_CODES.SERVICE_UNAVAILABLE,
      message: 'Service temporarily unavailable',
      statusCode: 503,
    },
  },
} as const;