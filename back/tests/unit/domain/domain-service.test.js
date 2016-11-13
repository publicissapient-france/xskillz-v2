const sinon = require('sinon');
const assert = require('assert');

const DomainService = require('../../../src/domain/domain-service');
const SkillService = require('../../../src/skill/skill-service');
const DomainRepository = require('../../../src/domain/domain-repository');

describe('DomainService', () => {

    describe('OK', () => {
        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });
        afterEach(() => sandbox.restore());

        it('should get domains with skills', done => {
            sandbox
                .stub(DomainRepository, 'getDomainsWithSkills')
                .returns(Promise.resolve(
                    [
                        {
                            skill_id: 549,
                            skill_name: 'Guava',
                            domain_id: 9,
                            domain_name: 'Back',
                            domain_color: '#e23d27'
                        },
                        {
                            skill_id: 550,
                            skill_name: 'Amazon CF',
                            domain_id: 7,
                            domain_name: 'Cloud',
                            domain_color: '#06a99c'
                        },
                        {
                            skill_id: 552,
                            skill_name: 'Hibernate',
                            domain_id: 9,
                            domain_name: 'Back',
                            domain_color: '#e23d27'
                        }
                    ]));

            DomainService
                .getDomainsWithSkills()
                .then(domains => {
                    assert.deepEqual(domains,
                        [
                            {
                                info: {
                                    color: '#e23d27',
                                    id: 9,
                                    name: 'Back'
                                },
                                skills: [
                                    {
                                        id: 549,
                                        name: 'Guava'
                                    },
                                    {
                                        id: 552,
                                        name: 'Hibernate'
                                    }
                                ]
                            },
                            {
                                info: {
                                    color: '#06a99c',
                                    id: 7,
                                    name: 'Cloud'
                                },
                                skills: [
                                    {
                                        id: 550,
                                        name: 'Amazon CF'
                                    }
                                ]
                            }
                        ]
                    );
                })
                .then(done)
                .catch(done);
        });

        it('should get domains', done => {
            sandbox
                .stub(DomainRepository, 'getDomains')
                .returns(Promise.resolve(
                    [
                        {
                            domain_id: 9,
                            domain_name: 'Back',
                            domain_color: '#e23d27'
                        }
                    ]));

            DomainService
                .getDomains()
                .then(domains => {
                    assert.deepEqual(domains,
                        [
                            {
                                domain_id: 9,
                                domain_name: 'Back',
                                domain_color: '#e23d27'
                            }
                        ]
                    );
                })
                .then(done)
                .catch(done);
        });

        it('should delete a domain', done => {
            sandbox
                .stub(SkillService, 'removeDomainFromSkills')
                .returns(Promise.resolve());

            const deleteDomain = sandbox
                .stub(DomainRepository, 'deleteDomain')
                .returns(Promise.resolve());

            DomainService
                .deleteDomain(5)
                .then(() => {
                    sinon.assert.calledWith(deleteDomain, 5);
                })
                .then(done)
                .catch(done);
        });

    });
});