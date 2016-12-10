const assert = require('assert');

const SlackUser = require('../../../src/bot/slack-user');

describe('SlackUser', () => {

    it('should convert user to slack response', () => {
        const user = {
            'name': 'Julien Smadja',
            'id': 137,
            'gravatarUrl': '//www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc',
            'experienceCounter': 10,
            'phone': '0659117231',
            'manager_id': 155,
            'readable_id': 'julien-smadja',
            'address': null,
            'seniority': 6,
            'domains': [
                {
                    'id': 9,
                    'name': 'Back',
                    'score': 25,
                    'color': '#e23d27',
                    'skills': [
                        {'id': 689, 'interested': true, 'level': 3, 'name': 'NodeJS'},
                        {'id': 552, 'interested': false, 'level': 3, 'name': 'Hibernate'},
                        {'id': 548, 'interested': false, 'level': 3, 'name': 'Java'}
                    ]
                },
                {
                    'id': 3,
                    'name': 'Craft',
                    'score': 20,
                    'color': '#afcd37',
                    'skills': [
                        {'id': 799, 'interested': false, 'level': 3, 'name': 'Intégration Continue'}]
                }],
            'score': 109,
            'availability_date': '2016-11-08T23:00:00.000Z',
            'manager': {
                'id': 155,
                'diploma': '2001-12-31T23:00:00.000Z',
                'email': 'cheubes@xebia.fr',
                'name': 'Christophe Heubès',
                'manager_id': 162,
                'phone': null,
                'address': null,
                'employee_date': null,
                'availability_date': null
            },
            'roles': ['manager', 'updates', 'skills', 'users', 'management', 'settings']
        };
        const slackUsers = new SlackUser(user);
        delete slackUsers.attachments[0].ts;
        assert.deepEqual(slackUsers,
            {
                "attachments": [
                    {
                        "author_icon": "http://www.gravatar.com/avatar/7cad4fe46a8abe2eab1263b02b3c12bc",
                        "author_link": "https://skillz.xebia.fr/user/julien-smadja",
                        "author_name": "Julien Smadja",
                        "color": "#ececec",
                        "fields": [
                            {
                                "short": true,
                                "title": "Année d'XP",
                                "value": 10
                            },
                            {
                                "short": true,
                                "title": "Manageur",
                                "value": "Christophe Heubès",
                            }
                        ]
                    },
                    {
                        "color": "#e23d27",
                        "fields": [
                            {
                                "short": true,
                                "value": "<https://skillz.xebia.fr/skills?name=NodeJS|NodeJS> :star::star::star::heart:"
                            },
                            {
                                "short": true,
                                "value": "<https://skillz.xebia.fr/skills?name=Hibernate|Hibernate> :star::star::star:"
                            },
                            {
                                "short": true,
                                "value": "<https://skillz.xebia.fr/skills?name=Java|Java> :star::star::star:"
                            }
                        ],
                        "title": "[Back]"
                    },
                    {
                        "color": "#afcd37",
                        "fields": [
                            {
                                "short": true,
                                "value": "<https://skillz.xebia.fr/skills?name=Intégration Continue|Intégration Continue> :star::star::star:"
                            }
                        ],
                        "title": "[Craft]"
                    }
                ]
            });
    });
});