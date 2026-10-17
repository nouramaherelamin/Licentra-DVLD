import { HttpStatus } from '../constants/httpStatus.js';

export const sendSuccess = (res, data, message = 'Success', statusCode = HttpStatus.OK, meta = {}) => {
  return res.status(statusCode).json({
    success: true,
    data: data !== undefined ? data : null,
    message,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  });
};

export const sendError = (res, message = 'Internal server error', statusCode = HttpStatus.INTERNAL_SERVER_ERROR, code = 'ERROR', details = [], meta = {}) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details: Array.isArray(details) ? details : (details ? [details] : []),
    },
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  });
};
