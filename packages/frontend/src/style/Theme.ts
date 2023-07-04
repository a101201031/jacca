import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#dfb78c',
      dark: '#c76a24',
      contrastText: '#000',
    },
    secondary: {
      main: '#815854',
      contrastText: '#fff',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: ['Pretendard-Regular', 'Stylish', 'Roboto'].join(','),
    h1: { fontSize: '2.2rem' },
    h2: { fontSize: '1.438rem' },
    h3: { fontSize: '1.3rem' },
  },
  breakpoints: { values: { xs: 0, sm: 767, md: 1056, lg: 1440, xl: 1919 } },
});
