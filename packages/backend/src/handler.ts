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
  readCafes: {
    handler: `${handlerPath(__dirname)}/function/readCafes.readCafes`,
    events: [
      {
        http: {
          method: 'get',
          path: 'cafes',
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
  readCafeTags: {
    handler: `${handlerPath(__dirname)}/function/readCafeTags.readCafeTags`,
    events: [
      {
        http: {
          method: 'get',
          path: 'cafe/tags',
        },
      },
    ],
  },
  createReview: {
    handler: `${handlerPath(__dirname)}/function/createReview.createReview`,
    events: [
      {
        http: {
          method: 'post',
          path: 'review',
        },
      },
    ],
  },
  readReview: {
    handler: `${handlerPath(__dirname)}/function/readReview.readReview`,
    events: [
      {
        http: {
          method: 'get',
          path: 'review/{reviewId}',
        },
      },
    ],
  },
  deleteReview: {
    handler: `${handlerPath(__dirname)}/function/deleteReview.deleteReview`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'review/{reviewId}',
        },
      },
    ],
  },
  readReviews: {
    handler: `${handlerPath(__dirname)}/function/readReviews.readReviews`,
    events: [
      {
        http: {
          method: 'get',
          path: 'reviews',
        },
      },
    ],
  },
  createBookmark: {
    handler: `${handlerPath(__dirname)}/function/createBookmark.createBookmark`,
    events: [
      {
        http: {
          method: 'post',
          path: 'bookmark',
        },
      },
    ],
  },
  deleteBookmark: {
    handler: `${handlerPath(__dirname)}/function/deleteBookmark.deleteBookmark`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'bookmark/cafe/{cafeId}',
        },
      },
    ],
  },
};
