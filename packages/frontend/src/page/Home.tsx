import {
  DarkModeOutlined,
  LightModeOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
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
  breakpoints: { values: { xs: 0, sm: 767, md: 1056, lg: 1440, xl: 1919 } },
});

const CardContainer = styled(Box)`
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  ${({ theme }) => theme.breakpoints.down('xl')} {
    width: 1376px;
  }
  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 1024px;
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: calc(100% - 2rem);
  }
`;

const CardItem = styled(Card)`
  width: 20rem;
  border-radius: 4px;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: calc(50% - 2rem);
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: 0px;
    width: 100%;
  }
`;

function CafeCard() {
  return (
    <CardItem>
      <CardMedia
        component="img"
        sx={{ width: '100%', position: 'relative' }}
        image="https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          TEST 카페
        </Typography>
        <Typography variant="body2" color="text.secondary">
          TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTE
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </CardItem>
  );
}

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
              <Box sx={{ flexGrow: 1 }} />
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
        <CardContainer>
          <Box display="flex" marginTop="2rem">
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                flex: '1 1 0%',
              }}
            >
              <Box display="flex" flexWrap="wrap" margin="-1rem">
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <CafeCard key={i} />
                  ))}
              </Box>
            </Box>
          </Box>
        </CardContainer>
      </CssBaseline>
    </ThemeProvider>
  );
}
