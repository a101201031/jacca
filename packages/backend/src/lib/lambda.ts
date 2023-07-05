import { errorHandler } from '@middleware/errorHandler';
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import type { Handler } from 'aws-lambda';

export const middyfy = (handler: Handler) =>
  middy(handler).use(middyJsonBodyParser()).use(errorHandler());
