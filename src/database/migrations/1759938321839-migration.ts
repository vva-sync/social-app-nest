import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1759938321839 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_passwords" ADD CONSTRAINT "PK_user_passwords" PRIMARY KEY ("id")`,
        );

        await queryRunner.query(
            `ALTER TABLE "user_passwords" ADD CONSTRAINT "FK_user_passwords_user" FOREIGN KEY ("id") REFERENCES "user" ("id")`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_passwords" DROP CONSTRAINT "FK_user_passwords_user"`,
        );
        await queryRunner.query(
            `ALTER TABLE "user_passwords" DROP CONSTRAINT "PK_user_passwords"`,
        );
    }
}
