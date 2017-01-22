'use strict';

const UserService = require('./user-service');
const NotificationService = require('../notification/notification-service');
const BotService = require('../notification/bot-service');
const MESSAGES = require('../notification/bot-service').MESSAGES;
const TEMPLATE = require('../notification/notification-service').TEMPLATE;
const Promise = require('bluebird');
const Controllers = require('../controllers.js');

const onError = Controllers.onError;

module.exports = {

    addUser: (req, res) =>
        UserService
            .addUser(req.body)
            .then(user => {
                NotificationService.notify(TEMPLATE.WELCOME, user);
                BotService.notify(MESSAGES.WELCOME, user);
                return user;
            })
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

    prepareChangePassword: (req, res) =>
        UserService
            .generatePasswordTokenByEmail(req.body.email)
            .then(() => res.sendStatus(200))
            .catch(err => onError(err, res, 404, 'User not found')),

    changePassword: (req, res) =>
        UserService
            .getUserByIdAndPasswordToken(req.body.id, req.body.token)
            .then(users => {
                if (users.length < 1) {
                    throw new Error(`Cannot find user by id and token (${req.body.id}, ${req.body.token})`);
                }
                return UserService.changePassword(req.body.id, req.body.password);
            })
            .then(() => res.sendStatus(202))
            .catch(err => onError(err, res, 404, err.message)),

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
            if (req.body.home) {
                tasks.push(UserService.updateHome(userId, req.body.home));
            }
            if (req.body.availability) {
                tasks.push(UserService.updateAvailability(userId, req.body.availability));
            }
            if (req.body.employee_date) {
                tasks.push(UserService.updateEmployeeDate(userId, req.body.employee_date));
            }
            if (req.body.diploma) {
                tasks.push(UserService.updateDiploma(userId, req.body.diploma));
            }
            if (req.body.twitter) {
                tasks.push(UserService.updateTwitter(userId, req.body.twitter));
            }
            if (req.body.linkedIn) {
                tasks.push(UserService.updateLinkedIn(userId, req.body.linkedIn));
            }
            if (req.body.github) {
                tasks.push(UserService.updateGithub(userId, req.body.github));
            }
            return Promise.all(tasks)
                .then(() => res.jsonp({updated: true}))
                .catch(err => onError(err, res));
        };
        if (userId && req.body.old_password && req.body.password) {
            return updatePassword();
        }
        if (userId &&
            req.body.phone ||
            req.body.address ||
            req.body.availability ||
            req.body.employee_date ||
            req.body.diploma ||
            req.body.home ||
            req.body.linkedIn ||
            req.body.twitter ||
            req.body.github) {
            return updateUser();
        } else {
            return res.jsonp({updated: false});
        }
    }
};