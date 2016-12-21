'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const Security = require('../../src/security');

describe('Security', () => {

    it('should allow to access', done => {
        // GIVEN
        const req = {body: {user_id: 1, user_roles: ['users']}};
        const res = {status: () => ({send: sinon.spy()})};
        const next = sinon.spy();

        // WHEN
        Security.require(['users'])(req, res, next);

        // THEN
        expect(next.callCount).to.equal(1);
        expect(res.status().send.callCount).to.equal(0);
        done();
    });

    it('should not allow to access', done => {
        // GIVEN
        const req = {body: {user_id: 1}};
        const res = {status: () => ({send: sinon.spy()})};
        const next = sinon.spy();

        // WHEN
        Security.require(['users'])(req, res, next);

        // THEN
        expect(next.callCount).to.equal(0);
        expect(res.status().send.callCount).to.equal(1);
        done();
    });
});