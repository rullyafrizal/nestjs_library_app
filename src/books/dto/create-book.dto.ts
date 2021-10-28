import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Author } from '../../authors/author.entity';

export class CreateBookDto {
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  language: string;

  @IsNotEmpty()
  pages: number;

  @IsNotEmpty()
  @MaxLength(4)
  @MinLength(4)
  publishedYear: string;

  @IsNotEmpty()
  author: Author;
}
