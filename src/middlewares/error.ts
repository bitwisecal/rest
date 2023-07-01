import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import config from '../config/config';
import logger from '../config/logger';
import { ApiError, INTERNAL_SERVER_ERROR } from '../errors';

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    const type = error.type || 'UNKNOWN_ERROR';
    error = new ApiError(
      {
        type,
        message,
        statusCode
      },
      message,
      false,
      err.stack
    );
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message, type } = err;
  if (!err.isOperational) {
    statusCode = INTERNAL_SERVER_ERROR.statusCode;
    message = INTERNAL_SERVER_ERROR.message;
    type = INTERNAL_SERVER_ERROR.type;
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    type
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
