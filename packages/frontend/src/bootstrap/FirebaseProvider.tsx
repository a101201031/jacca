import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';
import { firebaseUserAtom, isCredentialLoadedAtom } from 'store';
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setFirebaseUser(user);
        setIsCredentialLoaded(true);
        console.log(user);
      }
      setIsCredentialLoaded(true);
    });
    return () => unsubscribe();
  }, [setIsCredentialLoaded, setFirebaseUser]);

  return <>{children}</>;
}
