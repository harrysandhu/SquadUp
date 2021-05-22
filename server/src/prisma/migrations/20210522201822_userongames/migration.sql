-- CreateTable
CREATE TABLE `UserOnGames` (
    `profileId` VARCHAR(191) NOT NULL,
    `gId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`profileId`,`gId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserOnGames` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOnGames` ADD FOREIGN KEY (`gId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
