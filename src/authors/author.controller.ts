import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './authors.entity';
import { GetAuthorSearchDto } from './dto/get-author-search.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  getAuthors(@Query() searchDto: GetAuthorSearchDto): Promise<Author[]> {
    return this.authorService.getAuthors(searchDto);
  }

  @Get('/:id')
  getAuthor(@Param('id') id: number): Promise<Author> {
    return this.authorService.getAuthor(id);
  }

  @Post()
  createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Put('/:id')
  updateAuthor(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }

  @Delete('/:id')
  async deleteAuthor(@Param('id') id: number): Promise<void | JSON> {
    await this.authorService.deleteAuthor(id);

    return JSON.parse(
      JSON.stringify({ message: `Delete author with id: [${id}] successful` }),
    );
  }
}
