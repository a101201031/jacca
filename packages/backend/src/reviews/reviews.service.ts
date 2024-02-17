import { Injectable } from '@nestjs/common';
import type { PaginationDto } from '@src/common';
import { ReviewsRepository } from './reviews.repository';
import type { FindAllReviewsDto } from './dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

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
