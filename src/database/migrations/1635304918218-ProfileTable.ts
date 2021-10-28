import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileTable1635304918218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE IF NOT EXISTS profiles (\n' +
        '    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\n' +
        '    userId VARCHAR(45) NOT NULL,\n' +
        '    name VARCHAR(255),\n' +
        '    address VARCHAR(255),\n' +
        '    birthDate DATE,\n' +
        '    createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n' +
        '    updatedAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n' +
        '\n' +
        '    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE\n' +
        ')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('profiles');

    const foreignKeyUserId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey('profiles', foreignKeyUserId);
    await queryRunner.dropColumn('profiles', 'userId');

    await queryRunner.dropTable('profiles');
  }
}
