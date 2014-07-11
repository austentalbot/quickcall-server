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

  // allow cross origin
  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(cookieParser());
  app.use(session({
    secret: 'stuff',
    store: new mongoStore({
      url: config.db,
      collection: 'sessions'
    })
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());
};
