'use strict';

const Repository = require('./repository');
const Factory = require('./factory');
const log = require('winston');

module.exports = {
    addSkill: (req, res) => {
        var skillRequest = req.body;
        Repository
            .findSkillByName(skillRequest.name)
            .then((skill) => {
                if (!skill) {
                    throw new Error('Not Found');
                }
                skillRequest.id = skill.id;
                return Repository
                    .addSkill(skillRequest)
                    .then(() => Repository.findUserSkillByUserIdAndSkillId(skillRequest.user_id, skillRequest.id))
                    .then((userSkills) => res.json(userSkills[0]))
                    .catch((err) => {
                        log.error(err.message);
                        res.status(500).send(err.message)
                    })
            })
            .catch((err) => {
                return Repository
                    .addNewSkill(skillRequest.name)
                    .then(() => Repository.findSkillByName(skillRequest.name))
                    .then((skill) => {
                        skillRequest.id = skill.id;
                        return Repository.addSkill(skillRequest);
                    })
                    .then(() => Repository.findUserSkillByUserIdAndSkillId(skillRequest.user_id, skillRequest.id))
                    .then((userSkills) => res.jsonp(userSkills[0]))
                    .catch((err) => {
                        log.error(err.message);
                        res.status(500).send(err.message)
                    });
            });
    },

    deleteUserSkillById: (req, res) => {
        Repository
            .deleteUserSkillById(req.params.id, req.body.user_id)
            .then(() => {
                res.jsonp({deleted: true});
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send({deleted: false, error: err.message});
            });
    },

    updateUserSkillById: (req, res) => {
        Repository
            .updateUserSkillById(req.params.id, req.body)
            .then(() => {
                res.jsonp({updated: true});
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send({updated: false, error: err.message});
            });
    },

    getSkills: (req, res) => {
        Repository
            .getSkills()
            .map((skill)=> Factory.createSkill(skill))
            .then((skills) => {
                res.jsonp(skills);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send(err.message)
            });
    },

    addSkillToDomain: (req, res) => {
        Repository
            .addSkillToDomain(req.params.id, req.body.skill_id)
            .then((skills) => {
                res.jsonp(skills);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send(err.message)
            });
    },

    merge: (req, res) => {
        Repository
            .mergeSkills(req.body.from, req.body.to)
            .then(() => {
                res.jsonp({merged: true});
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send(err.message)
            });
    }
};