'use strict';

const Database = require('../database');
const DomainRepository = {
    addDomain: (name, color = '#CCCCCC') =>
        Database.query(`
            INSERT INTO Domain(name, color) 
            VALUES ('${name}', '${color}')
    `),

    findDomainByName: (name) =>
        Database.query(`
            SELECT *
            FROM Domain
            WHERE name = '${name}'
        `).then((domains) => domains[0]),

    getDomains: () =>
        Database.query(`
            SELECT * 
            FROM Domain
            ORDER BY name ASC
    `),

    deleteDomain: (id) =>
        Database.query(`
            DELETE FROM Domain
            WHERE id = ${id}
        `)
};
module.exports = DomainRepository;
