'use strict';

var Mysql = require('mysql');
const Promise = require('bluebird');
const _ = require('lodash');
const log = require('winston');

const connection = Mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    debug: false
});
connection.connect();

const query = (sql, values) => {
    values = values || [];
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, rows) => {
            if (err) {
                log.error(err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        }, values);
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
        `).then((domains) => domains[0]),

    getDomains: () =>
        query(`
            SELECT * 
            FROM Domain
    `),

    removeDomainFromSkills: (id) =>
        query(`
            UPDATE Skill
            SET domain_id = NULL
            WHERE domain_id = ${id}
        `),

    deleteDomain: (id) =>
        query(`
            DELETE FROM Domain
            WHERE id = ${id}
        `),

    //-- Updates
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
    findUserByEmailAndPassword: (email, password) =>
        query(`
            SELECT *
            FROM User 
            WHERE email = '${email}' AND password = '${password}'
    `).then((users) => users[0]),

    findUserByEmail: (email) =>
        query(`
            SELECT *
            FROM User 
            WHERE email = '${email}'
    `).then((users) => users[0]),

    findUserByEmailAndToken: (email, token) =>
        Repository.findUserById(Repository.TOKENS[token].id),

    findUserById: (id) =>
        query(`
            SELECT user.* 
            FROM User user 
            WHERE user.id = ${id}
    `).then((users) => users[0]),

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
            SELECT user_id, interested, level, user_skill.id id, skill.id skill_id, domain.name domain_name, domain.id domain_id, skill.name skill_name 
            FROM UserSkill user_skill 
            JOIN Skill skill ON skill.id = user_skill.skill_id 
            LEFT JOIN Domain domain ON domain.id = skill.domain_id 
            WHERE user_id = ${id}
    `)
            .then((userSkills) => {
                _.map(userSkills, (userSkill) => {
                    userSkill.interested = userSkill.interested[0] == 1
                });
                return userSkills;
            }),

    findUserRolesById: (id) =>
        query(`
            SELECT name
            FROM UserRole user_role
            JOIN Role role ON role.id = user_role.roles_id
            WHERE user_id = ${id}
        `),

    findSkillByName: (name) =>
        query(`
            SELECT * 
            FROM Skill 
            WHERE name LIKE '%${name}%'
        `).then((skills) => skills[0]),

    getUsers: () =>
        query(`
            SELECT * 
            FROM User
            ORDER BY name
    `),

    addNewUser: (user) =>
        query(`
            INSERT INTO User (name, email, password)
            VALUES ('${user.name}','${user.email}', '${user.password}')
    `),

    deleteUserById: (id) =>
        query(`DELETE FROM UserRole WHERE User_id = ${id}`).then(() =>
            query(`DELETE FROM UserSkill WHERE user_id = ${id}`)).then(() =>
            query(`DELETE FROM User WHERE id = ${id}`)),

    updateUser: (id, user) =>
        query(`
            UPDATE User
            SET diploma = '${user.diploma}'
            WHERE id = ${id}`),

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

    deleteUserSkillById: (skillId, userId) =>
        query(`
            DELETE FROM UserSkill
            WHERE user_id = ${userId}
            AND skill_id = ${skillId}
    `),

    updateUserSkillById: (skillId, skill) =>
        query(`
            UPDATE UserSkill
            SET interested = ${skill.interested ? 1 : 0}, level = ${skill.level}
            WHERE user_id = ${skill.user_id}
            AND skill_id = ${skillId}
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

    addManagerRole: (user, roleName) =>
        query(`
            INSERT INTO UserRole(User_id,roles_id)
            VALUES (${user.id},1)
        `, [roleName]),

    clear: () =>
        query('DELETE FROM UserSkill')
            .then(() => Repository.query('DELETE FROM UserSkill'))
            .then(() => Repository.query('DELETE FROM UserRole'))
            .then(() => Repository.query('DELETE FROM User'))
            .then(() => Repository.query('DELETE FROM Skill'))
            .then(() => Repository.query('DELETE FROM Domain')),

    mergeSkills: (from, to) =>
        query(`
            UPDATE UserSkill
            SET skill_id = ${to}
            WHERE skill_id = ${from}
        `)
            .then(() => query(`DELETE FROM Skill WHERE id = ${from}`)),

    query
};

module.exports = Repository;
