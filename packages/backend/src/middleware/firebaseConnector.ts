import type middy from '@middy/core';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getApps, initializeApp, cert } from 'firebase-admin/app';

export const firebaseConnector = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = () => {
    if (getApps().length === 0) {
      initializeApp({
        credential: cert(JSON.parse(process.env.GOOGLE_CREDENTIALS)),
      });
    }
  };
  return { before };
};
