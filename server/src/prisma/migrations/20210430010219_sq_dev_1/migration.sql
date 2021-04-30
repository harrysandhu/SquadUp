-- CreateTable
CREATE TABLE `Device` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceId` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
UNIQUE INDEX `Device.deviceId_unique`(`deviceId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(100),
    `idToken` LONGTEXT,
    `email` VARCHAR(256) NOT NULL,
    `password` VARCHAR(100),
    `authStage` ENUM('SIGNUP', 'USERNAME', 'SUB', 'FINAL') NOT NULL DEFAULT 'SIGNUP',
    `authType` ENUM('GOOGLE', 'FACEBOOK', 'EMAIL') NOT NULL DEFAULT 'GOOGLE',
UNIQUE INDEX `Auth.userId_unique`(`userId`),
UNIQUE INDEX `Auth.email_unique`(`email`),
UNIQUE INDEX `Auth_uid_unique`(`uid`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100),
    `username` VARCHAR(100),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
UNIQUE INDEX `User.username_unique`(`username`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Auth` ADD FOREIGN KEY (`uid`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
