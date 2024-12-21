/*
  Warnings:

  - Added the required column `park_tag_id` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Plant` ADD COLUMN `park_tag_id` VARCHAR(191) NOT NULL;
