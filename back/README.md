# Back

[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![Coverage Status](https://coveralls.io/repos/github/xebia-france/xskillz-v2/badge.svg?branch=master)](https://coveralls.io/github/xebia-france/xskillz-v2?branch=master) [![Build Status](https://travis-ci.org/xebia-france/xskillz-v2.svg?branch=master)](https://travis-ci.org/xebia-france/xskillz-v2)

# How To

## Install all dependencies

>npm i

## Launch all tests (unit, integration, end-to-end)

First, start the test database with :

>docker-compose up db_tests 

Then

>npm test

## Run server (dev mode)

>npm run dev

You can then check the following URLs :

* [http://localhost:8080/users]()
* [http://localhost:8080/users/1]()
* [http://localhost:8080/web/users]()
* [http://localhost:8080/mobile/users]()
* [http://localhost:8080/skills]()

## Run server (production mode)

First, start the production database with :

>docker-compose up db 

Then

>npm start

You can check the process with [PM2](http://pm2.keymetrics.io/) by passing the process id (`pm2 show <pid>`). Check the logs under  `~/.pm2/logs`. Shutdown the process with `pm2 stop <pid>`


## Create SQL migration file

Go to database and type

>db-migrate create *feature_name*

## Run SQL migration

>db-migrate up --env dev

## Connect Skillz to slack

You can control skillz with slack  by adding a slach command on your slack team.

1. Go to your custom integrations > https://YOUR_SLACK_DOMAIN.slack.com/apps/manage/custom-integrations
2. Add a slash command with URL : http://YOUR_SKILLZ_API_URL/bot/skillz (method POST), for example '/skillz'
3. Save integration

Now you can use ```/skillz profile firstname-lastname``` on slack to view a user's profile

If you run skillz on localhost you can use tool like [ngrok](https://ngrok.com) to expose your local server to internet 

## Notification

Skillz can notify users by email.

Notification available for now:

- Welcome message when user subscribe

To enable email notification you need to configure Mailgun in environment variable:

```
MAILGUN_API_KEY: Your personal Mailgun API key
MAILGUN_DOMAIN: Your personal Mailgun Domain
MAILGUN_FROM: Sender of email
NOTIFICATION_WELCOME_PATH: path to utf8 file corresponding to welcome message
```
