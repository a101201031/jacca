import { atom } from 'recoil';
import type { UserCredential } from 'firebase/auth';

export const firebaseUserAtom = atom<UserCredential['user']>({
  key: 'firebaseUserAtom',
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const isCredentialLoadedAtom = atom<boolean>({
  key: 'isCredentialLoadedAtom',
  default: false,
});

export const accessTokenAtom = atom<string>({
  key: 'accessTokenAtom',
  default: '',
});
