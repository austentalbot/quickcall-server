var mongoose = require('mongoose');
var GoogleStrategy = require('passport-google').Strategy;
var config = require('config');
var User = mongoose.model('User');

module.exports = new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({
      'username': profile.id
    }, function(err, oldUser) {
      if (oldUser) {
        return done(null, user);
      } else {
        
        var newUser = new User({
          name: profile.displayName,
          username: profile.username
        });
        newUser.save(function(err) {
          if (err) {
            console.log(err, false);
            throw err;
          }
          return done(null, user);
        });
      }
    });
  }
);
