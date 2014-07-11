var mongoose = require('mongoose');
var phone = require('./call');
var User = require('../QCDB/user.js');


module.exports = function(app, passport, User) {
  app.get('/', function(req,res){
    res.send('hello world');
  });
  
  app.post('/call', function(req, res) {
   phone.initialCall(req, res);
  });

  app.post('/xml-response', function(req, res) {
   phone.connectCall(req, res);
  });

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
    console.log(req.user.id,req.body.number);
    User.update(userQuery,phoneNumberQuery,null,function(err,userInfo){
      if(err){
        return err;
      }
    });
    res.redirect('/');
  });
  app.get('/auth/google', passport.authenticate('google',{scope:'https://www.googleapis.com/auth/userinfo.profile'}));
  
  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect:'/',failureRedirect: '/login'}));
};
