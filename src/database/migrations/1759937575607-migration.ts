import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1759937575607 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `SELECT u.id, u.password
            INTO "user_passwords"
            FROM "user" u
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_passwords"`);
    }
}
