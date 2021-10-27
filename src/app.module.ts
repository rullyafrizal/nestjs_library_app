import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './books/book.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthorsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33769,
      username: 'root',
      password: 'secret',
      database: 'nest_library_app',
      autoLoadEntities: true,
      synchronize: false,
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: true,
      migrations: ['dist/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: 'migration',
      },
    }),
    BookModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
