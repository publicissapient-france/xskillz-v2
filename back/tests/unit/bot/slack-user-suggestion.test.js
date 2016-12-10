const assert = require('assert');

const SlackUserSuggestion = require('../../../src/bot/slack-user-suggestion');

describe('SlackUserSuggestion', () => {

    it('should convert to user suggestions', () => {
        const users = [
            {email: 'jsmadja@xebia.fr'},
            {email: 'blacroix@xebia.fr'}
        ];

        const slackUserSuggestion = new SlackUserSuggestion(users);
        assert.deepEqual(slackUserSuggestion,
            {
                attachments: [
                    {
                        text: 'jsmadja, blacroix'
                    }
                ],
                text: 'Profil non trouvé, peut-être devriez-vous réessayer avec l\'une de ces valeurs'
            });
    });

    it('should return message if no profile nor suggestion found', () => {
        const users = [];
        const slackUserSuggestion = new SlackUserSuggestion(users);
        assert.deepEqual(slackUserSuggestion,
            {
                text: 'Aucun résultat trouvé (ni profil, ni suggestion de profil).'
            });
    });

});