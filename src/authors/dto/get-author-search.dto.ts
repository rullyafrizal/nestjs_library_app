import { IsOptional, IsString } from 'class-validator';

export class GetAuthorSearchDto {
  @IsOptional()
  @IsString()
  search?: string;
}
