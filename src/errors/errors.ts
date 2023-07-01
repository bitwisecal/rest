import { ErrorPayload } from './errorTypes';

export const EMPTY_STRING_ERROR: ErrorPayload = {
  type: 'EMPTY_STRING_ERROR',
  message: 'Cannot add empty string',
  statusCode: 400
};

export const MEMBER_NOT_FOUND: ErrorPayload = {
  type: 'MEMBER_NOT_FOUND',
  message: 'Member not found.',
  statusCode: 404
};

export const MAXED_OUT_CONNECTIONS: ErrorPayload = {
  type: 'MAXED_OUT_CONNECTIONS',
  message: 'Database has maxed out its connections',
  statusCode: 503
};

export const REQ_EXPIRED: ErrorPayload = {
  type: 'REQ_EXPIRED',
  message: 'Request has expired',
  // 401 is more accurate but with this being used
  // for multi-file we don't want that to result in
  // the client logging out
  statusCode: 400
};

export const FAILED_TO_FETCH: ErrorPayload = {
  type: 'FAILED_TO_FETCH',
  message: 'Failed to fetch'
  // no status code needed, only used in sdk
};

export const NOT_FOUND: ErrorPayload = {
  type: 'NOT_FOUND',
  message: 'The requested resource does not exist.',
  statusCode: 404
};

export const BAD_REQUEST: ErrorPayload = {
  type: 'BAD_REQUEST',
  message: 'Bad request',
  statusCode: 400
};

export const INTERNAL_SERVER_ERROR: ErrorPayload = {
  type: 'INTERNAL_SERVER_ERROR',
  message: 'An Error occurred on the server. Please try again later.',
  statusCode: 500
};

export const METHOD_NOT_ALLOWED: ErrorPayload = {
  type: 'METHOD_NOT_ALLOWED',
  message: 'Method not allowed',
  statusCode: 405
};
