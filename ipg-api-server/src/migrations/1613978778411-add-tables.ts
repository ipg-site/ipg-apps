import {MigrationInterface, QueryRunner} from "typeorm";

export class addTables1613978778411 implements MigrationInterface {
    name = 'addTables1613978778411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "abstractPath" text, "moviePath" text, "presentationPath" text)`);
        await queryRunner.query(`CREATE TABLE "memo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "description" text NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(500) NOT NULL, "password" varchar(500) NOT NULL, "fullName" text(500) NOT NULL DEFAULT (''), "university" varchar(500) NOT NULL, "grade" varchar(500) NOT NULL, "presentationType" varchar(500) NOT NULL, "address" varchar(500) NOT NULL, "title" text(500) NOT NULL, "lastLoginAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "fileId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_903d4d5ec9e6e2754f30b39eae" UNIQUE ("fileId"))`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(500) NOT NULL, "password" varchar(500) NOT NULL, "fullName" text(500) NOT NULL DEFAULT (''), "university" varchar(500) NOT NULL, "grade" varchar(500) NOT NULL, "presentationType" varchar(500) NOT NULL, "address" varchar(500) NOT NULL, "title" text(500) NOT NULL, "lastLoginAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "fileId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_903d4d5ec9e6e2754f30b39eae" UNIQUE ("fileId"), CONSTRAINT "FK_903d4d5ec9e6e2754f30b39eae1" FOREIGN KEY ("fileId") REFERENCES "file" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "fullName", "university", "grade", "presentationType", "address", "title", "lastLoginAt", "createdAt", "updatedAt", "fileId") SELECT "id", "email", "password", "fullName", "university", "grade", "presentationType", "address", "title", "lastLoginAt", "createdAt", "updatedAt", "fileId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(500) NOT NULL, "password" varchar(500) NOT NULL, "fullName" text(500) NOT NULL DEFAULT (''), "university" varchar(500) NOT NULL, "grade" varchar(500) NOT NULL, "presentationType" varchar(500) NOT NULL, "address" varchar(500) NOT NULL, "title" text(500) NOT NULL, "lastLoginAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "fileId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_903d4d5ec9e6e2754f30b39eae" UNIQUE ("fileId"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "fullName", "university", "grade", "presentationType", "address", "title", "lastLoginAt", "createdAt", "updatedAt", "fileId") SELECT "id", "email", "password", "fullName", "university", "grade", "presentationType", "address", "title", "lastLoginAt", "createdAt", "updatedAt", "fileId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "memo"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
