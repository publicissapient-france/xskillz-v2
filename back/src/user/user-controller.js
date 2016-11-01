'use strict';

const log = require('winston');
const UserService = require('./user-service');

module.exports = {
    addUser: (req, res) => {
        UserService
            .addUser(req.body)
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).send(err.message);
            });
    },
    getUsersBySkillMobileVersion: (req, res) => {
        UserService
            .getUsersBySkillMobileVersion(req.params.id)
            .then((users) => res.json(users))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`});
            });
    },

    getUsersBySkill: (req, res) => {
        if (!req.body.user_id) {
            res.status(401).send({error: `You're not logged in`});
            return;
        }
        UserService
            .getUsersBySkill(req.params.id)
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
        UserService
            .getUserById(req.body.user_id)
            .then((user) => res.json(user))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`});
            });
    },

    getUserByToken: (token) =>
        UserService.getUserByToken(token),

    getUserById: (req, res) => {
        UserService
            .createUserById(req.params.id)
            .then((user)=> {
                res.json(user);
            })
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `User #${req.params.id} not found`, message: err.message});
            });
    },

    getUsersMobileVersion: (req, res) => {
        UserService
            .getUsersMobileVersion(req.query)
            .then((users) => res.json(users))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`, cause: err.message});
            });
    },

    getUsersWebVersion: (req, res) => {
        if (!req.body.user_id) {
            res.status(401).send({error: `You're not logged in`});
            return;
        }
        UserService
            .getUsersWebVersion(req.query)
            .then((users) => res.json(users))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`, cause: err.message});
            });
    },

    getUsers: (req, res) => {
        if (!req.body.user_id) {
            res.status(401).send({error: `You're not logged in`});
            return;
        }
        UserService
            .getUsers(req.query)
            .then((users) => res.json(users))
            .catch((err) => {
                log.error(err.message);
                res.status(404).jsonp({error: `Users not found`, cause: err.message});
            });
    },

    deleteUserById: (req, res) => {
        if (!req.body.user_id) {
            res.status(401).send({error: `You're not logged in`});
            return;
        }
        UserService
            .deleteUserById(req.params.id)
            .then(() => res.jsonp({deleted: true}))
            .catch((err) => {
                log.error(err.message);
                res.status(500).jsonp({cause: err.message})
            })
    },

    signin: (req, res) => {
        UserService
            .signIn(req.body)
            .then((user) => {
                res.status(200).jsonp(user);
            })
            .catch((err) => {
                log.error(err);
                res.status(404).jsonp({error: `User ${email} not found`});
            });
    },

    assignManager: (req, res) => {
        if (!req.body.user_id) {
            res.status(401).send({error: `You're not logged in`});
            return;
        }
        UserService
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
        if (!req.body.user_id) {
            res.status(401).send({error: `You're not logged in`});
            return;
        }
        UserService
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
        if (!req.body.user_id) {
            res.status(401).send({error: `You're not logged in`});
            return;
        }
        UserService
            .getUpdates()
            .then((updates) => {
                res.jsonp(updates);
            })
            .catch((err)=> {
                log.error(err.message);
                res.status(500).jsonp({error: err.message});
            });
    },

    promoteToManager: (req, res) => {
        if (!req.body.user_id) {
            res.status(401).send({error: `You're not logged in`});
            return;
        }
        UserService
            .promoteToManager(req.params.id)
            .then(()=> {
                res.jsonp({updated: true})
            })
            .catch((err) => {
                log.error(err.message);
                res.status(500).jsonp({error: err.message});
            });
    },

    getManagement: (req, res) => {
        UserService
            .getManagement()
            .then((users) => res.jsonp({management: users}))
            .catch((err) => {
                log.error(err.message);
                res.status(500).jsonp({error: err.message});
            })
    },

    patchMe: (req, res) => {
        const userId = req.body.user_id;
        if (!userId) {
            res.status(401).send({error: `You're not logged in`});
            return;
        }
        if (userId && req.body.old_password && req.body.password) {
            UserService
                .updatePassword(userId, req.body.old_password, req.body.password)
                .then(()=> {
                    res.jsonp({updated: true})
                })
                .catch((err) => {
                    log.error(err.message);
                    res.status(500).jsonp({error: err.message});
                })
        } else if (userId && req.body.phone) {
            UserService
                .updatePhone(userId, req.body.phone)
                .then(() => res.status(200).jsonp({updated: true}))
                .catch(err => res.status(500).jsonp({error: err.message}));
        }
    }
};