CREATE TABLE Domain (
  id         BIGINT(20) NOT NULL AUTO_INCREMENT,
  name       VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Role (
  id         BIGINT(20) NOT NULL AUTO_INCREMENT,
  name       VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Skill (
  id         BIGINT(20) NOT NULL AUTO_INCREMENT,
  name       VARCHAR(255) DEFAULT NULL,
  domain_id  BIGINT(20)   DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE User (
  id         BIGINT(20) NOT NULL AUTO_INCREMENT,
  diploma    DATETIME     DEFAULT NULL,
  email      VARCHAR(255) DEFAULT NULL,
  name       VARCHAR(255) DEFAULT NULL,
  manager_id BIGINT(20)   DEFAULT NULL,
  password   VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE UserSkill (
  id         BIGINT(20) NOT NULL AUTO_INCREMENT,
  interested BIT(1)     NOT NULL,
  level      INT(11)    DEFAULT NULL,
  updatedAt  DATETIME   DEFAULT CURRENT_TIMESTAMP,
  skill_id   BIGINT(20) DEFAULT NULL,
  user_id    BIGINT(20) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE UserRole (
  User_id  BIGINT(20) NOT NULL,
  roles_id BIGINT(20) NOT NULL
);

CREATE UNIQUE INDEX User_email_uindex ON User (email);

ALTER TABLE Skill
  ADD CONSTRAINT FKp3u11et3dob7e60q6j2yysphn FOREIGN KEY (domain_id) REFERENCES Domain (id);
ALTER TABLE User
  ADD CONSTRAINT FKgftx0lh1vt0vrnovvcq1seprt FOREIGN KEY (manager_id) REFERENCES User (id);
ALTER TABLE UserSkill
  ADD CONSTRAINT FKkper0hfty7ftsrgs76pc3yhtp FOREIGN KEY (user_id) REFERENCES User (id),
  ADD CONSTRAINT FKoj68jqbk1jhri30wji2rflx3w FOREIGN KEY (skill_id) REFERENCES Skill (id);
ALTER TABLE UserRole
  ADD CONSTRAINT FKc52d1rv3ijbpu6lo2v3rej1tx FOREIGN KEY (User_id) REFERENCES User (id),
  ADD CONSTRAINT FK7qnwwe579g9frolyprat52l4d FOREIGN KEY (roles_id) REFERENCES Role (id);

INSERT INTO Role (name) VALUES ('Manager');