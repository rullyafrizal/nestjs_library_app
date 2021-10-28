import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';
import { GetBookSearchFilterDto } from './dto/get-book-search-filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.createBook(createBookDto);
  }

  async getBook(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne(id);

    if (!book) {
      throw new NotFoundException();
    }

    return book;
  }

  async getBooks(getBookDto: GetBookSearchFilterDto): Promise<Book[]> {
    return await this.bookRepository.getBooks(getBookDto);
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.getBook(id);

    book.title = updateBookDto.title;
    book.pages = updateBookDto.pages;
    book.language = updateBookDto.language;
    book.author = updateBookDto.author;
    book.publishedYear = updateBookDto.publishedYear;

    await this.bookRepository.save(book);

    return book;
  }

  async deleteBook(id: number): Promise<void> {
    await this.getBook(id);
    await this.bookRepository.delete(id);
  }
}
