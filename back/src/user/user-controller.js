'use strict';

const Repository = require('./user-repository');
const SkillRepository = require('../skill/skill-repository');
const uuid = require('uuid');
const _ = require('lodash');
const log = require('winston');
const gravatar = require('gravatar');

const computeScore = (skills) => {
    return _(skills)
        .map((skill)=>skill.level)
        .reduce((sum, n) => sum + n, 0);
};

const createUser = (raw)=> {
    return {
        name: raw.name,
        id: raw.id,
        gravatarUrl: gravatar.url(raw.email),
        experienceCounter: raw.diploma ? new Date().getFullYear() - new Date(raw.diploma).getFullYear() : 0
    };
};

const createDomain = (domainSkills) => {
    var domain = domainSkills[0];
    return {
        id: domain.domain_id,
        name: domain.domain_name,
        score: computeScore(domainSkills),
        color: domain.domain_color,
        skills: _(domainSkills)
            .map((skill)=> {
                return {
                    id: skill.skill_id,
                    interested: skill.interested,
                    level: skill.level,
                    name: skill.skill_name
                }
            })
            .value()
    };
};

const createUserUpdates = (userUpdates) => {
    var user = userUpdates[0];
    return {
        user: {
            name: user.user_name,
            id: user.user_id,
            gravatarUrl: gravatar.url(user.user_email),
            experienceCounter: user.user_diploma ? new Date().getFullYear() - new Date(user.user_diploma).getFullYear() : 0
        },
        updates: userUpdates.map((userUpdate)=> {
            return {
                id: userUpdate.user_skill_id,
                skill: {
                    id: userUpdate.skill_id,
                    interested: userUpdate.skill_interested[0] === 1,
                    level: userUpdate.skill_level,
                    name: userUpdate.skill_name,
                    color: userUpdate.color,
                    domain: userUpdate.domain_name
                },
                date: userUpdate.skill_date
            }
        })
    };
};

const createUpdates = (updates) => {
    const response = [];
    _(updates)
        .groupBy((update)=>update.user_id)
        .values()
        .value()
        .forEach((userUpdates) => {
            response.push(createUserUpdates(userUpdates));
        });
    return response;
};

const createUserById = (UserRepository, SkillRepository, id) => {
    let user = {domains: []};
    return UserRepository
        .findUserById(id)
        .then((user) => createUser(user))
        .then((dbUser) => {
            user = _.assignWith(user, dbUser);
            return SkillRepository.findUserSkillsById(user.id)
        })
        .then((skills) => {
            user.score = computeScore(skills);
            _(skills)
                .groupBy('domain_id')
                .values()
                .value()
                .forEach((domainSkills) => user.domains.push(createDomain(domainSkills)));
        })
        .then(()=> user)
        .then((user) => {
            return UserRepository.findUserRolesById(user.id)
                .then((roles) => {
                    user.roles = roles.map((r)=>r.name);
                })
                .then(() => user)
        });
};


module.exports = {
    init: (args) => {
        this.Repository = Repository;
        this.Repository.init(args);

        this.SkillRepository = SkillRepository;
        this.SkillRepository.init(args);
    },

    addUser: (req, res) => {
        this.Repository.addNewUser(req.body)
            .then(() => Repository.findUserByEmail(req.body.email))
            .then((user) =>
                this.Repository.getUsersWithRoles('Manager')
                    .then((users) => {
                        if (users.length === 0) {
                            return this.Repository.addRole(user, 'Manager').then(() => user);
                        }
                        return user;
                    }))
            .then(() => this.Repository.findUserByEmail(req.body.email))
            .then((user) => {
                const token = uuid.v4();
                return this.Repository.addToken(user, token)
                    .then(() => {
                        user.token = token;
                        return user;
                    });
            })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send(err.message);
            });
    },
    getUsersBySkillMobileVersion: (req, res) => {
        this.Repository
            .findUsersBySkill(req.params.id)
            .map((user)=> createUserById(this.Repository, this.SkillRepository, user.id))
            .then((users) => res.json(users))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`});
            });
    },

    getUsersBySkill: (req, res) => {
        this.Repository
            .findUsersBySkill(req.params.id)
            .map((user)=> {
                const _user = createUser(user);
                _user.level = user.level;
                _user.interested = (user.interested[0] === 1);
                return _user;
            })
            .then((users) => res.json(users))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`});
            });
    },

    getCurrentUser: (req, res) => {
        if (!req.body.user_id) {
            res.status(401).send({error: `You're not logged in`});
            return;
        }
        this.Repository
            .findUserById(req.body.user_id)
            .then((user) => createUserById(this.Repository, this.SkillRepository, user.id))
            .then((user) => res.json(user))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`});
            });
    },

    getUserByToken: (token) =>
        this.Repository.getUserByToken(token),

    getUserById: (req, res) => {
        createUserById(this.Repository, this.SkillRepository, req.params.id)
            .then((user)=> {
                res.json(user);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `User #${req.params.id} not found`, message: err.message});
            });
    },

    getUsersMobileVersion: (req, res) => {
        let usersPromise;
        if (req.query.with_roles) {
            usersPromise = this.Repository.getUsersWithRoles(req.query.with_roles);
        } else {
            usersPromise = this.Repository.getUsers();
        }
        usersPromise
            .map((user)=> createUserById(this.Repository, this.SkillRepository, user.id))
            .then((users) => res.json(users))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`, cause: err.message});
            });
    },

    getUsersWebVersion: (req, res) => {
        let usersPromise = this.Repository.getWebUsers();
        usersPromise
            .then((rows) => {
                return _(rows)
                    .groupBy('user_id')
                    .map((domainRows) => {
                        var user = domainRows[0];
                        return {
                            id: user.user_id,
                            name: user.user_name,
                            gravatarUrl: gravatar.url(user.email),
                            experienceCounter: user.diploma ? new Date().getFullYear() - new Date(user.diploma).getFullYear() : 0,
                            domains: domainRows.map((domainRow) => {
                                    return {
                                        id: domainRow.domain_id,
                                        name: domainRow.domain_name,
                                        score: domainRow.domain_score,
                                        color: domainRow.domain_color
                                    }
                                }
                            ),
                            score: _.reduce(domainRows, (sum, n) => sum + n.domain_score, 0)
                        }
                    })
                    .sortBy('name');
            })
            .then((users) => res.json(users))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`, cause: err.message});
            });
    },

    getUsers: (req, res) => {
        let usersPromise;
        if (req.query.with_roles) {
            usersPromise = this.Repository.getUsersWithRoles(req.query.with_roles);
        } else {
            usersPromise = this.Repository.getUsers();
        }
        usersPromise
            .map((user)=> createUser(user))
            .then((users) => res.json(users))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`, cause: err.message});
            });
    },

    deleteUserById: (req, res) =>
        this.Repository
            .deleteUserById(req.params.id)
            .then(() => res.jsonp({deleted: true}))
            .catch((err) => {
                log.error(err.message);
                res.status(500).jsonp({cause: err.message})
            }),

    signin: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        this.Repository
            .findUserByEmailAndPassword(email, password)
            .then((user) => {
                if (!user) {
                    throw new Error(`User ${email} not found`);
                }
                return user;
            })
            .then((user) => {
                const token = uuid.v4();
                return this.Repository.addToken(user, token)
                    .then(() => {
                        user.token = token;
                        return user;
                    });
            })
            .then((user) => {
                res.status(200).jsonp(user);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `User ${email} not found`});
            });
    },

    assignManager: (req, res) => {
        this.Repository
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
        this.Repository
            .updateUser(req.params.id, req.body)
            .then(()=> {
                res.jsonp({updated: true})
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).jsonp({error: err.message});
            })
    },

    getUpdates: (req, res) => {
        this.Repository
            .getUpdates()
            .then((updates) => {
                res.jsonp(createUpdates(updates));
            })
            .catch((err)=> {
                log.error(err.message);
                res.status(500).jsonp({error: err.message});
            });
    }
};