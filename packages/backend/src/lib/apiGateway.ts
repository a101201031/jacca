import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { DecodedIdToken } from 'firebase-admin/auth';

interface ValidatedAPIGatewayProxyEvent
  extends Omit<APIGatewayProxyEvent, 'body'> {
  body: { decodedIdToken: DecodedIdToken };
}

export type ValidatedHandler = Handler<
  ValidatedAPIGatewayProxyEvent,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (
  response: Record<string, unknown> = {},
  statusCode = 200,
) => ({
  statusCode,
  body: JSON.stringify(response),
});
