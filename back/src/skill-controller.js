'use strict';

const Repository = require('./repository');
const Factory = require('./factory');
const log = require('winston');

module.exports = {
    addSkill: (req, res) => {
        var skillRequest = req.body;
        skillRequest.level = skillRequest.level || 0;
        Repository
            .findSkillByExactName(skillRequest.name)
            .then((skill) => {
                if (!skill) {
                    throw new Error('Not Found');
                }
                skillRequest.id = skill.id;
                return Repository.findUserSkillByUserIdAndSkillId(req.body.user_id, skill.id)
                    .then((skills) => {
                        if (skills.length > 0) {
                            return Repository.updateUserSkillById(skill.id, skillRequest);
                        } else {
                            return Repository.addSkill(skillRequest);
                        }
                    });
            })
            .catch(() =>
                Repository
                    .addNewSkill(skillRequest.name)
                    .then(() => Repository.findSkillByName(skillRequest.name))
                    .then((skill) => {
                        skillRequest.id = skill.id;
                        return Repository.addSkill(skillRequest);
                    }))
            .then(() => Repository.findUserSkillByUserIdAndSkillId(skillRequest.user_id, skillRequest.id))
            .then((userSkills) => res.json(userSkills[0]))
            .catch((err) => {
                log.error(err.message);
                res.status(500).send(err.message)
            })
    },

    deleteUserSkillById: (req, res) => {
        if (!req.body.user_id) {
            res.status(401).send({deleted: false, error: `You're not logged in`});
            return;
        }
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
        if (!req.body.user_id) {
            res.status(401).send({deleted: false, error: `You're not logged in`});
            return;
        }
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
            .addSkillToDomain(req.params.id, req.body.id)
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