import { ThemeProvider } from '@emotion/react';
import { Alert, GlobalStyles, Snackbar } from '@mui/material';
import type { ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import { alertSnackbarAtom } from 'store';
import { defaultTheme, globalStyle } from 'style';

const inputGlobalStyles = <GlobalStyles styles={globalStyle} />;

export function MuiProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {inputGlobalStyles}
      <ThemeProvider theme={defaultTheme}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbar, setSnackbar] = useRecoilState(alertSnackbarAtom);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5_000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      {children}
    </>
  );
}
