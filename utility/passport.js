var mongoose = require('mongoose');
var User = require('../users/user.js');
var google = require('./passport-google');

module.exports = function (passport, config) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });


// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

  passport.deserializeUser(function(id, done) {
    User.findOne({ username: id }, function (err, user) {
      done(err, user);
    });
  });

  passport.use(google);
};
