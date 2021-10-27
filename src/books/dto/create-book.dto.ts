import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';
import { Author } from '../../authors/authors.entity';

export class CreateBookDto {
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  language: string;

  @IsNotEmpty()
  @IsNumber()
  pages: number;

  @IsNotEmpty()
  @MaxLength(4)
  @MinLength(4)
  @IsNumber()
  publishedYear: string;

  @IsNotEmpty()
  @IsNumber()
  author: Author;
}
