import { fetcher } from 'helper';
import { atomFamily, selectorFamily } from 'recoil';

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

export const cafeListAtomFamily = atomFamily({
  key: 'cafeListAtomFamily',
  default: selectorFamily({
    key: 'cafeListAtomFamily/default',
    get: () => async () => {
      const { cafes: cafeList } = await fetcher.get<CafeListApiRes>({
        path: '/cafes',
        queryParams: { limit: '8' },
      });
      return cafeList;
    },
  }),
});
