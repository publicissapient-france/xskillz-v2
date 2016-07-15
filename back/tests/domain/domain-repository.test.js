'use strict';

const assert = require('assert');
const Database = require('../../src/database');
const Repository = require('../repository');
const DomainRepository = require('../../src/domain/domain-repository');

Repository.init({db: Database});
DomainRepository.init({db: Database});

describe('Domain Repository', () => {
    beforeEach(() => {
        return Repository.clear()
    });

    it('should add new domains and get it', (done) => {
        DomainRepository
            .addDomain('Agile')
            .then(() => DomainRepository.addDomain('Craft'))
            .then(() => DomainRepository.getDomains())
            .then((domains) => {
                assert.deepEqual(domains.map((domain) => domain.name), ["Agile", "Craft"]);
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
                assert.deepEqual(domains.map((domain) => domain.name), ["Agile", "Craft"]);
            })
            .then(() => DomainRepository.getDomains())
            .then((domains) => DomainRepository.deleteDomain(domains[0].id))
            .then(() => DomainRepository.getDomains())
            .then((domains) => {
                assert.deepEqual(domains.map((domain) => domain.name), ["Craft"]);
            })
            .then(done)
            .catch(done);
    });
});
