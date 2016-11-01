'use strict';

module.exports = {
    requireLogin: (req, res, next) => {
        if (!req.body.user_id) {
            res.status(401).send({error: `You're not logged in`});
        } else {
            next();
        }
    }
};

