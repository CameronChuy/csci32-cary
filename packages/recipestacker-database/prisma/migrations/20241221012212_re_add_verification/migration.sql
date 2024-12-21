/*
  Warnings:

  - You are about to drop the column `accurateVoteCount` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `inaccurateVoteCount` on the `Plant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Plant` DROP COLUMN `accurateVoteCount`,
    DROP COLUMN `inaccurateVoteCount`;

-- CreateTable
CREATE TABLE `Verification` (
    `verification_id` VARCHAR(191) NOT NULL,
    `plant_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `verification_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `verification_status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`verification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
