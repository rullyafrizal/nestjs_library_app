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
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { GetAuthorSearchDto } from './dto/get-author-search.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiHttpResponse } from '../interfaces/response.inteface';
import { AuthGuard } from '@nestjs/passport';

@Controller('authors')
@UseGuards(AuthGuard())
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  async index(
    @Query() searchDto: GetAuthorSearchDto,
  ): Promise<ApiHttpResponse> {
    const authors = await this.authorService.getAuthors(searchDto);

    return {
      status: HttpStatus.OK,
      message: 'Get authors successful',
      body: authors,
    };
  }

  @Get('/:id')
  async show(@Param('id') id: number): Promise<ApiHttpResponse> {
    const author = await this.authorService.getAuthor(id);

    return {
      status: HttpStatus.OK,
      message: 'Get author successful',
      body: author,
    };
  }

  @Post()
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<ApiHttpResponse> {
    const author = await this.authorService.createAuthor(createAuthorDto);

    return {
      status: HttpStatus.CREATED,
      message: 'Create author successful',
      body: author,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<ApiHttpResponse> {
    const author = await this.authorService.updateAuthor(id, updateAuthorDto);

    return {
      status: HttpStatus.OK,
      message: 'Update author successful',
      body: author,
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ApiHttpResponse> {
    await this.authorService.deleteAuthor(id);

    return {
      status: HttpStatus.OK,
      message: `Delete author successful | id: [${id}]`,
    };
  }
}
