'use strict';

const Repository = require('./repository');

module.exports = {
    getDomains: (req, res) => {
        Repository
            .getDomains()
            .then((domains) => {
                res.send(domains[0]);
            });
    },
    addDomain: (req, res) =>
        Repository
            .addDomain(req.body.name)
            .then(() => Repository.findDomainByName(req.body.name))
            .then((domains) => res.send(domains[0]))
};