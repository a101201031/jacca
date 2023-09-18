import type { ISchemaAny, ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { deleteReviewService, readReviewService } from '@service/review';
import { reviewPathParamSchema } from '@validation/review';
import createHttpError from 'http-errors';
import { isObject } from 'lodash';

const handler: ValidatedHandler<
  ISchemaAny,
  typeof reviewPathParamSchema
> = async (event) => {
  const { reviewId } = event.pathParameters;
  const { uid } = event.body.decodedIdToken;

  const review = await readReviewService({ id: reviewId });
  if (!review) {
    throw createHttpError(404, {
      code: 'entitiy_not_found',
      message: 'review is not found.',
    });
  }

  try {
    await deleteReviewService({ reviewId, userId: uid });
  } catch (err) {
    if (
      isObject(err) &&
      'message' in err &&
      err.message === 'user permission denied'
    )
      throw createHttpError(403, {
        code: 'permission_denied',
        message: 'not have permission to review.',
      });
    else throw err;
  }

  return formatJSONResponse({}, 204);
};

export const deleteCafe = middyfy({
  handler,
  eventSchema: { pathParameterSchema: reviewPathParamSchema },
  requiredAuth: true,
});
