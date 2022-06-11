-- CreateTable
CREATE TABLE `competition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `athlete-result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `competition` VARCHAR(191) NOT NULL,
    `athlete` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `measure` VARCHAR(191) NOT NULL,
    `competitionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `athlete-result` ADD CONSTRAINT `athlete-result_competitionId_fkey` FOREIGN KEY (`competitionId`) REFERENCES `competition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
