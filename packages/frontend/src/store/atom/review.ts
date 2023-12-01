import type { Review } from 'model';
import { atom } from 'recoil';

export const review2dListAtom = atom<Review[][]>({
  key: 'review2dListAtom',
  default: [],
});
