import { fetcher } from 'helper';
import { Cafe, CafeListApiRes } from 'model';
import { selector, selectorFamily } from 'recoil';
import { selectorTrigger } from 'store';

export const cafeListSelector = selector({
  key: 'cafeListSelector',
  get: async () => {
    const { data: cafeList } = await fetcher.get<CafeListApiRes>({
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
      const { data: cafe } = await fetcher.get({
        path: `/cafes/${cafeId}`,
      });
      return cafe;
    },
  set:
    () =>
    ({ set }) => {
      set(selectorTrigger('cafeInfo'), (count) => count + 1);
    },
});
