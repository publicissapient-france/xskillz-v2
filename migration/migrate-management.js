'use strict';

require('require-json');
const managers = require('./management.json');

const toSql = (result) => {
    const manager = result.row[0];
    const managed = result.row[1];
    console.log(`UPDATE User SET manager_id = (SELECT id FROM (SELECT * FROM User) as Something WHERE email = '${manager}') WHERE email = '${managed}';`);
};

managers.table._response.data.forEach(toSql);
