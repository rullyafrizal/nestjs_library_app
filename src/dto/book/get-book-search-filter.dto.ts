import { IsOptional } from 'class-validator';

export class GetBookSearchFilterDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  year?: number;

  @IsOptional()
  author?: number;

  @IsOptional()
  language?: string;
}
