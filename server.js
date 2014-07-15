var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('./QCDB/user.js');
var Contacts = require('./QCDB/contacts.js');


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
app.listen(port);
console.log('listening on',port);