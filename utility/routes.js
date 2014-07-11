var mongoose = require('mongoose');
var phone = require('call');
var config = require('config');


module.exports = function(app, passport) {
  app.post('/call', function(req, res) {
   phone.makecalls(req, res);
  });

  app.post('/xml-response', function(req, res) {
    var dstNum = req.body.dst;
    // should get the number to call
    var r = new plivo.Response();
    var dialElement = r.addDial();
    // get the target number
    dialElement.addNumber(dstNum);
    r.addSpeak('Awesome', {
      loop: 2
    });
    var xmlRes = r.toXML();
    res.send(200, xmlRes);
  });

  app.post('/login', passport.authenticate('google', {
    failureRedirect: '/login',
    failureFlash: true
  }), function(req, res) {
    res.redirect('/');
  });

  app.get('/auth/google', passport.authenticate('google'));
  
  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
  }), function(req, res) {
    res.redirect('/');
  });
};
