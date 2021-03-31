import {MigrationInterface, QueryRunner} from "typeorm";

export class addPresentationId1614147953378 implements MigrationInterface {
    name = 'addPresentationId1614147953378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(500) NOT NULL, "password" varchar(500) NOT NULL, "fullName" text(500) NOT NULL, "university" varchar(500) NOT NULL, "grade" varchar(500) NOT NULL, "presentationType" varchar(500) NOT NULL, "address" varchar(500) NOT NULL, "title" text(500) NOT NULL, "lastLoginAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "fileId" integer, "isAdmin" boolean NOT NULL DEFAULT (0), "presentationId" varchar(40), CONSTRAINT "UQ_903d4d5ec9e6e2754f30b39eae1" UNIQUE ("fileId"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "FK_903d4d5ec9e6e2754f30b39eae1" FOREIGN KEY ("fileId") REFERENCES "file" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "fullName", "university", "grade", "presentationType", "address", "title", "lastLoginAt", "createdAt", "updatedAt", "fileId", "isAdmin") SELECT "id", "email", "password", "fullName", "university", "grade", "presentationType", "address", "title", "lastLoginAt", "createdAt", "updatedAt", "fileId", "isAdmin" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(500) NOT NULL, "password" varchar(500) NOT NULL, "fullName" text(500) NOT NULL, "university" varchar(500) NOT NULL, "grade" varchar(500) NOT NULL, "presentationType" varchar(500) NOT NULL, "address" varchar(500) NOT NULL, "title" text(500) NOT NULL, "lastLoginAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "fileId" integer, "isAdmin" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_903d4d5ec9e6e2754f30b39eae1" UNIQUE ("fileId"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "FK_903d4d5ec9e6e2754f30b39eae1" FOREIGN KEY ("fileId") REFERENCES "file" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "fullName", "university", "grade", "presentationType", "address", "title", "lastLoginAt", "createdAt", "updatedAt", "fileId", "isAdmin") SELECT "id", "email", "password", "fullName", "university", "grade", "presentationType", "address", "title", "lastLoginAt", "createdAt", "updatedAt", "fileId", "isAdmin" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
