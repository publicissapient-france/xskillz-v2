'use strict';

const BotService = require('./bot-service');
const Controllers = require('../controllers.js');
const Command = require('./command');

const onError = Controllers.onError;

module.exports = {
    command: (req, res) =>
        BotService.process(new Command(req.body))
            .then(data => {
                res.jsonp(data);
            })
            .catch(err => onError(err, res, 404))
};