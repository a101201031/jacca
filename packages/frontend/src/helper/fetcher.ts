import axios from 'axios';
import { chain, keys } from 'lodash-es';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface PostPutPayload {
  path: string;
  queryParams?: { [key: string]: string | number };
  bodyParams?: { [key: string]: any };
  accessToken?: string;
}

interface GetDeletePayload {
  path: string;
  queryParams?: { [key: string]: string | number };
  accessToken?: string;
}

export const planeFetcher = axiosClient;

function queryParamsParser(
  queryParams: { [key: string]: string | number } = {},
) {
  return keys(queryParams).length === 0
    ? ''
    : '?' +
        chain(queryParams)
          .toPairs()
          .reduce((urlSearchParams, keyValuePair) => {
            urlSearchParams.set(keyValuePair[0], keyValuePair[1].toString());
            return urlSearchParams;
          }, new URLSearchParams())
          .value()
          .toString();
}

async function get<T = any>({
  path,
  queryParams = {},
  accessToken = '',
}: GetDeletePayload) {
  const queryString = queryParamsParser(queryParams);
  const { data } = await axiosClient.get<T>(`${path}${queryString}`, {
    headers:
      accessToken === '' ? {} : { Authorization: `Bearer ${accessToken}` },
  });
  return data;
}

async function post<T = any>({
  path,
  queryParams = {},
  bodyParams = {},
  accessToken,
}: PostPutPayload) {
  const queryString = queryParamsParser(queryParams);
  const { data } = await axiosClient.post<T>(
    `${path}${queryString}`,
    bodyParams,
    {
      headers:
        accessToken === '' ? {} : { Authorization: `Bearer ${accessToken}` },
    },
  );
  return data;
}

async function put<T = any>({
  path,
  queryParams = {},
  bodyParams = {},
  accessToken,
}: PostPutPayload) {
  const queryString = queryParamsParser(queryParams);
  const { data } = await axiosClient.put<T>(
    `${path}${queryString}`,
    bodyParams,
    {
      headers:
        accessToken === '' ? {} : { Authorization: `Bearer ${accessToken}` },
    },
  );
  return data;
}

async function del<T = any>({
  path,
  queryParams = {},
  accessToken,
}: GetDeletePayload) {
  const queryString = queryParamsParser(queryParams);
  const { data } = await axiosClient.delete<T>(`${path}${queryString}`, {
    headers:
      accessToken === '' ? {} : { Authorization: `Bearer ${accessToken}` },
  });
  return data;
}

export const fetcher = { get, post, put, del };
