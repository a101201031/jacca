import {
  DarkModeOutlined,
  LightModeOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

const theme = createTheme({
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
});

export function Home() {
  const [themeMode, setThemeMode] = useState('light');

  const themeModeClick = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppBar color="inherit" position="sticky">
          <Container maxWidth="xl">
            <Toolbar>
              <Button component={RouterLink} to={'/'}>
                jacca
              </Button>
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <Box sx={{ display: 'flex', flexGrow: 1 }} />
              <IconButton onClick={themeModeClick}>
                {themeMode === 'dark' ? (
                  <DarkModeOutlined />
                ) : (
                  <LightModeOutlined />
                )}
              </IconButton>
              <Button variant="contained">
                <Typography variant="body1">로그인</Typography>
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        ></Box>
      </CssBaseline>
    </ThemeProvider>
  );
}
