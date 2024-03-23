import { getAuth, getIdToken } from 'firebase/auth';

export async function getAccessToken() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('not found current user.');
  }

  return getIdToken(user);
}
