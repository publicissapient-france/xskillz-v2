'use strict';

require('require-json');
const managers = require('./management.json');

const toSql = (result) => {
    const manager = result.row[0];
    console.log(`INSERT INTO UserRole (User_id,roles_id) VALUES ((SELECT id FROM User WHERE email = '${manager}'),1);`);
};

managers.table._response.data.forEach(toSql);
