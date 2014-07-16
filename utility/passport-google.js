var config = require('../config/config.js');
var User = require('../QCDB/user.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var client = config.google.clientID;
var secret = config.google.clientSecret;
var callback = config.google.CallbackURL;
/*setting up googlestrategy via config env.variables note
OAuth2Strategy at the end of the requirement statement
this is required in order to use google with OAuth2
OAuth2 is preferred over OAuth*/
module.exports = new GoogleStrategy({
  clientID: client,
  clientSecret: secret,
  callbackURL: callback,
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
  },
  function(accessToken, refreshToken, profile, done) {
    var fullName = profile._json.name;
    var id = profile.id;
    var picture = profile._json.picture;
    console.log(fullName,'just logged in...');
    console.log(profile._json.name);
    process.nextTick(function () {
      User.findOne({'username': profile.id},function(err,oldUser){
        if(err){
          return err;
        }
        if(oldUser){
          return done(null, profile);
        }
        else{
          var newUser = new User({
            username: id,
            fullName: fullName,
            picture: picture
          });
          newUser.save(function(err,user){
            if(err){
              console.log(err);
              return done(null,err);
            }
            return done(null,user);
          });
        }
      });
      return done(null, profile);
    });
  }
);
