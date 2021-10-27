import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1635304891570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE IF NOT EXISTS users (\n' +
        '    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\n' +
        '    email VARCHAR(100) NOT NULL,\n' +
        '    password VARCHAR(32) NOT NULL,\n' +
        "    role ENUM('ADMIN', 'USER') DEFAULT 'USER',\n" +
        '    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n' +
        '    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n' +
        ')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
  }
}
