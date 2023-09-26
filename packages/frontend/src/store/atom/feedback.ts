import { atom } from 'recoil';

interface AlertSnackbarAtom {
  open: boolean;
  severity?: 'error' | 'warning' | 'success' | 'info';
  message?: string;
}

export const alertSnackbarAtom = atom<AlertSnackbarAtom>({
  key: 'snackbarAtom',
  default: {
    open: false,
  },
});
