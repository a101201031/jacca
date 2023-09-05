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
  readUser: {
    handler: `${handlerPath(__dirname)}/function/readUser.readUser`,
    events: [
      {
        http: {
          method: 'get',
          path: 'user',
        },
      },
    ],
  },
  searchPlace: {
    handler: `${handlerPath(__dirname)}/function/searchPlace.searchPlace`,
    events: [
      {
        http: {
          method: 'get',
          path: 'place',
        },
      },
    ],
  },
  createCafe: {
    handler: `${handlerPath(__dirname)}/function/createCafe.createCafe`,
    events: [
      {
        http: {
          method: 'post',
          path: 'cafe',
        },
      },
    ],
  },
  readCafe: {
    handler: `${handlerPath(__dirname)}/function/readCafe.readCafe`,
    events: [
      {
        http: {
          method: 'get',
          path: 'cafe/{cafeId}',
        },
      },
    ],
  },
  deleteCafe: {
    handler: `${handlerPath(__dirname)}/function/deleteCafe.deleteCafe`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'cafe/{cafeId}',
        },
      },
    ],
  },
  createCafeTag: {
    handler: `${handlerPath(__dirname)}/function/createCafeTag.createCafeTag`,
    events: [
      {
        http: {
          method: 'post',
          path: 'cafe/{cafeId}/tag',
        },
      },
    ],
  },
};
