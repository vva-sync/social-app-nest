import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1761485930590 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "user_confirmation" (id, "activationLink", "isActivated", "userId") VALUES(2, '89f0d841-19cb-47ac-b211-b1564f7f76b2', true, 27)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user_confirmation" WHERE id = 2`);
    }

}
