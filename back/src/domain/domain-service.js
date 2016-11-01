'use strict';

const DomainRepository = require('./domain-repository');
const SkillService = require('../skill/skill-service');
module.exports = {
    getDomains: () =>
        DomainRepository
            .getDomains(),

    addDomain: (name, color) =>
        DomainRepository
            .addDomain(name, color)
            .then(() => DomainRepository.findDomainByName(name)),

    deleteDomain: (id) =>
        SkillService
            .removeDomainFromSkills(id)
            .then(() => DomainRepository.deleteDomain(id))
};