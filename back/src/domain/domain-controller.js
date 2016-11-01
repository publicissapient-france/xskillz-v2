'use strict';

const DomainService = require('./domain-service');
module.exports = {
    getDomains: (req, res) => {
        DomainService
            .getDomains()
            .then((domains) => {
                res.send(domains);
            });
    },
    addDomain: (req, res) =>
        DomainService
            .addDomain(req.body.name, req.body.color)
            .then((domain) => res.send(domain)),

    deleteDomain: (req, res) =>
        DomainService
            .deleteDomain(req.params.id)
            .then(() => res.jsonp({deleted: true}))
};