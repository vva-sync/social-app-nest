import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1759938631850 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
        );
    }
}
