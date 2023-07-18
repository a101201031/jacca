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
  createUser: {
    handler: `${handlerPath(__dirname)}/function/createUser.createUser`,
    events: [
      {
        http: {
          method: 'post',
          path: 'user',
        },
      },
    ],
  },
};
