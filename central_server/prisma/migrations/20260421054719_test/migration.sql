/*
  Warnings:

  - Added the required column `testColumn` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `testColumn` VARCHAR(255) NOT NULL;
