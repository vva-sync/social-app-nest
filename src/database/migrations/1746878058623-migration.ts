import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746878058623 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "post_photo" WHERE "aws_key" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // The down migration is left empty because deleted data cannot be restored
    // by a simple SQL command. You may want to restore from a backup if needed.
  }
}
