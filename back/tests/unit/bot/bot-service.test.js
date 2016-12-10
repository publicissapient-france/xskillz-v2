const assert = require('assert');
const sinon = require('sinon');

const BotService = require('../../../src/bot/bot-service');
const UserService = require('../../../src/user/user-service');
const Command = require('../../../src/bot/command');

describe('BotService', () => {

    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return SlackUser if user has been found', done => {
        sandbox
            .stub(UserService, 'createUserByLogin')
            .returns(Promise.resolve([{}]));
        BotService
            .process(new Command({text: 'profile jsmadja'}))
            .then(slackUser => {
                assert.deepEqual(slackUser,
                    {
                        'attachments': [
                            {
                                'author_icon': 'http:undefined',
                                'author_link': 'https://skillz.xebia.fr/user/undefined',
                                'author_name': undefined,
                                'color': '#ececec',
                                'fields': [
                                    {
                                        'short': true,
                                        'title': 'Année d\'XP',
                                        'value': undefined
                                    },
                                    {
                                        'short': true,
                                        'title': 'Manageur',
                                        'value': '?'
                                    }
                                ]
                            }
                        ]
                    });
            })
            .then(done)
            .catch(done);
    });

    it('should return SlackUserSuggestion if user has not been found', done => {
        sandbox
            .stub(UserService, 'createUserByLogin')
            .returns(Promise.resolve());
        BotService
            .process(new Command({text: 'profile jsmadja'}))
            .then(slackUserSuggestion => {
                assert.deepEqual(slackUserSuggestion,
                    {
                        'text': 'Aucun résultat trouvé (ni profil, ni suggestion de profil).'
                    });
            })
            .then(done)
            .catch(done);
    });

});