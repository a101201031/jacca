import { IsIn, IsOptional } from 'class-validator';

export class FindAllReviewsDto {
  @IsOptional()
  cafeId?: string;

  @IsOptional()
  userId?: string;

  @IsOptional()
  @IsIn(['score', '_id'])
  sortBy?: 'score' | '_id' = '_id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  orderBy?: 'asc' | 'desc' = 'desc';
}
