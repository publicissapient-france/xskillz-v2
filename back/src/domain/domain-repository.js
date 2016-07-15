'use strict';

const DomainRepository = {
    init: (args) => {
        this.db = args.db;
    },

    //-- Domains
    addDomain: (name, color = '#CCCCCC') =>
        this.db.query(`
            INSERT INTO Domain(name, color) 
            VALUES ('${name}', '${color}')
    `),

    findDomainByName: (name) =>
        this.db.query(`
            SELECT *
            FROM Domain
            WHERE name = '${name}'
        `).then((domains) => domains[0]),

    getDomains: () =>
        this.db.query(`
            SELECT * 
            FROM Domain
            ORDER BY name ASC
    `),

    deleteDomain: (id) =>
        this.db.query(`
            DELETE FROM Domain
            WHERE id = ${id}
        `)
};

module.exports = DomainRepository;
