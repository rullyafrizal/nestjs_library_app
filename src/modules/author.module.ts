import { Module } from '@nestjs/common';
import { AuthorController } from '../controllers/author.controller';
import { AuthorService } from '../services/author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from '../repositories/author.repository';
import { AuthModule } from './auth.module';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
  imports: [TypeOrmModule.forFeature([AuthorRepository]), AuthModule],
})
export class AuthorModule {}
