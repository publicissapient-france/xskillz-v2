'use strict';

var Mysql = require('mysql');
const Promise = require('bluebird');
const log = require('winston');

const connection = Mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    debug: false
});
connection.connect();

const Database = {
    query: (sql, values) => {
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
    }
};

module.exports = Database;