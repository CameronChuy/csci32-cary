/*
  Warnings:

  - You are about to drop the `Verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Plant` ADD COLUMN `accurateVoteCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `inaccurateVoteCount` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `Verification`;
