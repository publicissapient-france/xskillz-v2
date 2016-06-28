'use strict';

const Repository = require('./repository');
const Factory = require('./factory');

module.exports = {
    getUpdates: (req, res) => {
        Repository
            .getUpdates()
            .then((updates) => {
                res.jsonp(Factory.createUpdates(updates));
            }).catch((err)=> {
            res.status(500).jsonp({error: err.message});
        });
    }
};