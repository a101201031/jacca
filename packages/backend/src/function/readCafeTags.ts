import type { ISchemaAny, ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { readCafeTagsService } from '@service/cafe';
import { readCafeTagsQueryParamSchema } from '@validation/cafe';

const handler: ValidatedHandler<
  ISchemaAny,
  ISchemaAny,
  typeof readCafeTagsQueryParamSchema
> = async (event) => {
  const { tag } = event.queryStringParameters;
  const tags = await readCafeTagsService({ tag });
  return formatJSONResponse({ tags }, 200);
};

export const readCafeTags = middyfy({
  handler,
  eventSchema: {
    queryParameterSchema: readCafeTagsQueryParamSchema,
  },
});
