import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReviewBookDto {
  @IsNotEmpty()
  rating: number;

  @IsOptional()
  @IsString()
  comment: string;
}
