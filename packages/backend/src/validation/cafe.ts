import { isValidObjectId } from 'mongoose';
import { object, string } from 'yup';

export const createCafeBodySchema = object({
  title: string().required(),
  address: string().required(),
});

export const cafePathParamSchema = object({
  cafeId: string()
    .required()
    .test({
      test: (v) => isValidObjectId(v),
    }),
});

export const createCafeTagBodySchema = object({
  tag: string().required(),
});
