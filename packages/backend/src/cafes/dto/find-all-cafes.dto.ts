import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllCafesDto {
  @IsOptional()
  @IsString()
  title?: string = '';

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  rating?: number = 0;

  @IsOptional()
  @IsIn(['title', 'rating', '_id'])
  sortBy?: 'title' | 'rating' | '_id' = '_id';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  orderBy?: 'asc' | 'desc' = 'desc';
}
