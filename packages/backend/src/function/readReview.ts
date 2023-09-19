import type { ISchemaAny, ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { readReviewService } from '@service/review';
import { reviewPathParamSchema } from '@validation/review';
import createHttpError from 'http-errors';

const handler: ValidatedHandler<
  ISchemaAny,
  typeof reviewPathParamSchema
> = async (event) => {
  const { reviewId } = event.pathParameters;

  const review = await readReviewService({ id: reviewId });
  if (!review) {
    throw createHttpError(404, {
      code: 'entitiy_not_found',
      message: 'review is not found.',
    });
  }

  return formatJSONResponse({
    review,
  });
};

export const readReview = middyfy({
  handler,
  eventSchema: { pathParameterSchema: reviewPathParamSchema },
});
