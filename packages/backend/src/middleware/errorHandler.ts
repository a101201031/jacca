import { normalizeHttpResponse } from '@lib/nomalizeHttpResponse';
import type middy from '@middy/core';
import createError, { HttpError } from 'http-errors';

interface Error extends Partial<HttpError> {
  code: string;
}

interface OptionTypes {
  logger: ((error: any) => void) | boolean;
  fallbackCode: string;
  fallbackMessage: string;
}

const defaults = {
  // eslint-disable-next-line no-console
  logger: console.error,
  fallbackCode: 'internal_server_error',
  fallbackMessage: 'internal server error',
};

export const errorHandler = (
  options: OptionTypes = defaults,
): middy.MiddlewareObj => {
  const onError: middy.MiddlewareFn = async (request) => {
    if (request.response !== undefined) return;
    if (typeof options.logger === 'function') {
      options.logger(request.error);
    }

    if (request.error instanceof HttpError) {
      if (request.error.statusCode === 500) {
        request.error.statusCode = 500;
        request.error.code = options.fallbackCode;
        request.error.message = options.fallbackMessage;
      }
    } else {
      request.error = createError(500);
      (request.error as any).code = options.fallbackCode;
      request.error.message = options.fallbackMessage;
    }

    normalizeHttpResponse(request);
    const { statusCode, code, message } = request.error as Error;
    request.response = {
      statusCode,
      body: JSON.stringify({
        error: {
          code,
          message,
        },
      }),
      headers: {
        ...request.response.headers,
        'Content-Type': 'application/json',
      },
    };
  };
  return {
    onError,
  };
};
