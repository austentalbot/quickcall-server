var express = require('express');
var stripe = require('stripe');
var credentials = require('./credentials.js').process.env;
var app = express();
var port = process.env.PORT || 3000;

// express server config
require('./config/middleware.js')(app);

// route hanlder
require('./utility/routes')(app);

app.listen(port);
console.log('listening on',port);
