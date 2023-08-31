import axios from 'axios';
import { queryParamsParser } from './fetch';

const searchAxiosClient = axios.create({
  baseURL: `https://openapi.naver.com/v1/search`,
  headers: {
    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
  },
});

const geocodeAxiosClient = axios.create({
  baseURL: `https://naveropenapi.apigw.ntruss.com/map-geocode/v2`,
  headers: {
    'X-NCP-APIGW-API-KEY-ID': process.env.NCP_APIGW_API_KEY_ID,
    'X-NCP-APIGW-API-KEY': process.env.NCP_APIGW_API_KEY,
  },
});

interface SearchPlaceItem {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
}

interface SearchPlaceApiRes {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: SearchPlaceItem[];
}

interface SearchImageItem {
  title: string;
  link: string;
  thumbnail: string;
  sizeheight: string;
  sizewidth: string;
}

interface SearchImageApiRes {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: SearchImageItem[];
}

interface GeocodeAddress {
  roadAddress: string;
  jibunAddress: string;
  englishAddress: string;
  addressElements: {
    types: string[];
    longName: string;
    shortName: string;
    code: string;
  }[];
  x: string;
  y: string;
  distance: number;
}

interface GeocodeApiRes {
  status: string;
  meta: {
    totalCount: number;
    page: number;
    count: number;
  };
  addresses: GeocodeAddress[];
  errorMessage: string;
}

export const searchPlaceApi = async ({
  query,
  display = '5',
  sort = 'random',
}): Promise<SearchPlaceApiRes> => {
  const queryString = queryParamsParser({
    query,
    display,
    sort,
  });

  const { data } = await searchAxiosClient.get<SearchPlaceApiRes>(
    `/local.json${queryString}`,
  );
  return data;
};

export const searchImageApi = async ({
  query,
  display = '4',
  start = '1',
  sort = 'sim',
  filter = 'all',
}) => {
  const queryString = queryParamsParser({
    query,
    display,
    start,
    sort,
    filter,
  });

  const { data } = await searchAxiosClient.get<SearchImageApiRes>(
    `/image${queryString}`,
  );
  return data;
};

export const geocodeApi = async ({ query, page = '1', count = '10' }) => {
  const queryString = queryParamsParser({
    query,
    page,
    count,
  });

  const { data } = await geocodeAxiosClient.get<GeocodeApiRes>(
    `/geocode${queryString}`,
  );
  return data;
};
