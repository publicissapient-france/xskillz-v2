const sinon = require('sinon');

const DomainService = require('../../../src/domain/domain-service');
const DomainController = require('../../../src/domain/domain-controller');

describe('DomainController', () => {

    let sandbox, res, req;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        res = {
            status: sinon.spy(),
            send: sinon.spy(),
            jsonp: sinon.spy()
        };
        req = {};
    });
    afterEach(() => {
        res.status.reset();
        res.send.reset();
        res.jsonp.reset();
        sandbox.restore();
    });

    describe('Ok cases', () => {
        it('should return domains with skills', done => {
            sandbox
                .stub(DomainService, 'getDomainsWithSkills')
                .returns(Promise.resolve([{domain: 'domain'}]));

            DomainController
                .getDomainsWithSkills(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {domains: [{domain: 'domain'}]});
                })
                .then(done)
                .catch(done);
        });

        it('should return domains', done => {
            sandbox
                .stub(DomainService, 'getDomains')
                .returns(Promise.resolve([{domain: 'domain'}]));

            DomainController
                .getDomains(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, [{domain: 'domain'}]);
                })
                .then(done)
                .catch(done);
        });

        it('should delete a domain', done => {
            sandbox
                .stub(DomainService, 'deleteDomain')
                .returns(Promise.resolve());

            req.params = {
                id: 1
            };

            DomainController
                .deleteDomain(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {deleted: true});
                })
                .then(done)
                .catch(done);
        });
    });
});