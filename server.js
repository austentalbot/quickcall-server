var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('./QCDB/user.js');
var Contacts = require('./QCDB/contacts.js');
var config = require('./config/config.js');

var app = express();

var port = process.env.PORT || 3000;

var connect = function () {
  mongoose.connect('mongodb://localhost/quickcall');
};

//connects us to use mongodb see line 13
connect();

//handles mongo conditions
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
            
//require middleware
require('./utility/passport.js')();
require('./config/middleware.js')(app);
//add routes
require('./utility/routes')(app, passport, User);
=======
// Connect to mongodb
// var connect = function () {
//   var options = { server: { socketOptions: { keepAlive: 1 } } };
//   mongoose.connect(config.db, options);
// };
// connect();

// mongoose.connection.on('error', console.log);
// mongoose.connection.on('disconnected', connect);

// Bootstrap models
// fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
//   if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
// });

// Bootstrap passport config
require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(port);
console.log('listening on',port);
