-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'developer') NOT NULL,

    UNIQUE INDEX `username`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `config` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER NOT NULL,
    `connection_type` ENUM('mysql', 'mariadb', 'postgres') NOT NULL,
    `db_user` VARCHAR(255) NOT NULL,
    `db_password` VARCHAR(255) NOT NULL,
    `host` VARCHAR(255) NOT NULL,
    `port` VARCHAR(255) NOT NULL,
    `db_name` VARCHAR(255) NOT NULL,
    `image_path` VARCHAR(255) NOT NULL,

    INDEX `FK_store_id`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`store_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `config` ADD CONSTRAINT `FK_store_id` FOREIGN KEY (`store_id`) REFERENCES `stores`(`store_id`) ON DELETE CASCADE ON UPDATE CASCADE;
