'use strict';

const assert = require('assert');
const Database = require('../../../src/database');
const DomainRepository = require('../../../src/domain/domain-repository');
const SkillRepository = require('../../../src/skill/skill-repository');
const UserRepository = require('../../../src/user/user-repository');
const _ = require('lodash');

describe('Skill Repository', () => {
    beforeEach(() => Database.clear());
    
    it('should add new skill and get it', (done) => {
        const skillName = 'skill';
        SkillRepository
            .addNewSkill(skillName)
            .then(() => SkillRepository.getSkills())
            .then((skills) => {
                const expected = _.filter(skills, (skill) => skill.name === skillName);
                assert.equal(expected.length, 1);
            })
            .then(done)
            .catch(done);
    });

    it('should add new skill and find it by name', (done) => {
        const skillName = 'skill';
        SkillRepository
            .addNewSkill(skillName)
            .then(() => SkillRepository.findSkillByName(skillName))
            .then((skill) => {
                assert.equal(skill.name, skillName);
            })
            .then(done)
            .catch(done);
    });

    it('should create a new user, a new skill and assign it', (done) => {
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
            .then(() => SkillRepository.findUserSkillsById(user.id))
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


    it('should merge two skills', (done) => {
        const email = 'email';
        const name = 'name';
        const password = 'password';
        const skillName1 = 'skill1';
        const skillName2 = 'skill2';

        let user, skill1, skill2;

        UserRepository
            .addNewUser({email, name, password})
            .then(() => UserRepository.findUserByEmail(email))
            .then((_user) => user = _user)
            .then(() => SkillRepository.addNewSkill(skillName1))
            .then(() => SkillRepository.addNewSkill(skillName2))
            .then(() => SkillRepository.findSkillByName(skillName1))
            .then((skill) => {
                skill1 = skill;
                return SkillRepository.addSkill({id: skill.id, interested: true, level: 2, user_id: user.id});
            })
            .then(() => SkillRepository.findSkillByName(skillName2))
            .then((skill) => {
                skill2 = skill;
                return SkillRepository.addSkill({id: skill.id, interested: false, level: 1, user_id: user.id});
            })
            .then(() => SkillRepository.findUserSkillsById(user.id))
            .then((userSkills) => {
                assert.deepEqual(userSkills.map((userSkill) => userSkill.skill_name), ["skill1", "skill2"]);
            })
            .then(() => SkillRepository.mergeSkills(skill1.id, skill2.id))
            .then(() => SkillRepository.findUserSkillsById(user.id))
            .then((userSkills) => {
                assert.deepEqual(userSkills.map((userSkill) => {
                    return {name: userSkill.skill_name, level: userSkill.level};
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

    it('should remove skill from domain', (done) => {
        let domain, skill;
        DomainRepository
            .addDomain('Agile')
            .then(() => DomainRepository.getDomains())
            .then((domains) => {
                domain = domains[0];
            })
            .then(() => SkillRepository.addNewSkill('skill'))
            .then(() => SkillRepository.getSkills())
            .then((skills) => {
                skill = skills[0];
                return SkillRepository.addSkillToDomain(domain.id, skill.id);
            })
            .then(() => SkillRepository.findSkillByName(skill.name))
            .then((skill) => {
                assert.equal(skill.domain_id, domain.id);
            })
            .then(() => SkillRepository.removeDomainFromSkills(domain.id))
            .then(() => SkillRepository.findSkillByName(skill.name))
            .then((skill) => {
                assert.equal(skill.domain_id, null);
            })
            .then(done)
            .catch(done);
    });
    
});
