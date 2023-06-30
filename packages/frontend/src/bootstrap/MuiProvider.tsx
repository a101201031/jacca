import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from '@mui/material';
import type { ReactNode } from 'react';
import { defaultTheme, globalStyle } from 'style';

const inputGlobalStyles = <GlobalStyles styles={globalStyle} />;

export function MuiProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {inputGlobalStyles}
      <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
    </>
  );
}
