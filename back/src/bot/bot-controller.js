'use strict';

const BotService = require('./bot-service');
const Controllers = require('../controllers.js');

const onError = Controllers.onError;

module.exports = {
    command: (req, res) =>
        BotService.process(req.body)
            .then(data => {
                res.json(data)
            })
            .catch(err => onError(err, res, 404))
};