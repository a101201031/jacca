import type { ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { addCafeTagService, readCafeService } from '@service/cafe';
import { cafePathParamSchema, createCafeTagBodySchema } from '@validation/cafe';
import createHttpError from 'http-errors';

const handler: ValidatedHandler<
  typeof createCafeTagBodySchema,
  typeof cafePathParamSchema
> = async (event) => {
  const {
    body: { tag },
    pathParameters: { cafeId },
  } = event;

  const originCafe = await readCafeService({ id: cafeId });
  if (!originCafe) {
    throw createHttpError(404, {
      code: 'entity_not_found',
      message: 'cafe is not found.',
    });
  }

  const cafe = await addCafeTagService({ tag, cafeId });

  return formatJSONResponse({ cafe }, 200);
};

export const createCafeTag = middyfy({
  handler,
  eventSchema: {
    bodyParameterSchema: createCafeTagBodySchema,
    pathParameterSchema: cafePathParamSchema,
  },
  requiredAuth: true,
});
