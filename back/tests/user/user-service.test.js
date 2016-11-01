const sinon = require('sinon');
const assert = require('assert');

const UserService = require('../../src/user/user-service');
const UserRepository = require('../../src/user/user-repository');

describe('UserService', () => {

    describe('Management', () => {
        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });
        afterEach(() => sandbox.restore());
        it('Get users grouped by managers', done => {
            sandbox
                .stub(UserRepository, 'getManagement')
                .returns(Promise.resolve(
                    [
                        {
                            user_id: 1,
                            user_name: "Christophe Heubès"
                        },
                        {
                            user_id: 2,
                            user_name: "Julien Smadja",
                            manager_id: 1,
                            manager_name: "Christophe Heubès"
                        }
                    ]));

            UserService
                .getManagement()
                .then(management => {
                    assert.deepEqual(management,
                        [
                            {
                                manager: {
                                    name: "Christophe Heubès",
                                    id: 1
                                },
                                users: [
                                    {
                                        id: 2,
                                        name: "Julien Smadja"
                                    }
                                ]
                            },
                            {
                                manager: {
                                    name: undefined,
                                    id: undefined
                                },
                                users: [
                                    {
                                        id: 1,
                                        name: "Christophe Heubès"
                                    }
                                ]
                            }
                        ]
                    );
                })
                .then(done)
                .catch(done);
        });

    });
});