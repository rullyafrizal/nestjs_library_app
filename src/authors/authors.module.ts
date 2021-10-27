import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsRepository } from './authors.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [TypeOrmModule.forFeature([AuthorsRepository]), AuthModule],
})
export class AuthorsModule {}
