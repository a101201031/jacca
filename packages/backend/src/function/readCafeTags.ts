import type { ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { readCafeTagsService } from '@service/cafe';

const handler: ValidatedHandler = async () => {
  const cafeTags = await readCafeTagsService();
  return formatJSONResponse({ cafeTags }, 200);
};

export const readCafeTags = middyfy({
  handler,
});
