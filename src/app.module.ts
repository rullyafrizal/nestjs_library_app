import { Module } from '@nestjs/common';
import { AuthorModule } from './authors/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './books/book.module';

@Module({
  imports: [
    AuthorModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
