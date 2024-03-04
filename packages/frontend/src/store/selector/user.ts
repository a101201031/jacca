import { fetcher } from 'helper';
import { selector } from 'recoil';
import { accessTokenAtom } from 'store';

export const userSelector = selector({
  key: 'userSelector',
  get: async ({ get }) => {
    const accessToken = get(accessTokenAtom);
    if (!accessToken) return null;
    const user = await fetcher.get({
      path: '/users',
      accessToken: accessToken,
    });
    return user;
  },
});
