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
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { GetAuthorSearchDto } from './dto/get-author-search.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiHttpResponse } from '../interfaces/response.inteface';
import { AuthGuard } from '@nestjs/passport';

@Controller('authors')
@UseGuards(AuthGuard())
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get()
  async getAuthors(
    @Query() searchDto: GetAuthorSearchDto,
  ): Promise<ApiHttpResponse> {
    const authors = await this.authorsService.getAuthors(searchDto);

    return {
      status: HttpStatus.OK,
      message: 'Get authors successful',
      body: authors,
    };
  }

  @Get('/:id')
  async getAuthor(@Param('id') id: number): Promise<ApiHttpResponse> {
    const author = await this.authorsService.getAuthor(id);

    return {
      status: HttpStatus.OK,
      message: 'Get author successful',
      body: author,
    };
  }

  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<ApiHttpResponse> {
    const author = await this.authorsService.createAuthor(createAuthorDto);

    return {
      status: HttpStatus.CREATED,
      message: 'Create author successful',
      body: author,
    };
  }

  @Put('/:id')
  async updateAuthor(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<ApiHttpResponse> {
    const author = await this.authorsService.updateAuthor(id, updateAuthorDto);

    return {
      status: HttpStatus.OK,
      message: 'Update author successful',
      body: author,
    };
  }

  @Delete('/:id')
  async deleteAuthor(@Param('id') id: number): Promise<ApiHttpResponse> {
    await this.authorsService.deleteAuthor(id);

    return {
      status: HttpStatus.OK,
      message: `Delete author successful | id: [${id}]`,
    };
  }
}
