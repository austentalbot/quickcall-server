var mongoose = require('mongoose');
var GoogleStrategy = require('passport-google-oauth').Strategy;
var User = require('../users/user.js');
var config = require('../config/config');


module.exports = new GoogleStrategy({
    consumerKey: config.google.consumerKey,
    consumerSecret: config.google.consumerSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    done(err, profile);
    // User.findOne({'username': profile.id}, function(err, oldUser) {
    //   if(err){
    //     return err;
    //   }
    //   if (oldUser) {
    //     return done(null, oldUser);
    //   } else {        
    //     var newUser = new User({
    //       username: profile.id,
    //     });
    //     newUser.save(function(err,user) {
    //       if (err) {
    //         done(err);
    //       }
    //       return done(null, user.username);
    //     });
    //   }
    // });
  }
);
