import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from 'store';

export function UserGuard({ children }: { children: React.ReactNode }) {
  const accessToken = useRecoilValue(accessTokenAtom);
  if (!accessToken) return null;

  return <>{children}</>;
}
