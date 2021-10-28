import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './modules/book.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm/typeormconfig.service';
import { UserModule } from './modules/user.module';
import { configValidationSchema } from './config/config-validation.schema';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    AuthorModule,
    BookModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
