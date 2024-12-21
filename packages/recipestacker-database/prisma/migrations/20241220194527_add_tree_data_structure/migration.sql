-- CreateTable
CREATE TABLE `new_User` (
    `user_id` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plant` (
    `plant_id` VARCHAR(191) NOT NULL,
    `park_id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `uploaded_date` VARCHAR(191) NOT NULL,
    `last_modified_date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`plant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Verification` (
    `verification_id` VARCHAR(191) NOT NULL,
    `plant_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `verification_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `verification_status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`verification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
