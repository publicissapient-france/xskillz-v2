'use strict';

const UserService = require('../user/user-service');
const SlackUser = require('./slack-user');
const SlackUserSuggestion = require('./slack-user-suggestion');

module.exports = {
    process: (command) =>
        UserService
            .createUserByLogin(command.value)
            .then(user => {
                if (user) {
                    return new SlackUser(user);
                }
                return UserService
                    .findMatchingUsers(command.value)
                    .then(users => new SlackUserSuggestion(users));
            })
};