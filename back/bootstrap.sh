#! /bin/bash
set -e

node_modules/db-migrate/bin/db-migrate up --env prod

exec node_modules/pm2/bin/pm2 start configuration.json --no-daemon