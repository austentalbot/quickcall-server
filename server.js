var express = require('express');
var passport = require('passport');
var config = require('./config/config.js');
var mongoose = require('mongoose');
var util = require('util');
var User = require('./QCDB/user.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var app = express();
app.use( bodyParser.urlencoded() );
app.use(bodyParser.json());
app.use(cookieSession({secret:'otherLolcatz'}));
app.use(passport.initialize());
app.use(passport.session({secret: 'lolcatz'}));
var port = process.env.PORT || 3000;

var connect = function () {
  //not sure what this does(part of boiler plate), keep it commented out!
  // var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect('mongodb://localhost/quickcall');
};
connect();

// mongoose.connection.on('error', console.log);
// mongoose.connection.on('disconnected', connect);

var client = config.google.clientID;
var secret = config.google.clientSecret;
//these methods are here to support persistent login storage
//in later refactors user.id should be stored in database
passport.serializeUser(function(user, done) {
  done(null, user);
});
//obj should also refer to said user in database
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
/*setting up googlestrategy via config env.variables note
 OAuth2Strategy at the end of the requirement statement
this is required in order to use google with OAuth2
which is preferred*/
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
    console.log(profile.id,'just logged in...');
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
              console.log(err)
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

app.get('/', function(req, res){
  res.send('Index.html goes here');
});
User.find(function(err,r){if(err){console.log(err)}console.log(r)})
app.get('/auth/google',
  passport.authenticate('google',{session:true}, 
  {scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ] 
  }),
  //generic response function to google don't delete!
  function(req, res){});

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});

app.post('/enternumber',function(req,res){
  //get current users token and query it
  var userQuery = {username: req.user.id};
  //get phonenumber being sent from client and use to set current
  //users phonenumber in db 
  var phoneNumberQuery = {phonenumber:req.body.number};
  User.update(userQuery,phoneNumberQuery,null,function(err,userInfo){
    if(err){
      return err;
    }
    console.log(userInfo,'added phonenumber')
  });
  res.redirect('/');
});


       /////////////////////////////////////////////////////
      //  //  leave commented out until refactor           
     // // Bootstrap application settings                  
    // require('./utility/express')(app, passport);    
   // 											      
  // // Bootstrap routes						     
 // require('./utility/routes')(app, passport);     
app.listen(port);
console.error('listening on',port);