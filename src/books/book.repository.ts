import { EntityRepository, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

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
}
