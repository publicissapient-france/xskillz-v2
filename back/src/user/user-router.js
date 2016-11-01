'use strict';

const UserController = require('./user-controller');
const Security = require('../security');

const UserRouter = {

    register: (express) => {

        express
            .route('/users')
            .get(UserController.getUsersWebVersion)
            .post(UserController.addUser);

        express
            .route('/users/:id([0-9]+)')
            .get(UserController.getUserById)
            .put(Security.requireLogin, UserController.updateUser)
            .delete(Security.requireLogin, UserController.deleteUserById);

        express
            .route('/users/:id([\\w\\-]+)')
            .get(UserController.getUserByReadableId);

        express
            .get('/updates', Security.requireLogin, UserController.getUpdates)
            .patch('/me', Security.requireLogin, UserController.patchMe)
            .post('/me', Security.requireLogin, UserController.getCurrentUser)
            .get('/web/users', UserController.getUsersWebVersion)
            .get('/mobile/users', UserController.getUsersMobileVersion)
            .get('/mobile/skills/:id/users', UserController.getUsersBySkillMobileVersion)

            .post('/users/:id/manager/:managerId', Security.requireLogin, UserController.assignManager)
            .post('/users/:id/manager', Security.requireLogin, UserController.promoteToManager)
            .post('/signin', UserController.signin)

            .get('/management', UserController.getManagement)

            .get('/skills/:id/users', UserController.getUsersBySkill);
    },

    middleware: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            UserController
                .getUserByToken(token)
                .then((user) => {
                    if (user) {
                        req.body.user_id = user.id;
                    }
                    next();
                })
                .catch(() => {
                    next();
                });
        } else {
            next();
        }
    }
};

module.exports = UserRouter;
