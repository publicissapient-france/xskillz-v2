'use strict';

require('require-json');
const skills = require('./skills.json');

const toSql = (result) => {
    var name = result.row[0];
    const domains = result.row[1];
    if(domains) {
        const domainName = domains[0];
        console.log(`INSERT INTO Skill (name, domain_id) VALUES ('${name}', (SELECT id FROM Domain WHERE name = '${domainName}'));`);
    } else {
        console.log(`INSERT INTO Skill (name) VALUES ('${name}');`);
    }
};

skills.table._response.data.forEach(toSql);
