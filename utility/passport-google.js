var mongoose = require('mongoose');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var util = require('util')
var User = require('../users/user.js');
var config = require('../config/config');
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });


passport.deserializeUser(function(id, done) {
    done(err, user);
  });

 passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: "https://127.0.0.1:3000/auth/google/callback/"
  },
   function(accessToken, refreshToken, profile, done) {
    console.log('here');
    User.findOne({'username': profile.id}, function(err, oldUser) {
      if(err){
        return err;
      }
      if (oldUser) {
        return done(null, oldUser);
      } else {        
        var newUser = new User({
          username: profile.id,
        });
        newUser.save(function(err,user) {
          if (err) {
            done(err);
          }
          return done(null, user);
        });
      }
    });
  }))