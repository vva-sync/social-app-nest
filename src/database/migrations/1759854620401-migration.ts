import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1759854620401 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_passwords" (
            "userId" SERIAL NOT NULL,
            "password" VARCHAR NOT NULL,
            CONSTRAINT "PK_user_passwords" PRIMARY KEY ("userId")
        )`);

        await queryRunner.query(
            `ALTER TABLE "user_passwords" ADD CONSTRAINT "FK_user_passwords_user" FOREIGN KEY ("userId") REFERENCES "user" ("id")`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_passwords" DROP CONSTRAINT "FK_user_passwords_user"`,
        );

        await queryRunner.query(`DROP TABLE "user_passwords"`);
    }
}
