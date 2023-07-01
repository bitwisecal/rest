import { ErrorPayload } from './errorTypes';

export class ApiError extends Error {
  type: ErrorPayload['type'];
  extra?: ErrorPayload['extra'];
  statusCode: ErrorPayload['statusCode'];
  isOperational: boolean;

  constructor(
    { message, type, extra, statusCode }: ErrorPayload,
    messageOverride?: ErrorPayload['message'],
    isOperational = true,
    stack = ''
  ) {
    super(message);

    this.type = type;
    this.extra = extra;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (messageOverride) {
      this.message = messageOverride;
    }

    Object.setPrototypeOf(this, ApiError.prototype);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  get json() {
    const { type, extra, message, statusCode } = this;
    return { type, extra, message, statusCode };
  }
}
