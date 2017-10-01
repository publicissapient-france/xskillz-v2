const sinon = require('sinon');

const UserService = require('../../../src/user/user-service');
const UserController = require('../../../src/user/user-controller');

describe('UserController', () => {

    describe('Errors', () => {
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

        it('should return code 500 with error if addUser failed', done => {
            sandbox
                .stub(UserService, 'addUser')
                .returns(Promise.reject(new Error('error')));
            UserController
                .addUser(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 404 with error if users are not found', done => {
            sandbox
                .stub(UserService, 'getUsersBySkill')
                .returns(Promise.reject(new Error('error')));

            req.params = {id: 0};

            UserController
                .getUsersBySkill(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 404);
                    sinon.assert.calledWith(res.jsonp, {error: 'Users not found', cause: 'error'});
                })
                .then(done)
                .catch(done);
        });

        it('should return code 404 with error if current user is not found', done => {
            sandbox
                .stub(UserService, 'getUserById')
                .returns(Promise.reject(new Error('error')));

            req.body = {user_id: 0};

            UserController
                .getCurrentUser(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 404);
                    sinon.assert.calledWith(res.jsonp, {error: 'User not found', cause: 'error'});
                })
                .then(done)
                .catch(done);
        });

        it('should return code 404 with error if user is not found by id', done => {
            sandbox
                .stub(UserService, 'createUserById')
                .returns(Promise.reject(new Error('error')));

            req.params = {id: 0};

            UserController
                .getUserById(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 404);
                    sinon.assert.calledWith(res.jsonp, {error: 'User #0 not found', cause: 'error'});
                })
                .then(done)
                .catch(done);
        });

        it('should return code 404 with error if user is not found by readable_id', done => {
            sandbox
                .stub(UserService, 'createUserByReadableId')
                .returns(Promise.reject(new Error('error')));

            req.params = {id: 0};

            UserController
                .getUserByReadableId(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 404);
                    sinon.assert.calledWith(res.jsonp, {error: 'User #0 not found', cause: 'error'});
                })
                .then(done)
                .catch(done);
        });

        it('should return code 404 with error if users are not found', done => {
            sandbox
                .stub(UserService, 'getUsersWebVersion')
                .returns(Promise.reject(new Error('error')));

            req.params = {id: 0};

            UserController
                .getUsersWebVersion(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 404);
                    sinon.assert.calledWith(res.jsonp, {error: 'Users not found', cause: 'error'});
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if delete user has error', done => {
            sandbox
                .stub(UserService, 'deleteUserById')
                .returns(Promise.reject(new Error('error')));

            req.params = {id: 0};

            UserController
                .deleteUserById(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 404 with error if sign in failed', done => {
            sandbox
                .stub(UserService, 'signIn')
                .returns(Promise.reject(new Error('error')));

            req.body = {email: 'jsmadja@xebia.fr'};

            UserController
                .signin(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 404);
                    sinon.assert.calledWith(res.jsonp, {error: 'User jsmadja@xebia.fr not found', cause: 'error'});
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if assign manager failed', done => {
            sandbox
                .stub(UserService, 'assignManager')
                .returns(Promise.reject(new Error('error')));

            req.params = {id: 0};

            UserController
                .assignManager(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if update user failed', done => {
            sandbox
                .stub(UserService, 'updateUser')
                .returns(Promise.reject(new Error('error')));

            req.params = {id: 0};

            UserController
                .updateUser(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if promote manager failed', done => {
            sandbox
                .stub(UserService, 'promoteToManager')
                .returns(Promise.reject(new Error('error')));

            req.params = {id: 0};

            UserController
                .promoteToManager(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if get management failed', done => {
            sandbox
                .stub(UserService, 'getManagement')
                .returns(Promise.reject(new Error('error')));

            UserController
                .getManagement(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if update password failed', done => {
            sandbox
                .stub(UserService, 'updatePassword')
                .returns(Promise.reject(new Error('error')));

            req.body = {
                user_id: 'julien-smadja',
                old_password: '1',
                password: '2'
            };

            UserController
                .patchMe(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if update phone failed', done => {
            sandbox
                .stub(UserService, 'updatePhone')
                .returns(Promise.reject(new Error('error')));

            req.body = {
                user_id: 'julien-smadja',
                phone: '1'
            };

            UserController
                .patchMe(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return code 500 with error if update address failed', done => {
            sandbox
                .stub(UserService, 'updateAddress')
                .returns(Promise.reject(new Error('error')));

            req.body = {
                user_id: 'julien-smadja',
                address: '1'
            };

            UserController
                .patchMe(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.status, 500);
                    sinon.assert.calledWith(res.send, 'error');
                })
                .then(done)
                .catch(done);
        });

        it('should return json if promote manager succeeded', done => {
            sandbox
                .stub(UserService, 'promoteToManager')
                .returns(Promise.resolve());

            req.params = {id: 0};

            UserController
                .promoteToManager(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {updated: true});
                })
                .then(done)
                .catch(done);
        });

        it('should return json if get management succeeded', done => {
            sandbox
                .stub(UserService, 'getManagement')
                .returns(Promise.resolve([]));

            UserController
                .getManagement(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {management: []});
                })
                .then(done)
                .catch(done);
        });

        it('should return json if update password succeeded', done => {
            sandbox
                .stub(UserService, 'updatePassword')
                .returns(Promise.resolve());

            req.body = {
                user_id: 1,
                old_password: 'p1',
                password: 'p2'
            };

            UserController
                .patchMe(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {updated: true});
                })
                .then(done)
                .catch(done);
        });

        it('should return json if update phone succeeded', done => {
            sandbox
                .stub(UserService, 'updatePhone')
                .returns(Promise.resolve());

            req.body = {
                user_id: 1,
                phone: '013422366'
            };

            UserController
                .patchMe(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {updated: true});
                })
                .then(done)
                .catch(done);
        });

        it('should return json if update address succeeded', done => {
            sandbox
                .stub(UserService, 'updateAddress')
                .returns(Promise.resolve());

            req.body = {
                user_id: 1,
                address: '1 rue du yaourt'
            };

            UserController
                .patchMe(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {updated: true});
                })
                .then(done)
                .catch(done);
        });

        it('should return json if update user succeeded', done => {
            sandbox
                .stub(UserService, 'updateUser')
                .returns(Promise.resolve());

            req.params = {
                id: 1
            };

            UserController
                .updateUser(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {updated: true});
                })
                .then(done)
                .catch(done);
        });

        it('should return json if get user succeeded', done => {
            sandbox
                .stub(UserService, 'createUserById')
                .returns(Promise.resolve({}));

            req.params = {
                id: 1
            };

            UserController
                .getUserById(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {});
                })
                .then(done)
                .catch(done);
        });

        it('should return json if delete user succeeded', done => {
            sandbox
                .stub(UserService, 'deleteUserById')
                .returns(Promise.resolve({}));

            req.params = {
                id: 1
            };

            UserController
                .deleteUserById(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {deleted: true});
                })
                .then(done)
                .catch(done);
        });

        it('should return json if assign manager succeeded', done => {
            sandbox
                .stub(UserService, 'assignManager')
                .returns(Promise.resolve({}));

            req.params = {
                id: 1,
                managedId: 2
            };

            UserController
                .assignManager(req, res)
                .then(() => {
                    sinon.assert.calledWith(res.jsonp, {assigned: true});
                })
                .then(done)
                .catch(done);
        });

    });
});