import type { ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { readCafeService } from '@service/cafe';
import { createReviewService } from '@service/review';
import { createReviewBodySchema } from '@validation/review';
import createHttpError from 'http-errors';

const handler: ValidatedHandler<typeof createReviewBodySchema> = async (
  event,
) => {
  const {
    decodedIdToken: { uid },
    cafeId,
    score,
    content,
  } = event.body;

  const cafe = await readCafeService({ id: cafeId });

  if (!cafe) {
    throw createHttpError(404, {
      code: 'entitiy_not_found',
      message: 'cafe is not found.',
    });
  }

  const review = await createReviewService({
    userId: uid,
    cafeId,
    score,
    content,
  });

  return formatJSONResponse({ review }, 200);
};

export const createReview = middyfy({
  handler,
  eventSchema: {
    bodyParameterSchema: createReviewBodySchema,
  },
  requiredAuth: true,
});
