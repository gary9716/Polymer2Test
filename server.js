//modules
require('dotenv').config();
const prpl = require('prpl-server');
const express = require('express');
const apiRouter = require(__dirname + '/api-router');

//constants
const port = process.env.PORT? process.env.PORT:3000;
const appMode = process.env.APP_MODE? process.env.APP_MODE : 'development'; 
const polymerBuildPath = __dirname + '/polymerApp/build';
const polymerAppRootPath = __dirname + '/polymerApp';
const polymerConfig = require(polymerBuildPath + '/polymer.json');

//express server setup 
var app = express();
app.use('/api', apiRouter); //let apiRouter handle api routing

if(appMode === 'production') {
    //if you're using differential serving, don't forget to set autoBasePath to true in polymer.json located at root directory of polymer app.
    app.use(express.static(polymerBuildPath));

    //polymer route
    app.get('/*', prpl.makeHandler(polymerBuildPath, polymerConfig));
}
else {
    app.use(express.static(polymerAppRootPath));
    
    //polymer route
    app.get('/*', prpl.makeHandler(polymerAppRootPath, {
        entrypoint: "index.html"
    }));
}

app.listen(port, function () {
  console.log('server listening on port ' + port + ' in ' + appMode + ' mode');
});