import type { FirebaseError } from 'firebase-admin';

export const isFirebaseError = (error: unknown): error is FirebaseError =>
  (error as FirebaseError).code !== undefined;
