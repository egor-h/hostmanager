CREATE TABLE tree (
    id bigserial PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at timestamp NOT NULL,
    created_by bigint DEFAULT NULL,
    parent_id bigint DEFAULT NULL
);

INSERT INTO tree (id, name, created_at, created_by, parent_id)
    SELECT id, name, COALESCE(created_at, now()), created_by, parent_id
    FROM hosts
    WHERE dir = true;

ALTER TABLE hosts DROP CONSTRAINT fk_host_host;
DELETE FROM hosts WHERE dir = true;
ALTER TABLE hosts DROP COLUMN dir;