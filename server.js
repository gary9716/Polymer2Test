const prpl = require('prpl-server');
// Node.js notation for importing packages
const express = require('express');
const polymerBuildPath = './polymerApp/build';

// Spin up a server
var app = express();
var polymerConfig = require(polymerBuildPath + '/polymer.json');

//if you're using differential serving, don't forget to set autoBasePath to true in polymer.json located at root directory of polymer app.
app.use(express.static(polymerBuildPath));

//api routes
app.get('/api/launch', (req, res, next) => res.send('boom'));

//polymer route
app.get('/*', prpl.makeHandler(polymerBuildPath, polymerConfig));

// Tell the app to listen for requests on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});