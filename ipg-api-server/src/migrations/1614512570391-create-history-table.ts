import {MigrationInterface, QueryRunner} from "typeorm";

export class createHistoryTable1614512570391 implements MigrationInterface {
    name = 'createHistoryTable1614512570391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar(500) NOT NULL, "value" integer, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar(500) NOT NULL, "value" integer, "userId" integer, CONSTRAINT "FK_7d339708f0fa8446e3c4128dea9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_history"("id", "type", "value", "userId") SELECT "id", "type", "value", "userId" FROM "history"`);
        await queryRunner.query(`DROP TABLE "history"`);
        await queryRunner.query(`ALTER TABLE "temporary_history" RENAME TO "history"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" RENAME TO "temporary_history"`);
        await queryRunner.query(`CREATE TABLE "history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar(500) NOT NULL, "value" integer, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "history"("id", "type", "value", "userId") SELECT "id", "type", "value", "userId" FROM "temporary_history"`);
        await queryRunner.query(`DROP TABLE "temporary_history"`);
        await queryRunner.query(`DROP TABLE "history"`);
    }

}
