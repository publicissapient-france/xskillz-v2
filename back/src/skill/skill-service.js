'use strict';

const Repository = require('./skill-repository');

const createSkill = (skill) => ({
    domain: {
        id: skill.domain_id,
        name: skill.domain_name,
        color: skill.color
    },
    id: skill.id,
    name: skill.name,
    numAllies: skill.num_allies
});

module.exports = {
    removeDomainFromSkills: (id) =>
        Repository.removeDomainFromSkills(id),

    addSkill: (userId, skillRequest) =>
        Repository
        .findSkillByExactName(skillRequest.name)
        .then(skill => {
            if (!skill) {
                throw new Error('Not Found');
            }
            skillRequest.id = skill.id;
            return Repository
            .findUserSkillByUserIdAndSkillId(userId, skill.id)
            .then(skills => {
                if (skills.length > 0) {
                    return Repository.updateUserSkillById(skill.id, skillRequest);
                }
                return Repository.addSkill(skillRequest);
            });
        })
        .catch(() =>
            Repository
            .addNewSkill(skillRequest.name)
            .then(() => Repository.findSkillByName(skillRequest.name))
            .then(skill => {
                skillRequest.id = skill.id;
                return Repository.addSkill(skillRequest);
            }))
        .then(() => Repository.findUserSkillByUserIdAndSkillId(skillRequest.user_id, skillRequest.id))
        .then(userSkills => userSkills[0]),

    deleteUserSkillById: (skillId, userId) =>
        Repository
        .deleteUserSkillById(skillId, userId),

    updateUserSkillById: (skillId, skill) =>
        Repository
        .updateUserSkillById(skillId, skill),

    getSkills: () =>
        Repository
        .getSkills()
        .map((skill) => createSkill(skill)),

    addSkillToDomain: (domainId, skillId) =>
        Repository
        .addSkillToDomain(domainId, skillId),

    mergeSkills: (from, to) =>
        Repository
        .mergeSkills(from, to),

    findUserSkillsById: (userId) =>
        Repository
        .findUserSkillsById(userId),

    findSkillById: skillId =>
        Repository
        .findSkillById(skillId)

};