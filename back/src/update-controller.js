'use strict';

const Repository = require('./repository');
const Factory = require('./factory');
const log = require('winston');

module.exports = {
    getUpdates: (req, res) => {
        Repository
            .getUpdates()
            .then((updates) => {
                res.jsonp(Factory.createUpdates(updates));
            })
            .catch((err)=> {
                log.error(err.message);
                res.status(500).jsonp({error: err.message});
            });
    }
};