import {
  DarkModeOutlined,
  LightModeOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Space } from 'style';

export function TopAppBar() {
  const [themeMode, setThemeMode] = useState('light');

  const themeModeClick = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };
  return (
    <AppBar color="inherit" position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          <Button component={RouterLink} to={'/'}>
            jacca
          </Button>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <Space />
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
  );
}
