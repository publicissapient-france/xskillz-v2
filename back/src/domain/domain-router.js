'use strict';

const DomainController = require('./domain-controller');
const DomainRouter = {
    register: (express) => {
        express
            .post('/domains', DomainController.addDomain)
            .delete('/domains/:id', DomainController.deleteDomain)
            .get('/domains', DomainController.getDomains);
    }
};
module.exports = DomainRouter;
