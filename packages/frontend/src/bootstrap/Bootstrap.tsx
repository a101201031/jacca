import type { ReactNode } from 'react';
import { MuiProvider } from './MuiProvider';

export function Bootstrap({ children }: { children: ReactNode }) {
  return <MuiProvider>{children}</MuiProvider>;
}
