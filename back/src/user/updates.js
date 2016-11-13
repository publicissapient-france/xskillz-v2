'use strict';

const User = require('./user');

class Updates {

    constructor(userUpdates) {
        const user = userUpdates[0];
        this.user = new User({
            name: user.user_name,
            id: user.user_id,
            diploma: user.user_diploma,
            email: user.user_email
        });
        this.updates = userUpdates.map(userUpdate => {
            return {
                id: userUpdate.user_skill_id,
                skill: {
                    id: userUpdate.skill_id,
                    interested: userUpdate.skill_interested[0] === 1,
                    level: userUpdate.skill_level,
                    name: userUpdate.skill_name,
                    color: userUpdate.color,
                    domain: userUpdate.domain_name
                },
                date: userUpdate.skill_date
            };
        });
    }

}

module.exports = Updates;