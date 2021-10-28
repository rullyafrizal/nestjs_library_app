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
            name: 'publishedYear',
            type: 'varchar',
            length: '4',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'books',
      new TableColumn({
        name: 'authorId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'books',
      new TableForeignKey({
        columnNames: ['authorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'authors',
        onDelete: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('books');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('authorId') !== -1,
    );
    await queryRunner.dropForeignKey('books', foreignKey);
    await queryRunner.dropColumn('books', 'authorId');
    await queryRunner.dropTable('books');
  }
}
