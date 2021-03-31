import {MigrationInterface, QueryRunner} from "typeorm";

export class addFileUserRelation1614001657538 implements MigrationInterface {
    name = 'addFileUserRelation1614001657538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "abstractPath" text, "moviePath" text, "presentationPath" text, "userId" integer, CONSTRAINT "UQ_cc666d1ed06d42e59eef2bd9273" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_file"("id", "abstractPath", "moviePath", "presentationPath") SELECT "id", "abstractPath", "moviePath", "presentationPath" FROM "file"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`ALTER TABLE "temporary_file" RENAME TO "file"`);
        await queryRunner.query(`CREATE TABLE "temporary_file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "abstractPath" text, "moviePath" text, "presentationPath" text, "userId" integer, CONSTRAINT "UQ_cc666d1ed06d42e59eef2bd9273" UNIQUE ("userId"), CONSTRAINT "FK_b2d8e683f020f61115edea206b3" FOREIGN KEY ("userId") REFERENCES "file" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_file"("id", "abstractPath", "moviePath", "presentationPath", "userId") SELECT "id", "abstractPath", "moviePath", "presentationPath", "userId" FROM "file"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`ALTER TABLE "temporary_file" RENAME TO "file"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" RENAME TO "temporary_file"`);
        await queryRunner.query(`CREATE TABLE "file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "abstractPath" text, "moviePath" text, "presentationPath" text, "userId" integer, CONSTRAINT "UQ_cc666d1ed06d42e59eef2bd9273" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "file"("id", "abstractPath", "moviePath", "presentationPath", "userId") SELECT "id", "abstractPath", "moviePath", "presentationPath", "userId" FROM "temporary_file"`);
        await queryRunner.query(`DROP TABLE "temporary_file"`);
        await queryRunner.query(`ALTER TABLE "file" RENAME TO "temporary_file"`);
        await queryRunner.query(`CREATE TABLE "file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "abstractPath" text, "moviePath" text, "presentationPath" text)`);
        await queryRunner.query(`INSERT INTO "file"("id", "abstractPath", "moviePath", "presentationPath") SELECT "id", "abstractPath", "moviePath", "presentationPath" FROM "temporary_file"`);
        await queryRunner.query(`DROP TABLE "temporary_file"`);
    }

}
