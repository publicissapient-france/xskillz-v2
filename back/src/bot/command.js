'use strict';

class Command {

    constructor(raw) {
        this.token = raw.token;
        this.team_id = raw.team_id;
        this.team_domain = raw.team_domain;
        this.channel_id = raw.channel_id;
        this.channel_name = raw.channel_name;
        this.user_id = raw.user_id;
        this.user_name = raw.user_name;
        this.command = raw.command;
        this.text = raw.text;
        this.response_url = raw.response_url;

        const text = raw.text.split(' ');
        this.type = text[0];
        this.value = text[1];
    }
}

module.exports = Command;