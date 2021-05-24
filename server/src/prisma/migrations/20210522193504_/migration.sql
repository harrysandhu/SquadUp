/*
  Warnings:

  - A unique constraint covering the columns `[teamId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Team.teamId_unique` ON `Team`(`teamId`);
