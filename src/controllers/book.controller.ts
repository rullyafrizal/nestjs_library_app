import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookDto } from '../dto/book/create-book.dto';
import { ApiHttpResponse } from '../interfaces/response.inteface';
import { GetBookSearchFilterDto } from '../dto/book/get-book-search-filter.dto';
import { UpdateBookDto } from '../dto/book/update-book.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../entities/user.entity';
import { ReviewBookDto } from '../dto/book/review-book.dto';

@Controller('books')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async index(
    @Query() getBookDto: GetBookSearchFilterDto,
  ): Promise<ApiHttpResponse> {
    const books = await this.bookService.getBooks(getBookDto);

    return {
      status: HttpStatus.OK,
      message: 'Books successfully fetched',
      body: books,
    };
  }

  @Get('/:id')
  async show(@Param('id') id: number): Promise<ApiHttpResponse> {
    const book = await this.bookService.getBook(id);

    return {
      status: HttpStatus.OK,
      message: 'Book successfully fetched',
      body: book,
    };
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<ApiHttpResponse> {
    const book = await this.bookService.createBook(createBookDto);

    return {
      status: HttpStatus.CREATED,
      message: 'Book successfully created',
      body: book,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<ApiHttpResponse> {
    const book = await this.bookService.updateBook(id, updateBookDto);

    return {
      status: HttpStatus.OK,
      message: 'Book successfully updated',
      body: book,
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ApiHttpResponse> {
    await this.bookService.deleteBook(id);

    return {
      status: HttpStatus.OK,
      message: 'Book successfully deleted',
    };
  }

  @Post('/:id')
  async review(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() reviewBookDto: ReviewBookDto,
  ): Promise<ApiHttpResponse> {
    await this.bookService.reviewBook(id, user, reviewBookDto);

    return {
      status: HttpStatus.OK,
      message: 'Successfully create review',
    };
  }
}
