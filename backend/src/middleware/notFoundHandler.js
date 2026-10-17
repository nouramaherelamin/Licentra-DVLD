import { sendError } from '../shared/utils/response.js';
import { HttpStatus } from '../shared/constants/httpStatus.js';

export const notFoundHandler = (req, res, next) => {
  return sendError(
    res,
    `Cannot ${req.method} ${req.originalUrl} - Endpoint not found`,
    HttpStatus.NOT_FOUND,
    'RESOURCE_NOT_FOUND'
  );
};
