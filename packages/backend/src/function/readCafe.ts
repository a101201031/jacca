import type { ISchemaAny, ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { readCafeService } from '@service/cafe';
import { cafePathParamSchema } from '@validation/cafe';
import createHttpError from 'http-errors';

const handler: ValidatedHandler<
  ISchemaAny,
  typeof cafePathParamSchema
> = async (event) => {
  const { cafeId } = event.pathParameters;

  const cafe = await readCafeService({ id: cafeId });
  if (!cafe) {
    throw createHttpError(404, {
      code: 'entitiy_not_found',
      message: 'cafe is not found.',
    });
  }

  return formatJSONResponse({
    cafe: { ...cafe, rating: cafe.rating / 20 },
  });
};

export const readCafe = middyfy({
  handler,
  eventSchema: { pathParameterSchema: cafePathParamSchema },
});
