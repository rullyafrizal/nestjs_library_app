import { EntityRepository, Repository } from 'typeorm';
import { Author } from '../entities/author.entity';
import { CreateAuthorDto } from '../dto/author/create-author.dto';
import { GetAuthorSearchDto } from '../dto/author/get-author-search.dto';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
  async getAuthors(getAuthorSearchDto: GetAuthorSearchDto): Promise<Author[]> {
    const { search } = getAuthorSearchDto;

    const query = this.createQueryBuilder('authors');

    if (search) {
      query.andWhere(
        'LOWER(authors.firstName) LIKE LOWER(:search) OR LOWER(authors.lastName) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { firstName, lastName } = createAuthorDto;

    const author = this.create({
      firstName,
      lastName,
    });

    await this.save(author);
    return author;
  }
}
