CREATE TABLE `tree` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` datetime(6) NOT NULL,
    `created_by` bigint(20) DEFAULT NULL,
    `parent_id` bigint(20) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;gi


INSERT INTO `tree` (`id`, `name`, created_at, created_by, parent_id)
    SELECT `id`, `name`, IFNULL(created_at, now()), created_by, parent_id
    FROM `hosts`
    WHERE dir = true;

ALTER TABLE `hosts` DROP CONSTRAINT `fk_host_host`;
DELETE FROM `hosts` WHERE dir = true;
ALTER TABLE `hosts` DROP COLUMN `dir`;