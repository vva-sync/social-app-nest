import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732108240168 implements MigrationInterface {
  name = 'Migration1732108240168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "token"`);
  }
}
