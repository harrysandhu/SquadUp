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

-- CreateTable
CREATE TABLE `Chat` (
    `id` VARCHAR(191) NOT NULL,
    `teamId` VARCHAR(191) NOT NULL,
UNIQUE INDEX `Chat_teamId_unique`(`teamId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MessagesOnChats` (
    `chatId` VARCHAR(191) NOT NULL,
    `messageId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`chatId`,`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(300) NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,
    `sentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attachment` (
    `id` VARCHAR(191) NOT NULL,
    `resourceUrl` VARCHAR(1024) NOT NULL,
    `type` ENUM('PHOTO', 'VIDEO', 'FILE') NOT NULL DEFAULT 'PHOTO',
    `messageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `gameId` VARCHAR(20) NOT NULL,
    `maxSize` INTEGER NOT NULL DEFAULT 4,
    `coverUrl` VARCHAR(1024) NOT NULL,
UNIQUE INDEX `Game.gameId_unique`(`gameId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `teamId` VARCHAR(20) NOT NULL,
    `coverUrl` VARCHAR(1024) NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/squadupapp-cf4d3.appspot.com/o/defaultTeam.png?alt=media&token=6b9eb452-750c-4168-8e4f-7e9874571698',
    `gId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersOnTeam` (
    `profileId` VARCHAR(191) NOT NULL,
    `tId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`profileId`,`tId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`dID`) REFERENCES `Device`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`uID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessagesOnChats` ADD FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD FOREIGN KEY (`senderId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD FOREIGN KEY (`chatId`) REFERENCES `MessagesOnChats`(`chatId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attachment` ADD FOREIGN KEY (`messageId`) REFERENCES `Message`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD FOREIGN KEY (`gId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnTeam` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnTeam` ADD FOREIGN KEY (`tId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
