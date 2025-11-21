import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1761502692104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX idx_user_last_name_username ON "user" ("last_name", "username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX idx_user_last_name_username`);
    }

}
