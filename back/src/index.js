'use strict';

const Express = require('express');

const UserController = require('./user-controller');
const SkillController = require('./skill-controller');
const UpdateController = require('./update-controller');
const DomainController = require('./domain-controller');

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
        if(token) {
            const user = UserController.getUserByToken(token);
            if(user) {
                req.body.user_id = user.id;
            }
            console.log(`token ${token} -> ${req.body.user_id}`);
        }
        next();
    })

    .get('/', (req, res) => res.send('You know, for skills :)'))
    .post('/domains/:id/skills', SkillController.addSkillToDomain)
    .post('/domains', DomainController.addDomain)
    .delete('/domains/:id', DomainController.deleteDomain)
    .get('/domains', DomainController.getDomains)
    .get('/skills', SkillController.getSkills)
    .post('/me/skills', SkillController.addSkill)
    .get('/skills/:id/users', UserController.getUsersBySkill)
    .put('/skills', SkillController.merge)
    .get('/updates', UpdateController.getUpdates)
    .post('/users', UserController.addUser)
    .post('/me', UserController.getCurrentUser)
    .delete('/me/skills/:id', SkillController.deleteUserSkillById)
    .put('/me/skills/:id', SkillController.updateUserSkillById)
    .get('/users', UserController.getUsers)
    .get('/users/:id', UserController.getUserById)
    .put('/users/:id', UserController.updateUser)
    .post('/users/:id/manager/:managerId', UserController.assignManager)
    .delete('/users/:id', UserController.deleteUserById)
    .post('/signin', UserController.signin)

    .listen(8080, () => {
        console.log('XSkillz is listening on port 8080');
    });

module.exports = Express;