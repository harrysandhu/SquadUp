/*
  Warnings:

  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profile` ADD COLUMN     `bio` VARCHAR(200);

-- AlterTable
ALTER TABLE `User` ADD COLUMN     `dob` DATETIME(3) NOT NULL;
