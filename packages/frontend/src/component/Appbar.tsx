import {
  AccountCircleOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { firebaseUserAtom } from 'store';
import { Space } from 'style';
import { LoginPopup } from './Login';

export function TopAppBar() {
  const [themeMode, setThemeMode] = useState('light');
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);

  const user = useRecoilValue(firebaseUserAtom);

  function themeModeClick() {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  }

  function loginPopupClick() {
    setLoginPopupOpen(true);
    document.body.style.overflow = 'hidden';
  }

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
          {user ? (
            <UserMenu />
          ) : (
            <Button variant="contained" onClick={loginPopupClick}>
              로그인
            </Button>
          )}
          <LoginPopup open={loginPopupOpen} setOpen={setLoginPopupOpen} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isUserMenuOpen = !!anchorEl;

  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOutClick = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <>
      <IconButton
        color="secondary"
        aria-label="account of current user"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleUserMenuOpen}
      >
        <AccountCircleOutlined />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        id="user_menu"
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isUserMenuOpen}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={handleUserMenuClose}>저장한 곳</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>내가 쓴 리뷰</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>설정</MenuItem>
        <MenuItem onClick={handleSignOutClick}>로그아웃</MenuItem>
      </Menu>
    </>
  );
}
