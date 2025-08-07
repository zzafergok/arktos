import { ApiResponse, PaginatedResponse } from '../types';

export const createSuccessResponse = <T = any>(
  data?: T,
  message?: string,
  code?: string
): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
    code,
    timestamp: new Date().toISOString(),
  };
};

export const createErrorResponse = (
  message: string,
  code?: string,
  additionalData?: any
): ApiResponse => {
  return {
    success: false,
    message,
    error: message,
    code,
    timestamp: new Date().toISOString(),
    ...additionalData,
  };
};

export const createPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message?: string
): PaginatedResponse<T> => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    success: true,
    message,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
    timestamp: new Date().toISOString(),
  };
};