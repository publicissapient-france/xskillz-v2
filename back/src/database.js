'use strict';

const Mysql = require('mysql');
const Promise = require('bluebird');
const log = require('winston');

const connection = Mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    port: process.env.RDS_PORT,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    debug: false
});
connection.connect();

const query = (sql, values) => {
    if (connection.debug) {
        console.log(sql);
    }
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

const Database = {
    clear: () =>
        query('DELETE FROM UserSkill')
            .then(() => query('DELETE FROM Token'))
            .then(() => query('DELETE FROM UserSkill'))
            .then(() => query('DELETE FROM UserRole'))
            .then(() => query('DELETE FROM User'))
            .then(() => query('DELETE FROM Skill'))
            .then(() => query('DELETE FROM Domain')),
    query
};

module.exports = Database;