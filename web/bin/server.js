const fs = require('fs');

const babelrc = fs.readFileSync('./.babelrc');
let config;

try {
    config = JSON.parse(babelrc);
} catch (err) {
    console.error('Cannot parse your .babelrc.');
    console.error(err);
}

require('babel-core/register')(config);
require('../server');