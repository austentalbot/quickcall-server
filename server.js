var express = require('express');
var config = require('./config/config.js');
var app = express();
var port = process.env.PORT || 3000;            

//require middleware
require('./config/middleware.js')(app);

//add routes
require('./utility/routes')(app);

app.listen(port);

console.log('listening on',port);
