const Express = require('express');
const Raven = require('raven');

const UserRouter = require('./user/user-router');
const SkillRouter = require('./skill/skill-router');
const DomainRouter = require('./domain/domain-router');

Raven.config('https://53e386cc1b4248d18936ae21ab0fa63e:39d1f232fde346e5ba073fcdb3a42e2d@sentry.io/224591').install();

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

const express = Express();

express
.use(Raven.requestHandler())
.use(Raven.errorHandler())
.use(allowCrossDomain)
.use(require('body-parser').urlencoded({ extended: false }))
.use(require('body-parser').json())
.use(require('cors')())
.use(UserRouter.middleware)
.get('/', (req, res) => res.send(`You know, for skills :)`));

UserRouter.register(express);
DomainRouter.register(express);
SkillRouter.register(express);

express.listen(process.env.PORT || 8080, () => {
    console.log('Skillz is listening on port ' + (process.env.PORT || 8080));
});

module.exports = Express;