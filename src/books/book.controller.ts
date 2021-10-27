import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiHttpResponse } from '../interfaces/response.inteface';

@Controller('books')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<ApiHttpResponse> {
    const book = await this.bookService.createBook(createBookDto);

    return {
      status: HttpStatus.CREATED,
      message: 'Book successfully created',
      body: book,
    };
  }
}
