import { errorHandler } from '@middleware/errorHandler';
import { firebaseConnector } from '@middleware/firebaseConnector';
import { mongoDbConnector } from '@middleware/mongoDbConnector';
import { tokenDecoder } from '@middleware/tokenDecoder';
import { validator } from '@middleware/validator';
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import type { Handler } from 'aws-lambda';
import type { ObjectSchema } from 'yup';

const passMiddleware = () => null;

type Middfy = ({
  handler,
  eventSchema,
}: {
  handler: Handler;
  eventSchema?: {
    bodyParameterSchema?: ObjectSchema<any>;
    pathParameterSchema?: ObjectSchema<any>;
    queryParameterSchema?: ObjectSchema<any>;
  };
}) => middy.MiddyfiedHandler;

export const middyfy: Middfy = ({ handler, eventSchema }) =>
  middy(handler)
    .use(middyJsonBodyParser())
    .use(firebaseConnector())
    .use(tokenDecoder())
    .use(eventSchema ? validator({ eventSchema }) : passMiddleware())
    .use(mongoDbConnector())
    .use(errorHandler());
