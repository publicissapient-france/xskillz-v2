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
                    default_password: false,
                    experienceCounter: 0,
                    gravatarUrl: '//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc',
                    manager_id: null,
                    name: 'Julien',
                    phone: null,
                    readable_id: 'julien',
                    roles: [
                        'Manager'
                    ],
                    score: 0,
                    seniority: 0,
                    availability_date: null,
                    diploma: null,
                    employee_date: null,
                    home: null,
                    twitter: null,
                    github: null,
                    linked_in: null
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
                            readable_id: 'julien',
                            seniority: 0,
                            availability_date: null,
                            diploma: undefined,
                            employee_date: undefined,
                            home: null,
                            twitter: null,
                            linked_in: null,
                            github: null
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
                            score: 2,
                            seniority: 0,
                            availability_date: null,
                            diploma: null,
                            employee_date: null,
                            home: null,
                            twitter: null,
                            github: null,
                            linked_in: null
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
                            score: 2,
                            seniority: 0,
                            address: null,
                            diploma: null,
                            home: null
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
                            seniority: 0,
                            manager_id: null,
                            phone: null,
                            roles: [
                                'Manager'
                            ],
                            availability_date: null,
                            diploma: null,
                            employee_date: null,
                            home: null,
                            github: null,
                            linked_in: null,
                            twitter: null
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
                        readable_id: 'julien-smadja',
                        seniority: 0,
                        availability_date: null,
                        diploma: null,
                        employee_date: null,
                        home: null,
                        twitter: null,
                        github: null,
                        linked_in: null
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
                        readable_id: 'clément-smadja',
                        seniority: 0,
                        availability_date: null,
                        diploma: null,
                        employee_date: null,
                        home: null,
                        twitter: null,
                        github: null,
                        linked_in: null
                    }
                );
            })
            .then(done)
            .catch(done);
    });
});