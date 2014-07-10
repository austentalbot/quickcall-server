/**
 * Module dependencies.
 */

// session
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

// db
var mongoStore = require('connect-mongo')(session);

// access to env
var config = require('config');
var env = process.env.NODE_ENV || 'development';


module.exports = function(app, passport) {

  // allow CORS
  app.use(cors());

  // cookieParser should be above session
  app.use(cookieParser());

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));


  // express/mongo session storage
  // app.use(session({
  //   secret: pkg.name,
  //   store: new mongoStore({
  //     url: config.db,
  //     collection: 'sessions'
  //   })
  // }));

  // use passport session
  // app.use(passport.initialize());
  // app.use(passport.session());
};