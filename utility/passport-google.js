var mongoose = require('mongoose');

var GoogleStrategy = require('passport-google-oauth').Strategy;
var User = require('../users/user.js');
var config = require('../config/config');


// var User = mongoose.model('User');
// NEED TO LOAD SIGNUPUSER METHOD 

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
