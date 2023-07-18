import type { ValidatedHandler } from '@lib/apiGateway';
import { formatJSONResponse } from '@lib/apiGateway';
import { middyfy } from '@lib/lambda';
import { createUserService, readUserService } from '@service/user';
import { createUserBodySchema } from '@validation/user';
import createHttpError from 'http-errors';

const handler: ValidatedHandler<typeof createUserBodySchema> = async (
  event,
) => {
  const {
    displayName,
    decodedIdToken: { uid, email },
  } = event.body;

  const userCheck = await readUserService({ _id: uid });
  if (userCheck) {
    throw createHttpError(400, {
      code: 'user_already_exist',
      message: 'user already exist.',
    });
  }

  const user = await createUserService({ _id: uid, email, displayName });

  return formatJSONResponse({ user }, 200);
};

export const createUser = middyfy({
  handler,
  eventSchema: { bodyParameterSchema: createUserBodySchema },
});
