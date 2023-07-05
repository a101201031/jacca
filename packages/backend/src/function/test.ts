import { formatJSONResponse } from '@lib/api-gateway';
import { middyfy } from '@lib/lambda';
import type { APIGatewayEvent } from 'aws-lambda';

const testFunction = async (event: APIGatewayEvent) =>
  formatJSONResponse({ event }, 200);

export const test = middyfy(testFunction);
