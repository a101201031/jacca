import type { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { FirebaseProvider } from './FirebaseProvider';
import { MuiProvider } from './MuiProvider';

export function Bootstrap({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <FirebaseProvider>
        <MuiProvider>{children}</MuiProvider>
      </FirebaseProvider>
    </RecoilRoot>
  );
}
