import { fetcher } from 'helper';
import { CafeListApiRes } from 'model';
import { atomFamily, selectorFamily } from 'recoil';

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
