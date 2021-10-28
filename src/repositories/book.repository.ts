import { EntityRepository, Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dto/book/create-book.dto';
import { GetBookSearchFilterDto } from '../dto/book/get-book-search-filter.dto';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, language, pages, publishedYear, author } = createBookDto;

    const book = this.create({
      title,
      language,
      pages,
      publishedYear,
      author,
    });

    await this.save(book);
    return book;
  }

  async getBooks(getBookDto: GetBookSearchFilterDto): Promise<Book[]> {
    const { search, year, author, language } = getBookDto;

    const query = this.createQueryBuilder('books');

    if (search) {
      query.andWhere('LOWER(books.title) like LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    if (year) {
      query.andWhere('books.publishedYear = :year', { year });
    }

    if (author) {
      query.andWhere('books.author = :author', { author });
    }

    if (language) {
      query.andWhere('LOWER(books.language) = LOWER(:language)', {
        language,
      });
    }

    return await query.getMany();
  }
}
