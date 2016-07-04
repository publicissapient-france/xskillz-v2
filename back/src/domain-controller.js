'use strict';

const Repository = require('./repository');

module.exports = {
    getDomains: (req, res) => {
        Repository
            .getDomains()
            .then((domains) => {
                res.send(domains);
            });
    },
    addDomain: (req, res) =>
        Repository
            .addDomain(req.body.name)
            .then(() => Repository.findDomainByName(req.body.name))
            .then((domain) => res.send(domain)),

    deleteDomain: (req, res) =>
        Repository
            .removeDomainFromSkills(req.params.id)
            .then(() => Repository.deleteDomain(req.params.id))
            .then(() => res.jsonp({deleted: true}))
};