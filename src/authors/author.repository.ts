import { EntityRepository, Repository } from 'typeorm';
import { Author } from './authors.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { GetAuthorSearchDto } from './dto/get-author-search.dto';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
  async getAuthors(getAuthorSearchDto: GetAuthorSearchDto): Promise<Author[]> {
    const { search } = getAuthorSearchDto;

    const query = this.createQueryBuilder('author');

    if (search) {
      query.andWhere(
        'LOWER(author.first_name) LIKE LOWER(:search) OR LOWER(author.last_name) LIKE LOWER(:search)',
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
