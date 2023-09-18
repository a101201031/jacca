import type { Review } from '@model/review';
import { ReviewModel } from '@model/review';
import { UserModel } from '@model/user';

type CreateCafeService = ({
  userId,
  cafeId,
  score,
  content,
}: Pick<Review, 'userId' | 'score'> & {
  cafeId: string;
  content?: string;
}) => Promise<Review>;

type ReadReviewService = ({ id }: { id: string }) => Promise<Review>;

export const createReviewService: CreateCafeService = async ({
  userId,
  cafeId,
  score,
  content = '',
}) => {
  const review = await ReviewModel.create({ userId, cafeId, score, content });
  return review;
};

export const readReviewService: ReadReviewService = async ({ id }) => {
  const review = await ReviewModel.findById(id).exec();
  return review;
};

export const readReviewsService = async ({
  cafeId,
  userId,
  sortBy,
  orderBy,
  offset,
  limit,
}) => {
  const filterQuery = {
    cafeId: cafeId ?? { $exists: true },
    userId: userId ?? { $exists: true },
  };

  const reviews = await ReviewModel.find(filterQuery)
    .sort([[sortBy, orderBy]])
    .skip(offset)
    .limit(limit)
    .populate('userId', 'displayName', UserModel)
    .exec();

  const total = await ReviewModel.countDocuments(filterQuery).exec();

  return {
    reviews,
    total,
  };
};
