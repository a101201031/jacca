import { handlerPath } from '@lib/handlerResolver';

export const handler = {
  test: {
    handler: `${handlerPath(__dirname)}/function/test.test`,
    events: [
      {
        http: {
          method: 'get',
          path: 'test',
        },
      },
    ],
  },
};
