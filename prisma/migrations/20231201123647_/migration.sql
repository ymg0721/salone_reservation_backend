/*
  Warnings:

  - Added the required column `text` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `list` ADD COLUMN `text` VARCHAR(191) NOT NULL;
