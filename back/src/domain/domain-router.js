'use strict';

const DomainController = require('./domain-controller');
const Security = require('../security');
const DomainRouter = {
    register: (express) => {
        express
            .post('/domains', Security.requireLogin, DomainController.addDomain)
            .delete('/domains/:id', Security.requireLogin, DomainController.deleteDomain)
            .get('/domains', DomainController.getDomains);
    }
};
module.exports = DomainRouter;
