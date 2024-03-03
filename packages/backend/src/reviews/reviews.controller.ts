import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiPaginationQuery,
  FirebaseAuthGuard,
  PaginationDto,
  PaginationQuery,
  RequestWithFirebaseAuth,
} from '@src/common';
import { FindAllReviewsDto } from './dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(FirebaseAuthGuard)
  @Post()
  async create(
    @Req() req: RequestWithFirebaseAuth,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.create(createReviewDto, req.user.uid);
  }

  @ApiPaginationQuery()
  @Get()
  async findAll(
    @PaginationQuery() paginationDto: PaginationDto,
    @Query() findAllReviewsDto: FindAllReviewsDto,
  ) {
    return this.reviewsService.findAll(findAllReviewsDto, paginationDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.reviewsService.remove(id);
  }
}
