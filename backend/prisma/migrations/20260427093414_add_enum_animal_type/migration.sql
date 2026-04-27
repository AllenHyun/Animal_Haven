/*
  Warnings:

  - You are about to alter the column `animalType` on the `Pet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `Pet` MODIFY `animalType` ENUM('Cat', 'Dog') NOT NULL;
