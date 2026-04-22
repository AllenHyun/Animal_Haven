/*
  Warnings:

  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeFrame` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `timeFrame` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `AvailableTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timeFrame` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `shelterId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AvailableTime` ADD CONSTRAINT `AvailableTime_shelterId_fkey` FOREIGN KEY (`shelterId`) REFERENCES `Shelter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
