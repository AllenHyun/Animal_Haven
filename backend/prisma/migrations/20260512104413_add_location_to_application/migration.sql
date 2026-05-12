/*
  Warnings:

  - Added the required column `shelterId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Application` ADD COLUMN `shelterId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_shelterId_fkey` FOREIGN KEY (`shelterId`) REFERENCES `Shelter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
