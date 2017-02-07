require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const Promise = require('bluebird');

const room = process.env.HIPCHAT_ROOM;

const BotService = {};

BotService.MESSAGES = {
    WELCOME: 'WELCOME'
};

BotService.notifyWelcome = data => {
    return fetch(room, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            color: 'green',
            message: `${data.name} (${data.email}) s'est inscrit sur Skillz !`,
            notify: true,
            message_format: 'text'
        }),
    }).then(() => {
        //ignore success
    }).catch(() => {
        //ignore error
    });
};

BotService.notify = (template, data) => {
    if (room) {
        return BotService.notifyWelcome(data);
    }
    return Promise.resolve();
};

module.exports = BotService;