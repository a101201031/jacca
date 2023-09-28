import type { AxiosError } from 'axios';
import { isObject } from 'lodash-es';

interface DefaultAxoisErrorTypes {
  error: {
    code: string;
    message: string;
  };
}

export function isAxiosError<T extends unknown>(
  err: unknown,
): err is AxiosError<T> {
  return !!isObject(err) && 'isAxiosError' in err && err.isAxiosError === true;
}

export function isUserNotFoundError(
  err: Error | AxiosError | unknown,
): err is AxiosError<DefaultAxoisErrorTypes> {
  return (
    isAxiosError<DefaultAxoisErrorTypes>(err) &&
    err.response?.status === 404 &&
    err.response.data.error.code === 'user_not_found'
  );
}
