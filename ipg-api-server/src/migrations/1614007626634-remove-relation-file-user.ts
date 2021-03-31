import {MigrationInterface, QueryRunner} from "typeorm";

export class removeRelationFileUser1614007626634 implements MigrationInterface {
    name = 'removeRelationFileUser1614007626634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "abstractPath" text, "moviePath" text, "presentationPath" text, "userId" integer, "consentPath" text, CONSTRAINT "UQ_b2d8e683f020f61115edea206b3" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_file"("id", "abstractPath", "moviePath", "presentationPath", "userId", "consentPath") SELECT "id", "abstractPath", "moviePath", "presentationPath", "userId", "consentPath" FROM "file"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`ALTER TABLE "temporary_file" RENAME TO "file"`);
        await queryRunner.query(`CREATE TABLE "temporary_file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "abstractPath" text, "moviePath" text, "presentationPath" text, "consentPath" text)`);
        await queryRunner.query(`INSERT INTO "temporary_file"("id", "abstractPath", "moviePath", "presentationPath", "consentPath") SELECT "id", "abstractPath", "moviePath", "presentationPath", "consentPath" FROM "file"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`ALTER TABLE "temporary_file" RENAME TO "file"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" RENAME TO "temporary_file"`);
        await queryRunner.query(`CREATE TABLE "file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "abstractPath" text, "moviePath" text, "presentationPath" text, "userId" integer, "consentPath" text, CONSTRAINT "UQ_b2d8e683f020f61115edea206b3" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "file"("id", "abstractPath", "moviePath", "presentationPath", "consentPath") SELECT "id", "abstractPath", "moviePath", "presentationPath", "consentPath" FROM "temporary_file"`);
        await queryRunner.query(`DROP TABLE "temporary_file"`);
        await queryRunner.query(`ALTER TABLE "file" RENAME TO "temporary_file"`);
        await queryRunner.query(`CREATE TABLE "file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "abstractPath" text, "moviePath" text, "presentationPath" text, "userId" integer, "consentPath" text, CONSTRAINT "UQ_b2d8e683f020f61115edea206b3" UNIQUE ("userId"), CONSTRAINT "FK_b2d8e683f020f61115edea206b3" FOREIGN KEY ("userId") REFERENCES "file" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "file"("id", "abstractPath", "moviePath", "presentationPath", "userId", "consentPath") SELECT "id", "abstractPath", "moviePath", "presentationPath", "userId", "consentPath" FROM "temporary_file"`);
        await queryRunner.query(`DROP TABLE "temporary_file"`);
    }

}
