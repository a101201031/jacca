import { errorHandler } from '@middleware/errorHandler';
import { firebaseConnector } from '@middleware/firebaseConnector';
import { mongoDbConnector } from '@middleware/mongoDbConnector';
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import type { Handler } from 'aws-lambda';

export const middyfy = (handler: Handler) =>
  middy(handler)
    .use(middyJsonBodyParser())
    .use(firebaseConnector())
    .use(mongoDbConnector())
    .use(errorHandler());
