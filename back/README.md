# Back

[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![Coverage Status](https://coveralls.io/repos/github/xebia-france/xskillz-v2/badge.svg?branch=master)](https://coveralls.io/github/xebia-france/xskillz-v2?branch=master) [![Build Status](https://travis-ci.org/xebia-france/xskillz-v2.svg?branch=master)](https://travis-ci.org/xebia-france/xskillz-v2)

# How To

## Install all dependencies

>npm i

## Launch all tests (unit, integration, end-to-end)

>npm test

## Run server (dev mode)

>npm run dev

## Run server (production mode)

>npm start

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

