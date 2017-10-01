'use strict';

const Promise = require('bluebird');
const Bcrypt = require('bcrypt-then');
const saltRounds = 10;
const _ = require('lodash');

const Database = require('../database');

const UserRepository = {

    findUserByEmailAndPassword: (email, password) =>
        UserRepository
            .findUserByEmail(email)
            .then((user) => {
                if (!user) {
                    return Promise.reject(`Unable to find user with email ${email}`);
                }
                return Bcrypt.compare(password, user.password)
                    .then((found) => {
                        if (found) {
                            delete user.password;
                            return Promise.resolve(user);
                        }
                        return Promise.reject(new Error('Wrong password'));
                    });
            }),

    findUserByIdAndPassword: (id, password) =>
        UserRepository
            .findUserById(id)
            .then((user) => {
                if (!user) {
                    return Promise.reject(`Unable to find user with id ${id}`);
                }
                return Bcrypt
                    .compare(password, user.password)
                    .then((found) => {
                        if (found) {
                            delete user.password;
                            return Promise.resolve(user);
                        }
                        return Promise.reject(new Error('Wrong password'));
                    });
            }),

    findUserByEmail: (email) =>
        Database
            .query(`
                    SELECT *
                    FROM User 
                    WHERE email = '${email}'
            `)
            .then((users) => {
                return users[0];
            }),

    findUserByLogin: (login) =>
        Database
            .query(`
                SELECT *
                FROM User
                WHERE email like '%${login}%'
            `)
            .then(users => users[0]),

    getUserByToken: (token) =>
        Database.query(`SELECT user_id AS id FROM Token WHERE token_value = '${token}'`)
            .then((users) => users[0]),

    findUserById: (id) =>
        Database.query(`
            SELECT user.* 
            FROM User user 
            WHERE user.id = ${id}
    `).then((users) => users[0]),

    findUserByReadableId: (id) =>
        Database.query(`
            SELECT user.* 
            FROM User user 
            WHERE replace(lower(name), ' ', '-') = '${id}'
    `).then((users) => users[0]),

    findUsersBySkill: (id) =>
        Database.query(`
            SELECT user.*, level, interested
            FROM UserSkill user_skill 
            JOIN User user ON user.id = user_skill.user_id 
            WHERE skill_id = ${id}
            AND (employee_end_date IS NULL OR employee_end_date > current_date)
            ORDER BY interested DESC, user.name
    `),

    findUserRolesById: (id) =>
        Database.query(`
            SELECT name
            FROM UserRole user_role
            JOIN Role role ON role.id = user_role.roles_id
            WHERE user_id = ${id}
        `),

    getUsers: () =>
        Database.query(`
            SELECT * 
            FROM User
            ORDER BY name
    `),

    getWebUsers: () =>
        Database.query(`
        SELECT u.id AS user_id, u.name AS user_name, u.email AS email,d.name AS domain_name, d.id AS domain_id, d.color AS domain_color, u.diploma AS diploma, SUM(level) AS domain_score
            FROM User u
            LEFT JOIN UserSkill us ON u.id = us.user_id
            LEFT JOIN Skill s ON s.id = us.skill_id
            LEFT JOIN Domain d ON d.id = s.domain_id
            WHERE employee_end_date IS NULL OR employee_end_date > current_date
            GROUP BY u.id, s.domain_id      
    `),

    getWebUsersWithRoles: (roles) =>
        Database.query(`
            SELECT u.id AS user_id, u.name AS user_name, u.email AS email,d.name AS domain_name, d.id AS domain_id, d.color AS domain_color, u.diploma AS diploma, SUM(level) AS domain_score
            FROM User u
            LEFT JOIN UserSkill us ON u.id = us.user_id
            LEFT JOIN Skill s ON s.id = us.skill_id
            LEFT JOIN Domain d ON d.id = s.domain_id
                WHERE u.id IN (SELECT DISTINCT(user_id)
                                    FROM UserRole ur
                                    JOIN Role r ON r.id = ur.roles_id
                                    WHERE r.name IN ('${roles}')
                            )
            GROUP BY u.id, s.domain_id            
        `),

    getUsersWithRoles: (roles) =>
        Database.query(`
            SELECT *
            FROM User
            WHERE id IN (SELECT DISTINCT(user_id)
                                FROM UserRole ur
                                JOIN Role r ON r.id = ur.roles_id
                                WHERE r.name IN ('${roles}')
                        )
            AND employee_end_date IS NULL OR employee_end_date > current_date
        `),

    addNewUser: (user) =>
        Bcrypt.hash(user.password, saltRounds)
            .then((hash) => {
                user.password = hash;
            })
            .then(() =>
                Database.query(`
                    INSERT INTO User (name, email, password)
                    VALUES ('${user.name}','${user.email}', '${user.password}')
            `)),

    deleteUserById: (id) =>
        Database
            .query(`DELETE FROM UserRole WHERE user_id = ${id}`)
            .then(() => Database.query(`DELETE FROM Token WHERE user_id = ${id}`))
            .then(() => Database.query(`DELETE FROM UserSkill WHERE user_id = ${id}`))
            .then(() => Database.query(`DELETE FROM User WHERE id = ${id}`)),

    updatePasswordToken: (email, token) =>
        Database.query(`
            UPDATE User
            SET password_token = '${token}'
            WHERE email = '${email}'`),

    getUserByIdAndPasswordToken: (id, passwordToken) =>
        Database.query(`SELECT id FROM User WHERE id = ${id} AND password_token = ${passwordToken}`),

    updateUserLinkedIn: (id, user) =>
        Database.query(`
            UPDATE User
            SET linked_in = '${user.linkedIn}'
            WHERE id = ${id}`),

    updateUserGithub: (id, user) =>
        Database.query(`
            UPDATE User
            SET github = '${user.github}'
            WHERE id = ${id}`),

    updateUserTwitter: (id, user) =>
        Database.query(`
            UPDATE User
            SET twitter = '${user.twitter}'
            WHERE id = ${id}`),

    updateUserDiploma: (id, user) =>
        Database.query(`
            UPDATE User
            SET diploma = '${user.diploma}'
            WHERE id = ${id}`),

    updateUserEmployeeDate: (id, user) =>
        Database.query(`
            UPDATE User
            SET employee_date = '${user.employee_date}'
            WHERE id = ${id}`),

    updateUserEmployeeEndDate: (id, user) =>
        Database.query(`
            UPDATE User
            SET employee_end_date = '${user.employee_end_date}'
            WHERE id = ${id}`),

    updateUserAvailabilityDate: (id, user) =>
        Database.query(`
            UPDATE User
            SET availability_date = '${user.availability_date}'
            WHERE id = ${id}`),

    assignManager: (userId, managerId) =>
        Database.query(`
            UPDATE User SET manager_id = ${managerId} WHERE id = ${userId}
        `),

    addRole: (user, roleName) =>
        Database.query(`SELECT DISTINCT id FROM Role WHERE name = '${roleName}'`)
            .then((roles) => Database.query(`INSERT INTO UserRole(user_id,roles_id) VALUES (${user.id}, ${roles[0].id})`)),

    addToken: (user, token) =>
        Database.query(`
            INSERT INTO Token (token_value, user_id)
            VALUES ('${token}', ${user.id})
    `),

    updatePassword: (userId, oldPassword, newPassword) =>
        UserRepository.findUserByIdAndPassword(userId, oldPassword)
            .then(() => Bcrypt.hash(newPassword, saltRounds))
            .then((hash) => newPassword = hash)
            .then(() =>
                Database.query(
                    `
                        UPDATE User
                        SET password = '${newPassword}', default_password = FALSE
                        WHERE id = ${userId}
                    `)
            ),

    changePassword: (id, password) => {
        return Bcrypt.hash(password, saltRounds)
            .then(hash => Database.query(`
                UPDATE User
                SET password = '${hash}', default_password = FALSE
                WHERE id = ${id}
            `));
    },

    updatePhone: (userId, phone) => Database.query(`UPDATE User SET phone = '${phone}' WHERE id = ${userId}`),

    updateAddress: (userId, address) => Database.query(`UPDATE User SET address = '${_.replace(JSON.stringify(address), `'`, `\\'`)}' WHERE id = ${userId}`),

    updateHome: (userId, home) => Database.query(`UPDATE User SET home = '${_.replace(JSON.stringify(home), `'`, `\\'`)}' WHERE id = ${userId}`),

    getManagement: () =>
        Database.query(`
            SELECT
              user.id      user_id,
              user.name    user_name,
              manager.id   manager_id,
              manager.name manager_name
            FROM User user
              LEFT JOIN User manager ON user.manager_id = manager.id
            WHERE (user.employee_end_date IS NULL OR user.employee_end_date > current_date)
            AND (manager.employee_end_date IS NULL OR manager.employee_end_date > current_date)
    `),

    findMatchingUsers: value =>
        Database.query(`
            SELECT *
            FROM User
            WHERE LOWER(name) like LOWER('%${value}%')
    `),

    addDefaultSkills: user => Database.query(`INSERT INTO UserSkill (user_id,skill_id) SELECT ${user.id},skill_id FROM DefaultSkill`),
};

module.exports = UserRepository;
