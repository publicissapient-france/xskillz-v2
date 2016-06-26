CREATE TABLE UserConnection (
  userId varchar(255) not null,
  providerId varchar(255) not null,
  providerUserId varchar(255),
  rank int not null,
  displayName varchar(255),
  profileUrl varchar(512),
  imageUrl varchar(512),
  accessToken varchar(1024) not null,
  secret varchar(255),
  refreshToken varchar(255),
  expireTime bigint(20),
  PRIMARY KEY (userId, providerId, providerUserId));

CREATE TABLE Company (
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Domain (
  id         BIGINT(20) NOT NULL AUTO_INCREMENT,
  name       VARCHAR(255) DEFAULT NULL,
  company_id BIGINT(20)   DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Role (
  id         BIGINT(20) NOT NULL AUTO_INCREMENT,
  name       VARCHAR(255) DEFAULT NULL,
  company_id BIGINT(20)   DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Skill (
  id         BIGINT(20) NOT NULL AUTO_INCREMENT,
  name       VARCHAR(255) DEFAULT NULL,
  company_id BIGINT(20)   DEFAULT NULL,
  domain_id  BIGINT(20)   DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE User (
  id         BIGINT(20) NOT NULL AUTO_INCREMENT,
  diploma    DATETIME     DEFAULT NULL,
  email      VARCHAR(255) DEFAULT NULL,
  lastLogin  DATETIME     DEFAULT NULL,
  name       VARCHAR(255) DEFAULT NULL,
  company_id BIGINT(20)   DEFAULT NULL,
  manager_id BIGINT(20)   DEFAULT NULL,
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

ALTER TABLE Role ADD CONSTRAINT FKqbkpka79wedf5x3y3njhv7jhf FOREIGN KEY (company_id) REFERENCES Company (id);
ALTER TABLE Skill
  ADD CONSTRAINT FKp3u11et3dob7e60q6j2yysphn FOREIGN KEY (domain_id) REFERENCES Domain (id),
  ADD CONSTRAINT FKgdr1sh4epeudbcidarw2t5po3 FOREIGN KEY (company_id) REFERENCES Company (id);
ALTER TABLE User
  ADD CONSTRAINT FKgftx0lh1vt0vrnovvcq1seprt FOREIGN KEY (manager_id) REFERENCES User (id),
  ADD CONSTRAINT FK1w9rdxn4dh1ej5lkpywwbakix FOREIGN KEY (company_id) REFERENCES Company (id);
ALTER TABLE UserSkill
  ADD CONSTRAINT FKkper0hfty7ftsrgs76pc3yhtp FOREIGN KEY (user_id) REFERENCES User (id),
  ADD CONSTRAINT FKoj68jqbk1jhri30wji2rflx3w FOREIGN KEY (skill_id) REFERENCES Skill (id);
ALTER TABLE UserRole
  ADD CONSTRAINT FKc52d1rv3ijbpu6lo2v3rej1tx FOREIGN KEY (User_id) REFERENCES User (id),
  ADD CONSTRAINT FK7qnwwe579g9frolyprat52l4d FOREIGN KEY (roles_id) REFERENCES Role (id);

INSERT INTO Company VALUES (1, 'Xebia');
INSERT INTO Company VALUES (2, 'WeScale');
INSERT INTO Company VALUES (3, 'Thiga');

INSERT INTO Domain VALUES (1, 'Agile', 1);
INSERT INTO Domain VALUES (2, 'Craft', 1);
INSERT INTO Domain VALUES (3, 'Mobile', 1);
INSERT INTO Domain VALUES (4, 'Back', 1);
INSERT INTO Domain VALUES (5, 'Cloud', 1);
INSERT INTO Domain VALUES (6, 'Devops', 1);
INSERT INTO Domain VALUES (7, 'Data', 1);
INSERT INTO Domain VALUES (8, 'Front', 1);

INSERT INTO Domain VALUES (9, 'Méthodo', 3);
INSERT INTO Domain VALUES (10, 'Métier', 3);
INSERT INTO Domain VALUES (11, 'Digital', 3);

INSERT INTO Domain VALUES (12, 'Loisirs', 1);
INSERT INTO Domain VALUES (13, 'Loisirs', 2);
INSERT INTO Domain VALUES (14, 'Loisirs', 3);


INSERT INTO Role VALUES (1, 'Manager', 1);
INSERT INTO Role VALUES (2, 'Manager', 2);
INSERT INTO Role VALUES (3, 'Manager', 3);