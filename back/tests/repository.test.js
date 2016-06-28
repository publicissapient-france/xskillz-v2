'use strict';

const assert = require('assert');
const Repository = require('../src/repository');
const _ = require('lodash');

describe('Repository', () => {
    beforeEach(() => {
        return Repository.query('DELETE FROM UserSkill')
            .then(() => Repository.query('DELETE FROM User'))
            .then(() => Repository.query('DELETE FROM Skill'))
            .then(() => Repository.query('DELETE FROM Domain'))
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
            .then((skills) => {
                assert.equal(skills.length, 1);
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
            .then((users) => {
                const expected = _.filter(users, (user) => user.name === name && user.email === email);
                assert.equal(expected.length, 1);
                return users[0];
            })
            .then((user) => Repository.findUserById(user.id))
            .then((users) => {
                const expected = _.filter(users, (user) => user.name === name && user.email === email);
                assert.equal(expected.length, 1);
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
            .then((skills) => {
                skill = skills[0];
            })
            .then(() =>Repository.addNewUser({email, name}))
            .then(() => Repository.findUserByEmail(email))
            .then((users) => {
                user = users[0];
            })
            .then(() => Repository.addSkill({interested: true, level: 2, id: skill.id, user_id: user.id}))
            .then(() => Repository.findUserSkillsById(user.id))
            .then((userSkills) => {
                var userSkill = userSkills[0];
                assert.equal(userSkill.user_id, user.id);
                assert.equal(userSkill.skill_id, skill.id);
                assert.equal(userSkill.interested[0], 1);
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
            .then((skills) => {
                skill = skills[0];
            })
            .then(() =>Repository.addNewUser({email, name}))
            .then(() => Repository.findUserByEmail(email))
            .then((users) => {
                user = users[0];
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
            .then((skills) => {
                skill = skills[0];
            })
            .then(() =>Repository.addNewUser({email, name}))
            .then(() => Repository.findUserByEmail(email))
            .then((users) => {
                user = users[0];
            })
            .then(() => Repository.addSkill({interested: true, level: 2, id: skill.id, user_id: user.id}))
            .then(() => Repository.findSkillByName(skillName))
            .then((skills) => skills[0])
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
});
