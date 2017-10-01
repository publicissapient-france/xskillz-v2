'use strict';

const SkillService = require('./skill-service');

const Controllers = require('../controllers.js');

module.exports = {
    addSkill: (req, res) => {
        const skillRequest = req.body;
        if (!skillRequest.name) {
            res.status(403);
            res.send('You have to name your skill');
            return Promise.resolve();
        }
        skillRequest.level = skillRequest.level || 0;
        return SkillService
        .addSkill(req.body.user_id, skillRequest)
        .then(userSkill => res.json(userSkill))
        .catch(err => Controllers.onError(err, res));
    },

    deleteUserSkillById: (req, res) =>
        SkillService
        .deleteUserSkillById(req.params.id, req.body.user_id)
        .then(() => res.jsonp({ deleted: true }))
        .catch(err => Controllers.onError(err, res)),

    updateUserSkillById: (req, res) =>
        SkillService
        .updateUserSkillById(req.params.id, req.body)
        .then(() => res.jsonp({ updated: true }))
        .catch(err => Controllers.onError(err, res)),

    getSkills: (req, res) =>
        SkillService
        .getSkills()
        .then(skills => res.jsonp(skills))
        .catch(err => Controllers.onError(err, res)),

    addSkillToDomain: (req, res) =>
        SkillService
        .addSkillToDomain(req.params.id, req.body.id)
        .then(skills => res.jsonp(skills))
        .catch(err => Controllers.onError(err, res)),

    merge: (req, res) =>
        SkillService
        .mergeSkills(req.body.from, req.body.to)
        .then(() => res.jsonp({ merged: true }))
        .catch(err => Controllers.onError(err, res)),

    updateSkill: (req, res) =>
        SkillService
        .updateSkill(req.params.id, req.body)
        .then(() => res.jsonp({ updated: true }))
        .catch(err => Controllers.onError(err, res)),

    exportUserSkills: (req, res) =>
        SkillService
        .exportUserSkills()
        .then(skills => {
            res.set('Content-Disposition', 'attachment; filename=skillz.csv');
            res.set('Content-Type', 'application/octet-stream');
            return res.send(skills);
        })
        .catch(err => Controllers.onError(err, res)),

};