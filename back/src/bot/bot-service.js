'use strict';

const Promise = require('bluebird');
const UserService = require('../user/user-service');
const Command = require('./command');

module.exports = {
    process: (payload) => {
        const command = new Command(payload);
        switch (command.type) {
            case 'profile':
                return UserService.createUserByReadableId(command.value);
            default:
                return Promise.reject(new Error('Unknown command'));
        }
    }
};