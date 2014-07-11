<<<<<<< HEAD
=======
var mongoose = require('mongoose');
<<<<<<< HEAD:config/passport/google.js
>>>>>>> db386c7dba2acb4b98c8ea30637f1cca82686f75
var GoogleStrategy = require('passport-google-oauth').Strategy;
var config = require('config');
var User = require('../../users/user.js');
=======
var GoogleStrategy = require('passport-google-oauth').Strategy;
var config = require('../config/config');
// var User = mongoose.model('User');
>>>>>>> f8dd997b316e4f2cc2061e7b24126fbd173b8727:utility/passport-google.js

module.exports = new GoogleStrategy({
    consumerKey: config.google.consumerKey,
    consumerSecret: config.google.consumerSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({'username': profile.id}, function(err, oldUser) {
      if (oldUser) {
        return done(null, oldUser);
      } else {        
        var newUser = new User({
          username: profile.id,
          token: profile.id
        });
        newUser.save(function(err) {
          if (err) {
            done(err);
          }
          return done(null, user);
        });
      }
    });
  }
);
