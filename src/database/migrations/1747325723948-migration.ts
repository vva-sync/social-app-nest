import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1747325723948 implements MigrationInterface {
  name = 'Migration1747325723948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_confirmation" ("id" SERIAL NOT NULL, "activationLink" character varying NOT NULL, "isActivated" boolean NOT NULL, "userId" integer, CONSTRAINT "REL_3c15304649ca2ab532ccb9990a" UNIQUE ("userId"), CONSTRAINT "PK_6d0847bd8c1ad0cfb1a95319add" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_confirmation" ADD CONSTRAINT "FK_3c15304649ca2ab532ccb9990a1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_confirmation" DROP CONSTRAINT "FK_3c15304649ca2ab532ccb9990a1"`,
    );
    await queryRunner.query(`DROP TABLE "user_confirmation"`);
  }
}
