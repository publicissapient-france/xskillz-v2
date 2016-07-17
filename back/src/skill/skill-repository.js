'use strict';

const _ = require('lodash');

const Repository = {
    init: (args) => {
        this.db = args.db;
    },

    getSkills: () =>
        this.db.query(`
            SELECT domain.name domain_name, domain.id domain_id, skill.id id, skill.name name, count(user_id) AS num_allies 
            FROM Skill skill 
            LEFT JOIN Domain domain ON domain.id = skill.domain_id 
            LEFT JOIN UserSkill user_skill ON user_skill.skill_id = skill.id 
            GROUP BY skill_id 
            ORDER BY skill.name ASC
    `),

    addSkill: (skill) =>
        this.db.query(`
            INSERT INTO UserSkill (interested, level, skill_id, user_id) 
            VALUES (${skill.interested ? 1 : 0}, ${skill.level}, ${skill.id}, ${skill.user_id})
    `),

    deleteUserSkillById: (skillId, userId) =>
        this.db.query(`
            DELETE FROM UserSkill
            WHERE user_id = ${userId}
            AND skill_id = ${skillId}
    `),

    updateUserSkillById: (skillId, skill) =>
        this.db.query(`
            UPDATE UserSkill
            SET interested = ${skill.interested ? 1 : 0}, level = ${skill.level}
            WHERE user_id = ${skill.user_id}
            AND skill_id = ${skillId}
        `),

    addNewSkill: (name) =>
        this.db.query(`
            INSERT INTO Skill (name) 
            VALUES ('${name}')
        `),

    addSkillToDomain: (domain_id, skill_id) =>
        this.db.query(`
            UPDATE Skill
            SET domain_id = ${domain_id}
            WHERE id = ${skill_id}
        `),

    mergeSkills: (from, to) =>
        this.db.query(`
            UPDATE UserSkill
            SET skill_id = ${to}
            WHERE skill_id = ${from}
        `)
            .then(() => this.db.query(`DELETE FROM Skill WHERE id = ${from}`)),

    findSkillByName: (name) =>
        this.db.query(`
            SELECT * 
            FROM Skill 
            WHERE LOWER(name) LIKE '%${name.toLowerCase()}%'
        `).then((skills) => skills[0]),

    findSkillByExactName: (name) =>
        this.db.query(`
            SELECT * 
            FROM Skill 
            WHERE LOWER(name) = '${name.toLowerCase()}'
        `).then((skills) => skills[0]),

    removeDomainFromSkills: (id) =>
        this.db.query(`
            UPDATE Skill
            SET domain_id = NULL
            WHERE domain_id = ${id}
        `),

    findUserSkillsById: (id) =>
        this.db.query(`
            SELECT user_id, interested, level, user_skill.id id, skill.id skill_id, domain.name domain_name, domain.id domain_id, domain.color domain_color, skill.name skill_name 
            FROM UserSkill user_skill 
            JOIN Skill skill ON skill.id = user_skill.skill_id 
            LEFT JOIN Domain domain ON domain.id = skill.domain_id 
            WHERE user_id = ${id}
            ORDER BY level DESC, interested DESC, skill.name
    `)
            .then((userSkills) => {
                _.map(userSkills, (userSkill) => {
                    userSkill.interested = userSkill.interested[0] == 1
                });
                return userSkills;
            }),

    findUserSkillByUserIdAndSkillId: (user_id, skill_id) =>
        this.db.query(`
            SELECT *
            FROM UserSkill
            WHERE user_id = ${user_id}
            AND skill_id = ${skill_id}
        `)
};

module.exports = Repository;
