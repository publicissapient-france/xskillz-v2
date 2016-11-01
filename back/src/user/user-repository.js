'use strict';

const Promise = require('bluebird');
const Bcrypt = require('bcrypt-then');
const saltRounds = 10;

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

    getUserByToken: (token) =>
        Database.query(`SELECT user_id AS id FROM Token WHERE token_value = '${token}'`)
            .then((users) => users[0]),

    findUserById: (id) =>
        Database.query(`
            SELECT user.* 
            FROM User user 
            WHERE user.id = ${id}
    `).then((users) => users[0]),

    findUsersBySkill: (id) =>
        Database.query(`
            SELECT user.*, level, interested
            FROM UserSkill user_skill 
            JOIN User user ON user.id = user_skill.user_id 
            WHERE skill_id = ${id}
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
        FROM UserSkill us
        JOIN Skill s ON s.id = us.skill_id
        JOIN Domain d ON d.id = s.domain_id
        JOIN User u ON u.id = us.user_id
        GROUP BY us.user_id, s.domain_id
    `),

    getWebUsersWithRoles: (roles) =>
        Database.query(`
            SELECT u.id AS user_id, u.name AS user_name, u.email AS email,d.name AS domain_name, d.id AS domain_id, d.color AS domain_color, u.diploma AS diploma, SUM(level) AS domain_score
            FROM UserSkill us
            JOIN Skill s ON s.id = us.skill_id
            JOIN Domain d ON d.id = s.domain_id
            JOIN User u ON u.id = us.user_id
                WHERE user_id IN (SELECT DISTINCT(user_id)
                                    FROM UserRole ur
                                    JOIN Role r ON r.id = ur.roles_id
                                    WHERE r.name IN ('${roles}')
                            )
            GROUP BY us.user_id, s.domain_id            
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
        Database.query(`DELETE FROM UserRole WHERE User_id = ${id}`).then(() =>
            Database.query(`DELETE FROM UserSkill WHERE user_id = ${id}`)).then(() =>
            Database.query(`DELETE FROM User WHERE id = ${id}`)),

    updateUser: (id, user) =>
        Database.query(`
            UPDATE User
            SET diploma = '${user.diploma}'
            WHERE id = ${id}`),

    assignManager: (userId, managerId) =>
        Database.query(`
            UPDATE User SET manager_id = ${managerId} WHERE id = ${userId}
        `),

    addRole: (user, roleName) =>
        Database.query(`SELECT DISTINCT id FROM Role WHERE name = '${roleName}'`)
            .then((roles) => Database.query(`INSERT INTO UserRole(User_id,roles_id) VALUES (${user.id}, ${roles[0].id})`)),

    getUpdates: () =>
        Database.query(`
            SELECT domain.color, domain.id domain_id, domain.name domain_name, user.diploma user_diploma, user.email user_email, user.id user_id, user.name user_name, skill.id skill_id, user_skill.interested skill_interested, user_skill.level skill_level, skill.name skill_name, user_skill.updatedAt skill_date, user_skill.id user_skill_id
            FROM UserSkill user_skill
                JOIN User user ON user_skill.user_id = user.id
                JOIN Skill skill ON skill.id = user_skill.skill_id
                LEFT JOIN Domain domain ON domain.id = skill.domain_id
            ORDER BY user_skill.updatedAt DESC, domain_name
            LIMIT 20
    `),

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
                        SET password = '${newPassword}'
                        WHERE id = ${userId}
                    `)
            ),

    updatePhone: (userId, phone) => Database.query(`UPDATE User SET phone = '${phone}' WHERE id = ${userId}`),

    getManagement: () =>
        Database.query(`
            SELECT
              user.id      user_id,
              user.name    user_name,
              manager.id   manager_id,
              manager.name manager_name
            FROM User user
              LEFT JOIN User manager ON user.manager_id = manager.id
    `)
};

module.exports = UserRepository;
