import { isFirebaseError } from '@lib/firebase';
import type middy from '@middy/core';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { getAuth } from 'firebase-admin/auth';
import createHttpError from 'http-errors';

interface AuthorizerEventTypes extends Omit<APIGatewayProxyEvent, 'body'> {
  body: { decodedIdToken: DecodedIdToken | null; [key: string | number]: any };
}

export const tokenDecoder = (): middy.MiddlewareObj<
  AuthorizerEventTypes,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<
    AuthorizerEventTypes,
    APIGatewayProxyResult
  > = async (request) => {
    const { headers, httpMethod, body } = request.event;
    let decodedIdToken = null;

    if (httpMethod === 'OPTIONS') return;

    const authHeader = 'Authorization';

    if (!(authHeader in headers)) return;

    const tokenParts = headers.Authorization.split(' ');
    const idToken = tokenParts[1];
    if (tokenParts[0] !== 'Bearer' || !idToken) {
      throw createHttpError(401, {
        code: 'invalid_token_header_format',
        message: 'can not read token.',
      });
    }

    try {
      decodedIdToken = await getAuth().verifyIdToken(idToken);
    } catch (e: unknown) {
      if (isFirebaseError(e) && 'auth/id-token-expired') {
        throw createHttpError(401, {
          code: 'expired_token',
          message: 'token is expired.',
        });
      }
      throw createHttpError(401, {
        code: 'invalid_token',
        message: 'token is invalid.',
      });
    }
    request.event.body = { ...body, decodedIdToken };
  };
  return { before };
};
