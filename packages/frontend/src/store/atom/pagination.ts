import { atomFamily } from 'recoil';
import type { RecoilState } from 'recoil';

const _infiniteScrollItem2dAtomFamily = atomFamily<any[][], string>({
  key: 'infiniteScrollItem2dAtomFamily',
  default: [],
});

export const infiniteScrollItem2dAtomFamily = <T>(
  id: string,
): RecoilState<T[][]> => _infiniteScrollItem2dAtomFamily(id);

export const infiniteScrollInfoAtomFamily = atomFamily<
  { isLast: boolean; offset: number },
  string
>({
  key: 'infiniteScrollAtomFamily',
  default: { isLast: false, offset: 0 },
});
