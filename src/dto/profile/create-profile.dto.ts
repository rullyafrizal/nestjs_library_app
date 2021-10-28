import { IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  birthDate?: Date;
}
