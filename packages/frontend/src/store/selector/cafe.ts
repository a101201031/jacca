import { fetcher } from 'helper';
import { selector } from 'recoil';

interface CafeListApiRes {
  cafes: {
    _id: string;
    title: string;
    address: string;
    roadAddress: string;
    rating: number;
    images: { _id: string; title: string; url: string }[];
    tags: string[];
  }[];
  paging: {
    limit: number;
    offset: number;
    total: number;
  };
}

export const cafeListSelector = selector({
  key: 'cafeListSelector',
  get: async () => {
    const cafeList = await fetcher.get<CafeListApiRes>({ path: '/cafes' });
    return cafeList.cafes;
  },
});
