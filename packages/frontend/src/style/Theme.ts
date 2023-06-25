import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#dfb78c',
      contrastText: '#000',
    },
    secondary: {
      main: '#815854',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: ['Stylish', 'Roboto'].join(','),
  },
  breakpoints: { values: { xs: 0, sm: 767, md: 1056, lg: 1440, xl: 1919 } },
});
