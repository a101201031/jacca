import type { ISchemaAny, ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { readReviewsService } from '@service/review';
import { readReviewsQueryParamSchema } from '@validation/review';

const handler: ValidatedHandler<
  ISchemaAny,
  ISchemaAny,
  typeof readReviewsQueryParamSchema
> = async (event) => {
  const { cafeId, userId, limit, offset, sortBy, orderBy } =
    event.queryStringParameters;

  const { reviews, total } = await readReviewsService({
    cafeId,
    userId,
    limit,
    offset,
    orderBy,
    sortBy,
  });

  return formatJSONResponse({
    reviews,
    paging: {
      limit,
      offset,
      total,
    },
  });
};

export const readReviews = middyfy({
  handler,
  eventSchema: { queryParameterSchema: readReviewsQueryParamSchema },
});
