'use strict';

const BotController = require('./bot-controller');

const BotRouter = {
    register: (express) => {
        express
            .route('/bot/skillz')
            .post(BotController.command)
    }
};

module.exports = BotRouter;
