/**
 * Module dependencies.
 */

var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var serveStatic = require('serve-static');

var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var helpers = require('view-helpers');
var config = require('config');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';
var cors = require('cors');


module.exports = function(app, passport) {
  // Swig templating engine settings
  if (env === 'development' || env === 'test') {
    swig.setDefaults({
      cache: false
    });
  }
  // set views path, template engine and default layout
  app.engine('html', swig.renderFile)
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'html');


  // expose package.json to views
  app.use(function(req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

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