INSERT INTO User (id, email, name, password) VALUES (1, 'mdupont@mycompany.com', 'Michel Dupont', '-');

INSERT INTO Domain VALUES (1, 'Bureautique', '#1abc9c');
INSERT INTO Domain VALUES (2, 'Organisation', '#f1c40f');

INSERT INTO Skill VALUES (1, 'Traitement de texte', 1);
INSERT INTO Skill VALUES (2, 'Tableur', 1);
INSERT INTO Skill VALUES (3, 'Email', 1);
INSERT INTO Skill VALUES (4, 'Présentations', 1);
INSERT INTO Skill VALUES (5, 'Téléphonie', 2);
INSERT INTO Skill VALUES (6, 'Réunion', 2);

INSERT INTO UserSkill (interested, level, skill_id, user_id)  VALUES (true, 2, 1, 1);
INSERT INTO UserSkill (interested, level, skill_id, user_id)  VALUES (false, 3, 2, 1);
INSERT INTO UserSkill (interested, level, skill_id, user_id)  VALUES (false, 0, 3, 1);
INSERT INTO UserSkill (interested, level, skill_id, user_id)  VALUES (true, 1, 4, 1);
INSERT INTO UserSkill (interested, level, skill_id, user_id)  VALUES (false, 1, 5, 1);
INSERT INTO UserSkill (interested, level, skill_id, user_id)  VALUES (true, 2, 6, 1);