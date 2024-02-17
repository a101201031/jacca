import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiPaginationQuery,
  PaginationDto,
  PaginationQuery,
} from '@src/common';
import { ReviewsService } from './reviews.service';
import { FindAllReviewsDto } from './dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiPaginationQuery()
  @Get()
  async findAll(
    @PaginationQuery() paginationDto: PaginationDto,
    @Query() findAllReviewsDto: FindAllReviewsDto,
  ) {
    return this.reviewsService.findAll(findAllReviewsDto, paginationDto);
  }
}
