/*
  Warnings:

  - You are about to drop the `studentonocurrences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `studentonocurrences` DROP FOREIGN KEY `StudentOnOcurrences_ocurrenceId_fkey`;

-- DropForeignKey
ALTER TABLE `studentonocurrences` DROP FOREIGN KEY `StudentOnOcurrences_studentId_fkey`;

-- DropTable
DROP TABLE `studentonocurrences`;

-- CreateTable
CREATE TABLE `_OcurrenceToStudent` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OcurrenceToStudent_AB_unique`(`A`, `B`),
    INDEX `_OcurrenceToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_OcurrenceToStudent` ADD CONSTRAINT `_OcurrenceToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ocurrence`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OcurrenceToStudent` ADD CONSTRAINT `_OcurrenceToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
