import { initializeApp } from 'firebase/app';
import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  accessTokenAtom,
  firebaseUserAtom,
  isCredentialLoadedAtom,
} from 'store';
interface FirebaseProviderProps {
  children: ReactNode;
}

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
});
const firebaseAuth = getAuth(firebaseApp);

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  const setFirebaseUser = useSetRecoilState(firebaseUserAtom);
  const setIsCredentialLoaded = useSetRecoilState(isCredentialLoadedAtom);
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setFirebaseUser(user);
        const token = await getIdToken(user);
        setAccessToken(token);
        setIsCredentialLoaded(true);
      }
      setIsCredentialLoaded(true);
    });
    return () => unsubscribe();
  }, [setIsCredentialLoaded, setFirebaseUser, setAccessToken]);

  return <>{children}</>;
}
