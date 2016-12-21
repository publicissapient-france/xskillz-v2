'use strict';
const _ = require('lodash');

module.exports = {
    ROLES: {
        users: 'users'
    },
    requireLogin: (req, res, next) => {
        if (!req.body.user_id) {
            res.status(401).send({error: `You're not logged in`});
        } else {
            next();
        }
    },
    require: roles => (req, res, next) => {
        let allowed = false;
        if (req.body.user_id && req.body.user_roles) {
            allowed = _.each(roles, role => {
                if (req.body.user_roles.indexOf(role) >= 0) {
                    return true;
                }
            });
        }
        if (allowed) {
            next();
        } else {
            res.status(401).send({error: 'You\'re not allowed :(.'});
        }
    }
};

