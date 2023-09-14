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
