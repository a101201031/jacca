import type { ISchemaAny, ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { searchPlaceService } from '@service/place';
import type { searchPlaceQueryParamSchema } from '@validation/place';

const handler: ValidatedHandler<
  ISchemaAny,
  ISchemaAny,
  typeof searchPlaceQueryParamSchema
> = async (event) => {
  const { query } = event.queryStringParameters;

  const place = await searchPlaceService({ query });

  return formatJSONResponse({ place }, 200);
};

export const searchPlace = middyfy({
  handler,
});
