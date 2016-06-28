'use strict';

const Repository = require('./repository');
const Factory = require('./factory');

module.exports = {
    addSkill: (req, res) => {
        var skillRequest = req.body;

        Repository
            .findSkillByName(skillRequest.name)
            .then((skills) => {
                if (!skills || skills.length == 0) {
                    throw new Error('Not Found');
                }
                skillRequest.id = skills[0].id;
                return Repository
                    .addSkill(skillRequest)
                    .then(() => Repository.findUserSkillByUserIdAndSkillId(skillRequest.user_id, skillRequest.id))
                    .then((userSkills) => res.json(userSkills[0]))
                    .catch((err) => res.status(500).send(err.message))
            })
            .catch((err) => {
                return Repository
                    .addNewSkill(skillRequest.name)
                    .then(() => Repository.findSkillByName(skillRequest.name))
                    .then((skills) => {
                        skillRequest.id = skills[0].id;
                        return Repository.addSkill(skillRequest);
                    })
                    .then(() => Repository.findUserSkillByUserIdAndSkillId(skillRequest.user_id, skillRequest.id))
                    .then((userSkills) => res.json(userSkills[0]))
                    .catch((err) => res.status(500).send(err.message));
            });
    },

    getSkills: (req, res) => {
        Repository
            .getSkills()
            .map((skill)=> Factory.createSkill(skill))
            .then((skills) => {
                res.jsonp(skills);
            })
            .catch((err) => res.status(500).send(err.message));
    },

    addSkillToDomain: (req, res) => {
        Repository
            .addSkillToDomain(req.params.id, req.body.skill_id)
            .then((skills) => {
                res.jsonp(skills);
            })
            .catch((err) => res.status(500).send(err.message));
    }
};