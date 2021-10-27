import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReviewTable1635304899136 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE IF NOT EXISTS reviews (\n' +
        '    userId VARCHAR(45) NOT NULL,\n' +
        '    bookId INT NOT NULL,\n' +
        '    rating VARCHAR(1),\n' +
        '    comment LONGTEXT,\n' +
        '    createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n' +
        '    updatedAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n' +
        '\n' +
        '    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,\n' +
        '    FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE\n' +
        ')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('reviews');

    const foreignKeyUserId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey('reviews', foreignKeyUserId);
    await queryRunner.dropColumn('reviews', 'userId');

    const foreignKeyBookId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('bookId') !== -1,
    );
    await queryRunner.dropForeignKey('reviews', foreignKeyBookId);
    await queryRunner.dropColumn('reviews', 'bookId');

    await queryRunner.dropTable('books');
  }
}
