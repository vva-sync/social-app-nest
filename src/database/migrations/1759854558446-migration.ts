import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1759854558446 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_passwords"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_passwords" (
            "userId" SERIAL NOT NULL,
            "password" VARCHAR NOT NULL,
            CONSTRAINT "PK_user_passwords" PRIMARY KEY ("userId")
        )`);
    }
}
