var GoogleStrategy = require('passport-google-oauth').Strategy;
var config = require('config');
var User = require('../../users/user.js');

module.exports = new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
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
