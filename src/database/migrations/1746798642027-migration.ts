import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746798642027 implements MigrationInterface {
  name = 'Migration1746798642027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_photo" ADD "aws_key" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post_photo" DROP COLUMN "aws_key"`);
  }
}
