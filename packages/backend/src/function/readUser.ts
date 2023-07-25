import type { ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { readUserService } from '@service/user';
import createHttpError from 'http-errors';

const handler: ValidatedHandler = async (event) => {
  const {
    decodedIdToken: { uid },
  } = event.body;

  const user = await readUserService({ _id: uid });
  if (!user) {
    throw createHttpError(404, {
      code: 'user_not_found',
      message: 'user not found.',
    });
  }

  return formatJSONResponse({ user }, 200);
};

export const readUser = middyfy({
  handler,
  requiredAuth: true,
});
