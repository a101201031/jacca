import type { ISchemaAny, ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { readCafesService } from '@service/cafe';
import { readCafesQueryParamSchema } from '@validation/cafe';

const handler: ValidatedHandler<
  ISchemaAny,
  ISchemaAny,
  typeof readCafesQueryParamSchema
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
    cafes: cafes.map((v) => ({
      _id: v._id,
      title: v.title,
      address: v.address,
      roadAddress: v.roadAddress,
      rating: v.rating / 20,
      tags: v.tags,
      images: v.images,
    })),
    paging: {
      limit,
      offset,
      total,
    },
  });
};

export const readCafes = middyfy({
  handler,
  eventSchema: { queryParameterSchema: readCafesQueryParamSchema },
});
