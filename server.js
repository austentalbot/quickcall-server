var fs = require('fs');
var express = require('express');
var passport = require('passport');
var config = require('./config/config.js');
var mongoose = require('mongoose');
var app = express();
var port = process.env.PORT || 3000;
var util = require('util');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('./users/user.js');
app.use(passport.initialize());
app.use(passport.session());

var client = config.google.clientID;
var secret = config.google.clientSecret;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: client,
  clientSecret: secret,
  callbackURL: "http://localhost:3000/auth/google/callback/",
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log(profile.id,'just logged in...')
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
          	username: profile.id
          });
          newUser.save(function(err,user){
            if(err){
              return done(null,err);
            }
            return done(null,user);
          });
        }
      });
      return done(null, profile);
    });
  }
));


var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
app.get('/', function(req, res){
  res.send('Index.html goes here');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'] }),
  function(req, res){});

// Bootstrap passport config
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// Bootstrap application settings
// require('./utility/express')(app, passport);

// // Bootstrap routes
// require('./utility/routes')(app, passport);

app.listen(port);
console.error('listening on',port)
