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
                .returns(Promise.resolve([{domain:'domain'}]));

            DomainController
                .getDomainsWithSkills(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {domains:[{domain:'domain'}]});
                })
                .then(done)
                .catch(done);
        });
    });
});