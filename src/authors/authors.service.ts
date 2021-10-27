import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsRepository } from './authors.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './authors.entity';
import { GetAuthorSearchDto } from './dto/get-author-search.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorsRepository)
    private authorsRepository: AuthorsRepository,
  ) {}

  getAuthors(getAuthorSearchDto: GetAuthorSearchDto): Promise<Author[]> {
    return this.authorsRepository.getAuthors(getAuthorSearchDto);
  }

  async getAuthor(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOne(id);

    if (!author) {
      throw new NotFoundException();
    }

    return author;
  }

  createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsRepository.createAuthor(createAuthorDto);
  }

  async updateAuthor(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.getAuthor(id);

    author.firstName = updateAuthorDto.firstName;
    author.lastName = updateAuthorDto.lastName;

    await this.authorsRepository.save(author);

    return author;
  }

  async deleteAuthor(id: number): Promise<void> {
    await this.getAuthor(id);
    await this.authorsRepository.delete(id);
  }
}
