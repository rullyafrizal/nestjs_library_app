import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './modules/book.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm/typeormconfig.service';

@Module({
  imports: [
    AuthorModule,
    BookModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
