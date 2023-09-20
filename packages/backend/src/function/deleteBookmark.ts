import type { ISchemaAny, ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { deleteBookmarkService } from '@service/bookmark';
import { bookmarkPathParamSchema } from '@validation/bookmark';

const handler: ValidatedHandler<
  ISchemaAny,
  typeof bookmarkPathParamSchema
> = async (event) => {
  const { cafeId } = event.pathParameters;
  const { uid } = event.body.decodedIdToken;

  await deleteBookmarkService({ userId: uid, cafeId });

  return formatJSONResponse({}, 204);
};

export const deleteBookmark = middyfy({
  handler,
  eventSchema: { pathParameterSchema: bookmarkPathParamSchema },
  requiredAuth: true,
});
