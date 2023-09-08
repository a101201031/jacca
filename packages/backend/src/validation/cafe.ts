import { isValidObjectId } from 'mongoose';
import { array, number, object, string } from 'yup';

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

export const readCafesQuerySchema = object({
  title: string().default(''),
  rating: number().min(0).max(100).default(0),
  tags: array()
    .transform(
      (v) => typeof v === 'string' && v.split(',').map((v2) => v2.trim()),
    )
    .of(
      string()
        .strip()
        .test({
          test: (v) => isValidObjectId(v),
        }),
    )
    .default([]),
  limit: number().default(20),
  offset: number().min(0).default(0),
  sortBy: string().oneOf(['title', 'rating', '_id']).default('_id'),
  orderBy: string().oneOf(['asc', 'desc']).default('asc'),
});

export const createCafeTagBodySchema = object({
  tag: string().required(),
});
