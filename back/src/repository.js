'use strict';

var Mysql = require('mysql');
const Promise = require('bluebird');

const connection = Mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    debug: false
});
connection.connect();

const query = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const Repository = {
    TOKENS: {},

    //-- Domains
    addDomain: (name) =>
        query(`
            INSERT INTO Domain(name) 
            VALUES ('${name}')
    `),

    findDomainByName: (name) =>
        query(`
            SELECT *
            FROM Domain
            WHERE name = '${name}'
        `),

    getDomains: () =>
        query(`
            SELECT * 
            FROM Domain
    `),

    getUpdates: () =>
        query(`
            SELECT domain.id domain_id, domain.name domain_name, user.diploma user_diploma, user.email user_email, user.id user_id, user.name user_name, skill.id skill_id, user_skill.interested skill_interested, user_skill.level skill_level, skill.name skill_name, user_skill.updatedAt skill_date, user_skill.id user_skill_id
            FROM UserSkill user_skill
                JOIN User user ON user_skill.user_id = user.id
                JOIN Skill skill ON skill.id = user_skill.skill_id
                LEFT JOIN Domain domain ON domain.id = skill.domain_id
            ORDER BY user_skill.updatedAt DESC
    `),

    //-- Users
    findUserByEmail: (email) =>
        query(`
            SELECT *
            FROM User 
            WHERE email = '${email}'
    `),

    findUserById: (id) =>
        query(`
            SELECT user.* 
            FROM User user 
            WHERE user.id = ${id}
    `),

    findUsersBySkill: (id) =>
        query(`
            SELECT user.* 
            FROM UserSkill user_skill 
            JOIN User user ON user.id = user_skill.user_id 
            WHERE skill_id = ${id}
    `),

    findUserSkillByUserIdAndSkillId: (user_id, skill_id) =>
        query(`
            SELECT *
            FROM UserSkill
            WHERE user_id = ${user_id}
            AND skill_id = ${skill_id}
        `),
    
    findUserSkillsById: (id) =>
        query(`
            SELECT *, domain.name domain_name, domain.id domain_id, skill.name skill_name 
            FROM UserSkill user_skill 
            JOIN Skill skill ON skill.id = user_skill.skill_id 
            LEFT JOIN Domain domain ON domain.id = skill.domain_id 
            WHERE user_id = ${id}
    `),

    findSkillByName: (name) =>
        query(`
            SELECT * 
            FROM Skill 
            WHERE name LIKE '%${name}%'
    `),

    getUsers: () =>
        query(`
            SELECT * 
            FROM User
    `),

    addNewUser: (user) =>
        query(`
            INSERT INTO User (name, email)
            VALUES ('${user.name}','${user.email}')
    `),

    //-- Skills
    getSkills: () =>
        query(`
            SELECT domain.name domain_name, domain.id domain_id, skill.id id, skill.name name, count(user_id) AS num_allies 
            FROM Skill skill 
            LEFT JOIN Domain domain ON domain.id = skill.domain_id 
            LEFT JOIN UserSkill user_skill ON user_skill.skill_id = skill.id 
            GROUP BY skill_id 
            ORDER BY skill.name ASC
    `),

    addSkill: (skill) =>
        query(`
            INSERT INTO UserSkill (interested, level, skill_id, user_id) 
            VALUES (${skill.interested ? 1 : 0}, ${skill.level}, ${skill.id}, ${skill.user_id})
    `),

    addNewSkill: (name) =>
        query(`
            INSERT INTO Skill (name) 
            VALUES ('${name}')
        `),

    addSkillToDomain: (domain_id, skill_id) =>
        query(`
            UPDATE Skill
            SET domain_id = ${domain_id}
            WHERE id = ${skill_id}
        `),

    query
};

module.exports = Repository;
