import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCafeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
