'use strict';

const Repository = require('./repository');
const Factory = require('./factory');
const uuid = require('uuid');
const _ = require('lodash');

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


module.exports = {
    addUser: (req, res) => {
        Repository.addNewUser(req.body)
            .then(() => Repository.findUserByEmail(req.body.email))
            .then((users) => {
                res.json(users[0]);
            })
            .catch((err) => {
                res.status(500).send(err.message);
            });
    },
    getUsersBySkill: (req, res) => {
        Repository
            .findUsersBySkill(req.params.id)
            .map((user)=> createUserById(user.id))
            .then((users) => res.json(users))
            .catch((err) => {
                console.error(err);
                res.status(404).jsonp({error: `Users not found`});
            });
    },

    getUserById: (req, res) => {
        createUserById(req.params.id)
            .then((user)=> {
                res.json(user);
            })
            .catch((err) => {
                res.status(404).jsonp({error: `User #${req.params.id} not found`, message: err.message});
            });
    },

    getUsers: (req, res) => {
        Repository
            .getUsers()
            .map((user)=> createUserById(user.id))
            .then((users) => res.json(users))
            .catch((err) => {
                console.error(err);
                res.status(404).jsonp({error: `Users not found`});
            });
    },

    signin: (req, res) => {
        const email = req.body.email;
        Repository
            .findUserByEmail(email)
            .then((user) => {
                const token = uuid.v4();
                Repository.TOKENS[token] = user[0];
                user[0].token = token;
                res.json(user[0]);
            })
            .catch(() => {
                res.status(404).jsonp({error: `User ${email} not found`});
            });
    }
};