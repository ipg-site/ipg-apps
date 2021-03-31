import {MigrationInterface, QueryRunner} from "typeorm";

export class addAdminTable1614327598422 implements MigrationInterface {
    name = 'addAdminTable1614327598422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("name" varchar(50) PRIMARY KEY NOT NULL, "abstractUpload" boolean NOT NULL DEFAULT (1), "movieUpload" boolean NOT NULL DEFAULT (1), "presentationUpload" boolean NOT NULL DEFAULT (1), "redirect" boolean NOT NULL DEFAULT (1))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
