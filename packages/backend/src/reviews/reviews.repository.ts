import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { FilterQuery } from 'mongoose';
import { Model } from 'mongoose';
import type { PaginationDto } from '@src/common';
import { User } from '@src/users';
import { Review } from './schema';
import type { FindAllReviewsDto } from './dto';

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

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
}
