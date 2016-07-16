#! /bin/bash
set -e

npm i

node_modules/db-migrate/bin/db-migrate up --env container

exec node_modules/pm2/bin/pm2 start configuration.json --env container --no-daemon