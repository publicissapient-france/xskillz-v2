'use strict';

var Promise = this.Promise || require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);
const host = 'localhost:' + (process.env.PORT || 8080);

const execute = (fn) =>
    fn
        .end((err) => {
            if (err) {
                console.error(err);
                return Promise.reject(err);
            }
        });

module.exports = {
    createUser: (name, email) =>
        execute(
            request
                .post(`${host}/users/signup`)
                .send({name, email, password: 'azerty'})),

    getUsers: (token) =>
        execute(
            request
                .get(`${host}/users`)
                .set('token', token)),

    getUserById: (id, token) =>
        execute(
            request
                .get(`${host}/users/${id}`)
                .set('token', token)),

    getUsersBySkill: (id, token) =>
        execute(
            request
                .get(`${host}/skills/${id}/users`)
                .set('token', token)),

    getRoot: () =>
        execute(
            request
                .get(`${host}/`)),

    signin: (email) =>
        execute(
            request
                .post(`${host}/signin`)
                .send({email, password: 'azerty'})),

    addSkill: (name, level, interested, token) =>
        execute(
            request
                .post(`${host}/me/skills`)
                .set('token', token)
                .send({name, level, interested})),

    getMe: (token) =>
        execute(
            request
                .post(`${host}/me`)
                .set('token', token)),

    getSkills: () =>
        execute(
            request
                .get(`${host}/skills`)),

    addDomain: (name, token) =>
        execute(
            request
                .post(`${host}/domains`)
                .set('token', token)
                .send({name})),

    deleteDomain: (id, token) =>
        execute(
            request
                .del(`${host}/domains/${id}`)
                .set('token', token)),

    deleteUser: (id, token) =>
        execute(
            request
                .del(`${host}/users/${id}`)
                .set('token', token)),

    assignManager: (id, managerId, token) =>
        execute(
            request
                .post(`${host}/users/${id}/manager/${managerId}`)
                .set('token', token)),

    getDomains: () =>
        execute(
            request
                .get(`${host}/domains`)),

    addSkillToDomain: (id, domain_id, token) =>
        execute(
            request
                .post(`${host}/domains/${domain_id}/skills`)
                .set('token', token)
                .send({id})),

    mergeSkills: (from, to, token) =>
        execute(
            request
                .put(`${host}/skills`)
                .set('token', token)
                .send({from, to}))
};