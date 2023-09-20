import { object, string } from 'yup';

export const createBookmarkBodySchema = object({
  cafeId: string().required(),
});

export const bookmarkPathParamSchema = object({
  cafeId: string().required(),
});
