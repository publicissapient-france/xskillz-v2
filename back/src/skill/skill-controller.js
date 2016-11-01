'use strict';

const SkillService = require('./skill-service');
const log = require('winston');

module.exports = {
    addSkill: (req, res) => {
        const skillRequest = req.body;
        if (!skillRequest.name) {
            res.status(403).send('You have to name your skill');
            return;
        }
        skillRequest.level = skillRequest.level || 0;
        SkillService
            .addSkill(req.body.user_id, skillRequest)
            .then((userSkill) => res.json(userSkill))
            .catch((err) => {
                log.error(err.message);
                res.status(500).send(err.message);
            });
    },

    deleteUserSkillById: (req, res) => {
        SkillService
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
        SkillService
            .updateUserSkillById(req.params.id, req.body)
            .then(() => {
                res.jsonp({updated: true});
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send({updated: false, error: err.message});
            });
    },

    getSkills: (req, res) =>
        SkillService
            .getSkills()
            .then((skills) => {
                res.jsonp(skills);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send(err.message);
            }),

    addSkillToDomain: (req, res) => {
        SkillService
            .addSkillToDomain(req.params.id, req.body.id)
            .then((skills) => {
                res.jsonp(skills);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send(err.message);
            });
    },

    merge: (req, res) => {
        SkillService
            .mergeSkills(req.body.from, req.body.to)
            .then(() => {
                res.jsonp({merged: true});
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send(err.message);
            });
    }
};