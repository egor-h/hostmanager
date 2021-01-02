CREATE TABLE `hosts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(64) DEFAULT NULL,
  `mac_address` varchar(12) DEFAULT NULL,
  `dir` tinyint(1) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `supported_protocols` varchar(128) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `who_created` varchar(64) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `location` varchar(128) DEFAULT NULL,
  `descr` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=962 DEFAULT CHARSET=utf8;

CREATE TABLE `tags` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `hosts_tags` (
  host_id bigint(20) NOT NULL,
  tags_id bigint(20) NOT NULL,
  PRIMARY KEY (`host_id`, `tags_id`),
  CONSTRAINT `fk_tag_id` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`),
  CONSTRAINT `fk_host_id` FOREIGN KEY (`host_id`) REFERENCES `hosts` (`id`)
);

CREATE TABLE `protocols` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `execution_line` varchar(255) DEFAULT NULL,
  `launch_type` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `hosts_protocols` (
  `host_id` bigint(20) NOT NULL,
  `protocols_id` bigint(20) NOT NULL,
  PRIMARY KEY (`host_id`,`protocols_id`),
  CONSTRAINT `fk_protocols_id` FOREIGN KEY (`protocols_id`) REFERENCES `protocols` (`id`),
  CONSTRAINT `fk_host_id2` FOREIGN KEY (`host_id`) REFERENCES `hosts` (`id`)
);

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `login` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `notes` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) DEFAULT '',
    `text` TEXT DEFAULT '',
    `done` tinyint(1) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `created_by` bigint (20),
    `done_at` datetime DEFAULT NULL
)

CREATE TABLE `hosts_notes` (
  `host_id` bigint(20) NOT NULL,
  `notes_id` bigint(20) NOT NULL,
  PRIMARY KEY (`host_id`,`notes_id`),
  CONSTRAINT `fk_notes_id` FOREIGN KEY (`notes_id`) REFERENCES `notes` (`id`),
  CONSTRAINT `fk_host_id3` FOREIGN KEY (`host_id`) REFERENCES `hosts` (`id`)
);

CREATE TABLE `locations` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
)

