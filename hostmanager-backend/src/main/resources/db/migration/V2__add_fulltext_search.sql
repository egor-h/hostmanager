CREATE FULLTEXT INDEX idx_text_hosts_name_address ON hosts (name, address);
CREATE FULLTEXT INDEX idx_text_notes_title_body ON notes (title, text);