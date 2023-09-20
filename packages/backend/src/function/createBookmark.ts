import type { ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { createBookmarkService } from '@service/bookmark';
import { readCafeService } from '@service/cafe';
import { createBookmarkBodySchema } from '@validation/bookmark';
import createHttpError from 'http-errors';

const handler: ValidatedHandler<typeof createBookmarkBodySchema> = async (
  event,
) => {
  const {
    cafeId,
    decodedIdToken: { uid },
  } = event.body;

  const cafe = await readCafeService({ id: cafeId });
  if (!cafe) {
    throw createHttpError(404, {
      code: 'entitiy_not_found',
      message: 'cafe is not found.',
    });
  }

  const bookmark = await createBookmarkService({ userId: uid, cafeId });

  return formatJSONResponse({ bookmark }, 200);
};

export const createBookmark = middyfy({
  handler,
  eventSchema: {
    bodyParameterSchema: createBookmarkBodySchema,
  },
  requiredAuth: true,
});
