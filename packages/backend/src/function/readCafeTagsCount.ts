import type { ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { readCafeTagsCountService } from '@service/cafe';

const handler: ValidatedHandler = async () => {
  const cafeTags = await readCafeTagsCountService();
  return formatJSONResponse({ cafeTags }, 200);
};

export const readCafeTagsCount = middyfy({
  handler,
});
