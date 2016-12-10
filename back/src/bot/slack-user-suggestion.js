'use strict';

const _ = require('lodash');

class SlackUserSuggestion {

    constructor(users) {
        if (users.length === 0) {
            return {
                "text": "Aucun résultat trouvé (ni profil, ni suggestion de profil)."
            };
        }
        return {
            "text": "Profil non trouvé, peut-être devriez-vous réessayer avec l'une de ces valeurs",
            "attachments": [
                {
                    "text": _(users).map(user => user.email.split('@')[0]).join(', ')
                }
            ]
        };
    }
}

module.exports = SlackUserSuggestion;