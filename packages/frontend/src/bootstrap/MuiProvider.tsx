import { ThemeProvider } from '@emotion/react';
import type { ReactNode } from 'react';
import { defaultTheme } from 'style';

export function MuiProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}
