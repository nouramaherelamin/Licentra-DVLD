import { sendError } from '../shared/utils/response.js';
import { HttpStatus } from '../shared/constants/httpStatus.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Exception Caught:', err);

  const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || 'An unexpected internal server error occurred';
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const details = err.details || [];

  return sendError(res, message, statusCode, code, details);
};
