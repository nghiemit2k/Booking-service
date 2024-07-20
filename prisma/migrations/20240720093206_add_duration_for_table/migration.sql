/*
  Warnings:

  - Added the required column `duration` to the `SessionTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionTemplate" ADD COLUMN     "duration" INTEGER NOT NULL;
