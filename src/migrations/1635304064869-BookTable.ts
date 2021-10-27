import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class BookTable1635304064869 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'language',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'pages',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'published_year',
            type: 'varchar',
            length: '4',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'books',
      new TableColumn({
        name: 'author_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'books',
      new TableForeignKey({
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'authors',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('books');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('author_id') !== -1,
    );
    await queryRunner.dropForeignKey('books', foreignKey);
    await queryRunner.dropColumn('books', 'author_id');
    await queryRunner.dropTable('books');
  }
}
