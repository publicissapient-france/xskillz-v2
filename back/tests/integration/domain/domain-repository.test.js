'use strict';

const assert = require('assert');
const DomainRepository = require('../../../src/domain/domain-repository');
const Database = require('../../../src/database');
const SkillRepository = require('../../../src/skill/skill-repository');

describe('Domain Repository', () => {
    beforeEach(() => {
        return Database.clear();
    });

    it('should add new domains and get it', (done) => {
        DomainRepository
            .addDomain('Agile')
            .then(() => DomainRepository.addDomain('Craft'))
            .then(() => DomainRepository.getDomains())
            .then((domains) => {
                assert.deepEqual(domains.map((domain) => domain.name), ['Agile', 'Craft']);
            })
            .then(done)
            .catch(done);
    });

    it('should get domains with skills', (done) => {
        let domainId;

        DomainRepository
            .addDomain('Agile')
            .then(() => DomainRepository.addDomain('Craft'))
            .then(() => DomainRepository.findDomainByName('Craft'))
            .then((domain) => domainId = domain.id)
            .then(() => SkillRepository.addNewSkill('Java'))
            .then(() => SkillRepository.findSkillByName('Java'))
            .then((skill) => SkillRepository.addSkillToDomain(domainId, skill.id))
            .then(() => DomainRepository.getDomainsWithSkills())
            .then((domains) => {
                delete domains[0].domain_id;
                delete domains[0].skill_id;
                assert.deepEqual(domains,
                    [
                        {
                            domain_color: '#CCCCCC',
                            domain_name: 'Craft',
                            skill_name: 'Java'
                        }
                    ]);
            })
            .then(done)
            .catch(done);
    });

    it('should delete domain ', (done) => {
        DomainRepository
            .addDomain('Agile')
            .then(() => DomainRepository.addDomain('Craft'))
            .then(() => DomainRepository.getDomains())
            .then((domains) => {
                assert.deepEqual(domains.map((domain) => domain.name), ['Agile', 'Craft']);
            })
            .then(() => DomainRepository.getDomains())
            .then((domains) => DomainRepository.deleteDomain(domains[0].id))
            .then(() => DomainRepository.getDomains())
            .then((domains) => {
                assert.deepEqual(domains.map((domain) => domain.name), ['Craft']);
            })
            .then(done)
            .catch(done);
    });
});
