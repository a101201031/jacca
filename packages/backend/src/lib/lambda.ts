import { errorHandler } from '@middleware/errorHandler';
import { firebaseConnector } from '@middleware/firebaseConnector';
import { mongoDbConnector } from '@middleware/mongoDbConnector';
import { tokenDecoder } from '@middleware/tokenDecoder';
import { validator } from '@middleware/validator';
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import type { Handler } from 'aws-lambda';
import type { ObjectSchema } from 'yup';

const passMiddleware = () => ({ before() {} });

type Middfy = ({
  handler,
  eventSchema,
  requiredAuth,
}: {
  handler: Handler;
  eventSchema?: {
    bodyParameterSchema?: ObjectSchema<any>;
    pathParameterSchema?: ObjectSchema<any>;
    queryParameterSchema?: ObjectSchema<any>;
  };
  requiredAuth?: boolean;
}) => middy.MiddyfiedHandler;

export const middyfy: Middfy = ({
  handler,
  eventSchema,
  requiredAuth = false,
}) =>
  middy(handler)
    .use(middyJsonBodyParser())
    .use(firebaseConnector())
    .use(tokenDecoder({ requiredAuth }))
    .use(eventSchema ? validator({ eventSchema }) : passMiddleware())
    .use(mongoDbConnector())
    .use(errorHandler());
