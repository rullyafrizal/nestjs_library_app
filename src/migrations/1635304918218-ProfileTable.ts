import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileTable1635304918218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE IF NOT EXISTS profiles (\n' +
        '    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\n' +
        '    user_id VARCHAR(45) NOT NULL,\n' +
        '    name VARCHAR(255),\n' +
        '    address VARCHAR(255),\n' +
        '    birth_date DATE,\n' +
        '    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n' +
        '    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n' +
        '\n' +
        '    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE\n' +
        ')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('profiles');

    const foreignKeyUserId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('profiles', foreignKeyUserId);
    await queryRunner.dropColumn('profiles', 'user_id');

    await queryRunner.dropTable('profiles');
  }
}
