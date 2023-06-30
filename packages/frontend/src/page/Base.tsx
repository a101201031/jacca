import { CssBaseline } from '@mui/material';
import { TopAppBar } from 'component';
import { Outlet } from 'react-router-dom';

export function Base() {
  return (
    <CssBaseline>
      <TopAppBar />
      <Outlet />
    </CssBaseline>
  );
}
