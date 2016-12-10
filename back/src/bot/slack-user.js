'use strict';

const baseUrl = 'https://skillz.xebia.fr'; // TODO: get value dynamically
const _ = require('lodash');

class SlackUser {

    constructor(user) {
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
                fields
            }]
        };

        _(user.domains).take(3).each(d => attachments.attachments.push({
            color: d.color,
            title: `[${d.name || '?'}]`,
            fields: _(d.skills)
                .take(6)
                .map(s => ({
                    value: `<${baseUrl}/skills?name=${s.name}|${s.name}> ${_.repeat(':star:', s.level)}${s.interested ? ':heart:' : ''}`,
                    short: true
                }))
                .value()
        }));

        return attachments;
    }

}

module.exports = SlackUser;