/*
  Warnings:

  - You are about to drop the `MessagesOnChats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MessagesOnChats` DROP FOREIGN KEY `MessagesOnChats_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_ibfk_2`;

-- DropTable
DROP TABLE `MessagesOnChats`;

-- AddForeignKey
ALTER TABLE `Message` ADD FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
