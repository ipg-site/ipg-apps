import {MigrationInterface, QueryRunner} from "typeorm";

export class changeAdminRedirectDefault1614328361798 implements MigrationInterface {
    name = 'changeAdminRedirectDefault1614328361798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_admin" ("name" varchar(50) PRIMARY KEY NOT NULL, "abstractUpload" boolean NOT NULL DEFAULT (1), "movieUpload" boolean NOT NULL DEFAULT (1), "presentationUpload" boolean NOT NULL DEFAULT (1), "redirect" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "temporary_admin"("name", "abstractUpload", "movieUpload", "presentationUpload", "redirect") SELECT "name", "abstractUpload", "movieUpload", "presentationUpload", "redirect" FROM "admin"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`ALTER TABLE "temporary_admin" RENAME TO "admin"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" RENAME TO "temporary_admin"`);
        await queryRunner.query(`CREATE TABLE "admin" ("name" varchar(50) PRIMARY KEY NOT NULL, "abstractUpload" boolean NOT NULL DEFAULT (1), "movieUpload" boolean NOT NULL DEFAULT (1), "presentationUpload" boolean NOT NULL DEFAULT (1), "redirect" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`INSERT INTO "admin"("name", "abstractUpload", "movieUpload", "presentationUpload", "redirect") SELECT "name", "abstractUpload", "movieUpload", "presentationUpload", "redirect" FROM "temporary_admin"`);
        await queryRunner.query(`DROP TABLE "temporary_admin"`);
    }

}
