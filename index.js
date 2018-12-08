var express = require('express');
var app = express();
const latestVersion = require('latest-version');
const exec = require('child_process').exec;

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.get('/:package/latestversion', function(req, res) {
    if (req.params.package) {
        latestVersion(req.params.package)
            .then(
                async function(version) {
                    res.send(version);
                },
                async function(err) {
                    console.error(err);
                }
            );
    }
});

app.get('/:package/versions', function(req, res) {
    if (req.params.package) {
        exec('npm view ' + req.params.package + ' versions --json',
            async function(error, versions, err) {
                res.send(versions);
                if (error) {
                    console.error(error);
                }
            });
    }
});

app.listen(8000, function() {
    console.log('Listening on port 8000!')
})