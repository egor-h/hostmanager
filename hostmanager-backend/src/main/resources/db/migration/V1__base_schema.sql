

CREATE TABLE locations (
  id bigserial PRIMARY KEY NOT NULL,
  description varchar(255) DEFAULT NULL,
  name varchar(255) DEFAULT NULL
);

CREATE TABLE notes (
  id bigserial PRIMARY KEY NOT NULL,
  created_at timestamp DEFAULT NULL,
  done boolean NOT NULL,
  done_at timestamp DEFAULT NULL,
  text varchar(255) DEFAULT NULL,
  title varchar(255) DEFAULT NULL
);

CREATE TABLE protocols (
  id bigserial PRIMARY KEY NOT NULL,
  execution_line varchar(255) DEFAULT NULL,
  expected_exit_code bigint NOT NULL,
  launch_type integer DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  validation_regex varchar(255) DEFAULT NULL
);

CREATE TABLE roles (
  id bigserial PRIMARY KEY NOT NULL,
  description varchar(255) DEFAULT NULL,
  name varchar(255) DEFAULT NULL
);

CREATE TABLE subnets (
  id bigserial PRIMARY KEY NOT NULL,
  address varchar(255) DEFAULT NULL,
  mask varchar(255) DEFAULT NULL,
  name varchar(255) DEFAULT NULL
);

CREATE TABLE tags (
  id bigserial PRIMARY KEY NOT NULL,
  name varchar(255) DEFAULT NULL,
  UNIQUE(name)
);

CREATE TABLE users (
  id bigserial PRIMARY KEY NOT NULL,
  email varchar(255) DEFAULT NULL,
  enabled boolean NOT NULL,
  login varchar(255) DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  UNIQUE(login),
  UNIQUE(email)
);

CREATE TABLE settings (
  id bigserial PRIMARY KEY NOT NULL,
  key_name varchar(255) DEFAULT NULL,
  type integer DEFAULT NULL,
  value varchar(255) DEFAULT NULL,
  user_id bigint DEFAULT NULL,
  CONSTRAINT fk_setting_user FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE hosts (
  id bigserial PRIMARY KEY NOT NULL,
  created_at timestamp DEFAULT NULL,
  address varchar(255) NOT NULL,
  enabled boolean DEFAULT NULL,
  dir boolean DEFAULT NULL,
  name varchar(255) NOT NULL,
  port integer NOT NULL,
  created_by bigint DEFAULT NULL,
  parent_id bigint DEFAULT NULL,
  CONSTRAINT fk_host_user FOREIGN KEY (created_by) REFERENCES users (id),
  CONSTRAINT fk_host_host FOREIGN KEY (parent_id) REFERENCES hosts (id)
);

CREATE TABLE hosts_locations (
  host_id bigint NOT NULL,
  location_id bigint NOT NULL,
  PRIMARY KEY (host_id, location_id),
  CONSTRAINT fk_location_host FOREIGN KEY (host_id) REFERENCES hosts (id),
  CONSTRAINT fk_host_location FOREIGN KEY (location_id) REFERENCES locations (id)
);

CREATE TABLE hosts_notes (
  host_id bigint NOT NULL,
  note_id bigint NOT NULL,
  PRIMARY KEY (host_id, note_id),
  CONSTRAINT fk_note_host FOREIGN KEY (host_id) REFERENCES hosts (id),
  CONSTRAINT fk_host_note FOREIGN KEY (note_id) REFERENCES notes (id)
);

CREATE TABLE hosts_protocols (
  host_id bigint NOT NULL,
  protocols_id bigint NOT NULL,
  PRIMARY KEY (host_id,protocols_id),
  CONSTRAINT fk_host_protocol FOREIGN KEY (protocols_id) REFERENCES protocols (id),
  CONSTRAINT fk_protocol_host FOREIGN KEY (host_id) REFERENCES hosts (id)
);

CREATE TABLE hosts_tags (
  host_id bigint NOT NULL,
  tags_id bigint NOT NULL,
  PRIMARY KEY (host_id,tags_id),
  CONSTRAINT fk_host_tag FOREIGN KEY (tags_id) REFERENCES tags (id),
  CONSTRAINT fk_tag_host FOREIGN KEY (host_id) REFERENCES hosts (id)
);

CREATE TABLE users_roles (
  user_id bigint NOT NULL,
  role_id bigint NOT NULL,
  PRIMARY KEY (user_id,role_id),
  CONSTRAINT fk_role_user FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles (id)
);

