const sinon = require('sinon');
const assert = require('assert');

const UserService = require('../../../src/user/user-service');
const UserRepository = require('../../../src/user/user-repository');

describe('UserService', () => {

    describe('Management', () => {
        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });
        afterEach(() => sandbox.restore());

        it('Get users grouped by managers order by manager name', done => {
            sandbox
                .stub(UserRepository, 'getManagement')
                .returns(Promise.resolve(
                    [
                        {user_id: 1, user_name: "Christophe Heubès", manager_id: null, manager_name: null},
                        {user_id: 2, user_name: "Alban Smadja", manager_id: 1, manager_name: "Christophe Heubès"},
                        {user_id: 3, user_name: "Benjamin Lacroix", manager_id: 2, manager_name: "Alban Smadja"}
                    ]));

            UserService
                .getManagement()
                .then(management => {
                    assert.deepEqual(management,
                        [
                            {
                                manager: {id: 2, name: "Alban Smadja"},
                                users: [
                                    {id: 3, name: "Benjamin Lacroix"}
                                ]
                            },
                            {
                                manager: {name: "Christophe Heubès", id: 1},
                                users: [
                                    {id: 2, name: "Alban Smadja"}
                                ]
                            },
                            {
                                manager: {name: null, id: null},
                                users: [
                                    {id: 1, name: "Christophe Heubès"}
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