'use strict';

const UserService = require('./user-service');
const Promise = require('bluebird');
const Controllers = require('../controllers.js');

const onError = Controllers.onError;

module.exports = {

    addUser: (req, res) =>
        UserService
            .addUser(req.body)
            .then(user => res.json(user))
            .catch(err => onError(err, res)),

    getUsersBySkillMobileVersion: (req, res) =>
        UserService
            .getUsersBySkillMobileVersion(req.params.id)
            .then(users => res.json(users))
            .catch(err => onError(err, res, 404, 'Users not found')),

    getUsersBySkill: (req, res) =>
        UserService
            .getUsersBySkill(req.params.id)
            .then(users => res.json(users))
            .catch(err => onError(err, res, 404, 'Users not found')),

    getCurrentUser: (req, res) =>
        UserService
            .getUserById(req.body.user_id)
            .then(user => res.jsonp(user))
            .catch(err => onError(err, res, 404, 'User not found')),

    getUserByToken: (token) =>
        UserService.getUserByToken(token),

    getUserById: (req, res) =>
        UserService
            .createUserById(req.params.id)
            .then(user => res.jsonp(user))
            .catch(err => onError(err, res, 404, `User #${req.params.id} not found`)),

    getUserByReadableId: (req, res) =>
        UserService
            .createUserByReadableId(req.params.id)
            .then(user => res.json(user))
            .catch(err => onError(err, res, 404, `User #${req.params.id} not found`)),

    getUsersMobileVersion: (req, res) =>
        UserService
            .getUsersMobileVersion(req.query)
            .then(users => res.json(users))
            .catch(err => onError(err, res, 404, `Users not found`)),

    getUsersWebVersion: (req, res) =>
        UserService
            .getUsersWebVersion(req.query)
            .then(users => res.json(users))
            .catch(err => onError(err, res, 404, `Users not found`)),

    deleteUserById: (req, res) =>
        UserService
            .deleteUserById(req.params.id)
            .then(() => res.jsonp({deleted: true}))
            .catch(err => onError(err, res)),

    signin: (req, res) =>
        UserService
            .signIn(req.body)
            .then(user => res.jsonp(user))
            .catch(err => onError(err, res, 404, `User ${req.body.email} not found`)),

    assignManager: (req, res) =>
        UserService
            .assignManager(req.params.id, req.params.managerId)
            .then(() => res.jsonp({assigned: true}))
            .catch(err => onError(err, res)),

    updateUser: (req, res) =>
        UserService
            .updateUser(req.params.id, req.body)
            .then(() => res.jsonp({updated: true}))
            .catch(err => onError(err, res)),

    promoteToManager: (req, res) =>
        UserService
            .promoteToManager(req.params.id)
            .then(() => res.jsonp({updated: true}))
            .catch(err => onError(err, res)),

    getManagement: (req, res) =>
        UserService
            .getManagement()
            .then(users => res.jsonp({management: users}))
            .catch(err => onError(err, res)),

    findUserRolesById: userId => UserService.findUserRolesById(userId),

    patchMe: (req, res) => {
        const userId = req.body.user_id;
        const updatePassword = () => {
            return UserService
                .updatePassword(userId, req.body.old_password, req.body.password)
                .then(() => res.jsonp({updated: true}))
                .catch(err => onError(err, res));
        };
        const updateUser = () => {
            const tasks = [];
            if (req.body.phone) {
                tasks.push(UserService.updatePhone(userId, req.body.phone));
            }
            if (req.body.address) {
                tasks.push(UserService.updateAddress(userId, req.body.address));
            }
            if (req.body.availability) {
                tasks.push(UserService.updateAvailability(userId, req.body.availability));
            }
            return Promise.all(tasks)
                .then(() => res.jsonp({updated: true}))
                .catch(err => onError(err, res));
        };
        if (userId && req.body.old_password && req.body.password) {
            return updatePassword();
        }
        if (userId && req.body.phone || req.body.address || req.body.availability) {
            return updateUser();
        }
    }
};