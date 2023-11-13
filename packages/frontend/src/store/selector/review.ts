import { fetcher } from 'helper';
import { Review } from 'model';
import { selectorFamily } from 'recoil';
import { selectorTrigger } from 'store';

type reviewListParams = {
  cafeId: string;
};

export const reviewListSelector = selectorFamily<Review[], reviewListParams>({
  key: 'reviewListSelector',
  get:
    ({ cafeId }) =>
    async ({ get }) => {
      get(selectorTrigger('reviewList'));
      const { reviews } = await fetcher.get({
        path: '/reviews',
        queryParams: { cafeId },
      });
      return reviews;
    },
  set:
    () =>
    ({ set }) => {
      set(selectorTrigger('reviewList'), (count) => count + 1);
    },
});
