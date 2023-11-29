import type { ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { updateReviewService } from '@service/review';
import { updateReviewBodySchema } from '@validation/review';

const handler: ValidatedHandler<typeof updateReviewBodySchema> = async (
  event,
) => {
  const {
    decodedIdToken: { uid },
    reviewId,
    score,
    content,
  } = event.body;

  const review = await updateReviewService({
    reviewId,
    userId: uid,
    score,
    content,
  });

  return formatJSONResponse({ review }, 200);
};

export const updateReview = middyfy({
  handler,
  eventSchema: {
    bodyParameterSchema: updateReviewBodySchema,
  },
  requiredAuth: true,
});
