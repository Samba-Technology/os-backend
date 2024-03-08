/*
  Warnings:

  - The primary key for the `student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ra]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ra` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_ocurrencetostudent` DROP FOREIGN KEY `_OcurrenceToStudent_B_fkey`;

-- AlterTable
ALTER TABLE `_ocurrencetostudent` MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `ra` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`ra`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_ra_key` ON `Student`(`ra`);

-- AddForeignKey
ALTER TABLE `_OcurrenceToStudent` ADD CONSTRAINT `_OcurrenceToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`ra`) ON DELETE CASCADE ON UPDATE CASCADE;
