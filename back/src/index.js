'use strict';

var Express = require('express');
var app = Express();
var Repository = require('./repository');
var _ = require('lodash');
var bodyParser = require('body-parser');
var uuid = require('uuid');
const cors = require('cors');
const moment = require('moment');
const Factory = require('./factory');

//CORS middleware
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app
    .use(allowCrossDomain)
    .use(bodyParser.json())
    .use(cors());


app.get('/', (req, res) => {
    res.send('OK');
});

//-- domains
app.get('/domains', (req, res) => {
    Repository
        .getDomains()
        .then((domains) => {
            res.send(domains);
        });
});

//-- companies

app.get('/companies', (req, res) => {
    Repository
        .getCompanies()
        .then((companies) => {
            res.send(companies);
        });
});

//-- skills
app.get('/skills', (req, res) => {
    Repository
        .getSkills()
        .map((skill)=> Factory.createSkill(skill))
        .then((skills) => {
            res.jsonp(skills);
        });
});

app.post('/skills', (req, res) => {
    var skillRequest = req.body;

    Repository
        .findSkillByName(skillRequest.name)
        .then((skill) => {
            if (!skill) {
                throw new Error('Not Found');
            }
            skillRequest.id = skill[0].id;
            return Repository
                .addSkill(skillRequest)
                .then(() => res.send('OK'));
        })
        .catch(() => {
            return Repository
                .addNewSkill(skillRequest)
                .then(() => Repository.findSkillByName(skillRequest.name))
                .then((skill) => {
                    skillRequest.id = skill[0].id;
                    return Repository.addSkill(skillRequest);
                })
                .then(() => res.send('OK'));
        });
});

//-- updates
app.get('/companies/:companyId/updates', (req, res) => {
    Repository
        .getUpdatesByCompany(req.params.companyId)
        .then((updates) => {
            res.jsonp(Factory.createUpdates(updates));
        });
});

app.get('/companies/updates', (req, res) => {
    Repository
        .getUpdates()
        .then((updates) => {
            res.jsonp(Factory.createUpdates(updates));
        }).catch((err)=> {
        res.status(500).jsonp({error: err.message});
    });
});

//-- users
const createUserById = (id) => {
    let user = {domains: []};
    return Repository
        .findUserById(id)
        .then((users) => Factory.createUser(users[0]))
        .then((dbUser) => {
            user = _.assignWith(user, dbUser);
            return Repository.findUserSkillsById(user.id)
        })
        .then((skills) => {
            user.score = Factory.computeScore(skills);
            _(skills)
                .groupBy('domain_id')
                .values()
                .value()
                .forEach((domainSkills) => user.domains.push(Factory.createDomain(domainSkills)));
        })
        .then(()=> user);
};

app.get('/users', (req, res) => {
    Repository
        .getUsers()
        .map((user)=> createUserById(user.id))
        .then((users) => res.json(users))
        .catch((err) => {
            console.error(err);
            res.status(404).jsonp({error: `Users not found`});
        });
});

app.get('/skills/:id/users', (req, res) => {
    Repository
        .findUsersBySkill(req.params.id)
        .map((user)=> createUserById(user.id))
        .then((users) => res.json(users))
        .catch((err) => {
            console.error(err);
            res.status(404).jsonp({error: `Users not found`});
        });
});

app.get('/users/:id', (req, res) => {
    createUserById(req.params.id)
        .then((user)=> {
            res.json(user);
        })
        .catch((err) => {
            res.status(404).jsonp({error: `User #${req.params.id} not found`, message: err.message});
        });
});

app.post('/signin', (req, res) => {
    const email = req.body.email;
    Repository
        .findUserByEmail(email)
        .then((user) => {
            const token = uuid.v4();
            Repository.TOKENS[token] = user[0];
            res.json({email, token});
        })
        .catch(() => {
            res.status(404).jsonp({error: `User ${email} not found`});
        });
});

app.listen(8080, () => {
    console.log('XSkillz is listening on port 8080');
});