/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Auth` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Auth` DROP FOREIGN KEY `Auth_ibfk_1`;

-- DropIndex
DROP INDEX `User.username_unique` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    DROP COLUMN `username`,
    ADD COLUMN     `userId` VARCHAR(100),
    ADD COLUMN     `idToken` VARCHAR(1024),
    ADD COLUMN     `email` VARCHAR(256) NOT NULL,
    ADD COLUMN     `password` VARCHAR(100),
    ADD COLUMN     `authStage` ENUM('SIGNUP', 'USERNAME', 'SUB', 'FINAL') NOT NULL DEFAULT 'SIGNUP',
    ADD COLUMN     `authType` ENUM('GOOGLE', 'FACEBOOK', 'EMAIL') NOT NULL DEFAULT 'GOOGLE',
    ADD COLUMN     `dID` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Auth`;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100),
    `username` VARCHAR(100),
    `avatarUrl` VARCHAR(1024) NOT NULL DEFAULT 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png',
    `uID` VARCHAR(191) NOT NULL,
UNIQUE INDEX `Profile.username_unique`(`username`),
UNIQUE INDEX `Profile_uID_unique`(`uID`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User.userId_unique` ON `User`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `User.email_unique` ON `User`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `User_dID_unique` ON `User`(`dID`);

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`uID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`dID`) REFERENCES `Device`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
