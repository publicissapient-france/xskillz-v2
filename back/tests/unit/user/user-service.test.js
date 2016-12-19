const sinon = require('sinon');
const assert = require('assert');
const Promise = require('bluebird');

const UserService = require('../../../src/user/user-service');
const UserRepository = require('../../../src/user/user-repository');
const SkillService = require('../../../src/skill/skill-service');

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

    describe('User', () => {
        let sandbox;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });
        afterEach(() => sandbox.restore());

        it('It should not attach manager if it does not have one', done => {
            const user = {id: 1, name: 'Julien'};
            UserService
                .attachManager(user)
                .then((_user) => {
                    assert.deepEqual(_user, user);
                })
                .then(done)
                .catch(done);
        });
        it('It should attach manager if it does have one', done => {
            sandbox
                .stub(UserRepository, 'findUserById')
                .returns(Promise.resolve({user_id: 1, user_name: "Christophe Heubès"}));

            const user = {id: 1, name: 'Julien', manager_id: 12};
            UserService
                .attachManager(user)
                .then((_user) => {
                    assert.deepEqual(_user, {
                        id: 1,
                        name: 'Julien',
                        manager_id: 12,
                        manager: {user_id: 1, user_name: "Christophe Heubès"}
                    });
                })
                .then(done)
                .catch(done);
        });

        it('should update user diploma', done => {
            const userId = 234;
            const body = {
                diploma: '2015-01-01'
            };

            const updateUserDiploma =
                sandbox
                    .stub(UserRepository, 'updateUserDiploma')
                    .returns(Promise.resolve());

            UserService
                .updateUser(userId, body)
                .then(() => {
                    sinon.assert.calledWith(updateUserDiploma, userId, body);
                })
                .then(done)
                .catch(done);
        });

        it('should update user employee date', done => {
            const userId = 234;
            const body = {
                employee_date: '2015-01-01'
            };

            const updateUserEmployeeDate =
                sandbox
                    .stub(UserRepository, 'updateUserEmployeeDate')
                    .returns(Promise.resolve());

            UserService
                .updateUser(userId, body)
                .then(() => {
                    sinon.assert.calledWith(updateUserEmployeeDate, userId, body);
                })
                .then(done)
                .catch(done);
        });

        it('should update user employee end date', done => {
            const userId = 234;
            const body = {
                employee_end_date: '2015-01-01'
            };

            const updateUserEmployeeEndDate =
                sandbox
                    .stub(UserRepository, 'updateUserEmployeeEndDate')
                    .returns(Promise.resolve());

            UserService
                .updateUser(userId, body)
                .then(() => {
                    sinon.assert.calledWith(updateUserEmployeeEndDate, userId, body);
                })
                .then(done)
                .catch(done);
        });

        it('should update user availability date', done => {
            const userId = 234;
            const body = {
                availability_date: '2015-01-01'
            };

            const updateUserAvailabilityDate =
                sandbox
                    .stub(UserRepository, 'updateUserAvailabilityDate')
                    .returns(Promise.resolve());

            UserService
                .updateUser(userId, body)
                .then(() => {
                    sinon.assert.calledWith(updateUserAvailabilityDate, userId, body);
                })
                .then(done)
                .catch(done);
        });

        it('should update password', done => {
            const userId = 234;
            const oldPassword = 'p1';
            const newPassword = 'p2';

            const updatePassword =
                sandbox
                    .stub(UserRepository, 'updatePassword')
                    .returns(Promise.resolve());

            UserService
                .updatePassword(userId, oldPassword, newPassword)
                .then(() => {
                    sinon.assert.calledWith(updatePassword, userId, oldPassword, newPassword);
                })
                .then(done)
                .catch(done);
        });

        it('should update password', done => {
            const userId = 234;
            const phone = '0134567897';

            const updatePhone =
                sandbox
                    .stub(UserRepository, 'updatePhone')
                    .returns(Promise.resolve());

            UserService
                .updatePhone(userId, phone)
                .then(() => {
                    sinon.assert.calledWith(updatePhone, userId, phone);
                })
                .then(done)
                .catch(done);
        });

        it('should update address', done => {
            const userId = 234;
            const address = '1 rue du yaourt';

            const updateAddress =
                sandbox
                    .stub(UserRepository, 'updateAddress')
                    .returns(Promise.resolve());

            UserService
                .updateAddress(userId, address)
                .then(() => {
                    sinon.assert.calledWith(updateAddress, userId, address);
                })
                .then(done)
                .catch(done);
        });

        it('should promote to manager', done => {
            const userId = 234;

            sandbox
                .stub(UserRepository, 'findUserById')
                .returns(Promise.resolve({id: userId}));

            const addRole = sandbox
                .stub(UserRepository, 'addRole')
                .returns(Promise.resolve());

            UserService
                .promoteToManager(userId)
                .then(() => {
                    sinon.assert.calledWith(addRole, {id: userId}, 'Manager');
                })
                .then(done)
                .catch(done);
        });

        it('should assign manager to user', done => {
            const userId = 234;
            const managerId = 123;

            const assignManager = sandbox
                .stub(UserRepository, 'assignManager')
                .returns(Promise.resolve());

            UserService
                .assignManager(userId, managerId)
                .then(() => {
                    sinon.assert.calledWith(assignManager, userId, managerId);
                })
                .then(done)
                .catch(done);
        });

        it('should get users', done => {
            sandbox
                .stub(UserRepository, 'getUsers')
                .returns(Promise.resolve([{id: 1, diploma: '2010', name: 'Julien', employee_date: '2013'}]));

            UserService
                .getUsers({})
                .then((users) => {
                    assert.deepEqual(users, [
                        {
                            address: null,
                            experienceCounter: 6,
                            gravatarUrl: '//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48',
                            id: 1,
                            manager_id: undefined,
                            name: 'Julien',
                            phone: undefined,
                            readable_id: 'julien',
                            seniority: 3,
                            score: undefined,
                            domains: undefined,
                            availability_date: null
                        }
                    ]);
                })
                .then(done)
                .catch(done);
        });

        it('should get users with roles', done => {
            sandbox
                .stub(UserRepository, 'getUsersWithRoles')
                .returns(Promise.resolve([{id: 1, diploma: '2010', name: 'Julien'}]));

            UserService
                .getUsers({with_roles: 'Manager'})
                .then((users) => {
                    assert.deepEqual(users, [
                        {
                            address: null,
                            experienceCounter: 6,
                            gravatarUrl: '//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48',
                            id: 1,
                            manager_id: undefined,
                            name: 'Julien',
                            phone: undefined,
                            readable_id: 'julien',
                            seniority: 0,
                            score: undefined,
                            domains: undefined,
                            availability_date: null
                        }
                    ]);
                })
                .then(done)
                .catch(done);
        });

        it('should get users (mobile)', done => {
            sandbox
                .stub(UserRepository, 'getUsers')
                .returns(Promise.resolve([{id: 1, diploma: '2010', name: 'Julien'}]));

            sandbox
                .stub(UserRepository, 'findUserById')
                .returns(Promise.resolve({id: 1, diploma: '2010', name: 'Julien'}));

            sandbox
                .stub(SkillService, 'findUserSkillsById')
                .returns(Promise.resolve([]));

            sandbox
                .stub(UserRepository, 'findUserRolesById')
                .returns(Promise.resolve([]));

            UserService
                .getUsersMobileVersion({})
                .then((users) => {
                    assert.deepEqual(users, [
                        {
                            address: null,
                            experienceCounter: 6,
                            gravatarUrl: '//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48',
                            id: 1,
                            manager_id: undefined,
                            name: 'Julien',
                            phone: undefined,
                            readable_id: 'julien',
                            domains: [],
                            roles: [],
                            score: 0,
                            seniority: 0,
                            availability_date: null
                        }
                    ]);
                })
                .then(done)
                .catch(done);
        });

        it('should get users with roles (mobile)', done => {
            sandbox
                .stub(UserRepository, 'getUsersWithRoles')
                .returns(Promise.resolve([{id: 1, diploma: '2010', name: 'Julien'}]));

            sandbox
                .stub(UserRepository, 'findUserById')
                .returns(Promise.resolve({id: 1, diploma: '2010', name: 'Julien'}));

            sandbox
                .stub(SkillService, 'findUserSkillsById')
                .returns(Promise.resolve([]));

            sandbox
                .stub(UserRepository, 'findUserRolesById')
                .returns(Promise.resolve([]));

            UserService
                .getUsersMobileVersion({with_roles: 'Manager'})
                .then((users) => {
                    assert.deepEqual(users, [
                        {
                            address: null,
                            experienceCounter: 6,
                            gravatarUrl: '//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48',
                            id: 1,
                            manager_id: undefined,
                            name: 'Julien',
                            phone: undefined,
                            readable_id: 'julien',
                            domains: [],
                            roles: [],
                            score: 0,
                            seniority: 0,
                            availability_date: null
                        }
                    ]);
                })
                .then(done)
                .catch(done);
        });

        it('should get users web version', done => {
            sandbox
                .stub(UserRepository, 'getWebUsersWithRoles')
                .returns(Promise.resolve([
                    {
                        id: 1,
                        diploma: '2010',
                        email: 'jsmadja@xebia.fr',
                        user_name: 'Julien',
                        user_id: 2,
                        domain_id: 4,
                        domain_name: 'Back',
                        domain_score: 7,
                        domain_color: 'black'
                    }
                ]));

            UserService
                .getUsersWebVersion({with_roles: 'Manager'})
                .then((users) => {
                    assert.deepEqual(users, [
                        {
                            domains: [
                                {
                                    color: 'black',
                                    id: 4,
                                    name: 'Back',
                                    score: 7
                                }
                            ],
                            experienceCounter: 6,
                            gravatarUrl: '//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48',
                            id: 2,
                            name: 'Julien',
                            readable_id: 'julien',
                            score: 7,
                            manager_id: undefined,
                            address: null,
                            phone: undefined,
                            seniority: 0,
                            availability_date: null
                        }
                    ]);
                })
                .then(done)
                .catch(done);
        });

        it('should delete user', done => {
            const userId = 234;

            const deleteUserById =
                sandbox
                    .stub(UserRepository, 'deleteUserById')
                    .returns(Promise.resolve());

            UserService
                .deleteUserById(userId)
                .then(() => {
                    sinon.assert.calledWith(deleteUserById, userId);
                })
                .then(done)
                .catch(done);
        });

    });
});