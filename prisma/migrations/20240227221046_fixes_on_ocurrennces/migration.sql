/*
  Warnings:

  - The values [high,medium,low] on the enum `Ocurrence_level` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `status` on the `ocurrence` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.
  - You are about to drop the `students` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `ocurrence` MODIFY `level` ENUM('HIGH', 'MEDIUM', 'LOW') NOT NULL,
    MODIFY `status` ENUM('OPENED', 'ASSUMED', 'WAITING', 'RESOLVED') NOT NULL DEFAULT 'OPENED';

-- DropTable
DROP TABLE `students`;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `ra` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentOnOcurrences` (
    `studentId` INTEGER NOT NULL,
    `ocurrenceId` INTEGER NOT NULL,

    PRIMARY KEY (`studentId`, `ocurrenceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentOnOcurrences` ADD CONSTRAINT `StudentOnOcurrences_ocurrenceId_fkey` FOREIGN KEY (`ocurrenceId`) REFERENCES `Ocurrence`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentOnOcurrences` ADD CONSTRAINT `StudentOnOcurrences_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
