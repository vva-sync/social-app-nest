import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1743105328246 implements MigrationInterface {
  name = 'Migration1743105328246';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post_photo" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "caption" character varying, "display_order" integer NOT NULL DEFAULT '0', "postId" integer, CONSTRAINT "PK_00a3d83cbd99258418395b365cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_photo" ADD CONSTRAINT "FK_16f525a89b81abfbbb9dc886be9" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_photo" DROP CONSTRAINT "FK_16f525a89b81abfbbb9dc886be9"`,
    );
    await queryRunner.query(`DROP TABLE "post_photo"`);
  }
}
