/*
  Warnings:

  - Added the required column `age` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pet` ADD COLUMN `age` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL DEFAULT 'Description';
