import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CafesService } from '@src/cafes';
import type { PaginationDto } from '@src/common';
import { Connection, Types } from 'mongoose';
import type { FindAllReviewsDto } from './dto';
import type { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly cafesService: CafesService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: string) {
    if (!(await this.cafesService.findOneById(createReviewDto.cafeId))) {
      throw new HttpException('not found cafe.', HttpStatus.NOT_FOUND);
    }

    const session = await this.connection.startSession();
    session.startTransaction();

    let review;
    try {
      review = await this.reviewsRepository.create(
        createReviewDto,
        {
          userId,
        },
        session,
      );
      const averageResult = await this.reviewsRepository.findScoreAverage(
        new Types.ObjectId(createReviewDto.cafeId),
      );
      const averageScore = averageResult[0] ? averageResult[0].averageScore : 0;
      await this.cafesService.update(createReviewDto.cafeId, {
        rating: averageScore,
      });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
    return review;
  }

  async findAll(
    { cafeId, userId, sortBy, orderBy }: FindAllReviewsDto,
    { limit, offset }: PaginationDto,
  ) {
    const filterQuery = {
      cafeId: cafeId ?? { $exists: true },
      userId: userId ?? { $exists: true },
    };

    const reviews = await this.reviewsRepository.findAll(
      filterQuery,
      {
        sortBy,
        orderBy,
      },
      { limit, offset },
    );
    const total = await this.reviewsRepository.countDocument(filterQuery);

    return {
      data: reviews.map((v) => ({
        ...v,
        score: v.score / 20,
      })),
      paging: {
        limit,
        offset,
        total,
      },
    };
  }
}
