ALTER TABLE User
    ADD COLUMN default_password BOOL DEFAULT TRUE;

UPDATE User SET default_password = FALSE;
UPDATE User SET default_password = TRUE WHERE password = '$2a$10$FT88/HJX/zKclhkXLzia9uRqtZOYK8qAdMdK4KhRPmxl9mmyFsdi6';
