'use strict';

var Mysql = require('promise-mysql');

var connection;
Mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    debug: true
}).then((conn)=> {
    connection = conn;
});

module.exports = {

    TOKENS: {},

    getCompanies: () => {
        return connection.query('select * from Company');
    },

    getDomains: () => {
        return connection.query('select * from Domain');
    },

    getUpdatesByCompany: (companyId) => {
        return connection.query(`
            SELECT company.name company_name, domain.id domain_id, domain.name domain_name, user.diploma user_diploma, user.email user_email, user.id user_id, user.name user_name, skill.id skill_id, user_skill.interested skill_interested, user_skill.level skill_level, skill.name skill_name, user_skill.updatedAt skill_date, user_skill.id user_skill_id
            FROM UserSkill user_skill
                JOIN User user ON user_skill.user_id = user.id
                JOIN Skill skill ON skill.id = user_skill.skill_id
                JOIN Company company ON company.id = user.company_id
                JOIN Domain domain ON domain.id = skill.domain_id
            WHERE user.company_id = ${companyId}
            ORDER BY user_skill.updatedAt DESC
        `);
    },

    getUpdates: () => {
        return connection.query(`
            SELECT company.name company_name, domain.id domain_id, domain.name domain_name, user.diploma user_diploma, user.email user_email, user.id user_id, user.name user_name, skill.id skill_id, user_skill.interested skill_interested, user_skill.level skill_level, skill.name skill_name, user_skill.updatedAt skill_date, user_skill.id user_skill_id
            FROM UserSkill user_skill
                JOIN User user ON user_skill.user_id = user.id
                JOIN Skill skill ON skill.id = user_skill.skill_id
                JOIN Company company ON company.id = user.company_id
                JOIN Domain domain ON domain.id = skill.domain_id
            ORDER BY user_skill.updatedAt DESC
        `);
    },

    //-- Users
    findUserByEmail: (email) => {
        return connection.query(`SELECT * FROM User WHERE email = '${email}'`);
    },

    findUserById: (id) => connection.query(`SELECT user.*, company.name company_name FROM User user JOIN Company company ON company.id = user.company_id WHERE user.id = ${id}`),

    findUsersBySkill: (id) => connection.query(`SELECT user.* FROM UserSkill user_skill JOIN User user ON user.id = user_skill.user_id WHERE skill_id = ${id}`),

    findUserSkillsById: (id) => connection.query(`SELECT *, domain.name domain_name, domain.id domain_id, skill.name skill_name FROM UserSkill user_skill JOIN Skill skill ON skill.id = user_skill.skill_id JOIN Domain domain ON domain.id = skill.domain_id WHERE user_id = ${id}`),

    findSkillByName:(name) => connection.query(`SELECT * FROM Skill WHERE name LIKE '%${name}%'`),

    getUsers: () => connection.query(`SELECT * FROM User`),

    //-- Skills
    getSkills: () => connection.query(`SELECT domain.name domain_name, domain.id domain_id, skill.id id, skill.name name, count(user_id) AS num_allies From Skill skill JOIN Domain domain ON domain.id = skill.domain_id JOIN UserSkill user_skill ON user_skill.skill_id = skill.id GROUP BY skill_id ORDER BY skill.name ASC`),

    addSkill: (skill) => connection.query(`INSERT INTO UserSkill (interested, level, skill_id, user_id) VALUES (${skill.interested?1:0}, ${skill.level}, ${skill.id}, 1)`),

    addNewSkill: (skill) => connection.query(`INSERT INTO Skill (name, company_id, domain_id) VALUES ('${skill.name}', 1, 1)`)
};
