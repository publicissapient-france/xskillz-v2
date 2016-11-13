'use strict';

const gravatar = require('gravatar');

class User {

    constructor(raw) {
        this.name = raw.name;
        this.id = raw.id;
        this.gravatarUrl = gravatar.url(raw.email);
        this.experienceCounter = raw.diploma ? new Date().getFullYear() - new Date(raw.diploma).getFullYear() : 0;
        this.phone = raw.phone;
        this.manager_id = raw.manager_id;
        this.readable_id = raw.name.toLowerCase().replace(/ /g, "-");
        this.address = raw.address ? JSON.parse(raw.address) : null;
    }
}

module.exports = User;