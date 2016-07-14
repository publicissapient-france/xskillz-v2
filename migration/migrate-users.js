'use strict';

require('require-json');
const users = require('./users.json');

const toSql = (result) => {
    const email = result.row[0];
    const name = result.row[1];
    const diploma = result.row[2];
    if(diploma) {
        console.log(`INSERT INTO User (email, name, password, diploma) VALUES ('${email}', '${name}', 'password', '${diploma}-01-01');`);
    } else {
        console.log(`INSERT INTO User (email, name, password) VALUES ('${email}', '${name}', 'password');`);
    }
};

users.table._response.data.forEach(toSql);
