import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../types';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  let statusCode = 500;
  let message = 'Internal server error';

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
  } else if (error.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  } else if (error.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Forbidden';
  } else if (error.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Not found';
  } else if (error.name === 'MulterError') {
    statusCode = 400;
    message = 'File upload error';
  } else if (error.name === 'TimeoutError') {
    statusCode = 408;
    message = 'Request timeout';
  }

  const response: APIResponse = {
    success: false,
    error: error.name || 'UnknownError',
    message: process.env.NODE_ENV === 'production' ? message : error.message
  };

  res.status(statusCode).json(response);
};
