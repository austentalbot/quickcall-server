var mongoose = require('mongoose');
var phone = require('./call');
var config = require('config');


module.exports = function(app, passport) {
  app.post('/call', function(req, res) {
   phone.initialCall(req, res);
  });

  app.post('/xml-response', function(req, res) {
   phone.connectCall(req, res);
  });

  app.post('/login', passport.authenticate('google', {
    failureRedirect: '/login',
    failureFlash: true
  }), function(req, res) {
    res.redirect('/');
  });

  app.get('/auth/google', passport.authenticate('google'));
  
  app.get('/auth/google/return', passport.authenticate('google', {
    successRedirect:'/',failureRedirect: '/login'}));
};
