'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const moment = require('moment');
const UserService = require('../user/user-service');

const Command = require('./command');

const COMMAND_TYPE = {
    profile: 'profile'
};

const baseUrl = 'http://localhost:3001'; // TODO: get value dynamically

const userToSlack = (user) => {

    const fields = [];

    fields.push({
        "title": 'Année d\'XP',
        "value": user.experienceCounter,
        "short": true
    });

    fields.push({
        "title": 'Manageur',
        "value": (user.manager && user.manager.name) || '?',
        "short": true
    });

    const attachments = {
        attachments: [{
            color: '#ececec',
            author_name: user.name,
            author_link: `${baseUrl}/user/${user.readable_id}`,
            author_icon: `http:${user.gravatarUrl}`,
            fields,
            footer: 'Skillz API',
            footer_icon: 'http://skillz.xebia.fr/images/logo.png',
            ts: moment().unix()
        }]
    };

    _.each(user.domains, d => attachments.attachments.push({
        color: d.color,
        title: `[${d.name || '?'}]`,
        fields: _.map(d.skills, s => ({
            value: `<${baseUrl}/skills?name=${s.name}|${s.name}> ${_.repeat(':star:', s.level)}${s.interested ? ':heart:' : ''}`,
            short: true
        }))
    }));

    return attachments;
};

module.exports = {
    process: (payload) => {
        const p = new Promise(function (resolve, reject) {
            const command = new Command(payload);
            switch (command.type) {
                case COMMAND_TYPE.profile:
                    return UserService.createUserByReadableId(command.value)
                        .then(user => {
                            return resolve(userToSlack(user));
                        }).catch(reject);
                default:
                    return reject(new Error('Unknown command'));
            }
        });
        return p.catch(err => Promise.reject(err));
    }
};