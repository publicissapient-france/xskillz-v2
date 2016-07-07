'use strict';

const Repository = require('./repository');
const Factory = require('./factory');
const uuid = require('uuid');
const _ = require('lodash');
const log = require('winston');

const createUserById = (id) => {
    let user = {domains: []};
    return Repository
        .findUserById(id)
        .then((user) => Factory.createUser(user))
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
        .then(()=> user)
        .then((user) => {
            return Repository.findUserRolesById(user.id)
                .then((roles) => {
                    user.roles = roles.map((r)=>r.name);
                })
                .then(() => user)
        });
};


module.exports = {
    addUser: (req, res) => {
        Repository.addNewUser(req.body)
            .then(() => Repository.findUserByEmail(req.body.email))
            .then((user) => Repository.addManagerRole(user, 'Manager'))
            .then(() => Repository.findUserByEmail(req.body.email))
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send(err.message);
            });
    },
    getUsersBySkill: (req, res) => {
        Repository
            .findUsersBySkill(req.params.id)
            .map((user)=> createUserById(user.id))
            .then((users) => res.json(users))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`});
            });
    },

    getCurrentUser: (req, res) => {
        Repository
            .findUserByEmailAndToken(req.body.email, req.headers.token)
            .then((user) => createUserById(user.id))
            .then((user) => res.json(user))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `User ${req.body.email} not found`});
            });
    },

    getUserByToken: (token) => {
        return Repository.TOKENS[token];
    },

    getUserById: (req, res) => {
        createUserById(req.params.id)
            .then((user)=> {
                res.json(user);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `User #${req.params.id} not found`, message: err.message});
            });
    },

    getUsers: (req, res) =>
        Repository
            .getUsers()
            .map((user)=> createUserById(user.id))
            .then((users) => res.json(users))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`, cause: err.message});
            }),

    deleteUserById: (req, res) =>
        Repository
            .deleteUserById(req.params.id)
            .then(() => res.jsonp({deleted: true}))
            .catch((err) => {
                log.error(err.message);
                res.status(500).jsonp({cause: err.message})
            }),

    signin: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        Repository
            .findUserByEmailAndPassword(email, password)
            .then((user) => {
                if(!user) {
                    throw new Error(`User ${email} not found`);
                }
                const token = uuid.v4();
                Repository.TOKENS[token] = user;
                user.token = token;
                res.status(200).jsonp(user);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `User ${email} not found`});
            });
    },

    assignManager: (req, res) => {
        Repository
            .assignManager(req.params.id, req.params.managerId)
            .then(()=> {
                res.jsonp({assigned: true})
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).jsonp({error: err.message});
            });
    },

    updateUser: (req, res) => {
        Repository
            .updateUser(req.params.id, req.body)
            .then(()=> {
                res.jsonp({updated: true})
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).jsonp({error: err.message});
            })
    }
};