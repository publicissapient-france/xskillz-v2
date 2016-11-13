const sinon = require('sinon');

const SkillService = require('../../../src/skill/skill-service');
const SkillController = require('../../../src/skill/skill-controller');

describe('SkillController', () => {

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
        it('should return OK with if delete user skill succeeded', done => {
            sandbox
                .stub(SkillService, 'deleteUserSkillById')
                .returns(Promise.resolve());

            req.params = req.body = {};

            SkillController
                .deleteUserSkillById(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {deleted:true});
                })
                .then(done)
                .catch(done);
        });

        it('should return OK with if update user skill succeeded', done => {
            sandbox
                .stub(SkillService, 'updateUserSkillById')
                .returns(Promise.resolve());

            req.params = req.body = {};

            SkillController
                .updateUserSkillById(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {updated:true});
                })
                .then(done)
                .catch(done);
        });
    });

    describe('Parameter Checks', () => {
        it('should return code 403 with error if addSkill failed because no name provided', done => {
            req.body = {};

            SkillController
                .addSkill(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 403);
                    sinon.assert.calledWith(res.send, 'You have to name your skill');
                })
                .then(done)
                .catch(done);
        });
    });

    describe('Errors', () => {
        it('should return code 500 with error if addSkill failed', done => {
            sandbox
                .stub(SkillService, 'addSkill')
                .returns(Promise.reject(new Error('error')));

            req.body = {
                name: 'javascript'
            };

            SkillController
                .addSkill(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if delete skill failed', done => {
            sandbox
                .stub(SkillService, 'deleteUserSkillById')
                .returns(Promise.reject(new Error('error')));

            req.params = {};
            req.body = {};

            SkillController
                .deleteUserSkillById(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if update user skill failed', done => {
            sandbox
                .stub(SkillService, 'updateUserSkillById')
                .returns(Promise.reject(new Error('error')));

            req.params = {};
            req.body = {};

            SkillController
                .updateUserSkillById(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if get skills failed', done => {
            sandbox
                .stub(SkillService, 'getSkills')
                .returns(Promise.reject(new Error('error')));

            SkillController
                .getSkills(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if add skill to domain failed', done => {
            sandbox
                .stub(SkillService, 'addSkillToDomain')
                .returns(Promise.reject(new Error('error')));

            req.params = {};
            req.body = {};

            SkillController
                .addSkillToDomain(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if merge failed', done => {
            sandbox
                .stub(SkillService, 'mergeSkills')
                .returns(Promise.reject(new Error('error')));

            req.body = {};

            SkillController
                .merge(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

    });
});