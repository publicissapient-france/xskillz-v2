'use strict';

const assert = require('assert');
const Database = require('../../src/database');
const Repository = require('../repository');
const SkillRepository = require('../../src/skill/skill-repository');
const UserRepository = require('../../src/user/user-repository');
const _ = require('lodash');

Repository.init({db: Database});
SkillRepository.init({db: Database});
UserRepository.init({db: Database});

describe('User Repository', () => {
    beforeEach(() => {
        return Repository.clear()
    });

    it('should add new user and get it', (done) => {
        const email = 'email';
        const name = 'name';
        const password = 'password';
        UserRepository
            .addNewUser({email, name, password})
            .then(() => UserRepository.getUsers())
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
        const password = 'password';
        UserRepository
            .addNewUser({email, name, password})
            .then(() => UserRepository.findUserByEmail(email))
            .then((user) => UserRepository.findUserById(user.id))
            .then((user) => {
                assert.equal(user.name, name);
                assert.equal(user.email, email);
            })
            .then(done)
            .catch(done);
    });
    
    it('should create a new user, a new skill and assign it and get updates', (done) => {
        const email = 'email';
        const name = 'name';
        const password = 'password';
        const skillName = 'skill';

        let user, skill;

        SkillRepository
            .addNewSkill(skillName)
            .then(() => SkillRepository.findSkillByName(skillName))
            .then((_skill) => {
                skill = _skill;
            })
            .then(() => UserRepository.addNewUser({email, name, password}))
            .then(() => UserRepository.findUserByEmail(email))
            .then((_user) => {
                user = _user;
            })
            .then(() => SkillRepository.addSkill({interested: true, level: 2, id: skill.id, user_id: user.id}))
            .then(() => UserRepository.getUpdates())
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
        const password = 'password';
        const skillName = 'skill';

        let user, skill;

        SkillRepository
            .addNewSkill(skillName)
            .then(() => SkillRepository.findSkillByName(skillName))
            .then((_skill) => {
                skill = _skill;
            })
            .then(() => UserRepository.addNewUser({email, name, password}))
            .then(() => UserRepository.findUserByEmail(email))
            .then((_user) => {
                user = _user;
            })
            .then(() => SkillRepository.addSkill({interested: true, level: 2, id: skill.id, user_id: user.id}))
            .then(() => SkillRepository.findSkillByName(skillName))
            .then((skill) => UserRepository.findUsersBySkill(skill.id))
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

    it('should delete user', (done) => {
        const email = 'email';
        const name = 'name';
        const password = 'password';
        const skillName1 = 'skill1';

        let user, skill1;

        UserRepository
            .addNewUser({email, name, password})
            .then(() => UserRepository.findUserByEmail(email))
            .then((_user) => user = _user)
            .then(() => SkillRepository.addNewSkill(skillName1))
            .then(() => SkillRepository.findSkillByName(skillName1))
            .then((skill) => {
                skill1 = skill;
                return SkillRepository.addSkill({id: skill.id, interested: true, level: 2, user_id: user.id})
            })
            .then(() => SkillRepository.findUserSkillsById(user.id))
            .then((userSkills) => {
                assert.deepEqual(userSkills.map((userSkill) => userSkill.skill_name), ["skill1"]);
            })
            .then(() => UserRepository.deleteUserById(user.id))
            .then(() => UserRepository.findUserByEmail(email))
            .then((user) => {
                assert.equal(user, undefined);
            })
            .then(done)
            .catch(done);
    });

    it('should update user', (done) => {
        const email = 'email';
        const name = 'name';
        const password = 'password'
        UserRepository
            .addNewUser({email, name, password})
            .then(() => UserRepository.findUserByEmail(email))
            .then((user) => UserRepository.updateUser(user.id, {diploma: '2015-01-01'}))
            .then(() => UserRepository.findUserByEmail(email))
            .then((user) => {
                assert.equal(user.diploma.toISOString(), '2014-12-31T23:00:00.000Z');
            })
            .then(done)
            .catch(done);
    });

    it('should return managers', (done) => {
        const email = 'email';
        const name = 'name';
        const password = 'password';
        UserRepository
            .addNewUser({email, name, password})
            .then(() => UserRepository.findUserByEmail(email))
            .then((user) => UserRepository.addRole(user, 'Manager'))
            .then(() => UserRepository.getUsersWithRoles('Manager'))
            .then((users) => {
                assert.equal(users[0].email, email);
            })
            .then(done)
            .catch(done);
    });
});
