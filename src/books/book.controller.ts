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
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiHttpResponse } from '../interfaces/response.inteface';
import { GetBookSearchFilterDto } from './dto/get-book-search-filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

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
}
