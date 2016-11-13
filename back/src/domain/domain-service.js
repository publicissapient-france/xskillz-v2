'use strict';

const DomainRepository = require('./domain-repository');
const SkillService = require('../skill/skill-service');
const _ = require('lodash');

module.exports = {
    getDomains: () =>
        DomainRepository
            .getDomains(),

    getDomainsWithSkills: () =>
        DomainRepository
            .getDomainsWithSkills()
            .then((skills) => {
                return _(skills)
                    .groupBy((skill) => skill.domain_name)
                    .map((domain) => {
                        return {
                            info: {
                                name: domain[0].domain_name || 'Sans Domaine',
                                color: domain[0].domain_color,
                                id: domain[0].domain_id
                            },
                            skills: _(domain)
                                .map(skills => ({name: skills.skill_name, id: skills.skill_id}))
                                .sortBy(skill => skill.name.toLowerCase())
                                .value()
                        };
                    })
                    .sortBy(domain => domain.info.name)
                    .value();
            }),

    addDomain: (name, color) =>
        DomainRepository
            .addDomain(name, color)
            .then(() => DomainRepository.findDomainByName(name)),

    deleteDomain: id =>
        SkillService
            .removeDomainFromSkills(id)
            .then(() => DomainRepository.deleteDomain(id))
};