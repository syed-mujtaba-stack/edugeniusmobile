import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/errorResponse';

interface ErrorWithCode extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
  value?: string;
  message: string;
}

type ErrorResponseType = ErrorWithCode & {
  statusCode: number;
};

const errorHandler: ErrorRequestHandler = (
  err: ErrorWithCode,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ErrorResponseType = { 
    ...err,
    statusCode: err.statusCode || 500,
    message: err.message || 'Server Error',
    name: err.name || 'Error'
  };

  // Log to console for development
  console.error(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors || {})
      .map((val) => val.message)
      .join(', ');
    error = new ErrorResponse(message, 400);
  }

  // JWT Error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Not authorized, token failed';
    error = new ErrorResponse(message, 401);
  }

  // JWT Expired
  if (err.name === 'TokenExpiredError') {
    const message = 'Token has expired';
    error = new ErrorResponse(message, 401);
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.message,
  });
};

export default errorHandler;
