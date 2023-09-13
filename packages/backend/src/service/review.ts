import type { Review } from '@model/review';
import { ReviewModel } from '@model/review';

type CreateCafeService = ({
  userId,
  cafeId,
  score,
  content,
}: Pick<Review, 'userId' | 'score'> & {
  cafeId: string;
  content?: string;
}) => Promise<Review>;

export const createReviewService: CreateCafeService = async ({
  userId,
  cafeId,
  score,
  content = '',
}) => {
  const review = await ReviewModel.create({ userId, cafeId, score, content });
  return review;
};
