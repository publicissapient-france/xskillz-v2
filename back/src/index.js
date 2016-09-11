'use strict';

const Express = require('express');
const Database = require('./database');

var winston = require('winston'),
    expressWinston = require('express-winston');

//expressWinston.requestWhitelist.push('body');
//expressWinston.responseWhitelist.push('body');

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
    .use(expressWinston.logger({
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true
            })
        ],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
        colorStatus: true, // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
        ignoreRoute: function (req, res) {
            return false;
        } // optional: allows to skip some log messages based on request and/or response
    }))
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