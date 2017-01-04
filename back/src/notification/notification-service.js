/**
 * To enable notification define:
 * MAILGUN_API_KEY: Your personal Mailgun API key
 * MAILGUN_DOMAIN: Your personal Mailgun Domain
 * MAILGUN_FROM: Sender of email
 * NOTIFICATION_WELCOME_PATH: path to utf8 file corresponding to welcome message
 */

const Promise = require('bluebird');
//noinspection JSUnresolvedFunction
const readFile = Promise.promisify(require("fs").readFile);
const util = require('util');

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const from = process.env.MAILGUN_FROM;

const notificationEnabled = apiKey && domain && from;

let mailgun = {};

const NotificationService = {};

NotificationService.TEMPLATE = {
    WELCOME: 'WELCOME'
};

NotificationService.notifyWelcome = data => {
    const filename = process.env.NOTIFICATION_WELCOME_PATH;
    if (filename) {
        return readFile(filename, 'utf8')
            .then(content => {
                //noinspection JSUnresolvedFunction
                return mailgun.messages().send({
                    from,
                    to: data.email,
                    subject: 'Confirmation inscription Skillz',
                    text: util.format(content, data.name)
                }).then(data => (data), error => {
                    throw error;
                });
            });
    }
    return Promise.resolve();
};

NotificationService.notify = (template, data) => {
    if (notificationEnabled) {
        mailgun = require('mailgun-js')({apiKey, domain});
        return NotificationService.notifyWelcome(data)
            .catch(() => {
                // ignore error
            });
    }
    return Promise.resolve();
};

module.exports = NotificationService;