/*
  Warnings:

  - Added the required column `address` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Application` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `notes` TEXT NOT NULL,
    ADD COLUMN `petId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
