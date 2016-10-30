'use strict';

const Express = require('express');
const Database = require('./database');

const UserController = require('./user/user-controller');
const SkillController = require('./skill/skill-controller');
const DomainController = require('./domain/domain-controller');

UserController.init({db: Database});
SkillController.init({db: Database});
DomainController.init({db: Database});

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

Express()
    .use(allowCrossDomain)
    .use(require('body-parser').json())
    .use(require('cors')())
    .use(function (req, res, next) {
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
    })

    .get('/', (req, res) => res.send('You know, for skills :)'))

    .post('/domains', DomainController.addDomain)
    .delete('/domains/:id', DomainController.deleteDomain)
    .get('/domains', DomainController.getDomains)

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

    .get('/mobile/skills/:id/users', UserController.getUsersBySkillMobileVersion)
    .get('/skills/:id/users', UserController.getUsersBySkill)
    .get('/skills', SkillController.getSkills)
    .put('/skills', SkillController.merge)
    .post('/me/skills', SkillController.addSkill)
    .delete('/me/skills/:id', SkillController.deleteUserSkillById)
    .put('/me/skills/:id', SkillController.updateUserSkillById)
    .post('/domains/:id/skills', SkillController.addSkillToDomain)

    .patch('/me', UserController.changePassword)

    .listen(process.env.PORT || 8080, () => {
        console.log('Skillz is listening on port ' + (process.env.PORT || 8080));
    });

module.exports = Express;