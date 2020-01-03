'use strict';
var path = require('path');
var express = require('express');               // call express
var routes = require('./routes');
var bodyParser = require('body-parser');
var config = require('../app/www/config.json');;

var app = express();                            // define our app using express
var router = express.Router();                  // get an instance of the express Router
var routing = routes.Get(router, config);

app.use(bodyParser.json({ limit: '5mb' }));                                                         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb'} ) );                              // to support URL-encoded bodies

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/api', routing);                                                          //register our routes prefixed with '/api'
app.use('/', express.static( path.normalize(__dirname + '/../app/www/') ) );       //serve static resources in www

// START THE SERVER
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Magic happens on port ' + port);