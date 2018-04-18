const express = require('express');
const mapAPIKey = process.env.MAP_API_KEY;

var apiRouter = express.Router();
//api routes
apiRouter.get('/map/api-key', (req, res) => {
    //TODO: letting anyone access it is kind of silly, so better protect it with authentication.  
    res.send(mapAPIKey);
});

module.exports = apiRouter;