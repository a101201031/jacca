import { IsValidObjectId } from '@src/common';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsValidObjectId()
  cafeId: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsNumber()
  score: number;
}
