import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { PaginationDto } from '@src/common';
import { User } from '@src/users';
import type { ClientSession, FilterQuery, Types } from 'mongoose';
import { Model } from 'mongoose';
import type { FindAllReviewsDto } from './dto';
import type { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './schema';

interface CreateReviewAdditional {
  userId: User['_id'];
}
@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    createReviewAdditional: CreateReviewAdditional,
    session?: ClientSession,
  ) {
    return this.reviewModel.create(
      [
        {
          ...createReviewDto,
          ...createReviewAdditional,
        },
      ],
      { session },
    );
  }

  async findScoreAverage(cafeId: Types.ObjectId) {
    return this.reviewModel
      .aggregate()
      .match({ cafeId })
      .group({
        _id: null,
        averageScore: { $avg: '$score' },
      })
      .exec();
  }

  async findAll(
    filterQuery: FilterQuery<Review>,
    {
      sortBy,
      orderBy,
    }: {
      sortBy: FindAllReviewsDto['sortBy'];
      orderBy: FindAllReviewsDto['orderBy'];
    },
    { limit, offset }: PaginationDto,
  ) {
    return this.reviewModel
      .find(filterQuery)
      .sort([[sortBy, orderBy]])
      .skip(offset)
      .limit(limit)
      .populate('userId', 'displayName', this.userModel)
      .lean()
      .exec();
  }

  async countDocument(filterQuery: FilterQuery<Review>) {
    return this.reviewModel.countDocuments(filterQuery).exec();
  }

  async remove(id) {
    await this.reviewModel.findByIdAndDelete(id).lean().exec();
  }
}
