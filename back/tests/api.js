'use strict';

var Promise = this.Promise || require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);
const host = 'localhost:' + (process.env.PORT || 8080);

module.exports = {
    createUser: (name, email) =>
        request
            .post(`${host}/users`)
            .send({name, email, password: 'azerty'})
            .end((err) => {
                if (err) Promise.reject(err);
            }),

    getUsers: (token) =>
        request
            .get(`${host}/users`)
            .set('token', token)
            .end((err) => {
                if (err) Promise.reject(err);
            }),

    getRoot: () =>
        request
            .get(`${host}/`)
            .end((err) => {
                if (err) Promise.reject(err);
            }),

    signin: (email) =>
        request.post(`${host}/signin`)
            .send({email, password: 'azerty'})
            .end((err) => {
                if (err) Promise.reject(err);
            }),

    addSkill: (name, level, interested, token) =>
        request
            .post(`${host}/me/skills`)
            .set('token', token)
            .send({name, level, interested})
            .end((err) => {
                if (err) Promise.reject(err);
            }),

    getSkills: () =>
        request
            .get(`${host}/skills`)
            .end((err) => {
                if (err) Promise.reject(err);
            }),

    addDomain: (name) =>
        request
            .post(`${host}/domains`)
            .send({name})
            .end((err) => {
                if (err) Promise.reject(err);
            }),

    deleteDomain: (id) =>
        request
            .del(`${host}/domains/${id}`)
            .end((err) => {
                if (err) Promise.reject(err);
            }),

    getDomains: () =>
        request
            .get(`${host}/domains`)
            .end((err) => {
                if (err) Promise.reject(err);
            }),

    addSkillToDomain: (id, domain_id, token) =>
        request
            .post(`${host}/domains/${domain_id}/skills`)
            .set('token', token)
            .send({id})
            .end((err) => {
                if (err) return Promise.reject(err);
            }),

    mergeSkills: (from, to, token) =>
        request
            .put(`${host}/skills`)
            .set('token', token)
            .send({from, to})
            .end((err) => {
                if (err) return Promise.reject(err);
            }),

    getUpdates: (token) =>
        request
            .get(`${host}/updates`)
            .set('token', token)
            .end((err) => {
                if (err) return Promise.reject(err);
            })
};