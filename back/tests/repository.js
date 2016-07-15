'use strict';

const Repository = {
    init: (args) => {
        this.db = args.db;
    },
    clear: () =>
        this.db.query('DELETE FROM UserSkill')
            .then(() => this.db.query('DELETE FROM UserSkill'))
            .then(() => this.db.query('DELETE FROM UserRole'))
            .then(() => this.db.query('DELETE FROM User'))
            .then(() => this.db.query('DELETE FROM Skill'))
            .then(() => this.db.query('DELETE FROM Domain'))
};

module.exports = Repository;
