# Kanban board

[![Stories in Ready](https://badge.waffle.io/xebia-france/xskillz-v2.png?label=ready&title=Ready)](https://waffle.io/xebia-france/xskillz-v2)

# Back

[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![Coverage Status](https://coveralls.io/repos/github/xebia-france/xskillz-v2/badge.svg?branch=master)](https://coveralls.io/github/xebia-france/xskillz-v2?branch=master) [![Build Status](https://travis-ci.org/xebia-france/xskillz-v2.svg?branch=master)](https://travis-ci.org/xebia-france/xskillz-v2)

<img src="web/images/logo.png" height="200px"/>

Skillz allows you to get a full overview of all your team mate's skills.

# License

`Skillz` is licensed under [Apache License](http://www.apache.org/licenses/LICENSE-2.0).

# HowTo

> Skillz works with Docker and Docker Compose, you need Docker and Docker Compose installed on your machine. See `docker-compose.yml`.

## Run Skillz

### Create database workspace (can be configured in `docker-compose.yml`)

```bash
sudo mkdir -p /opt/skillz/data
sudo chmod 777 /opt/skillz/data
```

### Run MySQL, back end and front end

```bash
docker-compose up -d db
docker-compose up -d back
docker-compose up -d web
```

Have a coffee, it takes some time.

## Contribute

### Step 0: Clone this repository

```bash
git clone git@github.com:xebia-france/xskillz-v2.git
cd xskillz-v2
```

### Step 2:

#### Web

> React + Redux + Babel (ES6)

```bash
cd web/
npm i
npm start
```

#### Back end

```
docker-compose up db
```

```
cd back/
npm i
npm run dev
```

### Role and permission

|Role|Description|
|----|-----------|
|users|Browse user by name|
|settings|Associate skill to category|
|management|Team of managed and manager|
|card|Commercial card|
|skills|Browse user by skill|
|Manager|Manage user|

## Techs

* NodeJS
* React
* Docker
* MySQL

Thanks to all those Open source projects which made such a project possible!
