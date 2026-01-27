-- Database Schema for SercaIA
-- Import this file in phpMyAdmin

CREATE TABLE IF NOT EXISTS `leads` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `business_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `industry` VARCHAR(50) NOT NULL,
    `capacity` VARCHAR(50) DEFAULT NULL,
    `revenue` VARCHAR(50) DEFAULT NULL,
    `tools` TEXT DEFAULT NULL,
    `priority` VARCHAR(50) DEFAULT NULL,
    `timeline` VARCHAR(50) DEFAULT NULL,
    `budget` VARCHAR(50) DEFAULT NULL,
    `challenge` TEXT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
