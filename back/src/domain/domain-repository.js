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

    getDomainsWithSkills: () =>
        Database.query(`
            SELECT
              skill.id    skill_id,
              skill.name  skill_name,
              domain.id   domain_id,
              domain.name domain_name,
              color       domain_color
            FROM Skill skill LEFT JOIN Domain domain ON domain.id = skill.domain_id
    `),

    deleteDomain: (id) =>
        Database.query(`
            DELETE FROM Domain
            WHERE id = ${id}
        `)
};
module.exports = DomainRepository;
