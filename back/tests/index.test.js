'use strict';

var Promise = this.Promise || require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);
const assert = require('assert');
const Repository = require('../src/repository');

const host = 'localhost:8080';

describe('API', function () {
    before(() => {
        require('../src/index');
    });
    beforeEach(() => {
        return Repository.clear();
    });
    it('GET /', (done) =>
        request
            .get(`${host}/`)
            .end((err, res) => {
                if (err) return done(err);
                assert.equal(res.text, 'You know, for skills :)');
                done();
            }));

    it('GET /domains', (done) => {
        // Given
        addDomain('MyDomain')
        // When
            .then(() => getDomains())
            // Then
            .then((res) => {
                const domain = res.body[0];
                delete domain.id;
                assert.deepEqual(res.body, [{name: 'MyDomain', color: '#CCCCCC'}]);
            })
            .then(done)
            .catch(done);
    });

    it('DELETE /domains/:id', (done) => {
        // Given
        addDomain('MyDomain')
            .then(() => getDomains())
            // When
            .then((res) => deleteDomain(res.body[0].id))
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

    it('GET /skills', (done) => {
        // Given
        createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => signin('jsmadja@xebia.fr'))
            .then((res) => addSkill('Skill', 2, true, res.body.token))
            // When
            .then(() => getSkills())
            // Then
            .then((res) => {
                const skill = res.body;
                delete skill[0].id;
                assert.deepEqual(res.body,
                    [
                        {
                            domain: {
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

    it('POST /skills', (done) => {
        // Given
        createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => signin('jsmadja@xebia.fr'))
            .then((res) => addSkill('Skill', 2, true, res.body.token))
            .then(() => createUser('Benjamin', 'blacroix@xebia.fr'))
            .then(() => signin('jsmadja@xebia.fr'))
            .then((res) => addSkill('Skill', 1, false, res.body.token))
            .then(() => getSkills())
            .then((res) => {
                delete res.body[0].id;
                assert.deepEqual(res.body, [
                    {
                        "domain": {
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

    it('PUT /skills', (done) => {
        // Given
        let user;
        createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => signin('jsmadja@xebia.fr'))
            .then((res) => {
                user = res.body;
                return addSkill('Skill1', 2, true, user.token)
            })
            .then((res) => addSkill('Skill2', 1, false, user.token))
            .then(() => getSkills())
            // When
            .then((res) => {
                const skillId1 = res.body[0].id;
                const skillId2 = res.body[1].id;
                return mergeSkills(skillId1, skillId2);
            })
            // Then
            .then((res) => {
                assert.deepEqual(res.body, {merged: true});
            })
            .then(done)
            .catch((err) => done(err));
    });

    it('GET /users', (done) => {
        let domain;
        // Given
        createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => addDomain('MyDomain'))
            .then((res) => {
                domain = res.body;
            })
            .then(() => signin('jsmadja@xebia.fr'))
            .then((res) => addSkill('Skill', 2, true, res.body.token))
            .then((res) => addSkillToDomain(res.body.skill_id, domain.id))
            // When
            .then(() => getUsers())
            // Then
            .then((res) => {
                const users = res.body;
                delete users[0].domains[0].id;
                delete users[0].domains[0].skills[0].id;
                delete users[0].id;

                assert.deepEqual(users,
                    [
                        {
                            "domains": [
                                {
                                    "name": "MyDomain",
                                    "score": 2,
                                    "skills": [
                                        {
                                            "interested": true,
                                            "level": 2,
                                            "name": "Skill"
                                        }
                                    ]
                                }
                            ],
                            "experienceCounter": 46,
                            "gravatarUrl": "//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc",
                            "name": "Julien",
                            "score": 2,
                            "roles": [
                                "Manager"
                            ]
                        }
                    ]);
                done();
            })
            .catch((err) => done(err));
    });

    it('GET /updates', (done) => {
        // Given
        let user;
        createUser('Julien', 'jsmadja2@xebia.fr')
            .then(() => signin('jsmadja2@xebia.fr'))
            .then((res) => {
                user = res.body;
                return addSkill('Skill3', 2, true, user.token)
            })
            .then((res) => addSkill('Skill4', 1, false, user.token))
            .then(() => getUpdates())
            .then((res) => {
                assert.deepEqual(res.body[0].updates.map((update)=>update.skill.name), ["Skill3", "Skill4"]);
            })
            .then(done)
            .catch((err) => done(err));
    });

    const createUser = (name, email) =>
        request
            .post(`${host}/users`)
            .send({name, email, password: 'azerty'})
            .end((err) => {
                if (err) Promise.reject(err);
            });

    const getUsers = (name, email) =>
        request
            .get(`${host}/users`)
            .end((err) => {
                if (err) Promise.reject(err);
            });

    const signin = (email) =>
        request.post(`${host}/signin`)
            .send({email, password: 'azerty'})
            .end((err) => {
                if (err) Promise.reject(err);
            });

    const addSkill = (name, level, interested, token) =>
        request
            .post(`${host}/me/skills`)
            .set('token', token)
            .send({name, level, interested})
            .end((err) => {
                if (err) Promise.reject(err);
            });

    const getSkills = () =>
        request
            .get(`${host}/skills`)
            .end((err) => {
                if (err) Promise.reject(err);
            });

    const addDomain = (name) =>
        request
            .post(`${host}/domains`)
            .send({name})
            .end((err) => {
                if (err) Promise.reject(err);
            });

    const deleteDomain = (id) =>
        request
            .del(`${host}/domains/${id}`)
            .end((err) => {
                if (err) Promise.reject(err);
            });

    const getDomains = () =>
        request
            .get(`${host}/domains`)
            .end((err) => {
                if (err) Promise.reject(err);
            });

    const addSkillToDomain = (id, domain_id) =>
        request
            .post(`${host}/domains/${domain_id}/skills`)
            .send({id})
            .end((err) => {
                if (err) return Promise.reject(err);
            });

    const mergeSkills = (from, to) =>
        request
            .put(`${host}/skills`)
            .send({from, to})
            .end((err) => {
                if (err) return Promise.reject(err);
            });

    const getUpdates = () =>
        request
            .get(`${host}/updates`)
            .end((err) => {
                if (err) return Promise.reject(err);
            });
});