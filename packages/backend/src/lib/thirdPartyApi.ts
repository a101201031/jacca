import axios from 'axios';
import { queryParamsParser } from './fetch';

const searchAxiosClient = axios.create({
  baseURL: `https://openapi.naver.com/v1/search`,
  headers: {
    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
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

export const searchPlaceApi = async ({
  query,
  display = '5',
  sort = 'random',
}): Promise<SearchPlaceApiRes> => {
  const queryString = queryParamsParser({
    query,
    display,
    start: '1',
    sort,
  });

  const { data } = await searchAxiosClient.get<SearchPlaceApiRes>(
    `/local.json${queryString}`,
  );
  return data;
};
