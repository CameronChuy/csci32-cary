/*
  Warnings:

  - You are about to drop the column `park_id` on the `Plant` table. All the data in the column will be lost.
  - You are about to alter the column `uploaded_date` on the `Plant` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `last_modified_date` on the `Plant` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Plant` DROP COLUMN `park_id`,
    MODIFY `uploaded_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `last_modified_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
