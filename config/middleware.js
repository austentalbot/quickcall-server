module.exports = function(app){
  var passport = require('passport');
  var cookieSession = require('cookie-session');
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cookieSession({secret:'otherLolcatz'}));
  app.use(passport.initialize());
  app.use(passport.session({secret: 'lolcatz'}));
};
