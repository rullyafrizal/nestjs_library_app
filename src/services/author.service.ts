import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from '../repositories/author.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthorDto } from '../dto/author/create-author.dto';
import { Author } from '../entities/author.entity';
import { GetAuthorSearchDto } from '../dto/author/get-author-search.dto';
import { UpdateAuthorDto } from '../dto/author/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
  ) {}

  getAuthors(getAuthorSearchDto: GetAuthorSearchDto): Promise<Author[]> {
    return this.authorRepository.getAuthors(getAuthorSearchDto);
  }

  async getAuthor(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne(id);

    if (!author) {
      throw new NotFoundException();
    }

    return author;
  }

  createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.createAuthor(createAuthorDto);
  }

  async updateAuthor(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.getAuthor(id);

    author.firstName = updateAuthorDto.firstName;
    author.lastName = updateAuthorDto.lastName;

    await this.authorRepository.save(author);

    return author;
  }

  async deleteAuthor(id: number): Promise<void> {
    await this.getAuthor(id);
    await this.authorRepository.delete(id);
  }
}
