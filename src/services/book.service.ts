import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from '../repositories/book.repository';
import { CreateBookDto } from '../dto/book/create-book.dto';
import { Book } from '../entities/book.entity';
import { GetBookSearchFilterDto } from '../dto/book/get-book-search-filter.dto';
import { UpdateBookDto } from '../dto/book/update-book.dto';
import { ReviewBookDto } from '../dto/book/review-book.dto';
import { User } from '../entities/user.entity';
import { ReviewRepository } from '../repositories/review.repository';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository,
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
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

  async reviewBook(
    id: number,
    user: User,
    reviewBookDto: ReviewBookDto,
  ): Promise<void> {
    const { rating, comment } = reviewBookDto;
    const review = this.reviewRepository.create({
      userId: user.id,
      bookId: id,
    });

    review.rating = String(rating);
    review.comment = comment;

    await this.reviewRepository.save(review);
  }
}
