import type { ISchemaAny, ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { readCafesService } from '@service/cafe';
import { readCafesQuerySchema } from '@validation/cafe';

const handler: ValidatedHandler<
  ISchemaAny,
  ISchemaAny,
  typeof readCafesQuerySchema
> = async (event) => {
  const { title, rating, tags, limit, offset, sortBy, orderBy } =
    event.queryStringParameters;

  const { cafes, total } = await readCafesService({
    title,
    rating,
    tags,
    limit,
    offset,
    sortBy,
    orderBy,
  });

  return formatJSONResponse({
    cafes,
    paging: {
      limit,
      offset,
      total,
    },
  });
};

export const readCafes = middyfy({
  handler,
  eventSchema: { queryParameterSchema: readCafesQuerySchema },
});
