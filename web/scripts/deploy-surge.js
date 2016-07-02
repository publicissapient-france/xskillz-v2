var exec = require('child_process').exec,
    fs = require('fs-extra');

const deployDir = 'deploy/surge';
const domainName = 'xskillz-dev.surge.sh';

process.chdir('../xskillz-web');

build = (cb) => {
    console.info('Building front app...');
    exec('npm install && npm --production run build', (err, stdout) => {
        if (err) throw err;
        console.info(stdout);
        cb();
    });
};

copy = () => {
    console.info('Copy files...');
    fs.mkdirs(deployDir, function (err) {
        if (err) return console.error(err);
        fs.emptyDir(deployDir, function (err) {
            if (!err) console.log('success!');
            fs.copy('dist/', deployDir + '/dist/', function (err) {
                if (err) return console.error(err);
                fs.copy('index.html', deployDir + '/index.html', function (err) {
                    if (err) return console.error(err);
                    fs.copy(deployDir + '/index.html', deployDir + '/200.html', function (err) {
                        fs.copy('manifest.json', deployDir + '/manifest.json', function (err) {
                            if (err) return console.error(err);
                            console.info('Successfully copied files');
                            deploy();
                        });
                    });
                });
            });
        });
    });
};

deploy = () => {
    console.info('Deploying to Surge...');

    exec('node_modules/surge/lib/cli.js -d ' + domainName + ' -p ' + deployDir, (err, stdout) => {
        if (err) throw err;
        console.info(stdout);
    });
};

build(copy);
