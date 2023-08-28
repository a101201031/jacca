import { chain, keys } from 'lodash';

export const queryParamsParser = (
  queryParams: { [key: string]: string } = {},
) =>
  keys(queryParams).length === 0
    ? ''
    : `?${chain(queryParams)
        .toPairs()
        .reduce((urlSearchParams, keyValuePair) => {
          urlSearchParams.set(keyValuePair[0], keyValuePair[1]);
          return urlSearchParams;
        }, new URLSearchParams())
        .value()
        .toString()}`;
