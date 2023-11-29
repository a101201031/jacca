import { isValidObjectId } from 'mongoose';
import { number, object, string } from 'yup';

export const createReviewBodySchema = object({
  cafeId: string()
    .required()
    .test({
      test: (v) => isValidObjectId(v),
    }),
  content: string(),
  score: number().required(),
});

export const readReviewsQueryParamSchema = object({
  cafeId: string().test({
    test: (v) => isValidObjectId(v),
  }),
  userId: string(),
  limit: number().default(20),
  offset: number().min(0).default(0),
  sortBy: string().oneOf(['score', '_id']).default('_id'),
  orderBy: string().oneOf(['asc', 'desc']).default('asc'),
}).test(
  'One of the cafeId or userId is required.',
  (v) => !(!v.cafeId && !v.userId),
);

export const updateReviewBodySchema = object({
  reviewId: string()
    .required()
    .test({
      test: (v) => isValidObjectId(v),
    }),
  content: string(),
  score: number().required(),
});

export const reviewPathParamSchema = object({
  reviewId: string().test({
    test: (v) => isValidObjectId(v),
  }),
});
