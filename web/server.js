const http = require('http');
const express = require('express');
const app = express();

app.use(require('morgan')('short'));

(() => {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack/common.config');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));

    app.use(express.static(`${__dirname}/`));
})();

app.get(/.*/, function root(req, res) {
    res.sendFile(`${__dirname}/index.html`);
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3001, function onListen() {
    const address = server.address();
    console.log(`Browse http://localhost:${address.port}`);
});
