import {
  formatJSONResponse,
  type ISchemaAny,
  type ValidatedHandler,
} from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { deleteCafeService, readCafeService } from '@service/cafe';
import { readDeleteCafePathParamSchema } from '@validation/cafe';
import createHttpError from 'http-errors';

const handler: ValidatedHandler<
  ISchemaAny,
  ISchemaAny,
  typeof readDeleteCafePathParamSchema
> = async (event) => {
  const { cafeId } = event.pathParameters;

  const cafe = await readCafeService({ id: cafeId });
  if (!cafe) {
    throw createHttpError(404, {
      code: 'entitiy_not_found',
      message: 'cafe is not found.',
    });
  }
  await deleteCafeService({ id: cafeId });

  return formatJSONResponse({}, 204);
};

export const deleteCafe = middyfy({
  handler,
  eventSchema: { pathParameterSchema: readDeleteCafePathParamSchema },
});
