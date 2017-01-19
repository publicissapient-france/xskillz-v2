'use strict';

const UserController = require('./user-controller');
const Security = require('../security');
const ROLES = require('../security').ROLES;

const UserRouter = {

    register: (express) => {

        express
            .route('/users')
            .get(Security.require([ROLES.users]), UserController.getUsersWebVersion)
            .post(UserController.addUser);

        express
            .route('/users/:id([0-9]+)')
            .get(UserController.getUserById)
            .put(Security.require([ROLES.users]), UserController.updateUser)
            .delete(Security.require([ROLES.users]), UserController.deleteUserById);

        express
            .route('/users/:id([\\w%\\-]+)')
            .get(UserController.getUserByReadableId);

        express
            .patch('/me', Security.requireLogin, UserController.patchMe)
            .post('/me', Security.requireLogin, UserController.getCurrentUser)

            .get('/web/users', UserController.getUsersWebVersion)
            .get('/mobile/users', UserController.getUsersMobileVersion)
            .get('/mobile/skills/:id/users', UserController.getUsersBySkillMobileVersion)

            .post('/users/:id/manager/:managerId', Security.requireLogin, UserController.assignManager)
            .post('/users/:id/manager', Security.requireLogin, UserController.promoteToManager)
            .post('/signin', UserController.signin)

            .get('/management', UserController.getManagement)

            .get('/skills/:id/users', UserController.getUsersBySkill)

            .post('/notify-change-password', UserController.prepareChangePassword)
            .post('/change-password', UserController.changePassword);
    },

    middleware: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            return UserController
                .getUserByToken(token)
                .then(user => {
                    if (user) {
                        req.body.user_id = user.id;
                        return UserController.findUserRolesById(user.id);
                    }
                    return null;
                })
                .then(roles => {
                    if (roles) {
                        req.body.user_roles = roles.map(r => r.name);
                    }
                    return next();
                })
                .catch(next);
        }
        return next();
    }
};

module.exports = UserRouter;
