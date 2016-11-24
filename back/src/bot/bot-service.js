'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const UserService = require('../user/user-service');
const Command = require('./command');

const userToSlack = (user) => {

    const fields = [];

    fields.push({
        "title": "Année d'XP",
        "value": user.experienceCounter,
        "short": true
    });

    fields.push({
        "title": "Manageur",
        "value": (user.manager && user.manager.name) || '?',
        "short": true
    });

    const attachments = {
        attachments: [{
            "color": "#ececec",
            "author_name": user.name,
            "author_link": `http://localhost:3001/user/${user.readable_id}`,
            "author_icon": `http:${user.gravatarUrl}`,
            fields,
            "footer": "Skillz API",
            "footer_icon": "http://skillz.xebia.fr/images/logo.png",
            "ts": new Date()
        }]
    };

    _.each(user.domains, d => attachments.attachments.push({
        color: d.color,
        title: d.name || '?',
        fields: _.map(d.skills, s => ({
            "title": s.name,
            "value": `${_.repeat(':star:', s.level)}${s.interested ? ':heart:' : ''}`,
            "short": true
        }))
    }));

    return attachments;
};

module.exports = {
    process: (payload) => {
        const command = new Command(payload);
        switch (command.type) {
            case 'profile':
                return UserService.createUserByReadableId(command.value)
                    .then(user => {
                        return userToSlack(user);
                    });
            default:
                return Promise.reject(new Error('Unknown command'));
        }
    }
};