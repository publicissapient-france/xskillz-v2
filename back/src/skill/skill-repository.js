const _ = require('lodash');

const Database = require('../database');

const Repository = {
    getSkills: () =>
        Database.query(`
            SELECT domain.name domain_name, domain.id domain_id, skill.id id, skill.name name, count(user_id) AS num_allies , domain.color
            FROM Skill skill 
            LEFT JOIN Domain domain ON domain.id = skill.domain_id 
            LEFT JOIN UserSkill user_skill ON user_skill.skill_id = skill.id 
            GROUP BY skill_id, domain_name, domain_id, id
            ORDER BY skill.name ASC
    `),

    addSkill: (skill) =>
        Database.query(`
            INSERT INTO UserSkill (interested, level, skill_id, user_id) 
            VALUES (${skill.interested ? 1 : 0}, ${skill.level}, ${skill.id}, ${skill.user_id})
    `),

    deleteUserSkillById: (skillId, userId) =>
        Database.query(`
            DELETE FROM UserSkill
            WHERE user_id = ${userId}
            AND skill_id = ${skillId}
    `),

    updateUserSkillById: (skillId, skill) =>
        Database.query(`
            UPDATE UserSkill
            SET interested = ${skill.interested ? 1 : 0}, level = ${skill.level}
            WHERE user_id = ${skill.user_id}
            AND skill_id = ${skillId}
        `),

    addNewSkill: (name) =>
        Database.query(`
            INSERT INTO Skill (name) 
            VALUES ('${name}')
        `),

    addSkillToDomain: (domain_id, skill_id) =>
        Database.query(`
            UPDATE Skill
            SET domain_id = ${domain_id}
            WHERE id = ${skill_id}
        `),

    mergeSkills: (from, to) =>
        Database.query(`
            UPDATE UserSkill
            SET skill_id = ${to}
            WHERE skill_id = ${from}
        `)
        .then(() => Database.query(`
            DELETE FROM UserSkill
            WHERE id NOT IN (SELECT * FROM (SELECT MIN(id) FROM UserSkill GROUP BY skill_id, user_id, level, interested) AS t)`))
        .then(() => Database.query(`DELETE FROM Skill WHERE id = ${from}`))
        .then(() => Database.query(`DELETE FROM DefaultSkill WHERE skill_id = ${from}`)),

    findSkillByName: (name) =>
        Database.query(`
            SELECT * 
            FROM Skill 
            WHERE LOWER(name) LIKE '%${name.toLowerCase()}%'
        `).then((skills) => skills[0]),

    findSkillById: (id) =>
        Database.query(`
            SELECT * 
            FROM Skill
            WHERE id = ${id}
    `).then(skills => skills[0]),

    findSkillByExactName: (name) =>
        Database.query(`
            SELECT * 
            FROM Skill 
            WHERE LOWER(name) = '${name.toLowerCase()}'
        `).then((skills) => skills[0]),

    removeDomainFromSkills: (id) =>
        Database.query(`
            UPDATE Skill
            SET domain_id = NULL
            WHERE domain_id = ${id}
        `),

    findUserSkillsById: (id) =>
        Database.query(`
            SELECT user_id, interested, level, user_skill.id id, skill.id skill_id, domain.name domain_name, domain.id domain_id, domain.color domain_color, skill.name skill_name 
            FROM UserSkill user_skill 
            JOIN Skill skill ON skill.id = user_skill.skill_id 
            LEFT JOIN Domain domain ON domain.id = skill.domain_id 
            WHERE user_id = ${id}
            ORDER BY level DESC, interested DESC, skill.name
    `)
        .then((userSkills) => {
            _.map(userSkills, (userSkill) => {
                userSkill.interested = userSkill.interested[0] == 1;
            });
            return userSkills;
        }),

    findUserSkillByUserIdAndSkillId: (user_id, skill_id) =>
        Database.query(`
            SELECT *
            FROM UserSkill
            WHERE user_id = ${user_id}
            AND skill_id = ${skill_id}
        `),

    updateSkill: (skillId, skill) => Database.query(`UPDATE Skill SET description = '${_.replace(skill.description, `'`, `\\'`)}' WHERE id = ${skillId}`),

    exportUserSkills: () => Database.query(`
    SELECT
      u.id              user_id,
      u.name,
      skill.name        skill_name,
      us.level          skill_level,
      us.interested     skill_interest,
      skill.description skill_description,
      domain.name       domain_name,
      u.email,
      u.phone,
      u.address,
      u.home,
      u.employee_date,
      u.employee_end_date,
      u.availability_date,
      manager.name manager
    FROM UserSkill us
      JOIN Skill skill ON skill.id = us.skill_id
      JOIN User u ON u.id = us.user_id
      LEFT JOIN User manager ON manager.id = u.manager_id
      LEFT JOIN Domain domain ON domain.id = skill.domain_id
    ORDER BY u.id
    `)
    .then(skills => {
        _.map(skills, skill => {
            skill.skill_interest = skill.skill_interest[0] === 1;
        });
        return skills;
    }),
};

module.exports = Repository;
