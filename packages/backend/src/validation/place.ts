import { object, string } from 'yup';

export const searchPlaceQueryParamSchema = object({
  query: string().required(),
});
