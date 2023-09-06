import { formatJSONResponse, type ValidatedHandler } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { readCafesService } from '@service/cafe';

const handler: ValidatedHandler = async (event) => {
  const { limit, offset } = event.queryStringParameters;

  const { cafes, total } = await readCafesService(event.queryStringParameters);

  return formatJSONResponse({
    cafes,
    paging: {
      limit,
      offset,
      total,
    },
  });
};

export const readCafes = middyfy({
  handler,
});
