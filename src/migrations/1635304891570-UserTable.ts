import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1635304891570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE IF NOT EXISTS users (\n' +
        '    id VARCHAR(45) NOT NULL PRIMARY KEY,\n' +
        '    email VARCHAR(100) UNIQUE NOT NULL,\n' +
        '    password VARCHAR(255) NOT NULL,\n' +
        "    role ENUM('ADMIN', 'USER') DEFAULT 'USER',\n" +
        '    createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n' +
        '    updatedAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n' +
        ')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
  }
}
