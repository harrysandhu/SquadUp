-- CreateTable
CREATE TABLE `Device` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceId` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(100),
    `idToken` VARCHAR(1024),
    `email` VARCHAR(256) NOT NULL,
    `password` VARCHAR(100),
    `authStage` ENUM('SIGNUP', 'USERNAME', 'SUB', 'FINAL') NOT NULL DEFAULT 'SIGNUP',
    `authType` ENUM('GOOGLE', 'FACEBOOK', 'EMAIL') NOT NULL DEFAULT 'GOOGLE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dob` DATETIME(3) NOT NULL,
    `dID` INTEGER NOT NULL,
UNIQUE INDEX `User.userId_unique`(`userId`),
UNIQUE INDEX `User.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100),
    `username` VARCHAR(100),
    `avatarUrl` VARCHAR(1024) NOT NULL DEFAULT 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png',
    `bio` VARCHAR(200),
    `uID` VARCHAR(191) NOT NULL,
UNIQUE INDEX `Profile.username_unique`(`username`),
UNIQUE INDEX `Profile_uID_unique`(`uID`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`dID`) REFERENCES `Device`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`uID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
