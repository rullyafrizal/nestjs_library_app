import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReviewTable1635304899136 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE IF NOT EXISTS reviews (\n' +
        '    user_id INT NOT NULL,\n' +
        '    book_id INT NOT NULL,\n' +
        '    rating VARCHAR(1),\n' +
        '    comment LONGTEXT,\n' +
        '    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n' +
        '    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n' +
        '\n' +
        '    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,\n' +
        '    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE\n' +
        ')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('reviews');

    const foreignKeyUserId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('reviews', foreignKeyUserId);
    await queryRunner.dropColumn('reviews', 'user_id');

    const foreignKeyBookId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('book_id') !== -1,
    );
    await queryRunner.dropForeignKey('reviews', foreignKeyBookId);
    await queryRunner.dropColumn('reviews', 'book_id');

    await queryRunner.dropTable('books');
  }
}
