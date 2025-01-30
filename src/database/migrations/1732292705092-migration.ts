import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732292705092 implements MigrationInterface {
  name = 'Migration1732292705092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "UQ_94f168faad896c0786646fa3d4a" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" DROP CONSTRAINT "UQ_94f168faad896c0786646fa3d4a"`,
    );
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "userId"`);
  }
}
