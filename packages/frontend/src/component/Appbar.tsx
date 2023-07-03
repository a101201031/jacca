import {
  AccountCircleOutlined,
  DarkModeOutlined,
  LightModeOutlined,
} from '@mui/icons-material';
import type { ButtonProps } from '@mui/material';
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
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
    <AppBar color="inherit" position="fixed">
      <Toolbar>
        <LogoButton component={RouterLink} to={'/'}>
          jacca
        </LogoButton>
        <Space />
        <IconButton size="large" onClick={themeModeClick}>
          {themeMode === 'dark' ? (
            <DarkModeOutlined sx={{ fontSize: 28 }} />
          ) : (
            <LightModeOutlined sx={{ fontSize: 28 }} />
          )}
        </IconButton>
        {user ? (
          <UserMenu />
        ) : (
          <Button variant="contained" onClick={loginPopupClick}>
            {`로그인`}
          </Button>
        )}
        <LoginPopup open={loginPopupOpen} setOpen={setLoginPopupOpen} />
      </Toolbar>
    </AppBar>
  );
}

interface LinkButtonProps extends ButtonProps {
  component?: typeof RouterLink;
  to?: string;
}

const LogoButton = styled(Button)<LinkButtonProps>`
  width: 100px;
  height: 33px;
`;

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isUserMenuOpen = !!anchorEl;

  const resetUser = useResetRecoilState(firebaseUserAtom);

  const navigate = useNavigate();

  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOutClick = async () => {
    const auth = getAuth();
    await signOut(auth);
    resetUser();
    navigate(0);
  };

  return (
    <>
      <IconButton color="secondary" size="large" onClick={handleUserMenuOpen}>
        <AccountCircleOutlined sx={{ fontSize: 34 }} />
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
        <MenuItem onClick={handleUserMenuClose}>{`저장한 곳`}</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>{`내가 쓴 리뷰`}</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>{`설정`}</MenuItem>
        <MenuItem onClick={handleSignOutClick}>{`로그아웃`}</MenuItem>
      </Menu>
    </>
  );
}
