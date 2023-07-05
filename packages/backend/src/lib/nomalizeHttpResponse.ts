import type middy from '@middy/core';

export const normalizeHttpResponse = (request: middy.Request) => {
  let { response } = request;
  if (typeof response === 'undefined') {
    response = {};
  } else if (
    typeof response?.statusCode === 'undefined' &&
    typeof response?.body === 'undefined' &&
    typeof response?.headers === 'undefined'
  ) {
    response = {
      statusCode: 200,
      body: response,
    };
  }
  response.statusCode ??= 500;
  response.headers ??= {};
  request.response = response;
  return response;
};
