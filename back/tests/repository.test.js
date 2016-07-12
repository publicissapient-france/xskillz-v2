'use strict';

const assert = require('assert');
const Repository = require('../src/repository');
const _ = require('lodash');

describe('Repository', () => {
    beforeEach(() => {
        return Repository.clear()
    });

    it('should add new domains and get it', (done) => {
        Repository
            .addDomain('Agile')
            .then(() => Repository.addDomain('Craft'))
            .then(() => Repository.getDomains())
            .then((domains) => {
                assert.deepEqual(domains.map((domain) => domain.name), ["Agile", "Craft"]);
            })
            .then(done)
            .catch(done);
    });

    it('should delete domain ', (done) => {
        Repository
            .addDomain('Agile')
            .then(() => Repository.addDomain('Craft'))
            .then(() => Repository.getDomains())
            .then((domains) => {
                assert.deepEqual(domains.map((domain) => domain.name), ["Agile", "Craft"]);
            })
            .then(() => Repository.getDomains())
            .then((domains) => Repository.deleteDomain(domains[0].id))
            .then(() => Repository.getDomains())
            .then((domains) => {
                assert.deepEqual(domains.map((domain) => domain.name), ["Craft"]);
            })
            .then(done)
            .catch(done);
    });

    it('should add new skill and get it', (done) => {
        const skillName = 'skill';
        Repository
            .addNewSkill(skillName)
            .then(() => Repository.getSkills())
            .then((skills) => {
                const expected = _.filter(skills, (skill) => skill.name === skillName);
                assert.equal(expected.length, 1);
            })
            .then(done)
            .catch(done);
    });

    it('should add new skill and find it by name', (done) => {
        const skillName = 'skill';
        Repository
            .addNewSkill(skillName)
            .then(() => Repository.findSkillByName(skillName))
            .then((skill) => {
                assert.equal(skill.name, skillName);
            })
            .then(done)
            .catch(done);
    });

    it('should add new user and get it', (done) => {
        const email = 'email';
        const name = 'name';
        Repository
            .addNewUser({email, name})
            .then(() => Repository.getUsers())
            .then((users) => {
                const expected = _.filter(users, (user) => user.name === name && user.email === email);
                assert.equal(expected.length, 1);
            })
            .then(done)
            .catch(done);
    });

    it('should add new user and find it by email and by id', (done) => {
        const email = 'email';
        const name = 'name';
        Repository
            .addNewUser({email, name})
            .then(() => Repository.findUserByEmail(email))
            .then((user) => Repository.findUserById(user.id))
            .then((user) => {
                assert.equal(user.name, name);
                assert.equal(user.email, email);
            })
            .then(done)
            .catch(done);
    });

    it('should create a new user, a new skill and assign it', (done) => {
        const email = 'email';
        const name = 'name';
        const skillName = 'skill';

        let user, skill;

        Repository
            .addNewSkill(skillName)
            .then(() => Repository.findSkillByName(skillName))
            .then((_skill) => {
                skill = _skill;
            })
            .then(() =>Repository.addNewUser({email, name}))
            .then(() => Repository.findUserByEmail(email))
            .then((_user) => {
                user = _user;
            })
            .then(() => Repository.addSkill({interested: true, level: 2, id: skill.id, user_id: user.id}))
            .then(() => Repository.findUserSkillsById(user.id))
            .then((userSkills) => {
                var userSkill = userSkills[0];
                assert.equal(userSkill.user_id, user.id);
                assert.equal(userSkill.skill_id, skill.id);
                assert.equal(userSkill.interested, true);
                assert.equal(userSkill.level, 2);
            })
            .then(done)
            .catch(done);
    });

    it('should create a new user, a new skill and assign it and get updates', (done) => {
        const email = 'email';
        const name = 'name';
        const skillName = 'skill';

        let user, skill;

        Repository
            .addNewSkill(skillName)
            .then(() => Repository.findSkillByName(skillName))
            .then((_skill) => {
                skill = _skill;
            })
            .then(() =>Repository.addNewUser({email, name}))
            .then(() => Repository.findUserByEmail(email))
            .then((_user) => {
                user = _user;
            })
            .then(() => Repository.addSkill({interested: true, level: 2, id: skill.id, user_id: user.id}))
            .then(() => Repository.getUpdates())
            .then((updates) => {
                assert.deepEqual(_.pick(updates[0], ['skill_level', 'skill_name', 'user_email', 'user_name']),
                    {
                        "skill_level": 2,
                        "skill_name": "skill",
                        "user_email": "email",
                        "user_name": "name"
                    }
                );
            })
            .then(done)
            .catch(done);
    });

    it('should create a new user, a new skill and assign it and get user by skill', (done) => {
        const email = 'email';
        const name = 'name';
        const skillName = 'skill';

        let user, skill;

        Repository
            .addNewSkill(skillName)
            .then(() => Repository.findSkillByName(skillName))
            .then((_skill) => {
                skill = _skill;
            })
            .then(() =>Repository.addNewUser({email, name}))
            .then(() => Repository.findUserByEmail(email))
            .then((_user) => {
                user = _user;
            })
            .then(() => Repository.addSkill({interested: true, level: 2, id: skill.id, user_id: user.id}))
            .then(() => Repository.findSkillByName(skillName))
            .then((skill) => Repository.findUsersBySkill(skill.id))
            .then((users) => {
                assert.deepEqual(_.pick(users[0], ['name', 'email']),
                    {
                        email: "email",
                        name: "name"
                    }
                );
            })
            .then(done)
            .catch(done);
    });

    it('should merge two skills', (done) => {
        const email = 'email';
        const name = 'name';
        const skillName1 = 'skill1';
        const skillName2 = 'skill2';

        let user, skill1, skill2;

        Repository
            .addNewUser({email, name})
            .then(() => Repository.findUserByEmail(email))
            .then((_user) => user = _user)
            .then(() => Repository.addNewSkill(skillName1))
            .then(() => Repository.addNewSkill(skillName2))
            .then(() => Repository.findSkillByName(skillName1))
            .then((skill) => {
                skill1 = skill;
                return Repository.addSkill({id: skill.id, interested: true, level: 2, user_id: user.id})
            })
            .then(() => Repository.findSkillByName(skillName2))
            .then((skill) => {
                skill2 = skill;
                return Repository.addSkill({id: skill.id, interested: false, level: 1, user_id: user.id})
            })
            .then(() => Repository.findUserSkillsById(user.id))
            .then((userSkills) => {
                assert.deepEqual(userSkills.map((userSkill) => userSkill.skill_name), ["skill1", "skill2"]);
            })
            .then(() => Repository.mergeSkills(skill1.id, skill2.id))
            .then(() => Repository.findUserSkillsById(user.id))
            .then((userSkills) => {
                assert.deepEqual(userSkills.map((userSkill) => {
                    return {name: userSkill.skill_name, level: userSkill.level}
                }), [
                    {
                        "level": 2,
                        "name": "skill2"
                    },
                    {
                        "level": 1,
                        "name": "skill2"
                    }
                ]);
            })
            .then(done)
            .catch(done);
    });

    it('should delete user', (done) => {
        const email = 'email';
        const name = 'name';
        const skillName1 = 'skill1';

        let user, skill1;

        Repository
            .addNewUser({email, name})
            .then(() => Repository.findUserByEmail(email))
            .then((_user) => user = _user)
            .then(() => Repository.addNewSkill(skillName1))
            .then(() => Repository.findSkillByName(skillName1))
            .then((skill) => {
                skill1 = skill;
                return Repository.addSkill({id: skill.id, interested: true, level: 2, user_id: user.id})
            })
            .then(() => Repository.findUserSkillsById(user.id))
            .then((userSkills) => {
                assert.deepEqual(userSkills.map((userSkill) => userSkill.skill_name), ["skill1"]);
            })
            .then(() => Repository.deleteUserById(user.id))
            .then(() => Repository.findUserByEmail(email))
            .then((user) => {
                assert.equal(user, undefined);
            })
            .then(done)
            .catch(done);
    });

    it('should update user', (done) => {
        const email = 'email';
        const name = 'name';
        Repository
            .addNewUser({email, name})
            .then(() => Repository.findUserByEmail(email))
            .then((user) => Repository.updateUser(user.id, {diploma: '2015-01-01'}))
            .then(() => Repository.findUserByEmail(email))
            .then((user) => {
                assert.equal(user.diploma.toISOString(), '2014-12-31T23:00:00.000Z');
            })
            .then(done)
            .catch(done);
    });

    it('should remove skill from domain', (done) => {
        let domain, skill;
        Repository
            .addDomain('Agile')
            .then(() => Repository.getDomains())
            .then((domains) => {
                domain = domains[0];
            })
            .then(() => Repository.addNewSkill('skill'))
            .then(() => Repository.getSkills())
            .then((skills) => {
                skill = skills[0];
                return Repository.addSkillToDomain(domain.id, skill.id)
            })
            .then(() => Repository.findSkillByName(skill.name))
            .then((skill) => {
                assert.equal(skill.domain_id, domain.id);
            })
            .then(() => Repository.removeDomainFromSkills(domain.id))
            .then(() => Repository.findSkillByName(skill.name))
            .then((skill) => {
                assert.equal(skill.domain_id, null);
            })
            .then(done)
            .catch(done);
    });
    
    it('should get user by token and email', (done) => {
        const email = 'email';
        const name = 'name';
        Repository
            .addNewUser({email, name})
            .then(() => Repository.findUserByEmail(email))
            .then((user) => {
                Repository.TOKENS['abcdef'] = user;
            })
            .then(() => Repository.findUserByEmailAndToken(email, 'abcdef'))
            .then((user) => {
                assert.equal(user.email, email);
            })
            .then(done)
            .catch(done);
    });
    
    it('should return managers', (done) => {
        const email = 'email';
        const name = 'name';
        Repository
            .addNewUser({email, name})
            .then(() => Repository.findUserByEmail(email))
            .then((user) => Repository.addRole(user, 'Manager'))
            .then(() => Repository.getUsersWithRoles('Manager'))
            .then((users) => {
                assert.equal(users[0].email, email);
            })
            .then(done)
            .catch(done);
    });
});
