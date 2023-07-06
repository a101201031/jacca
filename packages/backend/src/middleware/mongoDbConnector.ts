import { databaseConnector } from '@lib/database';
import type middy from '@middy/core';

export const mongoDbConnector = (): middy.MiddlewareObj => {
  const before: middy.MiddlewareFn = async () => {
    await databaseConnector.isConnected();
  };

  const after: middy.MiddlewareFn = async () => {
    await databaseConnector.dispose();
  };

  return { before, after };
};
