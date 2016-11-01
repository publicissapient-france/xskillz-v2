'use strict';

const Express = require('express');

const UserRouter = require('./user/user-router');
const SkillRouter = require('./skill/skill-router');
const DomainRouter = require('./domain/domain-router');

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

const express = Express();

express
    .use(allowCrossDomain)
    .use(require('body-parser').json())
    .use(require('cors')())
    .use(UserRouter.middleware)
    .get('/', (req, res) => res.send('You know, for skills :)'));

UserRouter.register(express);
DomainRouter.register(express);
SkillRouter.register(express);

express.listen(process.env.PORT || 8080, () => {
    console.log('Skillz is listening on port ' + (process.env.PORT || 8080));
});

module.exports = Express;