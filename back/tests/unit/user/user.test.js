const assert = require('assert');
const moment = require('moment');

const User = require('../../../src/user/user');

describe('User', () => {

    it('should create user', done => {
        const user = new User({
            name: 'Julien',
            id: 1,
            email: 'jsmadja@xebia.fr',
            default_password: 0,
            diploma: '2014',
            phone: '01.43.00.65.78',
            manager_id: 2,
            address: `{"value" : "1 rue du Yaourt"}`
        });
        assert.deepEqual(user, {
            address: {
                value: '1 rue du Yaourt'
            },
            experienceCounter: moment().year() - 2014,
            gravatarUrl: '//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc',
            id: 1,
            manager_id: 2,
            default_password: false,
            name: 'Julien',
            phone: '01.43.00.65.78',
            readable_id: 'julien',
            seniority: 0,
            domains: undefined,
            score: undefined,
            availability_date: undefined,
            diploma: '2014',
            employee_date: undefined,
            home: undefined,
            github: undefined,
            linked_in: undefined,
            twitter: undefined
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
            manager_id: 2,
            seniority: 0
        });
        assert.deepEqual(user, {
            address: null,
            experienceCounter: moment().year() - 2014,
            gravatarUrl: '//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc',
            id: 1,
            manager_id: 2,
            name: 'Antoine Le Taxin',
            phone: '01.43.00.65.78',
            readable_id: 'antoine-le-taxin',
            seniority: 0,
            domains: undefined,
            score: undefined,
            availability_date: undefined,
            default_password: false,
            diploma: '2014',
            employee_date: undefined,
            home: undefined,
            github: undefined,
            linked_in: undefined,
            twitter: undefined
        });
        done();
    });

});