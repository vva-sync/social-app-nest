import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1742832216392 implements MigrationInterface {
  name = 'Migration1742832216392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_photo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "isMain" boolean NOT NULL, "userId" integer, CONSTRAINT "PK_2863d588f4efce8bf42c9c63526" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_photo" ADD CONSTRAINT "FK_371668dfabe4574c8efde523898" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_photo" DROP CONSTRAINT "FK_371668dfabe4574c8efde523898"`,
    );
    await queryRunner.query(`DROP TABLE "user_photo"`);
  }
}
