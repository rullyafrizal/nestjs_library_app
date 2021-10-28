import { Module } from '@nestjs/common';
import { BookController } from '../controllers/book.controller';
import { BookService } from '../services/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from '../repositories/book.repository';
import { AuthModule } from './auth.module';
import { Review } from '../entities/review.entity';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [TypeOrmModule.forFeature([BookRepository, Review]), AuthModule],
})
export class BookModule {}
