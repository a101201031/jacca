import { fetcher } from 'helper';
import { Cafe } from 'model';
import { selector, selectorFamily } from 'recoil';
import { selectorTrigger } from 'store';

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
    const { cafes: cafeList } = await fetcher.get<CafeListApiRes>({
      path: '/cafes',
    });
    return cafeList;
  },
});

type cafeInfoParams = {
  cafeId: string;
};

export const cafeInfoSelector = selectorFamily<Cafe, cafeInfoParams>({
  key: 'cafeInfoSelector',
  get:
    ({ cafeId }) =>
    async ({ get }) => {
      get(selectorTrigger('cafeInfo'));
      const { cafe } = await fetcher.get({
        path: `/cafe/${cafeId}`,
      });
      return cafe;
    },
  set:
    () =>
    ({ set }) => {
      set(selectorTrigger('cafeInfo'), (count) => count + 1);
    },
});
