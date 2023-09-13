import { number, object, string } from 'yup';

export const createReviewBodySchema = object({
  content: string(),
  score: number().required(),
});
