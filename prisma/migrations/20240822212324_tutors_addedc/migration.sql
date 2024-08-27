-- CreateTable
CREATE TABLE `_OcurrenceToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OcurrenceToUser_AB_unique`(`A`, `B`),
    INDEX `_OcurrenceToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_OcurrenceToUser` ADD CONSTRAINT `_OcurrenceToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ocurrence`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OcurrenceToUser` ADD CONSTRAINT `_OcurrenceToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
