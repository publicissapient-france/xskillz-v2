'use strict';

const assert = require('assert');
const Database = require('../../src/database');
const API = require('./api');

describe('API', function () {
    before(() => {
        require('../../src/index');
    });
    beforeEach(() => Database.clear());
    it('should show You know, for skills :)', (done) => {
        API
            .getRoot()
            .then((res) => {
                assert.equal(res.text, 'You know, for skills :)');
            })
            .then(done)
            .catch(done);
    });

    it('get all domains', (done) => {
        // Given
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => API.addDomain('MyDomain', res.body.token))
            // When
            .then(() => API.getDomains())
            // Then
            .then((res) => {
                const domain = res.body[0];
                delete domain.id;
                assert.deepEqual(res.body, [{name: 'MyDomain', color: '#CCCCCC'}]);
            })
            .then(done)
            .catch(done);
    });

    it('get me', (done) => {
        // Given
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            // When
            .then((res) => API.getMe(res.body.token))
            // Then
            .then((res) => {
                delete res.body.id;
                assert.deepEqual(res.body, {
                    address: null,
                    domains: [],
                    experienceCounter: 0,
                    gravatarUrl: '//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc',
                    manager_id: null,
                    name: 'Julien',
                    phone: null,
                    readable_id: 'julien',
                    roles: [
                        'Manager'
                    ],
                    score: 0
                });
            })
            .then(done)
            .catch(done);
    });

    it('should delete a domain', (done) => {
        // Given
        let user;
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => user = res.body)
            .then(() => API.addDomain('MyDomain', user.token))
            .then(() => API.getDomains())
            // When
            .then((res) => API.deleteDomain(res.body[0].id, user.token))
            // Then
            .then((res) => {
                assert.deepEqual(res.body,
                    {
                        "deleted": true
                    });
            })
            .then(done)
            .catch(done);
    });

    it('should get all skills', (done) => {
        // Given
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => API.addSkill('Skill', 2, true, res.body.token))
            // When
            .then(() => API.getSkills())
            // Then
            .then((res) => {
                const skill = res.body;
                delete skill[0].id;
                assert.deepEqual(res.body,
                    [
                        {
                            domain: {
                                color: null,
                                id: null,
                                name: null
                            },
                            name: 'Skill',
                            numAllies: 1
                        }
                    ]);
                done();
            })
            .catch((err) => done(err));
    });

    it('should get users by skill', (done) => {
        // Given
        let user;
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => user = res.body)
            .then(() => API.addSkill('Skill', 2, true, user.token))
            // When
            .then((res) => API.getUsersBySkill(res.body.skill_id, user.token))
            // Then
            .then((res) => {
                const skills = res.body;
                delete skills[0].id;
                assert.deepEqual(skills,
                    [
                        {
                            address: null,
                            experienceCounter: 0,
                            gravatarUrl: "//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc",
                            interested: true,
                            level: 2,
                            manager_id: null,
                            name: 'Julien',
                            phone: null,
                            readable_id: 'julien'
                        }
                    ]);
                done();
            })
            .catch((err) => done(err));
    });

    it('should get users by skill (mobile version)', (done) => {
        // Given
        let user;
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => user = res.body)
            .then(() => API.addSkill('Skill', 2, true, user.token))
            // When
            .then((res) => API.getUsersBySkillMobileVersion(res.body.skill_id, user.token))
            // Then
            .then((res) => {
                const skills = res.body;
                delete skills[0].id;
                delete skills[0].domains[0].id;
                delete skills[0].domains[0].skills[0].id;
                assert.deepEqual(skills,
                    [
                        {
                            address: null,
                            domains: [
                                {
                                    color: 'pink',
                                    name: null,
                                    score: 2,
                                    skills: [
                                        {
                                            interested: true,
                                            level: 2,
                                            name: 'Skill'
                                        }
                                    ]
                                }
                            ],
                            experienceCounter: 0,
                            gravatarUrl: '//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc',
                            manager_id: null,
                            name: 'Julien',
                            phone: null,
                            readable_id: 'julien',
                            roles: [
                                'Manager'
                            ],
                            score: 2
                        }
                    ]);
                done();
            })
            .catch((err) => done(err));
    });


    it('should add a skill on two different users', (done) => {
        // Given
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => API.addSkill('Skill', 2, true, res.body.token))
            .then(() => API.createUser('Benjamin', 'blacroix@xebia.fr'))
            .then(() => API.signin('blacroix@xebia.fr'))
            .then((res) => API.addSkill('Skill', 1, false, res.body.token))
            .then(() => API.getSkills())
            .then((res) => {
                delete res.body[0].id;
                assert.deepEqual(res.body, [
                    {
                        "domain": {
                            color: null,
                            "id": null,
                            "name": null
                        },
                        "name": "Skill",
                        "numAllies": 2
                    }
                ]);
            })
            .then(done)
            .catch((err) => done(err));
    });

    it('should merge two skills', (done) => {
        // Given
        let user;
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => {
                user = res.body;
                return API.addSkill('Skill1', 2, true, user.token);
            })
            .then(() => API.addSkill('Skill2', 1, false, user.token))
            .then(() => API.getSkills())
            // When
            .then((res) => {
                const skillId1 = res.body[0].id;
                const skillId2 = res.body[1].id;
                return API.mergeSkills(skillId1, skillId2, user.token);
            })
            // Then
            .then((res) => {
                assert.deepEqual(res.body, {merged: true});
            })
            .then(done)
            .catch((err) => done(err));
    });

    it('should get all users', (done) => {
        let domain;
        let user;
        // Given
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => API.addDomain('MyDomain', res.body.token))
            .then((res) => {
                domain = res.body;
            })
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => {
                user = res.body;
                return API.addSkill('Skill', 2, true, user.token);
            })
            .then((res) => API.addSkillToDomain(res.body.skill_id, domain.id, user.token))
            // When
            .then(() => API.getUsers(user.token))
            // Then
            .then((res) => {
                const users = res.body;
                delete users[0].id;
                delete users[0].domains[0].id;

                assert.deepEqual(users,
                    [
                        {
                            domains: [{color: '#CCCCCC', score: 2, name: 'MyDomain'}],
                            experienceCounter: 0,
                            gravatarUrl: '//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc',
                            name: 'Julien',
                            readable_id: 'julien',
                            score: 2
                        }
                    ]);
            })
            .then(done)
            .catch(done);
    });

    it('should get all users (mobile version)', (done) => {
        let domain;
        let user;
        // Given
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => API.addDomain('MyDomain', res.body.token))
            .then((res) => {
                domain = res.body;
            })
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => {
                user = res.body;
                return API.addSkill('Skill', 2, true, user.token);
            })
            .then((res) => API.addSkillToDomain(res.body.skill_id, domain.id, user.token))
            // When
            .then(() => API.getUsersMobileVersion())
            // Then
            .then((res) => {
                const users = res.body;
                delete users[0].id;
                delete users[0].domains[0].id;
                delete users[0].domains[0].skills[0].id;

                assert.deepEqual(users,
                    [
                        {
                            address: null,
                            domains: [{
                                color: '#CCCCCC',
                                score: 2,
                                name: 'MyDomain',
                                skills: [
                                    {
                                        interested: true,
                                        level: 2,
                                        name: 'Skill'
                                    }
                                ]
                            }],
                            experienceCounter: 0,
                            gravatarUrl: '//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc',
                            name: 'Julien',
                            readable_id: 'julien',
                            score: 2,
                            manager_id: null,
                            phone: null,
                            roles: [
                                'Manager'
                            ]
                        }
                    ]);
            })
            .then(done)
            .catch(done);
    });

    it('should get user by readable id', (done) => {
        // Given
        API.createUser('Julien Smadja', 'jsmadja@xebia.fr')
            .then(() => API.signin('jsmadja@xebia.fr'))
            .then((res) => API.getUserById('julien-smadja', res.body.token))
            // Then
            .then((res) => {
                const user = res.body;
                delete user.id;
                assert.deepEqual(user,
                    {
                        address: null,
                        domains: [],
                        experienceCounter: 0,
                        gravatarUrl: '//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc',
                        manager_id: null,
                        name: 'Julien Smadja',
                        phone: null,
                        roles: [
                            'Manager'
                        ],
                        score: 0,
                        readable_id: 'julien-smadja'
                    }
                );
            })
            .then(done)
            .catch(done);
    });

    it('should get user by readable id with accent', (done) => {
        // Given
        API.createUser('Clément Smadja', 'csmadja@xebia.fr')
            .then(() => API.signin('csmadja@xebia.fr'))
            .then((res) => API.getUserById('cl%C3%A9ment-smadja', res.body.token))
            // Then
            .then((res) => {
                const user = res.body;
                delete user.id;
                assert.deepEqual(user,
                    {
                        address: null,
                        domains: [],
                        experienceCounter: 0,
                        gravatarUrl: '//www.gravatar.com/avatar/9de77282d1820886bc4bfb97570aac63',
                        manager_id: null,
                        name: 'Clément Smadja',
                        phone: null,
                        roles: [
                            'Manager'
                        ],
                        score: 0,
                        readable_id: 'clément-smadja'
                    }
                );
            })
            .then(done)
            .catch(done);
    });

    it('should get all updates', (done) => {
        // Given
        let user;
        API.createUser('Julien', 'jsmadja2@xebia.fr')
            .then(() => API.signin('jsmadja2@xebia.fr'))
            .then((res) => {
                user = res.body;
                return API.addSkill('Skill3', 2, true, user.token);
            })
            .then(() => API.addSkill('Skill4', 1, false, user.token))
            .then(() => API.getUpdates(user.token))
            .then((res) => {
                assert.deepEqual(res.body[0].updates.map((update)=>update.skill.name).sort(), ["Skill3", "Skill4"]);
            })
            .then(done)
            .catch((err) => done(err));
    });

    it('should delete an user', (done) => {
        // Given
        let user;
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(res => user = res.body)
            .then(() => API.createUser('Benjamin', 'blacroix@xebia.fr'))
            .then(() => API.signin('blacroix@xebia.fr'))
            .then((res) => API.deleteUser(user.id, res.body.token))
            .then((res) => {
                assert.deepEqual(res.body, {deleted: true});
            })
            .then(done)
            .catch((err) => done(err));
    });

    it('should assign a user', (done) => {
        // Given
        let user;
        API.createUser('Julien', 'jsmadja@xebia.fr')
            .then(res => user = res.body)
            .then(() => API.createUser('Benjamin', 'blacroix@xebia.fr'))
            .then(() => API.signin('blacroix@xebia.fr'))
            .then((res) => API.assignManager(user.id, res.body.id, res.body.token))
            .then((res) => {
                assert.deepEqual(res.body, {assigned: true});
            })
            .then(done)
            .catch((err) => done(err));
    });
});