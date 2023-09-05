import type { ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { createCafeService, readCafeByTitleService } from '@service/cafe';
import { createCafeBodySchema } from '@validation/cafe';
import createHttpError from 'http-errors';

const handler: ValidatedHandler<typeof createCafeBodySchema> = async (
  event,
) => {
  const { address, title } = event.body;

  const originCafe = await readCafeByTitleService({ title });

  if (originCafe) {
    throw createHttpError(400, {
      code: 'entity_already_exists',
      message: 'cafe is already exists',
    });
  }

  const cafe = await createCafeService({ address, title });

  return formatJSONResponse({ cafe }, 200);
};

export const createCafe = middyfy({
  handler,
  eventSchema: {
    bodyParameterSchema: createCafeBodySchema,
  },
  requiredAuth: true,
});
