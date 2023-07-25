import { CssBaseline } from '@mui/material';
import { AsyncBoundary, TopAppBar } from 'component';
import { isUserNotFoundError } from 'helper';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isCredentialLoadedAtom } from 'store';

export function Base() {
  const isLoaded = useRecoilValue(isCredentialLoadedAtom);
  return (
    isLoaded && (
      <CssBaseline>
        <AsyncBoundary
          errorFallback={(fallbackProps) => {
            const { error } = fallbackProps;
            if (isUserNotFoundError(error)) {
              return <Navigate to="/sign-up" />;
            }
          }}
          suspenseFallback={<></>}
        >
          <TopAppBar />
          <Outlet />
        </AsyncBoundary>
      </CssBaseline>
    )
  );
}
