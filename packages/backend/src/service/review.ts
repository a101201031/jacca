import { CafeModel } from '@model/cafe';
import type { Review } from '@model/review';
import { ReviewModel } from '@model/review';
import { UserModel } from '@model/user';
import { startSession } from 'mongoose';

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
  const session = await startSession();
  const review = await ReviewModel.create({ userId, cafeId, score, content });
  const averageResult = await ReviewModel.aggregate([
    {
      $match: { cafeId: review.cafeId },
    },
    {
      $group: {
        _id: null,
        averageScore: { $avg: '$score' },
      },
    },
  ]).exec();
  const averageScore = averageResult[0] ? averageResult[0].averageScore : 0;
  await CafeModel.findByIdAndUpdate(
    cafeId,
    { rating: averageScore },
    { new: true },
  );
  await session.endSession();
  return review;
};

export const readReviewService: ReadReviewService = async ({ id }) => {
  const review = await ReviewModel.findById(id).exec();
  return review;
};

export const updateReviewService = async ({
  reviewId,
  userId,
  content,
  score,
}) => {
  const { userId: originUserId, cafeId } = await ReviewModel.findById({
    _id: reviewId,
  }).exec();
  if (originUserId !== userId) {
    throw new Error('user permission denied');
  }

  const session = await startSession();
  const review = await ReviewModel.findByIdAndUpdate(
    reviewId,
    {
      content,
      score,
    },
    { new: true },
  ).exec();
  const averageResult = await ReviewModel.aggregate([
    {
      $match: { cafeId: review.cafeId },
    },
    {
      $group: {
        _id: null,
        averageScore: { $avg: '$score' },
      },
    },
  ]).exec();
  const averageScore = averageResult[0] ? averageResult[0].averageScore : 0;
  await CafeModel.findByIdAndUpdate(
    cafeId,
    { rating: averageScore },
    { new: true },
  );
  await session.endSession();
  return review;
};

export const deleteReviewService = async ({ reviewId, userId }) => {
  const review = await ReviewModel.findById({ _id: reviewId }).exec();
  if (review.userId !== userId) {
    throw new Error('user permission denied');
  }
  await review.deleteOne();
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
    reviews: reviews.map((v) => v.toObject()),
    total,
  };
};
