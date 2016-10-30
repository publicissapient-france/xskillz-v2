'use strict';

const Repository = require('./user-repository');
const _ = require('lodash');

const toSimpleUserObject = (user) => ({id: user.user_id, name: user.user_name});

const groupUsersByManager = (users) => {
    const managersById = _(users).keyBy('manager_id').value();
    const usersByManagers = _(managersById)
        .keys()
        .map((manager_id) => {
            const manager = {
                manager: {
                    name: managersById[manager_id].manager_name,
                    id: managersById[manager_id].manager_id
                },
                users: _(users)
                    .filter((user) => user.manager_id == manager_id)
                    .map(toSimpleUserObject)
                    .value()
            };
            if (manager_id === 'undefined') {
                manager.users = _(users).filter((user) => !user.manager_id)
                    .map(toSimpleUserObject)
                    .value()
            }
            return manager;
        })
        .value();

    return Promise.resolve(usersByManagers);
};
module.exports = {
    init: (args) => {
        this.Repository = args.UserRepository || Repository;
        this.Repository.init(args);
    },

    getManagement: () =>
        this.Repository
            .getManagement()
            .then(groupUsersByManager)
};