var Firebase = require('firebase');

var rootRef =  new Firebase('https://quickcallhr.firebaseio.com');
var user = {};

user.getUserData = function(plivo_phone, callback) {
  // <<- query database for userId
  //     this requires a nested for in loop 
  rootRef.on('value', function(rootSnapshot) {
    var rootPayload = rootSnapshot.val();
    for (var data in rootPayload) {
      if (rootPayload.hasOwnProperty(data)) {
        var user = rootPayload[data];
        for (var key in user) {
          var userData = user[key]; 
          if (userData.plivo_phone === plivo_phone) {
            callback(userData); 
          } 
        }
      } else {
        console.log('plivo_phone not found');
      }
    }
  });
}); 

module.exports = user; 