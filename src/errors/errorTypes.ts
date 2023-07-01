export interface ErrorPayload {
  type: string;
  message: string;
  extra?: object;
  statusCode?: number;
}

export interface ErrorMap {
  [key: string]: ErrorPayload;
}

export interface HttpError extends ErrorPayload {
  statusCode: number;
}
