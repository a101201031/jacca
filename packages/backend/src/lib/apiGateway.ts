import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { DecodedIdToken } from 'firebase-admin/auth';
import type { ISchema, InferType } from 'yup';

export interface ISchemaAny extends ISchema<any, any, any, any> {}

export interface ValidatedAPIGatewayProxyEvent<
  Body extends ISchemaAny = ISchemaAny,
  PathParameters extends ISchemaAny = ISchemaAny,
  QueryStringParameters extends ISchemaAny = ISchemaAny,
> extends Omit<
    APIGatewayProxyEvent,
    'body' | 'queryStringParameters' | 'pathParameters'
  > {
  body: Omit<InferType<Body>, 'decodedIdToken'> & {
    decodedIdToken: DecodedIdToken;
  };
  pathParameters: InferType<PathParameters>;
  queryStringParameters: InferType<QueryStringParameters>;
}

export type ValidatedHandler<
  Body extends ISchemaAny = ISchemaAny,
  PathParameters extends ISchemaAny = ISchemaAny,
  QueryStringParameters extends ISchemaAny = ISchemaAny,
> = Handler<
  ValidatedAPIGatewayProxyEvent<Body, PathParameters, QueryStringParameters>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (
  response: Record<string, unknown> = {},
  statusCode = 200,
) => ({
  statusCode,
  body: JSON.stringify(response),
});
