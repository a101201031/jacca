import { CssBaseline } from '@mui/material';
import { TopAppBar } from 'component';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isCredentialLoadedAtom } from 'store';

export function Base() {
  const isLoaded = useRecoilValue(isCredentialLoadedAtom);
  return (
    isLoaded && (
      <CssBaseline>
        <TopAppBar />
        <Outlet />
      </CssBaseline>
    )
  );
}
