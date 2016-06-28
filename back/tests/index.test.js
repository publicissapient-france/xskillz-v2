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
        return Repository.query('DELETE FROM UserSkill')
            .then(() => Repository.query('DELETE FROM User'))
            .then(() => Repository.query('DELETE FROM Skill'))
            .then(() => Repository.query('DELETE FROM Domain'))
    });
    it('/', (done) =>
        request
            .get(`${host}/`)
            .end((err, res) => {
                if (err) return done(err);
                assert.equal(res.text, 'You know, for skills :)');
                done();
            }));

    it('/domains', (done) => {
        // Given
        addDomain('MyDomain')
        // When
            .then(() => getDomains())
            // Then
            .then((res) => {
                const domain = res.body;
                delete domain.id;
                assert.deepEqual(res.body, {name: 'MyDomain'});
                done();
            });
    });

    it('/skills', (done) => {
        // Given
        createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => signin('jsmadja@xebia.fr'))
            .then((res) => addSkill('Skill', 2, true, res.body.id))
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

    it('/users/:id', (done) => {
        let domain;
        // Given
        createUser('Julien', 'jsmadja@xebia.fr')
            .then(() => addDomain('MyDomain'))
            .then((res) => {
                domain = res.body;
            })
            .then(() => signin('jsmadja@xebia.fr'))
            .then((res) => addSkill('Skill', 2, true, res.body.id))
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
                            "score": 2
                        }
                    ]);
                done();
            })
            .catch((err) => done(err));
    });

    const createUser = (name, email) =>
        request
            .post(`${host}/users`)
            .send({name, email})
            .end((err, res) => {
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
            .send({email: 'jsmadja@xebia.fr'})
            .end((err, res) => {
                if (err) Promise.reject(err);
            });

    const addSkill = (name, level, interested, user_id) =>
        request
            .post(`${host}/skills`)
            .send({name, level, interested, user_id})
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

    const getDomains = () =>
        request
            .get(`${host}/domains`)
            .end((err) => {
                if (err) Promise.reject(err);
            });

    const addSkillToDomain = (skill_id, domain_id) =>
        request
            .post(`${host}/domains/${domain_id}/skills`)
            .send({skill_id})
            .end((err) => {
                if (err) return Promise.reject(err);
            });
});