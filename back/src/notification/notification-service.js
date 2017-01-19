/**
 * To enable mailgun notification define:
 * MAILGUN_API_KEY: Your personal Mailgun API key
 * MAILGUN_DOMAIN: Your personal Mailgun Domain
 * MAILGUN_FROM: Sender of email
 * NOTIFICATION_WELCOME_PATH: path to utf8 file corresponding to welcome message
 *
 * To enable AWS SES notification define:
 * AWS_ACCESS_KEY_ID: Your personal key id
 * AWS_SECRET_ACCESS_KEY: Your personal secret key
 * AWS_SES_REGION: Region used by SES
 */

const Promise = require('bluebird');
//noinspection JSUnresolvedFunction
const readFile = Promise.promisify(require("fs").readFile);
const util = require('util');
const nodemailer = require('nodemailer');

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const from = process.env.MAIL_FROM;

const mailgunEnabled = apiKey && domain && from;

const awsKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsRegion = process.env.AWS_SES_REGION;

const awsEnabled = awsKeyId && awsSecretKey && awsRegion;

let mailgun = {};

const NotificationService = {};

NotificationService.TEMPLATE = {
    WELCOME: 'WELCOME',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD'
};

NotificationService.notifyWelcome = data => {
    const filename = process.env.NOTIFICATION_WELCOME_PATH;
    if (filename && mailgunEnabled) {
        mailgun = require('mailgun-js')({apiKey, domain});
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

NotificationService.notifyChangePassword = data => {
    const filename = process.env.NOTIFICATION_PASSWORD_CHANGE_PATH;
    if (filename && awsEnabled) {
        return readFile(filename, 'utf8')
            .then(content => {
                const transporterSES = nodemailer.createTransport({
                    transport: 'ses',
                    accessKeyId: awsKeyId,
                    secretAccessKey: awsSecretKey,
                    region: awsRegion
                });
                const sendMail = Promise.promisify(transporterSES.sendMail).bind(transporterSES);
                let text = util.format(content, data.id, data.token);
                const options = {
                    from,
                    to: data.email,
                    subject: 'Ré-initialisation mot de passe Skillz',
                    text,
                    html: text
                };
                return sendMail(options)
                    .then(data => (data))
                    .catch(error => {
                        throw error;
                    });
            });
    }
};

NotificationService.notify = (template, data) => {
    if (template === NotificationService.TEMPLATE.WELCOME) {
        return NotificationService.notifyWelcome(data)
            .catch(() => {
                // ignore error
            });
    } else if (template === NotificationService.TEMPLATE.CHANGE_PASSWORD) {
        return NotificationService.notifyChangePassword(data)
            .catch(() => {
                // ignore error
            });
    }
    return Promise.resolve();
};

module.exports = NotificationService;