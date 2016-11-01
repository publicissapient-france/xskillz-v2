'use strict';

const UserController = require('./user-controller');

const UserRouter = {

    register: (express) => {
        express
            .get('/updates', UserController.getUpdates)
            .post('/me', UserController.getCurrentUser)
            .get('/web/users', UserController.getUsersWebVersion)
            .get('/mobile/users', UserController.getUsersMobileVersion)
            .get('/users', UserController.getUsersWebVersion)
            .post('/users', UserController.addUser)
            .get('/users/:id', UserController.getUserById)
            .put('/users/:id', UserController.updateUser)
            .post('/users/:id/manager/:managerId', UserController.assignManager)
            .post('/users/:id/manager', UserController.promoteToManager)
            .delete('/users/:id', UserController.deleteUserById)
            .post('/signin', UserController.signin)

            .get('/management', UserController.getManagement)

            .get('/mobile/skills/:id/users', UserController.getUsersBySkillMobileVersion)
            .get('/skills/:id/users', UserController.getUsersBySkill)
            .patch('/me', UserController.patchMe);
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
                .catch((err) => {
                    next();
                })
        } else {
            next();
        }
    }
};

module.exports = UserRouter;
