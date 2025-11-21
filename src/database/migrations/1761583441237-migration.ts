import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1761583441237 implements MigrationInterface {
    name = 'Migration1761583441237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_passwords" ALTER COLUMN "password" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_passwords" ALTER COLUMN "password" DROP NOT NULL`);
    }

}
