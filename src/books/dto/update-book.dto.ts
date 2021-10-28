import { Optional } from '@nestjs/common';
import { MaxLength, MinLength } from 'class-validator';
import { Author } from '../../authors/author.entity';

export class UpdateBookDto {
  @Optional()
  @MaxLength(255)
  title?: string;

  @Optional()
  language?: string;

  @Optional()
  pages?: number;

  @Optional()
  @MaxLength(4)
  @MinLength(4)
  publishedYear?: string;

  @Optional()
  author: Author;
}
