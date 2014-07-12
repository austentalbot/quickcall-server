var passport = require('passport');
var google = require('./passport-google');

//these methods are here to support persistent login storage
//in later refactors user.id should be stored in database
module.exports = function(){
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  //obj should also refer to said user in database
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  passport.use(google);
};
