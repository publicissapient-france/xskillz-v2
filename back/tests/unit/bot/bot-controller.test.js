const sinon = require('sinon');

const BotService = require('../../../src/bot/bot-service');
const BotController = require('../../../src/bot/bot-controller');

describe('BotController', () => {

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
        it('should return data if bot process is OK', done => {
            sandbox
                .stub(BotService, 'process')
                .returns(Promise.resolve({data: 'data'}));

            req.body = {
                text: 'profile jsmadja'
            };

            BotController
                .command(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {data: 'data'});
                })
                .then(done)
                .catch(done);
        });
    });

    describe('Errors', () => {
        it('should return code 404 with error if bot process failed', done => {
            sandbox
                .stub(BotService, 'process')
                .returns(Promise.reject(new Error('error')));

            req.body = {
                text: 'profile jsmadja'
            };

            BotController
                .command(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 404);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

    });
});