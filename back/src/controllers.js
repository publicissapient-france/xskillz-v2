'use strict';

const log = require('winston');

const Controllers = {
    onError: (err, res, code, message) => {
        log.error(err.message);
        res.status(code || 500);
        if (message) {
            res.jsonp({error: message, cause: err.message});
        } else {
            res.send(err.message);
        }
    }
};

module.exports = Controllers;