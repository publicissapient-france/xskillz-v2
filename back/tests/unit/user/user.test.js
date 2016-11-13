const assert = require('assert');

const User = require('../../../src/user/user');

describe('User', () => {

    it('should create user', done => {
        const user = new User({
            name: 'Julien',
            id: 1,
            email: 'jsmadja@xebia.fr',
            diploma: '2014',
            phone: '01.43.00.65.78',
            manager_id: 2,
            address: `{"value" : "1 rue du Yaourt"}`
        });
        assert.deepEqual(user, {
            address: {
                value: '1 rue du Yaourt'
            },
            experienceCounter: 2,
            gravatarUrl: '//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc',
            id: 1,
            manager_id: 2,
            name: 'Julien',
            phone: '01.43.00.65.78',
            readable_id: 'julien'
        });
        done();
    });

    it('should create user with multiple segments in name', done => {
        const user = new User({
            name: 'Antoine Le Taxin',
            id: 1,
            email: 'jsmadja@xebia.fr',
            diploma: '2014',
            phone: '01.43.00.65.78',
            manager_id: 2
        });
        assert.deepEqual(user, {
            address: null,
            experienceCounter: 2,
            gravatarUrl: '//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc',
            id: 1,
            manager_id: 2,
            name: 'Antoine Le Taxin',
            phone: '01.43.00.65.78',
            readable_id: 'antoine-le-taxin'
        });
        done();
    });

});